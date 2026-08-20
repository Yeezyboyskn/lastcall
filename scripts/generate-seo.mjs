import { writeFileSync, copyFileSync, existsSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://lastcall-event.vercel.app";

const routes = [
  "",
  "#programa",
  "#sesiones",
  "#requisitos",
  "#registro",
];

function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  const urls = routes.map((route) => {
    const url = `${SITE_URL}/${route}`;
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

const outDir = resolve("docs");
const publicDir = resolve("public");

writeFileSync(resolve(outDir, "sitemap.xml"), generateSitemap());
writeFileSync(resolve(outDir, "robots.txt"), generateRobots());

// Copy optimized images and favicons to docs/
const filesToCopy = [
  "og-optimized.png",
  "og.webp",
  "favicon.svg",
  "favicon-16.png",
  "favicon-32.png",
  "favicon-48.png",
  "apple-touch-icon.png",
  "lastcall-logo.png",
  "microsoft-logo.png",
  "manifest.json",
];

for (const file of filesToCopy) {
  const src = resolve(publicDir, file);
  const dest = resolve(outDir, file);
  if (existsSync(src)) {
    copyFileSync(src, dest);
    console.log(`📄 Copied ${file} to docs/`);
  } else {
    console.warn(`⚠️  Missing: ${file}`);
  }
}

console.log("✅ sitemap.xml and robots.txt generated in docs/");
console.log("✅ Assets copied to docs/");