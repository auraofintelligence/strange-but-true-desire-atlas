import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const countrySourceCommit = "9eff32e4eef26715aa59d99b200127d1ef150e7a";
const countrySource = `https://raw.githubusercontent.com/mledoze/countries/${countrySourceCommit}/countries.json`;
const checkedAt = new Date().toISOString().slice(0, 10);
const expectedBaselineCodes = new Set(`AFG ALB DZA AND AGO ATG ARG ARM AUS AUT AZE BHS BHR BGD BRB BLR BEL BLZ BEN BTN BOL BIH BWA BRA BRN BGR BFA BDI CPV KHM CMR CAN CAF TCD CHL CHN COL COM COG COD CRI CIV HRV CUB CYP CZE DNK DJI DMA DOM ECU EGY SLV GNQ ERI EST SWZ ETH FJI FIN FRA GAB GMB GEO DEU GHA GRC GRD GTM GIN GNB GUY HTI HND HUN ISL IND IDN IRN IRQ IRL ISR ITA JAM JPN JOR KAZ KEN KIR PRK KOR KWT KGZ LAO LVA LBN LSO LBR LBY LIE LTU LUX MDG MWI MYS MDV MLI MLT MHL MRT MUS MEX FSM MDA MCO MNG MNE MAR MOZ MMR NAM NRU NPL NLD NZL NIC NER NGA MKD NOR OMN PAK PLW PAN PNG PRY PER PHL POL PRT QAT ROU RUS RWA KNA LCA VCT WSM SMR STP SAU SEN SRB SYC SLE SGP SVK SVN SLB SOM ZAF SSD ESP LKA SDN SUR SWE CHE SYR TJK TZA THA TLS TGO TON TTO TUN TUR TKM TUV UGA UKR ARE GBR USA URY UZB VUT VEN VNM YEM ZMB ZWE VAT PSE`.split(" "));

