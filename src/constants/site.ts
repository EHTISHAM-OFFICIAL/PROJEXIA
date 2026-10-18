/**
 * Single source of truth for business details shown across the site.
 * Values marked TODO are placeholders — replace them before going live.
 */
export const SITE = {
  name: "ProjexiaHub",
  tagline: "Custom electronics design and development",
  description:
    "ProjexiaHub designs and builds custom electronics: embedded systems, IoT devices, automation, robotics, and working prototypes.",
  url: "https://projexiahub.web.app",
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
  { label: "School Models", to: "/school-projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Book a Meeting", to: "/book-meeting" },
] as const;

export const whatsappLink = (message?: string, number: string = SITE.whatsapp): string | null => {
  const normalizedNumber = number.replace(/[^0-9]/g, "");
  if (!normalizedNumber) return null;
  const base = `https://wa.me/${normalizedNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
