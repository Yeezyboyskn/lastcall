// Centralized site configuration
// Update this file when the production domain changes

export const SITE_CONFIG = {
  url: "https://lastcall-event.vercel.app",
  name: "Last Call",
  description: "Programa de adopción Copilot 30 días | Last Call + Microsoft",
  ogImage: "/og-optimized.png",
  twitterHandle: "@lastcall",
  organizationName: "Last Call",
  organizationUrl: "https://lastcall.cl",
} as const;

export type SiteConfig = typeof SITE_CONFIG;