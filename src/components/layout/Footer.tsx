import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Wordmark } from './Wordmark';
import { NAV_LINKS, SITE, SOCIAL_LINKS, whatsappLink } from '../../constants/site';

const activeSocials = SOCIAL_LINKS.filter((social) => social.href);

export function Footer() {
  const whatsapp = whatsappLink();

  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-content-secondary">{SITE.description}</p>
          </div>

          <div className="flex gap-12 sm:gap-20">
            <nav aria-labelledby="footer-nav">
              <h2 id="footer-nav" className="text-sm font-medium text-content">
                Pages
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-content-secondary transition-colors hover:text-content"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/request-project"
                    className="text-sm text-content-secondary transition-colors hover:text-content"
                  >
                    Request a project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/track-request"
                    className="text-sm text-content-secondary transition-colors hover:text-content"
                  >
                    Track a request
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="text-sm font-medium text-content">Get in touch</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-sm text-content-secondary transition-colors hover:text-content"
                  >
                    {SITE.email}
                  </a>
                </li>
                {whatsapp && (
                  <li>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-content-secondary transition-colors hover:text-content"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                {activeSocials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-content-secondary transition-colors hover:text-content"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="font-mono text-xs text-content-muted">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
