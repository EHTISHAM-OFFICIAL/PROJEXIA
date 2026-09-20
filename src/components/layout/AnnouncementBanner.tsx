import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Sparkles, X } from "lucide-react";

import { useBanner } from "../../hooks/useBanner";
import { isBannerLive } from "../../utils/banner";
import type { BannerTone } from "../../types/banner";

const TONE_STYLES: Record<BannerTone, string> = {
  accent: "border-accent/30 bg-accent-subtle",
  success: "border-state-success/30 bg-state-success/10",
  warning: "border-state-warning/30 bg-state-warning/10",
  info: "border-state-info/30 bg-state-info/10",
  danger: "border-state-danger/30 bg-state-danger/10",
};

const TONE_TAG: Record<BannerTone, string> = {
  accent: "bg-accent text-onAccent",
  success: "bg-state-success text-black",
  warning: "bg-state-warning text-black",
  info: "bg-state-info text-black",
  danger: "bg-state-danger text-black",
};

const TONE_LABEL: Record<BannerTone, string> = {
  accent: "OFFER",
  success: "AVAILABLE",
  warning: "NOTICE",
  info: "UPDATE",
  danger: "LIMITED",
};

const DISMISS_KEY = "mectec-banner-dismissed";

function MessageContent({
  message,
  linkUrl,
  linkLabel,
}: {
  message: string;
  linkUrl: string | null;
  linkLabel: string | null;
}) {
  const isExternalLink = linkUrl?.startsWith("http");

  return (
    <>
      {message}

      {linkUrl && linkLabel && (
        <>
          {" "}
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

export function AnnouncementBanner() {
  const { data: banner } = useBanner();

  const [dismissedMessage, setDismissedMessage] = useState<string | null>(
    () => {
      try {
        return sessionStorage.getItem(DISMISS_KEY);
      } catch {
        return null;
      }
    },
  );

  if (!banner || !isBannerLive(banner)) {
    return null;
  }

  if (banner.dismissible && dismissedMessage === banner.message) {
    return null;
  }

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, banner.message);
    } catch {
      // Ignore sessionStorage errors.
    }

    setDismissedMessage(banner.message);
  };

  const isLarge = banner.size === "large";

  const scrollSpeed = Math.min(60, Math.max(20, banner.scrollSpeed ?? 40));

  const marqueeStyle = {
    "--mectec-marquee-duration": `${scrollSpeed}s`,
  } as CSSProperties;

  return (
    <div
      className={`relative border-b ${TONE_STYLES[banner.tone]} ${
        isLarge ? "px-4 py-3.5" : "px-4 py-2"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center gap-3">
        <span
          className={`flex shrink-0 items-center gap-1 rounded font-mono font-bold tracking-wide ${
            TONE_TAG[banner.tone]
          } ${isLarge ? "px-2 py-1 text-xs" : "px-1.5 py-0.5 text-[10px]"}`}
        >
          <Sparkles
            size={isLarge ? 13 : 11}
            className="animate-pulse"
            aria-hidden="true"
          />

          {TONE_LABEL[banner.tone]}
        </span>

        {banner.scrolling ? (
          <div className="group min-w-0 flex-1 overflow-hidden">
            <div
              className="mectec-marquee flex w-max items-center whitespace-nowrap"
              style={marqueeStyle}
            >
              <div className="flex shrink-0 items-center">
                {Array.from({ length: 6 }, (_, index) => (
                  <span
                    key={`first-${index}`}
                    className={`flex shrink-0 items-center pr-10 ${
                      isLarge ? "text-base font-medium" : "text-sm"
                    } text-content`}
                  >
                    <MessageContent
                      message={banner.message}
                      linkUrl={banner.linkUrl}
                      linkLabel={banner.linkLabel}
                    />

                    <span
                      className="pl-10 text-content-muted"
                      aria-hidden="true"
                    >
                      •
                    </span>
                  </span>
                ))}
              </div>

              <div className="flex shrink-0 items-center" aria-hidden="true">
                {Array.from({ length: 6 }, (_, index) => (
                  <span
                    key={`second-${index}`}
                    className={`flex shrink-0 items-center pr-10 ${
                      isLarge ? "text-base font-medium" : "text-sm"
                    } text-content`}
                  >
                    <MessageContent
                      message={banner.message}
                      linkUrl={banner.linkUrl}
                      linkLabel={banner.linkLabel}
                    />

                    <span
                      className="pl-10 text-content-muted"
                      aria-hidden="true"
                    >
                      •
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p
            className={`min-w-0 flex-1 truncate text-content ${
              isLarge ? "text-base font-medium" : "text-sm"
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
