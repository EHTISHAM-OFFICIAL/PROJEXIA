import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../constants/site';

/** Renders nothing until SITE.whatsapp is filled in — never a dead button. */
export function WhatsAppFab() {
  const href = whatsappLink('Hello MECTEC, I have a question about a project.');
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message MECTEC on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-onAccent shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5 active:scale-95 sm:right-8 md:bottom-6"
    >
      <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" aria-hidden="true" />
      <MessageCircle size={22} className="relative" aria-hidden="true" />
    </a>
  );
}
