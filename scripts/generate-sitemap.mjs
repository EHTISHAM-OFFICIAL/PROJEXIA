import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const SITE_URL = 'https://projexiahub.web.app';

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const values = {};
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    values[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
  return values;
}

const env = {
  ...loadEnvFile(resolve(process.cwd(), '.env')),
  ...loadEnvFile(resolve(process.cwd(), '.env.local')),
  ...process.env,
};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

function normaliseSlug(slug) {
  return String(slug || '').trim().replace(/^\/+|\/+$/g, '');
}

function toIso(value) {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate().toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

const staticUrls = [
  { path: '/', priority: '1.0' },
  { path: '/projects', priority: '0.9' },
  { path: '/school-projects', priority: '0.8' },
  { path: '/blog', priority: '0.8' },
  { path: '/about', priority: '0.7' },
  { path: '/contact', priority: '0.7' },
];

const urls = new Map(staticUrls.map((entry) => [entry.path, entry]));
let db;

async function addPublished(collectionName, prefix, priority) {
  const snapshot = await getDocs(query(collection(db, collectionName), where('published', '==', true)));
  for (const document of snapshot.docs) {
    const data = document.data();
    const slug = normaliseSlug(data.slug);
    if (!slug) continue;
    urls.set(`${prefix}/${slug}`, {
      path: `${prefix}/${slug}`,
      priority,
      lastmod: toIso(data.updatedAt) || toIso(data.createdAt),
    });
  }
}

async function writeSitemap() {
  const entries = [...urls.values()]
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : '';
      return `  <url>\n    <loc>${SITE_URL}${escapeXml(entry.path)}</loc>${lastmod}\n    <changefreq>weekly</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log(`Sitemap generated with ${urls.size} URLs.`);
}

const required = Object.entries(firebaseConfig).filter(([, value]) => !value);

try {
  if (!required.length) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    await addPublished('projects', '/projects', '0.8');
    await addPublished('schoolModels', '/school-projects', '0.8');
    await addPublished('posts', '/blog', '0.7');
  } else {
    console.warn('Firebase environment variables are not available; generating sitemap with static public URLs only.');
  }

  await writeSitemap();
} catch (error) {
  console.error('Dynamic sitemap generation failed; writing static public sitemap instead:', error);
  await writeSitemap();
}
