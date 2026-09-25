import { useEffect } from "react";
import { SITE } from "../../constants/site";

interface SeoProps {
  title: string;
  description?: string;
  path?: string;
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
  publishedTime?: string | null;
  modifiedTime?: string | null;
  schema?: Record<string, unknown> | null;
}

function setMeta(
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

function removeElement(selector: string) {
  document.head.querySelector(selector)?.remove();
}

function absoluteUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value, SITE.url).href;
  } catch {
    return null;
  }
}

function cleanPath(path: string): string {
  const normalized = path.split("?")[0].split("#")[0];
  if (normalized === "/") return "/";
  return normalized.replace(/\/+$/, "");
}

function titleCaseSegment(segment: string): string {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildBreadcrumbSchema(path: string, pageTitle: string) {
  const normalizedPath = cleanPath(path);
  if (normalizedPath === "/") return null;

  const segments = normalizedPath.split("/").filter(Boolean);
  const items: Array<Record<string, unknown>> = [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE.name,
      item: SITE.url,
    },
  ];

  let accumulated = "";
  segments.forEach((segment, index) => {
    accumulated += `/${segment}`;
    const isLast = index === segments.length - 1;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: isLast ? pageTitle : titleCaseSegment(segment),
      item: `${SITE.url}${accumulated}`,
    });
  });

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function buildSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: "MECTEC Electronics",
    description: SITE.description,
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
  };
}

function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: "MECTEC Electronics",
    url: SITE.url,
    description: SITE.description,
    ...(SITE.email ? { email: SITE.email } : {}),
  };
}

function setJsonLd(data: Record<string, unknown> | null) {
  const id = "mectec-seo-jsonld";
  const existing = document.getElementById(id) as HTMLScriptElement | null;

  if (!data) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
}

export function Seo({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  noIndex,
  keywords,
  publishedTime,
  modifiedTime,
  schema,
}: SeoProps) {
  const fullTitle = title;
  const metaDescription = (description ?? SITE.description).trim();
  const normalizedPath = cleanPath(path ?? "/");
  const url = `${SITE.url}${normalizedPath === "/" ? "/" : normalizedPath}`;
  const absoluteImage = absoluteUrl(image);

  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = fullTitle;

    setMeta('meta[name="description"]', "name", "description", metaDescription);
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );
    setMeta(
      'meta[name="googlebot"]',
      "name",
      "googlebot",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );

    removeElement('meta[name="keywords"]');

    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      metaDescription,
    );
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      SITE.name,
    );
    setMeta(
      'meta[property="og:locale"]',
      "property",
      "og:locale",
      "en_PK",
    );

    if (absoluteImage) {
      setMeta(
        'meta[property="og:image"]',
        "property",
        "og:image",
        absoluteImage,
      );
      setMeta(
        'meta[property="og:image:alt"]',
        "property",
        "og:image:alt",
        imageAlt || fullTitle,
      );
    } else {
      removeElement('meta[property="og:image"]');
      removeElement('meta[property="og:image:alt"]');
    }

    if (type === "article" && publishedTime) {
      setMeta(
        'meta[property="article:published_time"]',
        "property",
        "article:published_time",
        publishedTime,
      );
    } else {
      removeElement('meta[property="article:published_time"]');
    }

    if (type === "article" && modifiedTime) {
      setMeta(
        'meta[property="article:modified_time"]',
        "property",
        "article:modified_time",
        modifiedTime,
      );
    } else {
      removeElement('meta[property="article:modified_time"]');
    }

    setMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      absoluteImage ? "summary_large_image" : "summary",
    );
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      metaDescription,
    );

    if (absoluteImage) {
      setMeta(
        'meta[name="twitter:image"]',
        "name",
        "twitter:image",
        absoluteImage,
      );
      setMeta(
        'meta[name="twitter:image:alt"]',
        "name",
        "twitter:image:alt",
        imageAlt || fullTitle,
      );
    } else {
      removeElement('meta[name="twitter:image"]');
      removeElement('meta[name="twitter:image:alt"]');
    }

    setLink("canonical", url);

    const graph: Array<Record<string, unknown>> = [];
    if (normalizedPath === "/") {
      graph.push(buildOrganizationSchema(), buildSiteSchema());
    }

    const breadcrumb = buildBreadcrumbSchema(normalizedPath, title);
    if (breadcrumb) graph.push(breadcrumb);

    if (type === "article") {
      graph.push({
        "@type": "Article",
        headline: title,
        description: metaDescription,
        url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        ...(absoluteImage ? { image: [absoluteImage] } : {}),
        ...(publishedTime ? { datePublished: publishedTime } : {}),
        ...(modifiedTime ? { dateModified: modifiedTime } : {}),
        ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
      });
    }

    if (schema) graph.push(schema);

    setJsonLd(
      graph.length
        ? {
            "@context": "https://schema.org",
            "@graph": graph,
          }
        : null,
    );
  }, [
    fullTitle,
    metaDescription,
    url,
    absoluteImage,
    imageAlt,
    type,
    noIndex,
    keywords,
    publishedTime,
    modifiedTime,
    schema,
    normalizedPath,
    title,
  ]);

  return null;
}
