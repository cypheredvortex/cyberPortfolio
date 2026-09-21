"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { profile } from "@/data/profile";

export default function About() {
  return <section id="about" className="py-24 sm:py-32"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <AnimatedSection><SectionHeader label="Professional profile" title="Computer science and networks engineering" description="Engineering-cycle specialization in cybersecurity and network infrastructure, supported by applied security, networking, systems, and software work." /></AnimatedSection>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
      <AnimatedSection className="lg:col-span-3"><div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>{profile.summary}</p>
        <p>My cybersecurity work is academic and lab-based: I have examined IPsec/IKEv2 traffic in a controlled VPN attack simulation, built a SOC simulation with Snort and ELK, and automated exposed-service monitoring with Python and Nmap.</p>
        <p>Full-stack projects support my primary specialization by demonstrating web-application development capability alongside cybersecurity and network-infrastructure work.</p>
      </div></AnimatedSection>
      <AnimatedSection className="lg:col-span-2" delay={0.15}><div className="space-y-6">
        <div className="p-5 rounded-xl border border-border bg-card"><h3 className="text-sm font-semibold text-foreground mb-3">Focus areas</h3><ul className="space-y-2">{["Network security and VPN analysis", "Intrusion detection and log monitoring", "Network and Linux infrastructure", "ICS risk assessment"].map((item) => <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{item}</li>)}</ul></div>
        <div className="p-5 rounded-xl border border-border bg-card"><h3 className="text-sm font-semibold text-foreground mb-3">Languages</h3><p className="text-sm text-muted-foreground">Arabic (native) · French (professional) · English (professional)</p></div>
      </div></AnimatedSection>
    </div>
  </div></section>;
}
