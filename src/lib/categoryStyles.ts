import type { ProjectCategory } from "@/data/projects";

/**
 * Badge treatment per project category. All foreground colours clear the 4.5:1
 * contrast minimum against the card surface.
 */
export const categoryBadge: Record<ProjectCategory, string> = {
  cybersecurity: "text-[#ff9b9b] bg-[#ff6b6b]/10 border-[#ff6b6b]/25",
  networking: "text-[#67e8f9] bg-[#22d3ee]/10 border-[#22d3ee]/25",
  fullstack: "text-[#a8c4ff] bg-[#4f83ff]/12 border-[#4f83ff]/30",
  systems: "text-[#fcd34d] bg-[#f59e0b]/10 border-[#f59e0b]/25",
};

/** Accent used for the hover glow and marker per category. */
export const categoryAccent: Record<ProjectCategory, string> = {
  cybersecurity: "#ff6b6b",
  networking: "#22d3ee",
  fullstack: "#4f83ff",
  systems: "#f59e0b",
};
