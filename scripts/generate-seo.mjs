import { writeFileSync } from "fs";
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

writeFileSync(resolve(outDir, "sitemap.xml"), generateSitemap());
writeFileSync(resolve(outDir, "robots.txt"), generateRobots());

console.log("✅ sitemap.xml and robots.txt generated in docs/");