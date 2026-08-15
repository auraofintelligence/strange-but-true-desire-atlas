import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages, site } from "./site-config.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

for (const page of pages) {
  const html = await readFile(resolve(root, page.file), "utf8");
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) fail(page.file, `expected one h1, found ${h1Count}`);
  if (!html.includes('<html lang="en-AU"')) fail(page.file, "missing en-AU language");
  if (!html.includes('class="skip-link"')) fail(page.file, "missing skip link");
  if (!html.includes('id="main-content"')) fail(page.file, "missing main landmark target");
  if (!html.includes('aria-label="Primary navigation"')) fail(page.file, "missing primary navigation label");
  if (!html.includes('assets/favicon.svg')) fail(page.file, "missing favicon");
  if ((html.match(/aria-current="page"/g) || []).length !== 1) fail(page.file, "expected one current-page navigation marker");
  if (/\b(?:C:\\|file:\/\/)/i.test(html)) fail(page.file, "contains a local path leak");
  if (html.includes("\u2014")) fail(page.file, "contains an em dash; use plainer punctuation");

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/.test(reference)) continue;
    const path = reference.split(/[?#]/)[0];
    try {
      await access(resolve(root, path));
    } catch {
      fail(page.file, `missing local reference ${path}`);
    }
  }
}

for (const required of [
  "assets/styles.css",
  "assets/app.js",
  "assets/site-data.js",
  "assets/favicon.svg",
  "assets/images/hero-home.webp",
  "assets/images/hero-tribe.webp",
  "assets/images/hero-market.webp",
  "assets/images/hero-boundaries.webp",
  "assets/images/hero-storyworld.webp",
  "assets/images/social-card.jpg",
  "LICENCE.md"
]) {
  try {
    await access(resolve(root, required));
  } catch {
    fail("site", `missing required file ${required}`);
  }
}

const licence = await readFile(resolve(root, "LICENCE.md"), "utf8");
if (!licence.includes("Strange But True: The Desire Atlas")) fail("LICENCE.md", "project name is not customised");
if (!licence.includes(site.repoUrl)) fail("LICENCE.md", "project URL is not customised");

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site checks passed for ${pages.length} pages.`);
