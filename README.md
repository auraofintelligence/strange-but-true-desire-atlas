# Strange But True: The Desire Atlas

The Desire Atlas is a public, multi-page author atlas for speculative near-future fiction, science-fiction romance and romantasy.

It brings together:

- reader and audience insights;
- communities, forums, conferences and events;
- market signals and sales-volume planning;
- publishing and distribution channels;
- a 255-destination world coverage map: 195 states, 58 islands and territories, two separately tracked markets, and interactive country-edition guides; and
- the future ideas behind the books, including emerging intelligence, global group marriage, Love United Nations and joyful responsible abundance.

The site deliberately lets public evidence, Luke's working goals, beliefs and speculative future worlds sit beside one another. Evidence keeps a source and date; goals remain adjustable; future worlds remain Luke's own creative territories rather than factual claims.

## Public pages

The eleven-page site follows an author journey from Audience to Communities, Events, Market, Sales Channels, Countries and Future Worlds. The Agency Compass, Sources and Licence support that journey without becoming its centre.

## Work locally

1. Run `npm test` to rebuild and check every page.
2. Run `python -m http.server 4173` to preview the generated site.
3. Open `http://127.0.0.1:4173/` in a browser.

The editable page bodies live in `content/`. Shared page details and navigation live in `tools/site-config.mjs`. Generated HTML is committed at the repository root so GitHub Pages can serve it without a custom runtime.

## Public research

Market, platform, event, community and country claims link to their public sources and checked dates. The world map starts with 195 states, 58 additional islands and territories, and two separately tracked markets. Ten country guides and one EU overlay currently have deeper edition sources underway.

The Sales Channels page begins with Luke's public $5,000 monthly author-revenue goal and lets visitors test other assumptions locally in the browser.

## Artwork

Five original cinematic hero images were generated for this project. The prompt record and file map are in `docs/IMAGE_GENERATION.md`.

## Interactive map

The Countries page uses a locally bundled copy of Leaflet 1.9.4, live OpenStreetMap tiles and a generated 255-destination coverage file. Run `npm run refresh:world` only when deliberately refreshing the public country baseline. Markers are representative navigation anchors; research state never means legal permission or prohibition. Third-party credits and licence details are recorded in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Licence

This repository uses the custom [Strange But True Public Source Licence](LICENCE.md). It is public source, not open source. Commercial, corporate, institutional, government, startup, agency, client and employer use requires written permission from Luke Nathan Hayes, even when that use is not directly sold.
