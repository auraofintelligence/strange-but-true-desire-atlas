import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
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
  const currentPageMarkers = (html.match(/aria-current="page"/g) || []).length;
  const expectedCurrentPageMarkers = page.primary ? 1 : 0;
  if (currentPageMarkers !== expectedCurrentPageMarkers) {
    fail(page.file, `expected ${expectedCurrentPageMarkers} current-page navigation markers, found ${currentPageMarkers}`);
  }
  if (/\b(?:C:\\|file:\/\/)/i.test(html)) fail(page.file, "contains a local path leak");
  if (html.includes("\u2014")) fail(page.file, "contains an em dash; use plainer punctuation");

  const hasLeafletCss = html.includes("assets/vendor/leaflet/leaflet.css?v=1.9.4");
  const hasLeafletJs = html.includes("assets/vendor/leaflet/leaflet.js?v=1.9.4");
  const hasWorldCoverage = html.includes("assets/world-coverage.js?");
  if (page.mapAssets && (!hasLeafletCss || !hasLeafletJs)) fail(page.file, "missing page-scoped Leaflet assets");
  if (!page.mapAssets && (hasLeafletCss || hasLeafletJs)) fail(page.file, "loads Leaflet outside the map page");
  if (page.mapAssets && !hasWorldCoverage) fail(page.file, "missing page-scoped world coverage data");
  if (!page.mapAssets && hasWorldCoverage) fail(page.file, "loads world coverage data outside the map page");

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
  "assets/world-coverage.js",
  "assets/favicon.svg",
  "assets/vendor/leaflet/leaflet.css",
  "assets/vendor/leaflet/leaflet.js",
  "assets/vendor/leaflet/LICENSE",
  "assets/vendor/leaflet/images/layers.png",
  "assets/vendor/leaflet/images/layers-2x.png",
  "assets/vendor/leaflet/images/marker-icon.png",
  "assets/vendor/leaflet/images/marker-icon-2x.png",
  "assets/vendor/leaflet/images/marker-shadow.png",
  "assets/images/hero-home.webp",
  "assets/images/hero-tribe.webp",
  "assets/images/hero-market.webp",
  "assets/images/hero-boundaries.webp",
  "assets/images/hero-storyworld.webp",
  "assets/images/social-card.jpg",
  "THIRD_PARTY_NOTICES.md",
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

const dataSource = await readFile(resolve(root, "assets/site-data.js"), "utf8");
const dataContext = { window: {} };
vm.runInNewContext(dataSource, dataContext);
const countries = dataContext.window.DESIRE_ATLAS_DATA?.countries || [];
if (countries.length !== 11) fail("assets/site-data.js", `expected 11 country records, found ${countries.length}`);
for (const country of countries) {
  const point = country.mapPoint;
  if (!point || !Number.isFinite(point.lat) || !Number.isFinite(point.lng)) {
    fail("assets/site-data.js", `${country.name || "country"} is missing a numeric map point`);
    continue;
  }
  if (point.lat < -90 || point.lat > 90 || point.lng < -180 || point.lng > 180) {
    fail("assets/site-data.js", `${country.name} has an out-of-range map point`);
  }
  if (!point.label) fail("assets/site-data.js", `${country.name} is missing a map anchor label`);
}

const countriesHtml = await readFile(resolve(root, "countries.html"), "utf8");
if (!countriesHtml.includes('id="route-map"')) fail("countries.html", "missing the interactive world map container");
if (countriesHtml.includes('id="route-globe"')) fail("countries.html", "still contains the faux globe container");

const worldSource = await readFile(resolve(root, "assets/world-coverage.js"), "utf8");
const worldContext = { window: {} };
vm.runInNewContext(worldSource, worldContext);
const places = worldContext.window.DESIRE_ATLAS_WORLD?.places || [];
const baselineCountries = places.filter((place) => place.kind === "country");
const extraPlaces = places.filter((place) => place.kind === "island-territory");
const trackedMarkets = places.filter((place) => place.kind === "tracked-market");
if (places.length !== 255) fail("assets/world-coverage.js", `expected 255 destination records, found ${places.length}`);
if (baselineCountries.length !== 195) fail("assets/world-coverage.js", `expected 195 country records, found ${baselineCountries.length}`);
if (extraPlaces.length !== 58) fail("assets/world-coverage.js", `expected 58 island/territory records, found ${extraPlaces.length}`);
if (trackedMarkets.length !== 2) fail("assets/world-coverage.js", `expected 2 separately tracked market records, found ${trackedMarkets.length}`);
if (places.filter((place) => place.homeAnchor).length !== 1 || !places.some((place) => place.name === "Minjerribah" && place.homeAnchor)) {
  fail("assets/world-coverage.js", "expected Minjerribah as the single home anchor");
}
const placeIds = new Set();
const placeNames = new Set();
const allowedKinds = new Set(["country", "island-territory", "tracked-market"]);
for (const place of places) {
  if (!Number.isFinite(place.lat) || !Number.isFinite(place.lng)) fail("assets/world-coverage.js", `${place.name || "destination"} is missing numeric coordinates`);
  if (place.lat < -90 || place.lat > 90 || place.lng < -180 || place.lng > 180) fail("assets/world-coverage.js", `${place.name || "destination"} has out-of-range coordinates`);
  if (!place.id || placeIds.has(place.id)) fail("assets/world-coverage.js", `${place.name || "destination"} has a missing or duplicate id`);
  if (!place.name || placeNames.has(place.name)) fail("assets/world-coverage.js", `${place.name || "destination"} has a missing or duplicate name`);
  if (!allowedKinds.has(place.kind)) fail("assets/world-coverage.js", `${place.name || "destination"} has an unknown layer kind`);
  if (place.guideId && !countries.some((country) => country.id === place.guideId)) fail("assets/world-coverage.js", `${place.name} points to a missing country guide`);
  placeIds.add(place.id);
  placeNames.add(place.name);
}

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site checks passed for ${pages.length} pages.`);
