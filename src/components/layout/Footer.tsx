import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, whatsappLink } from '../../constants/site';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolSettings } from '../../services/schoolModelService';
import { getTrackedRequest } from '../../utils/trackedRequest';
import { Container } from '../ui/Container';
import { Wordmark } from './Wordmark';

const footerLinkClass =
  'group inline-flex min-h-10 items-center gap-2 text-sm text-content-secondary transition-colors duration-200 hover:text-accent focus-visible:text-accent';

export function Footer() {
  const { settings } = useSiteSettings();
  const whatsapp = settings.showWhatsapp ? whatsappLink(undefined, settings.whatsapp) : null;
  const activeSocials = settings.socialLinks.filter(
    (social) => social.enabled && social.label && /^https?:\/\//i.test(social.url)
  );
  const tracked = getTrackedRequest();
  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>(DEFAULT_SCHOOL_SETTINGS);

  useEffect(() => {
    let live = true;
    void schoolModelService
      .getSettings()
      .then((nextSettings) => {
        if (live) setSchoolSettings(nextSettings);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const visibleLinks = NAV_LINKS.filter((link) =>
    link.to === '/school-projects'
      ? schoolSettings.enabled && schoolSettings.showInNavigation
      : link.to === '/projects'
        ? schoolSettings.electronicsEnabled && schoolSettings.showElectronicsInNavigation
        : true
  );

  return (
    <footer className="relative isolate mt-16 overflow-hidden border-t border-line bg-surface sm:mt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_at_50%_0%,rgb(var(--color-accent)/0.13),transparent_68%)]"
      />

      <Container className="pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 sm:pb-10 sm:pt-12 lg:pt-14">
        <section
          aria-labelledby="footer-cta-title"
          className="relative overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/15 via-surface-raised to-surface px-5 py-6 shadow-[0_20px_60px_-38px_rgb(var(--color-accent)/0.5)] sm:px-8 sm:py-8 lg:px-10 lg:py-9"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border border-accent/15 sm:-right-6 sm:-top-32 sm:h-80 sm:w-80"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="max-w-2xl">
              <p className="eyebrow">LET'S BUILD SOMETHING</p>
              <h2 id="footer-cta-title" className="mt-2 text-2xl font-semibold leading-tight text-content sm:text-3xl lg:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-content-secondary sm:mt-3 sm:text-base">
                Share your idea with {settings.name}. We’ll help you take the next step.
              </p>
            </div>
            <div className="grid w-full shrink-0 grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 sm:w-auto sm:min-w-[17rem] sm:grid-cols-1">
              <Link
                to="/request-project"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-onAccent shadow-[0_8px_24px_-12px_rgb(var(--color-accent)/0.8)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Request a project <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-strong/80 bg-surface/70 px-5 py-3 text-sm font-semibold text-content transition-colors hover:border-accent/50 hover:bg-surface"
              >
                Explore projects <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-9 pt-10 sm:gap-x-10 sm:gap-y-12 sm:pb-11 sm:pt-12 lg:grid-cols-[1.45fr_0.8fr_0.8fr_1.1fr] lg:gap-12">
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <Link to="/" aria-label={`${settings.name} home`} className="inline-flex rounded-lg">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-content-secondary">
              {settings.description}
            </p>
            {activeSocials.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {activeSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line bg-surface-raised/60 px-3 text-xs font-medium text-content-secondary transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {social.label}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav aria-labelledby="footer-explore-title" className="min-w-0">
            <h2 id="footer-explore-title" className="font-display text-base font-semibold text-content">
              Explore
            </h2>
            <ul className="mt-3 flex flex-col gap-0.5">
              {visibleLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={footerLinkClass}>
                    <span>{link.label}</span>
                    <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-start-title" className="min-w-0">
            <h2 id="footer-start-title" className="font-display text-base font-semibold text-content">
              Get started
            </h2>
            <ul className="mt-3 flex flex-col gap-0.5">
              <li>
                <Link to="/request-project" className={footerLinkClass}>
                  Request a project
                </Link>
              </li>
              {tracked && (
                <li>
                  <Link
                    to={`/track-request?ref=${encodeURIComponent(tracked.requestNumber)}`}
                    className={footerLinkClass}
                  >
                    Track your request
                  </Link>
                </li>
              )}
              <li>
                <Link to="/contact" className={footerLinkClass}>
                  Contact us
                </Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-2 min-w-0 sm:col-span-1">
            <h2 className="font-display text-base font-semibold text-content">Get in touch</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {settings.showEmail && settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex min-h-10 min-w-0 items-center gap-3 text-sm text-content-secondary transition-colors hover:text-accent">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-raised/70 text-accent">
                      <Mail size={16} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 break-all">{settings.email}</span>
                  </a>
                </li>
              )}
              {settings.showPhone && settings.phone && (
                <li>
                  <a href={`tel:${settings.phone.replace(/[^+0-9]/g, '')}`} className="flex min-h-10 items-center gap-3 text-sm text-content-secondary transition-colors hover:text-accent">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-raised/70 text-accent">
                      <Phone size={16} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 break-words">{settings.phone}</span>
                  </a>
                </li>
              )}
              {settings.showAddress && settings.address && (
                <li className="flex items-start gap-3 py-1 text-sm leading-relaxed text-content-secondary">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-raised/70 text-accent">
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 pt-1 [overflow-wrap:anywhere]">{settings.address}</span>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center gap-3 text-sm text-content-secondary transition-colors hover:text-accent">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-raised/70 text-accent">
                      <MessageCircle size={16} aria-hidden="true" />
                    </span>
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight size={13} className="ml-auto shrink-0" aria-hidden="true" />
                  </a>
                </li>
              )}
            </ul>
            {!settings.showEmail && !settings.showPhone && !settings.showAddress && !whatsapp && (
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                Visit our contact page to get in touch.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p className="text-xs leading-relaxed text-content-muted">
            © {new Date().getFullYear()} {settings.name}. All rights reserved.
          </p>
          <Link
            to="/contact"
            className="inline-flex min-h-9 items-center gap-1.5 self-start text-xs font-medium text-content-secondary transition-colors hover:text-accent sm:self-auto"
          >
            Need help? Contact us <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
