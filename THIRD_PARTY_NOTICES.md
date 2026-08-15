# Third-party notices

## Leaflet 1.9.4

The Country Editions page uses Leaflet 1.9.4, an open-source JavaScript library for interactive maps.

- Project: https://leafletjs.com/
- Reviewed release: https://leafletjs.com/download.html
- Licence: BSD 2-Clause, retained at `assets/vendor/leaflet/LICENSE`
- Vendored stylesheet SHA-256: `p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=`
- Vendored script SHA-256: `20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=`

Leaflet remains under its own licence and is not relicensed under the Strange But True Public Source Licence.

## OpenStreetMap

The interactive map loads standard raster map tiles from OpenStreetMap at viewing time. The tiles are not copied into this repository.

- Map data and copyright: https://www.openstreetmap.org/copyright
- Tile usage policy: https://operations.osmfoundation.org/policies/tiles/
- Map issue reporting: https://www.openstreetmap.org/fixthemap

Visible attribution is retained on the map. OpenStreetMap data and tiles remain subject to their own licences, policies and terms.

## World-country reference data

The generated `assets/world-coverage.js` file uses country names, ISO codes, regions and representative coordinates selected from a pinned mledoze Countries dataset snapshot. The 195-state definition is checked against an exact ISO-3 baseline derived from current United Nations member and non-member observer lists. Luke's additional layer of 58 islands and territories plus two separately tracked markets is maintained in `tools/refresh-world-coverage.mjs`.

- Dataset snapshot: https://github.com/mledoze/countries/tree/9eff32e4eef26715aa59d99b200127d1ef150e7a
- Database licence: ODC Open Database License 1.0, https://opendatacommons.org/licenses/odbl/1-0/
- United Nations member states: https://www.un.org/en/about-us/member-states
- United Nations non-member states: https://www.un.org/en/about-us/non-member-states
- UN M49 reference: https://unstats.un.org/unsd/methodology/m49/

The machine-readable derivative is publicly available in this repository at `assets/world-coverage.js`. The database-derived fields remain available under the ODbL and are not relicensed under the Strange But True Public Source Licence. The site copy, research commentary and Luke-maintained destination layer retain their stated project licensing.
