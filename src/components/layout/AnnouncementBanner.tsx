import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useBanner } from '../../hooks/useBanner';
import { isBannerLive } from '../../utils/banner';
import type { BannerTone } from '../../types/banner';

const TONE_STYLES: Record<BannerTone, string> = {
  accent: 'border-accent/25 bg-accent-subtle',
  success: 'border-state-success/25 bg-state-success/10',
  warning: 'border-state-warning/25 bg-state-warning/10',
  info: 'border-state-info/25 bg-state-info/10',
  danger: 'border-state-danger/25 bg-state-danger/10',
};

// Short instrument-panel style tag, consistent with the rest of the brand's
// mono-label language, rather than a generic "Announcement" everywhere.
const TONE_LABEL: Record<BannerTone, string> = {
  accent: 'OFFER',
  success: 'AVAILABLE',
  warning: 'NOTICE',
  info: 'UPDATE',
  danger: 'LIMITED',
};

const DISMISS_KEY = 'mectec-banner-dismissed';

/** A visitor who dismisses a banner won't see that same message again this
 *  session — but a *new* message (edited by the admin) reappears immediately,
 *  since the dismissal is keyed to the message text, not just "banner:closed". */
export function AnnouncementBanner() {
  const { data: banner } = useBanner();
  const [dismissedMessage, setDismissedMessage] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY);
    } catch {
      return null;
    }
  });

  if (!banner || !isBannerLive(banner)) return null;
  if (dismissedMessage === banner.message) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, banner.message);
    } catch {
      // Storage can be unavailable (private browsing, quota). Not fatal —
      // the banner just won't remember being dismissed this session.
    }
    setDismissedMessage(banner.message);
  };

  const isExternalLink = banner.linkUrl?.startsWith('http');

  return (
    <div className={`border-b px-4 py-2.5 ${TONE_STYLES[banner.tone]}`}>
      <div className="mx-auto flex max-w-content items-center gap-3">
        <span className="hidden shrink-0 rounded border border-current/30 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-content-secondary sm:inline-block">
          {TONE_LABEL[banner.tone]}
        </span>

        <p className="min-w-0 flex-1 truncate text-sm text-content">
          {banner.message}
          {banner.linkUrl && banner.linkLabel && (
            <>
              {' '}
              {isExternalLink ? (
                <a
                  href={banner.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap font-medium underline underline-offset-2 hover:text-accent"
                >
                  {banner.linkLabel}
                </a>
              ) : (
                <Link
                  to={banner.linkUrl}
                  className="whitespace-nowrap font-medium underline underline-offset-2 hover:text-accent"
                >
                  {banner.linkLabel}
                </Link>
              )}
            </>
          )}
        </p>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss this announcement"
          className="shrink-0 rounded p-1 text-content-muted transition-colors hover:text-content"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