// Representative settlement coordinates only. These are map anchors, not borders,
// political claims, legal jurisdictions or a fixed travel itinerary.
const extraPlaces = [
  ["ala", "Åland Islands", "Finland", "Europe and North Atlantic", 60.0973, 19.9348],
  ["fro", "Faroe Islands", "Denmark", "Europe and North Atlantic", 62.0079, -6.79],
  ["grl", "Greenland", "Denmark", "Europe and North Atlantic", 64.1835, -51.7216],
  ["svalbard", "Svalbard", "Norway", "Europe and North Atlantic", 78.2232, 15.6469],
  ["imn", "Isle of Man", "Crown Dependency", "Europe and North Atlantic", 54.1523, -4.4861],
  ["jey", "Jersey", "Crown Dependency", "Europe and North Atlantic", 49.1868, -2.1066],
  ["ggy", "Guernsey", "Crown Dependency", "Europe and North Atlantic", 49.4554, -2.5369],
  ["azores", "Azores", "Portugal", "Europe and North Atlantic", 37.7412, -25.6756],
  ["madeira", "Madeira", "Portugal", "Europe and North Atlantic", 32.6669, -16.9241],
  ["canary", "Canary Islands", "Spain", "Europe and North Atlantic", 28.1235, -15.4363],
  ["corsica", "Corsica", "France", "Europe and North Atlantic", 41.9192, 8.7386],
  ["aia", "Anguilla", "United Kingdom", "Caribbean", 18.2208, -63.0517],
  ["abw", "Aruba", "Kingdom of the Netherlands", "Caribbean", 12.5211, -70.037],
  ["bonaire", "Bonaire", "Netherlands", "Caribbean", 12.1443, -68.2655],
  ["vgb", "British Virgin Islands", "United Kingdom", "Caribbean", 18.4286, -64.6185],
  ["cym", "Cayman Islands", "United Kingdom", "Caribbean", 19.2869, -81.3674],
  ["cuw", "Curaçao", "Kingdom of the Netherlands", "Caribbean", 12.1224, -68.8824],
  ["glp", "Guadeloupe", "France", "Caribbean", 15.9958, -61.7292],
  ["mtq", "Martinique", "France", "Caribbean", 14.6161, -61.0588],
  ["msr", "Montserrat", "United Kingdom", "Caribbean", 16.7928, -62.2106],
  ["pri", "Puerto Rico", "United States", "Caribbean", 18.4655, -66.1057],
  ["blm", "Saint Barthélemy", "France", "Caribbean", 17.8964, -62.8522],
  ["maf", "Saint Martin", "France", "Caribbean", 18.0675, -63.0825],
  ["sxm", "Sint Maarten", "Kingdom of the Netherlands", "Caribbean", 18.026, -63.0458],
  ["tca", "Turks and Caicos Islands", "United Kingdom", "Caribbean", 21.4675, -71.1389],
  ["vir", "United States Virgin Islands", "United States", "Caribbean", 18.3419, -64.9307],
  ["saba", "Saba", "Netherlands", "Caribbean", 17.6261, -63.2496],
  ["statia", "Sint Eustatius", "Netherlands", "Caribbean", 17.4827, -62.9832],
  ["bmu", "Bermuda", "United Kingdom", "Atlantic and Eastern Pacific", 32.2948, -64.7814],
  ["flk", "Falkland Islands", "United Kingdom administered", "Atlantic and Eastern Pacific", -51.6977, -57.8517],
  ["sgs", "South Georgia and South Sandwich Islands", "United Kingdom administered", "Atlantic and Eastern Pacific", -54.2811, -36.5092],
  ["spm", "Saint Pierre and Miquelon", "France", "Atlantic and Eastern Pacific", 46.7811, -56.1764],
  ["galapagos", "Galápagos Islands", "Ecuador", "Atlantic and Eastern Pacific", -0.902, -89.611],
  ["rapa-nui", "Rapa Nui / Easter Island", "Chile", "Atlantic and Eastern Pacific", -27.1127, -109.3497],
  ["asm", "American Samoa", "United States", "Oceania", -14.2756, -170.702],
  ["cok", "Cook Islands", "Self-governing in free association with New Zealand", "Oceania", -21.2129, -159.7823],
  ["pyf", "French Polynesia", "France", "Oceania", -17.5516, -149.5585],
  ["gum", "Guam", "United States", "Oceania", 13.4757, 144.7489],
  ["hawaii", "Hawaiʻi", "United States", "Oceania", 21.3069, -157.8583],
  ["ncl", "New Caledonia", "France", "Oceania", -22.2758, 166.458],
  ["niu", "Niue", "Self-governing in free association with New Zealand", "Oceania", -19.0554, -169.9179],
  ["nfk", "Norfolk Island", "Australia", "Oceania", -29.0564, 167.9591],
  ["mnp", "Northern Mariana Islands", "United States", "Oceania", 15.1778, 145.75],
  ["pcn", "Pitcairn Islands", "United Kingdom", "Oceania", -25.066, -130.1015],
  ["tkl", "Tokelau", "New Zealand", "Oceania", -9.2002, -171.8484],
  ["wlf", "Wallis and Futuna", "France", "Oceania", -13.2825, -176.1764],
  ["minjerribah", "Minjerribah", "Australia", "Oceania", -27.4987, 153.4038, true],
  ["cxr", "Christmas Island", "Australia", "Indian Ocean and Africa", -10.4217, 105.6791],
  ["cck", "Cocos (Keeling) Islands", "Australia", "Indian Ocean and Africa", -12.1883, 96.8296],
  ["myt", "Mayotte", "France", "Indian Ocean and Africa", -12.7806, 45.2278],
  ["reu", "Réunion", "France", "Indian Ocean and Africa", -20.8789, 55.4481],
  ["zanzibar", "Zanzibar", "Tanzania", "Indian Ocean and Africa", -6.1659, 39.2026],
  ["saint-helena", "Saint Helena", "United Kingdom", "Indian Ocean and Africa", -15.9286, -5.7152],
  ["ascension", "Ascension Island", "United Kingdom", "Indian Ocean and Africa", -7.9467, -14.3559],
  ["tristan", "Tristan da Cunha", "United Kingdom", "Indian Ocean and Africa", -37.0676, -12.3116],
  ["hkg", "Hong Kong", "China Special Administrative Region", "East Asia", 22.3193, 114.1694],
  ["mac", "Macao", "China Special Administrative Region", "East Asia", 22.1987, 113.5439],
  ["okinawa", "Okinawa", "Japan", "East Asia", 26.2124, 127.6809],
  ["taiwan", "Taiwan", "Separately tracked geographic and publishing market", "East Asia", 25.033, 121.5654],
  ["kosovo", "Kosovo", "Separately tracked geographic and publishing market", "Europe", 42.6629, 21.1655]
];

const guideIds = new Map([
  ["Australia", "australia"],
  ["Canada", "canada"],
  ["France", "france"],
  ["Germany", "germany"],
  ["India", "india"],
  ["Japan", "japan"],
  ["New Zealand", "new-zealand"],
  ["United Arab Emirates", "uae"],
  ["United Kingdom", "united-kingdom"],
  ["United States", "united-states"]
]);

function topRegionForExtra(id, detailRegion) {
  if (detailRegion === "Europe and North Atlantic" || id === "kosovo") return "Europe";
  if (detailRegion === "Caribbean" || detailRegion === "Atlantic and Eastern Pacific") return "Americas";
  if (detailRegion === "East Asia") return "Asia";
  if (detailRegion === "Indian Ocean and Africa") return ["cxr", "cck"].includes(id) ? "Oceania" : "Africa";
  return detailRegion;
}

