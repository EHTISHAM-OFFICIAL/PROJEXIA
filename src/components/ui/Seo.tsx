import { useEffect } from 'react';
import { SITE } from '../../constants/site';

interface SeoProps {
  title: string;
  description?: string;
  /** Path only, e.g. "/projects/water-level-monitor" */
  path?: string;
  image?: string | null;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Sets document title and meta tags on navigation.
 * This is a client-rendered app, so tags are applied after load — fine for search
 * engines that execute JavaScript. Move to static pre-rendering if link-preview
 * crawlers (WhatsApp, Slack) need to see them. See README, "SEO".
 */
export function Seo({ title, description, path, image, type = 'website', noIndex }: SeoProps) {
  const fullTitle = title === SITE.name ? title : `${title} — ${SITE.name}`;
  const metaDescription = description ?? SITE.description;
  const url = path ? `${SITE.url}${path}` : SITE.url;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'name', 'description', metaDescription);
    setMeta('meta[name="robots"]', 'name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE.name);
    if (image) setMeta('meta[property="og:image"]', 'property', 'og:image', image);

    setMeta(
      'meta[name="twitter:card"]',
      'name',
      'twitter:card',
      image ? 'summary_large_image' : 'summary'
    );
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [fullTitle, metaDescription, url, image, type, noIndex]);

  return null;
}
