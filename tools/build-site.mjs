import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages, site } from "./site-config.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function pageUrl(page) {
  return page.file === "index.html" ? site.url : `${site.url}${page.file}`;
}

function renderNavigation(currentPage) {
  const primaryPages = pages.filter((page) => page.primary);
  const primaryMarkup = primaryPages.map((page) => {
    const current = page.file === currentPage.file ? ' aria-current="page"' : "";
    return `<li><a class="nav-direct-link" href="${page.file}"${current}>${escapeHtml(page.nav)}</a></li>`;
  }).join("\n");

  const noScriptLinks = primaryPages
    .map((page) => `<li><a href="${page.file}">${escapeHtml(page.nav)}</a></li>`)
    .join("\n");

  return `
    <header class="site-header" data-site-header>
      <a class="skip-link" href="#main-content">Skip to main content</a>
      <div class="site-header-inner">
        <a class="brand" href="index.html" aria-label="The Desire Atlas home">
          <img src="assets/favicon.svg" width="42" height="42" alt="">
          <span><strong>The Desire Atlas</strong><small>Strange But True</small></span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Toggle navigation menu">
          <span class="menu-toggle-lines" aria-hidden="true"></span>
          <span>Menu</span>
        </button>
        <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
          <ul class="nav-list">${primaryMarkup}</ul>
        </nav>
        <noscript><nav class="nojs-nav" aria-label="Primary navigation without JavaScript"><ul>${noScriptLinks}</ul></nav></noscript>
      </div>
    </header>`;
}

function renderHero(page) {
  return `
    <section class="page-hero page-hero--${escapeHtml(page.align)} ${page.file === "index.html" ? "page-hero--home" : ""}">
      <img class="page-hero-image" src="assets/images/${escapeHtml(page.image)}" alt="${escapeHtml(page.imageAlt)}" style="object-position:${escapeHtml(page.imagePosition)}" ${page.file === "index.html" ? 'fetchpriority="high"' : 'loading="eager"'} decoding="async">
      <div class="page-hero-scrim" aria-hidden="true"></div>
      <div class="page-hero-inner">
        <div class="page-hero-copy">
          <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
          <h1>${escapeHtml(page.heading)}</h1>
          <p>${escapeHtml(page.lead)}</p>
          ${page.file === "index.html" ? '<div class="hero-actions"><a class="button button--primary" href="tribe.html">Find your people</a><a class="button button--glass" href="countries.html">Explore country editions</a></div>' : ""}
        </div>
      </div>
      <p class="art-credit">Original generative artwork · 2026</p>
    </section>`;
}

function renderSequence(currentPage) {
  const journey = pages.filter((page) => page.file === "index.html" || page.primary);
  const currentIndex = journey.findIndex((page) => page.file === currentPage.file);
  if (currentIndex < 0) return "";
  const previous = currentIndex > 0 ? journey[currentIndex - 1] : null;
  const next = currentIndex < journey.length - 1 ? journey[currentIndex + 1] : null;
  if (!previous && !next) return "";

  return `
    <nav class="sequence-nav" aria-label="Page sequence">
      ${previous ? `<a class="sequence-link" href="${previous.file}"><span>Previous</span><strong>← ${escapeHtml(previous.nav)}</strong></a>` : "<span></span>"}
      ${next ? `<a class="sequence-link sequence-link--next" href="${next.file}"><span>Next</span><strong>${escapeHtml(next.nav)} →</strong></a>` : ""}
    </nav>`;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="site-footer-grid">
        <div>
          <p class="footer-kicker">Strange But True</p>
          <p class="footer-statement">An author atlas for speculative near-future fiction, science-fiction romance and romantasy.</p>
        </div>
        <div>
          <p class="footer-kicker">For the explorers</p>
          <p>Find readers, communities, gatherings, publishing paths and country-edition questions, then build new futures of love, family and emerging intelligence.</p>
        </div>
      </div>
      <div class="site-footer-base">
        <p>Research checked ${escapeHtml(site.checkedAt)} · © 2026 Luke Nathan Hayes</p>
        <p><a href="consent.html">Agency Compass</a> · <a href="sources.html">Sources</a> · <a href="licence.html">Licence & Contact</a> · <a href="${site.repoUrl}" rel="noopener">GitHub</a></p>
      </div>
    </footer>
    <a class="back-to-top" href="#top" aria-label="Back to top">↑</a>`;
}

for (const page of pages) {
  const fragment = await readFile(resolve(repoRoot, "content", page.file), "utf8");
  const document = `<!doctype html>
<html lang="en-AU" id="top">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)} · The Desire Atlas</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="theme-color" content="#160d31">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(site.name)}">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${pageUrl(page)}">
  <meta property="og:image" content="${site.url}assets/images/social-card.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${pageUrl(page)}">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="assets/site.webmanifest">
  ${page.mapAssets ? '<link rel="stylesheet" href="assets/vendor/leaflet/leaflet.css?v=1.9.4">' : ""}
  <link rel="stylesheet" href="assets/styles.css?v=${site.assetVersion}">
  <script>document.documentElement.classList.add("js");</script>
</head>
<body data-page="${escapeHtml(page.file.replace(".html", ""))}">
  ${renderNavigation(page)}
  ${renderHero(page)}
  <main id="main-content" tabindex="-1">
    ${fragment}
    ${renderSequence(page)}
  </main>
  ${renderFooter()}
  <script src="assets/site-data.js?v=${site.assetVersion}"></script>
  ${page.mapAssets ? '<script src="assets/vendor/leaflet/leaflet.js?v=1.9.4" defer></script>' : ""}
  <script src="assets/app.js?v=${site.assetVersion}" defer></script>
</body>
</html>
`;

  const cleanDocument = document.replace(/[ \t]+$/gm, "");
  await writeFile(resolve(repoRoot, page.file), cleanDocument, "utf8");
  console.log(`Built ${page.file}`);
}
