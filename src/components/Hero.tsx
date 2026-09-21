"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-grid">
      <div className="absolute inset-0 bg-radial" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-sm text-primary mb-4 tracking-wider">
            {profile.location}
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {profile.name.split(" ")[0]}{" "}
            <span className="text-muted-foreground font-light">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-4 max-w-2xl">
            {profile.title}
          </p>

          <p className="text-base text-muted-foreground/80 mb-10 max-w-xl leading-relaxed">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View Projects
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Mail size={16} />
              Contact me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
