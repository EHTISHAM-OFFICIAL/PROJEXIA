import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';
import { useBanner } from '../../hooks/useBanner';
import { isBannerLive } from '../../utils/banner';
import type { BannerTone } from '../../types/banner';

const TONE_STYLES: Record<BannerTone, string> = {
  accent: 'border-accent/30 bg-accent-subtle',
  success: 'border-state-success/30 bg-state-success/10',
  warning: 'border-state-warning/30 bg-state-warning/10',
  info: 'border-state-info/30 bg-state-info/10',
  danger: 'border-state-danger/30 bg-state-danger/10',
};

const TONE_TAG: Record<BannerTone, string> = {
  accent: 'bg-accent text-black',
  success: 'bg-state-success text-black',
  warning: 'bg-state-warning text-black',
  info: 'bg-state-info text-black',
  danger: 'bg-state-danger text-black',
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

function MessageContent({
  message,
  linkUrl,
  linkLabel,
}: {
  message: string;
  linkUrl: string | null;
  linkLabel: string | null;
}) {
  const isExternalLink = linkUrl?.startsWith('http');
  return (
    <>
      {message}
      {linkUrl && linkLabel && (
        <>
          {' '}
          {isExternalLink ? (
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap font-semibold underline underline-offset-2 hover:text-accent"
            >
              {linkLabel}
            </a>
          ) : (
            <Link
              to={linkUrl}
              className="whitespace-nowrap font-semibold underline underline-offset-2 hover:text-accent"
            >
              {linkLabel}
            </Link>
          )}
        </>
      )}
    </>
  );
}

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
  if (banner.dismissible && dismissedMessage === banner.message) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, banner.message);
    } catch {
      // Storage can be unavailable (private browsing, quota). Not fatal —
      // the banner just won't remember being dismissed this session.
    }
    setDismissedMessage(banner.message);
  };

  const isLarge = banner.size === 'large';

  return (
    <div
      className={`relative border-b ${TONE_STYLES[banner.tone]} ${
        isLarge ? 'px-4 py-3.5' : 'px-4 py-2'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center gap-3">
        <span
          className={`flex shrink-0 items-center gap-1 rounded font-mono font-bold tracking-wide ${
            TONE_TAG[banner.tone]
          } ${isLarge ? 'px-2 py-1 text-xs' : 'px-1.5 py-0.5 text-[10px]'}`}
        >
          <Sparkles size={isLarge ? 13 : 11} className="animate-pulse" aria-hidden="true" />
          {TONE_LABEL[banner.tone]}
        </span>

        {banner.scrolling ? (
          <div className="group min-w-0 flex-1 overflow-hidden">
            <div
              className={`flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] ${
                isLarge ? 'text-base font-medium' : 'text-sm'
              } text-content`}
            >
              {/* Message duplicated back-to-back so the loop is seamless. */}
              <span className="pr-16">
                <MessageContent
                  message={banner.message}
                  linkUrl={banner.linkUrl}
                  linkLabel={banner.linkLabel}
                />
              </span>
              <span className="pr-16" aria-hidden="true">
                <MessageContent
                  message={banner.message}
                  linkUrl={banner.linkUrl}
                  linkLabel={banner.linkLabel}
                />
              </span>
            </div>
          </div>
        ) : (
          <p
            className={`min-w-0 flex-1 truncate text-content ${
              isLarge ? 'text-base font-medium' : 'text-sm'
            }`}
          >
            <MessageContent
              message={banner.message}
              linkUrl={banner.linkUrl}
              linkLabel={banner.linkLabel}
            />
          </p>
        )}

        {banner.dismissible && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss this announcement"
            className="shrink-0 rounded p-1 text-content-muted transition-colors hover:text-content"
          >
            <X size={isLarge ? 16 : 14} />
          </button>
        )}
      </div>
    </div>
  );
}
