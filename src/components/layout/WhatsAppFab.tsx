import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../constants/site';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

/** Renders nothing when public WhatsApp visibility is disabled or no number is configured. */
export function WhatsAppFab() {
  const { settings } = useSiteSettings();
  const href = settings.showWhatsapp
    ? whatsappLink('Hello ' + settings.name + ', I have a question about a project.', settings.whatsapp)
    : null;
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={'Message ' + settings.name + ' on WhatsApp'}
      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-onAccent shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" aria-hidden="true" />
      <MessageCircle size={22} className="relative" aria-hidden="true" />
    </a>
  );
}
