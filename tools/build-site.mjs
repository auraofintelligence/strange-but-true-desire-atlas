import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { groups, pages, site } from "./site-config.mjs";

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
  const groupMarkup = groups.map((group) => {
    const links = pages
      .filter((page) => page.group === group)
      .map((page) => {
        const current = page.file === currentPage.file ? ' aria-current="page"' : "";
        return `<li><a href="${page.file}"${current}>${escapeHtml(page.nav)}</a></li>`;
      })
      .join("\n");

    const menuId = `nav-${group.toLowerCase()}`;
    return `
      <li class="nav-group">
        <button class="nav-group-toggle" type="button" aria-expanded="false" aria-controls="${menuId}">
          ${escapeHtml(group)} <span aria-hidden="true">⌄</span>
        </button>
        <ul class="nav-submenu" id="${menuId}">${links}</ul>
      </li>`;
  }).join("\n");

  const noScriptLinks = pages
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
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          <span class="menu-toggle-lines" aria-hidden="true"></span>
          <span>Menu</span>
        </button>
        <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
          <ul class="nav-list">${groupMarkup}</ul>
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
          ${page.file === "index.html" ? '<div class="hero-actions"><a class="button button--primary" href="readers.html">Enter the atlas</a><a class="button button--glass" href="ledger.html">See the truth labels</a></div>' : ""}
        </div>
      </div>
      <p class="art-credit">Original generative artwork · 2026</p>
    </section>`;
}

function renderSequence(currentIndex) {
  const previous = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;
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
          <p class="footer-statement">A research-led, non-explicit atlas for adult speculative love stories. Facts, rules, principles and fiction keep their own labels.</p>
        </div>
        <div>
          <p class="footer-kicker">Trust the boundary</p>
          <p>This is a starting point, not legal advice or distribution clearance. All fictional intimate participants are adults.</p>
        </div>
      </div>
      <div class="site-footer-base">
        <p>Research checked ${escapeHtml(site.checkedAt)} · © 2026 Luke Nathan Hayes</p>
        <p><a href="sources.html">Sources</a> · <a href="licence.html">Licence</a> · <a href="${site.contactUrl}" rel="noopener">Contact</a> · <a href="${site.repoUrl}" rel="noopener">GitHub</a></p>
      </div>
    </footer>
    <a class="back-to-top" href="#top" aria-label="Back to top">↑</a>`;
}

for (const [index, page] of pages.entries()) {
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
  <link rel="stylesheet" href="assets/styles.css?v=${site.assetVersion}">
  <script>document.documentElement.classList.add("js");</script>
</head>
<body data-page="${escapeHtml(page.file.replace(".html", ""))}">
  ${renderNavigation(page)}
  ${renderHero(page)}
  <main id="main-content" tabindex="-1">
    ${fragment}
    ${renderSequence(index)}
  </main>
  ${renderFooter()}
  <script src="assets/site-data.js?v=${site.assetVersion}"></script>
  <script src="assets/app.js?v=${site.assetVersion}" defer></script>
</body>
</html>
`;

  const cleanDocument = document.replace(/[ \t]+$/gm, "");
  await writeFile(resolve(repoRoot, page.file), cleanDocument, "utf8");
  console.log(`Built ${page.file}`);
}
