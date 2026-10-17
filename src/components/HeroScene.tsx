"use client";

import { useEffect, useRef } from "react";

type ThreeModule = typeof import("three");

interface HeroSceneProps {
  /** Called after the first frame is on screen, so the SVG fallback can fade. */
  onReady?: () => void;
}

const NODE_COUNT = 190;
const SHELL_RADIUS = 3.05;
const PACKET_COUNT = 12;
const MAX_PIXEL_RATIO = 1.5;

/** Cheap capability probe; some privacy browsers expose WebGL but fail later. */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/** Soft round sprite used for every glowing point, created once per scene. */
function createGlowTexture(THREE: ThreeModule) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.28, "rgba(255,255,255,0.82)");
    gradient.addColorStop(0.62, "rgba(255,255,255,0.22)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Fibonacci-distributed nodes give an even, non-mechanical spherical lattice. */
function buildShell(THREE: ThreeModule) {
  const nodes: InstanceType<ThreeModule["Vector3"]>[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < NODE_COUNT; index += 1) {
    const y = 1 - (index / (NODE_COUNT - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * index;
    // A deterministic nudge keeps the shell from reading as a perfect ball.
    const radius = SHELL_RADIUS + Math.sin(index * 2.17) * 0.18;
    nodes.push(
      new THREE.Vector3(
        Math.cos(theta) * ring * radius,
        y * radius * 0.94,
        Math.sin(theta) * ring * radius
      )
    );
  }

  // Connect each node to its two nearest neighbours, deduplicated by index.
  const seen = new Set<string>();
  const links: Array<[number, number]> = [];
  for (let index = 0; index < nodes.length; index += 1) {
    const nearest = nodes
      .map((node, other) => ({ other, distance: node.distanceToSquared(nodes[index]) }))
      .filter((entry) => entry.other !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2);

    for (const { other } of nearest) {
      const low = Math.min(index, other);
      const high = Math.max(index, other);
      const key = `${low}:${high}`;
      if (seen.has(key)) continue;
      seen.add(key);
      links.push([low, high]);
    }
  }

  return { nodes, links };
}

export default function HeroScene({ onReady }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);

  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!hasWebGL()) {
      container.dataset.state = "unsupported";
      return;
    }

    let disposed = false;
    let teardown: (() => void) | undefined;

    const boot = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);

      let renderer: InstanceType<ThreeModule["WebGLRenderer"]>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: window.devicePixelRatio < 2,
          powerPreference: "high-performance",
        });
      } catch {
        container.dataset.state = "unsupported";
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
      renderer.setSize(width, height, false);
      renderer.setClearAlpha(0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x06080f, 0.055);

      const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 80);
      camera.position.set(0, 0, 8.6);
      camera.lookAt(0, 0, 0);

      const group = new THREE.Group();
      scene.add(group);

      const glowTexture = createGlowTexture(THREE);
      const { nodes, links } = buildShell(THREE);

      const primary = new THREE.Color("#4f83ff");
      const light = new THREE.Color("#7ba7ff");
      const accent = new THREE.Color("#22d3ee");
      const white = new THREE.Color("#dbe7ff");

      // --- Node shell -------------------------------------------------------
      const nodePositions = new Float32Array(nodes.length * 3);
      const nodeColors = new Float32Array(nodes.length * 3);
      const scratch = new THREE.Color();

      nodes.forEach((node, index) => {
        nodePositions.set([node.x, node.y, node.z], index * 3);
        scratch.copy(index % 11 === 0 ? accent : index % 3 === 0 ? light : primary);
        scratch.multiplyScalar(index % 7 === 0 ? 1 : 0.72);
        nodeColors.set([scratch.r, scratch.g, scratch.b], index * 3);
      });

      const nodeGeometry = new THREE.BufferGeometry();
      nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
      nodeGeometry.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));

      const nodeMaterial = new THREE.PointsMaterial({
        size: 0.125,
        map: glowTexture,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        sizeAttenuation: true,
      });
      group.add(new THREE.Points(nodeGeometry, nodeMaterial));

      // --- Topology links ---------------------------------------------------
      const linkPositions = new Float32Array(links.length * 6);
      links.forEach(([a, b], index) => {
        const start = nodes[a];
        const end = nodes[b];
        linkPositions.set([start.x, start.y, start.z], index * 6);
        linkPositions.set([end.x, end.y, end.z], index * 6 + 3);
      });

      const linkGeometry = new THREE.BufferGeometry();
      linkGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(linkPositions, 3)
      );
      const linkMaterial = new THREE.LineBasicMaterial({
        color: 0x5f8dff,
        transparent: true,
        opacity: 0.46,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.LineSegments(linkGeometry, linkMaterial));

      // --- Inner core -------------------------------------------------------
      const coreShape = new THREE.IcosahedronGeometry(1.32, 1);
      const coreGeometry = new THREE.WireframeGeometry(coreShape);
      const coreMaterial = new THREE.LineBasicMaterial({
        color: 0x7ba7ff,
        transparent: true,
        opacity: 0.34,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const core = new THREE.LineSegments(coreGeometry, coreMaterial);
      group.add(core);

      // --- Orbital rings ----------------------------------------------------
      const ringMaterial = new THREE.LineBasicMaterial({
        color: 0x5f8dff,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const ringGeometries: InstanceType<ThreeModule["BufferGeometry"]>[] = [];
      const ringConfigs = [
        { radius: 3.7, tilt: 0.72, yaw: 0.35, roll: 0.08 },
        { radius: 4.05, tilt: -0.52, yaw: 1.15, roll: -0.22 },
        { radius: 3.42, tilt: 1.28, yaw: -0.6, roll: 0.3 },
      ];

      for (const [index, config] of ringConfigs.entries()) {
        const segments = 160;
        const points = new Float32Array(segments * 3);
        for (let step = 0; step < segments; step += 1) {
          const angle = (step / segments) * Math.PI * 2;
          points.set(
            [
              Math.cos(angle) * config.radius,
              Math.sin(angle) * config.radius,
              0,
            ],
            step * 3
          );
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
        const ring = new THREE.LineLoop(geometry, ringMaterial);
        ring.rotation.set(config.tilt, config.yaw, config.roll);
        ring.userData.spin = index % 2 === 0 ? 0.045 : -0.035;
        group.add(ring);
        ringGeometries.push(geometry);
      }

      // --- Ambient dust -----------------------------------------------------
      const dustCount = 220;
      const dustPositions = new Float32Array(dustCount * 3);
      for (let index = 0; index < dustCount; index += 1) {
        dustPositions.set(
          [
            (Math.random() - 0.5) * 13,
            (Math.random() - 0.5) * 9,
            (Math.random() - 0.5) * 7 - 1,
          ],
          index * 3
        );
      }
      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(dustPositions, 3)
      );
      const dustMaterial = new THREE.PointsMaterial({
        size: 0.034,
        map: glowTexture,
        color: 0x9db8ff,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const dust = new THREE.Points(dustGeometry, dustMaterial);
      scene.add(dust);

      // --- Travelling signal packets ---------------------------------------
      const packetPositions = new Float32Array(PACKET_COUNT * 3);
      const packetColors = new Float32Array(PACKET_COUNT * 3);
      const packets = Array.from({ length: PACKET_COUNT }, (_, index) => ({
        link: links[Math.floor(Math.random() * links.length)],
        progress: Math.random(),
        speed: 0.1 + Math.random() * 0.16,
        tone: index % 3,
      }));

      const packetTone = [accent, white, light];
      packets.forEach((packet, index) => {
        const color = packetTone[packet.tone];
        packetColors.set([color.r, color.g, color.b], index * 3);
      });

      const packetGeometry = new THREE.BufferGeometry();
      packetGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(packetPositions, 3)
      );
      packetGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(packetColors, 3)
      );
      const packetMaterial = new THREE.PointsMaterial({
        size: 0.2,
        map: glowTexture,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        sizeAttenuation: true,
      });
      const packetPoints = new THREE.Points(packetGeometry, packetMaterial);
      group.add(packetPoints);

      // --- Ambient halo -----------------------------------------------------
      // A soft additive bloom behind the portrait card, so the scene reads as a
      // lit environment even where the card itself covers the lattice.
      const haloMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x2f68ff,
        transparent: true,
        opacity: 0.26,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const halo = new THREE.Sprite(haloMaterial);
      halo.scale.set(9.5, 9.5, 1);
      halo.position.set(0, 0, -1.2);
      group.add(halo);

      const innerHaloMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const innerHalo = new THREE.Sprite(innerHaloMaterial);
      innerHalo.scale.set(4.6, 4.6, 1);
      innerHalo.position.set(0, 0, -0.8);
      group.add(innerHalo);

      // --- Layout -----------------------------------------------------------
      let baseX = 0;
      let baseY = 0;

      const layout = () => {
        const boxWidth = Math.max(container.clientWidth, 1);
        const boxHeight = Math.max(container.clientHeight, 1);
        const aspect = boxWidth / boxHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(boxWidth, boxHeight, false);

        const visibleHeight =
          2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        const visibleWidth = visibleHeight * aspect;
        const wide = boxWidth >= 1024;

        // Push the lattice to the right of the layout so its lit core and
        // rings stay visible beside the portrait card instead of hiding
        // behind it; the card then sits inside the arc rather than on top of a
        // hidden sphere.
        baseX = wide ? Math.min(visibleWidth * 0.34, 3.6) : 0;
        baseY = wide ? -0.4 : -0.9;
        group.position.x = baseX;
        group.position.y = baseY;
        group.scale.setScalar(boxWidth < 640 ? 0.6 : wide ? 1.02 : 0.88);
      };

      layout();

      // --- Motion -----------------------------------------------------------
      const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      let scrollProgress = 0;
      let running = false;
      let inView = true;
      let frameId = 0;
      let lastTime = 0;

      const updatePackets = (delta: number) => {
        const position = packetGeometry.getAttribute(
          "position"
        ) as InstanceType<ThreeModule["BufferAttribute"]>;

        packets.forEach((packet, index) => {
          packet.progress += delta * packet.speed;
          if (packet.progress >= 1) {
            packet.progress = 0;
            packet.link = links[Math.floor(Math.random() * links.length)];
          }
          const start = nodes[packet.link[0]];
          const end = nodes[packet.link[1]];
          position.setXYZ(
            index,
            start.x + (end.x - start.x) * packet.progress,
            start.y + (end.y - start.y) * packet.progress,
            start.z + (end.z - start.z) * packet.progress
          );
        });
        position.needsUpdate = true;
      };

      const renderFrame = (delta: number, elapsed: number) => {
        pointer.x += (pointer.targetX - pointer.x) * 0.055;
        pointer.y += (pointer.targetY - pointer.y) * 0.055;

        group.rotation.y += delta * 0.055;
        group.rotation.x = -0.08 + pointer.y * 0.16 + scrollProgress * 0.22;
        group.position.x = baseX + pointer.x * 0.45;
        group.position.y = baseY - scrollProgress * 1.5;

        core.rotation.y -= delta * 0.16;
        core.rotation.x += delta * 0.05;
        core.scale.setScalar(1 + Math.sin(elapsed * 0.6) * 0.035);

        group.children.forEach((child) => {
          if (child.userData.spin) {
            child.rotation.z += delta * (child.userData.spin as number);
          }
        });

        dust.rotation.y = elapsed * 0.008;
        camera.position.x = pointer.x * 0.55;
        camera.position.y = pointer.y * -0.35;
        camera.lookAt(0, 0, 0);

        updatePackets(delta);
        renderer.render(scene, camera);
      };

      const tick = (time: number) => {
        const delta = Math.min((time - (lastTime || time)) / 1000, 0.05);
        lastTime = time;
        renderFrame(delta, time / 1000);
        if (running && !document.hidden) {
          frameId = window.requestAnimationFrame(tick);
        } else {
          frameId = 0;
        }
      };

      const start = () => {
        if (disposed || !inView || prefersReducedMotion) return;
        running = true;
        if (!frameId) {
          lastTime = 0;
          frameId = window.requestAnimationFrame(tick);
        }
      };

      const stop = () => {
        running = false;
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
      };

      const readScroll = () => {
        const rect = container.getBoundingClientRect();
        scrollProgress = Math.min(
          Math.max(-rect.top / Math.max(rect.height, 1), 0),
          1
        );
      };

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        pointer.targetX = event.clientX / window.innerWidth - 0.5;
        pointer.targetY = event.clientY / window.innerHeight - 0.5;
        if (!frameId && running) start();
      };

      const onLeave = () => {
        pointer.targetX = 0;
        pointer.targetY = 0;
      };

      const onVisibility = () => {
        if (document.hidden) stop();
        else start();
      };

      // Pointer parallax and scroll are only meaningful with motion enabled.
      if (!prefersReducedMotion) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("scroll", readScroll, { passive: true });
        readScroll();
      }

      const resizeObserver = new ResizeObserver(() => {
        layout();
        if (prefersReducedMotion || !running) renderFrame(0, 0);
      });
      resizeObserver.observe(container);

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          if (inView) start();
          else stop();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(container);

      // Paint the first frame before reporting readiness, so there is never a
      // gap where both the canvas and the SVG fallback are invisible.
      const firstFrame = window.requestAnimationFrame(() => {
        layout();
        readScroll();
        updatePackets(0);
        renderer.render(scene, camera);
        container.dataset.state = "ready";
        readyRef.current?.();
        if (!prefersReducedMotion) start();
      });

      teardown = () => {
        stop();
        window.cancelAnimationFrame(firstFrame);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("scroll", readScroll);

        nodeGeometry.dispose();
        linkGeometry.dispose();
        coreShape.dispose();
        coreGeometry.dispose();
        dustGeometry.dispose();
        packetGeometry.dispose();
        ringGeometries.forEach((geometry) => geometry.dispose());

        nodeMaterial.dispose();
        linkMaterial.dispose();
        coreMaterial.dispose();
        dustMaterial.dispose();
        packetMaterial.dispose();
        ringMaterial.dispose();
        haloMaterial.dispose();
        innerHaloMaterial.dispose();
        glowTexture.dispose();

        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };

    };

    boot().catch(() => {
      if (!disposed) container.dataset.state = "unsupported";
    });

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-state="loading"
      className="hero-scene pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    />
  );
}
