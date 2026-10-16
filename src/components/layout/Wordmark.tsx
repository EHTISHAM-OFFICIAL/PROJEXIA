import { useSiteSettings } from "../../contexts/SiteSettingsContext";

type WordmarkProps = {
  size?: "sm" | "md";
};

export function Wordmark({ size = "md" }: WordmarkProps) {
  const { settings } = useSiteSettings();
  const iconSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const textSize = size === "sm" ? "text-base" : "text-lg";

  return (
    <span className="inline-flex items-center gap-2.5">
      {settings.showSiteLogo && (
        <img
          src={settings.siteLogoUrl || "/icons/logo-mark.svg"}
          alt=""
          width={32}
          height={32}
          className={`rounded-lg object-contain ${iconSize}`}
        />
      )}
      <span
        className={`font-display font-bold tracking-tight text-content ${textSize}`}
      >
        {settings.name}
      </span>
    </span>
  );
}
