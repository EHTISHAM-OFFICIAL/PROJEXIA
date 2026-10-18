import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Wordmark } from './Wordmark';
import { NAV_LINKS, SOCIAL_LINKS, whatsappLink } from '../../constants/site';
import { getTrackedRequest } from '../../utils/trackedRequest';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';
import { useEffect, useState } from 'react';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolSettings } from '../../services/schoolModelService';

const activeSocials = SOCIAL_LINKS.filter((social) => social.href);

export function Footer() {
  const { settings } = useSiteSettings();
  const whatsapp = settings.showWhatsapp ? whatsappLink(undefined, settings.whatsapp) : null;
  const tracked = getTrackedRequest();
  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>(DEFAULT_SCHOOL_SETTINGS);
  useEffect(() => { let live = true; void schoolModelService.getSettings().then(s => { if (live) setSchoolSettings(s); }).catch(() => {}); return () => { live = false; }; }, []);
  const visibleLinks = NAV_LINKS.filter(link => link.to === '/school-projects' ? schoolSettings.enabled && schoolSettings.showInNavigation : link.to === '/projects' ? schoolSettings.electronicsEnabled && schoolSettings.showElectronicsInNavigation : true);

  return (
    <footer className="mt-12 border-t border-line bg-surface/50 sm:mt-20">
      <Container className="py-9 sm:py-12 lg:py-14">
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-3 text-sm leading-relaxed text-content-secondary sm:mt-4">{settings.description}</p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8 sm:gap-x-20">
            <nav aria-labelledby="footer-nav" className="min-w-[8rem]">
              <h2 id="footer-nav" className="text-sm font-medium text-content">Pages</h2>
              <ul className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:gap-2.5">
                {visibleLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="inline-flex min-h-8 items-center text-sm text-content-secondary transition-colors hover:text-content">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/request-project" className="inline-flex min-h-8 items-center text-sm text-content-secondary transition-colors hover:text-content">
                    Request a project
                  </Link>
                </li>
                {tracked && (
                  <li>
                    <Link to={`/track-request?ref=${encodeURIComponent(tracked.requestNumber)}`} className="inline-flex min-h-8 items-center text-sm text-content-secondary transition-colors hover:text-content">
                      Track your request
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            <div className="min-w-0 max-w-full">
              <h2 className="text-sm font-medium text-content">Get in touch</h2>
              <ul className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:gap-2.5">
                {settings.showEmail && settings.email && (
                  <li>
                    <a href={`mailto:${settings.email}`} className="inline-flex min-h-8 max-w-full items-center break-all text-sm text-content-secondary transition-colors hover:text-content">
                      {settings.email}
                    </a>
                  </li>
                )}
                {settings.showPhone && settings.phone && (
                  <li>
                    <a href={`tel:${settings.phone.replace(/[^+0-9]/g, '')}`} className="inline-flex min-h-8 items-center text-sm text-content-secondary transition-colors hover:text-content">
                      {settings.phone}
                    </a>
                  </li>
                )}
                {settings.showAddress && settings.address && (
                  <li className="py-1 text-sm text-content-secondary [overflow-wrap:anywhere]">{settings.address}</li>
                )}
                {whatsapp && (
                  <li>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center text-sm text-content-secondary transition-colors hover:text-content">
                      WhatsApp
                    </a>
                  </li>
                )}
                {activeSocials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center text-sm text-content-secondary transition-colors hover:text-content">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-5 sm:mt-12 sm:pt-6">
          <p className="font-mono text-xs text-content-muted">
            © {new Date().getFullYear()} {settings.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