const response = await fetch(countrySource, { headers: { "User-Agent": "strange-but-true-desire-atlas world coverage refresh" } });
if (!response.ok) throw new Error(`Country source returned ${response.status}`);
const rawCountries = await response.json();

const countries = rawCountries
  .filter((item) => item.unMember || ["VAT", "PSE"].includes(item.cca3))
  .map((item) => {
    const name = item.cca3 === "VAT" ? "Holy See / Vatican City" : item.cca3 === "PSE" ? "State of Palestine" : item.name.common;
    return {
      id: `country-${item.cca3.toLowerCase()}`,
      name,
      code: item.cca3,
      kind: "country",
      relationship: ["VAT", "PSE"].includes(item.cca3) ? "UN non-member observer state" : "UN member state",
      region: item.region || "Other",
      subregion: item.subregion || "",
      lat: item.latlng[0],
      lng: item.latlng[1],
      guideId: guideIds.get(item.name.common) || null,
      homeAnchor: false
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, "en"));

if (countries.length !== 195) throw new Error(`Expected 195 state records, received ${countries.length}`);
if (extraPlaces.length !== 60) throw new Error(`Expected 60 extension records, received ${extraPlaces.length}`);
const actualBaselineCodes = new Set(countries.map((place) => place.code));
const missingCodes = [...expectedBaselineCodes].filter((code) => !actualBaselineCodes.has(code));
const unexpectedCodes = [...actualBaselineCodes].filter((code) => !expectedBaselineCodes.has(code));
if (actualBaselineCodes.size !== countries.length || missingCodes.length || unexpectedCodes.length) {
  throw new Error(`Baseline ISO-3 set changed. Missing: ${missingCodes.join(", ") || "none"}; unexpected: ${unexpectedCodes.join(", ") || "none"}.`);
}
if (!countries.some((place) => place.code === "VAT" && place.relationship === "UN non-member observer state")
  || !countries.some((place) => place.code === "PSE" && place.relationship === "UN non-member observer state")) {
  throw new Error("The Holy See and State of Palestine observer-state records are required.");
}

const extras = extraPlaces.map(([id, name, relationship, detailRegion, lat, lng, homeAnchor = false]) => ({
  id: `extra-${id}`,
  name,
  code: id.toUpperCase(),
  kind: ["taiwan", "kosovo"].includes(id) ? "tracked-market" : "island-territory",
  relationship,
  region: topRegionForExtra(id, detailRegion),
  subregion: detailRegion,
  lat,
  lng,
  guideId: null,
  homeAnchor
})).sort((a, b) => a.name.localeCompare(b.name, "en"));

if (extras.filter((place) => place.kind === "island-territory").length !== 58
  || extras.filter((place) => place.kind === "tracked-market").length !== 2) {
  throw new Error("Expected 58 island/territory records and 2 separately tracked markets.");
}

const world = {
  checkedAt,
  definitions: {
    countries: "193 UN member states plus the Holy See and State of Palestine as UN non-member observer states.",
    extras: "An editable travel-and-research layer of 58 islands, territories and archipelagos plus two separately tracked publishing markets. Inclusion does not express a sovereignty position.",
    coordinates: "Representative country centroids or settlement anchors for navigation only; not borders or legal centroids."
  },
  sources: [
    { name: "United Nations Member States", url: "https://www.un.org/en/about-us/member-states" },
    { name: "United Nations non-member states", url: "https://www.un.org/en/about-us/non-member-states" },
    { name: "UN M49 country and area list", url: "https://unstats.un.org/unsd/methodology/m49/" },
    { name: `mledoze countries dataset snapshot ${countrySourceCommit.slice(0, 12)}`, url: `https://github.com/mledoze/countries/tree/${countrySourceCommit}` }
  ],
  signalFamilies: [
    "Audience and genre adjacency",
    "Language and translation",
    "Formats and accessibility",
    "Discovery, communities and events",
    "Sales, pricing and channels",
    "Distribution, tax and imports",
    "Publishing and content law",
    "Visit notes and local observations"
  ],
  places: [...countries, ...extras]
};

const output = `// Generated by tools/refresh-world-coverage.mjs from the cited public sources.\n// Research state describes evidence coverage, never legal permission.\nwindow.DESIRE_ATLAS_WORLD = Object.freeze(${JSON.stringify(world, null, 2)});\n`;
await writeFile(resolve(repoRoot, "assets", "world-coverage.js"), output, "utf8");
console.log(`Wrote ${countries.length} states, 58 islands/territories and 2 separately tracked markets (${world.places.length} places total).`);
