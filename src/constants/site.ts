/**
 * Single source of truth for business details shown across the site.
 * Values marked TODO are placeholders — replace them before going live.
 */
export const SITE = {
  name: "MECTEC",
  tagline: "Custom electronics design and development",
  description:
    "MECTEC designs and builds custom electronics: embedded systems, IoT devices, automation, robotics, and working prototypes.",
  url: "https://mectec.pk",
  email: "ehtishamofficial28@gmail.com", // TODO: replace with your real address
  /** International format without '+' or spaces, e.g. 923001234567. Leave empty to hide. */
  whatsapp: "03015168091", // TODO
  phone: "03015168091", // TODO
  location: "Pakistan",
  responseTime: "within 1–2 business days",
} as const;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

/** Entries with an empty href are hidden automatically. */
export const SOCIAL_LINKS = [
  { label: "GitHub", href: "" }, // TODO
  { label: "LinkedIn", href: "" }, // TODO
  { label: "YouTube", href: "" }, // TODO
] as const;

export const whatsappLink = (message?: string): string | null => {
  if (!SITE.whatsapp) return null;
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
