(function () {
  "use strict";

  const checkedAt = "2026-08-15";

  const data = {
    checkedAt,
    marketSignals: [
      {
        id: "us-print-romance-2025",
        value: "51 million",
        label: "tracked US romance print units",
        detail: "Circana reported 51 million units in the preceding twelve months and 24% year-to-date growth versus the same 2024 period.",
        scope: "United States · tracked print only · report published 4 June 2025",
        source: {
          name: "Circana BookScan romance report",
          url: "https://www.circana.com/post/another-year-of-romance-with-a-dark-twist-circana-bookscan-reports",
          type: "INDUSTRY DATA"
        }
      },
      {
        id: "uk-audio-2024",
        value: "£268 million",
        label: "UK audiobook revenue in 2024",
        detail: "The Publishers Association reported audiobook revenue 31% above 2023. Fantasy and romance were named among the fiction growth drivers.",
        scope: "United Kingdom · publisher revenue · calendar year 2024",
        source: {
          name: "Publishers Association 2024 results",
          url: "https://www.publishers.org.uk/audiobooks-and-fiction-drove-growth-in-2024/",
          type: "INDUSTRY DATA"
        }
      },
      {
        id: "uk-fiction-2024",
        value: "> £1 billion",
        label: "UK fiction revenue in 2024",
        detail: "Fiction revenue rose 18% and passed £1 billion for the first time in the Publishers Association release.",
        scope: "United Kingdom · publisher revenue · calendar year 2024",
        source: {
          name: "Publishers Association 2024 results",
          url: "https://www.publishers.org.uk/audiobooks-and-fiction-drove-growth-in-2024/",
          type: "INDUSTRY DATA"
        }
      },
      {
        id: "canada-romance-2024",
        value: "+404%",
        label: "Canadian-contributor romance print units",
        detail: "BookNet reported this rise in tracked English-language trade print unit sales from 2020 to 2024 for a narrower dataset of titles with Canadian contributors. It is not the whole Canadian romance market.",
        scope: "Canada · SalesData tracked print units · selected contributor dataset · 2020 to 2024",
        source: {
          name: "BookNet Canada romance and erotica analysis",
          url: "https://booknetcanada.ca/blog/2025/02/14/exploring-canadian-romance-and-erotica-titles/",
          type: "INDUSTRY DATA"
        }
      },
      {
        id: "uk-publishing-2025",
        value: "+8%",
        label: "UK fiction revenue in 2025",
        detail: "The Publishers Association's 2026 report recorded 8% fiction growth, 10% audiobook growth and exports at 64% of total publishing revenue.",
        scope: "United Kingdom · publishing revenue · calendar year 2025",
        source: {
          name: "Publishing in 2025",
          url: "https://www.publishers.org.uk/publications/publishing-in-2025/",
          type: "INDUSTRY DATA"
        }
      }
    ],
    communities: [
      {
        name: "Romance Writers Australia",
        region: "Australia",
        audience: "Writers",
        format: "Online and regional",
        access: "Membership organisation",
        note: "Professional development, community and a stated diversity and inclusion commitment.",
        etiquette: "Join to learn and contribute. Use member spaces according to their promotion rules.",
        source: {
          name: "Romance Writers Australia",
          url: "https://romanceaustralia.com/pages/our-story",
          type: "OFFICIAL COMMUNITY"
        }
      },
      {
        name: "Romance Writers of New Zealand",
        region: "New Zealand",
        audience: "Writers",
        format: "Member network and events",
        access: "Membership organisation",
        note: "Romance-writing community with an annual conference and craft programme.",
        etiquette: "Check current membership, programme and community expectations before joining.",
        source: {
          name: "Romance Writers of New Zealand",
          url: "https://www.romancewriters.co.nz/",
          type: "OFFICIAL COMMUNITY"
        }
      },
      {
        name: "RWA specialist chapters",
        region: "United States / online",
        audience: "Writers",
        format: "Online and regional chapters",
        access: "Chapter terms vary",
        note: "The official directory includes Fantasy, Futuristic and Paranormal and Rainbow Romance Writers routes.",
        etiquette: "Check chapter eligibility, fees and conduct rules. Organisational status can change.",
        source: {
          name: "Romance Writers of America chapter directory",
          url: "https://www.rwa.org/chapter",
          type: "OFFICIAL COMMUNITY"
        }
      },
      {
        name: "SFWA community",
        region: "International / US-based",
        audience: "Speculative-fiction professionals",
        format: "Forum, Discord, affinity spaces and events",
        access: "Membership eligibility applies",
        note: "Professional science-fiction and fantasy community with published moderation and privacy expectations.",
        etiquette: "Read membership eligibility and moderation policy before entering member spaces.",
        source: {
          name: "SFWA community",
          url: "https://sfwa.org/community/",
          type: "OFFICIAL COMMUNITY"
        },
        secondarySource: {
          name: "SFWA moderation policy",
          url: "https://sfwa.org/moderation-policy/",
          type: "OFFICIAL POLICY"
        }
      },
      {
        name: "Romantic Novelists' Association",
        region: "United Kingdom",
        audience: "Writers and industry",
        format: "Member network and events",
        access: "Membership routes vary",
        note: "UK professional community for romantic fiction, including an annual conference.",
        etiquette: "Check the current membership route and event code before participating.",
        source: {
          name: "Romantic Novelists' Association",
          url: "https://romanticnovelistsassociation.org/",
          type: "OFFICIAL COMMUNITY"
        }
      },
      {
        name: "r/RomanceBooks",
        region: "International / Reddit",
        audience: "Readers",
        format: "Public moderated forum",
        access: "Free Reddit account for participation",
        note: "A large reader discussion community. It is not a general author-research or promotion channel.",
        etiquette: "No self-promotion outside allowed threads. Read current rules before posting or requesting research help.",
        source: {
          name: "r/RomanceBooks rules and norms",
          url: "https://www.reddit.com/r/RomanceBooks/comments/j6w5wp/",
          type: "COMMUNITY RULES"
        }
      },
      {
        name: "SFF Chronicles",
        region: "International / UK-based",
        audience: "Readers and writers",
        format: "Public web forum",
        access: "Account required for posting",
        note: "Long-running discussion boards for science fiction, fantasy, books, writing and publishing.",
        etiquette: "Observe forum-specific rules and contribute to existing conversations before sharing work.",
        source: {
          name: "SFF Chronicles",
          url: "https://www.sffchronicles.com/",
          type: "INDEPENDENT COMMUNITY"
        }
      },
      {
        name: "romance.io reader network",
        region: "International",
        audience: "Readers",
        format: "Public discovery network",
        access: "Free browsing; account features vary",
        note: "Reader profiles and romance discovery. The service discloses affiliate links to retailers.",
        etiquette: "Treat readers as peers, not leads. Check current community and commercial-disclosure terms.",
        source: {
          name: "romance.io community network",
          url: "https://www.romance.io/community/network",
          type: "INDEPENDENT COMMUNITY"
        }
      }
    ],
    events: [
      {
        name: "RWNZ Conference 2026",
        place: "Auckland, New Zealand",
        start: "2026-08-14",
        end: "2026-08-16",
        audience: "Romance writers",
        format: "In person",
        note: "Programme includes romantasy, discoverability, AI, translation and author business.",
        source: {
          name: "Official registration and programme",
          url: "https://www.romancewriters.co.nz/event/2026-rwnz-conference-registration/",
          type: "OFFICIAL EVENT"
        }
      },
      {
        name: "Romance Writers Australia Conference",
        place: "Darwin, Australia",
        start: "2026-08-21",
        end: "2026-08-23",
        audience: "Romance writers and industry",
        format: "In person",
        note: "National romance-writing conference. Confirm ticket availability with the organiser.",
        source: {
          name: "Official event site",
          url: "https://willorganise.eventsair.com/2026-rwa/",
          type: "OFFICIAL EVENT"
        }
      },
      {
        name: "LAcon V, the 84th Worldcon",
        place: "Anaheim, United States",
        start: "2026-08-27",
        end: "2026-08-31",
        audience: "Science-fiction and fantasy community",
        format: "In person",
        note: "Global fan and professional gathering for speculative fiction.",
        source: {
          name: "Worldcon",
          url: "https://www.worldcon.org/",
          type: "OFFICIAL EVENT"
        }
      },
      {
        name: "RARE Florence 2026",
        place: "Florence, Italy",
        start: "2026-10-03",
        end: "2026-10-03",
        audience: "Romance readers and authors",
        format: "In person",
        note: "Private organiser's reader and author event. Check entry, accessibility and conduct details directly.",
        source: {
          name: "RARE event directory",
          url: "https://rarettes.wordpress.com/",
          type: "ORGANISER EVENT"
        }
      },
      {
        name: "Frankfurt Book Fair 2026",
        place: "Frankfurt, Germany",
        start: "2026-10-07",
        end: "2026-10-11",
        audience: "Rights, trade and public readers",
        format: "In person",
        note: "Major international rights and publishing gathering with fantasy and romantasy programming.",
        source: {
          name: "Frankfurt Book Fair announcement",
          url: "https://www.buchmesse.de/en/press/press-releases/2026-06-24-frankfurter-buchmesse-tickets-are-sale",
          type: "OFFICIAL EVENT"
        }
      },
      {
        name: "Can*Con 2026",
        place: "Ottawa, Canada",
        start: "2026-10-16",
        end: "2026-10-18",
        audience: "Science-fiction, fantasy and horror writers",
        format: "In person",
        note: "Craft and industry gathering for speculative-fiction writers and readers.",
        source: {
          name: "Can*Con",
          url: "https://www.can-con.org/",
          type: "OFFICIAL EVENT"
        }
      },
      {
        name: "RARE London 2027",
        place: "London, United Kingdom",
        start: "2027-07-17",
        end: "2027-07-17",
        audience: "Romance readers and authors",
        format: "In person",
        note: "Forward watchlist entry from the private organiser. Recheck before booking travel.",
        source: {
          name: "RARE event directory",
          url: "https://rarettes.wordpress.com/",
          type: "ORGANISER EVENT"
        }
      },
      {
        name: "Montréal Worldcon 2027",
        place: "Montréal, Canada",
        start: "2027-09-02",
        end: "2027-09-06",
        audience: "Science-fiction and fantasy community",
        format: "In person",
        note: "Forward global speculative-fiction gathering. Recheck programme and access details when released.",
        source: {
          name: "Worldcon",
          url: "https://www.worldcon.org/",
          type: "OFFICIAL EVENT"
        }
      }
    ],
    channels: [
      {
        name: "Amazon KDP",
        route: "Direct retailer and print-on-demand",
        formats: "Ebook and print",
        model: "Wide, or ebook-exclusive through KDP Select",
        useful: "35% and 70% ebook royalty options have price and territory conditions. Print can remain wide even when an ebook is in Select.",
        boundary: "Content policy is separate from national law. KDP requires disclosure of AI-generated text, images or translations.",
        sources: [
          {
            name: "KDP content guidelines",
            url: "https://kdp.amazon.com/en_US/help/topic/G200672390",
            type: "PLATFORM POLICY"
          },
          {
            name: "KDP Select and Kindle Unlimited",
            url: "https://kdp.amazon.com/en_US/help/topic/G201537300",
            type: "PLATFORM POLICY"
          },
          {
            name: "KDP ebook pricing",
            url: "https://kdp.amazon.com/en_US/help/topic/G200634500",
            type: "PLATFORM POLICY"
          }
        ]
      },
      {
        name: "Kobo Writing Life",
        route: "Direct retailer",
        formats: "Ebook and selected audio routes",
        model: "Wide distribution",
        useful: "Correctly categorised adult erotic writing can be accepted within the current exclusions.",
        boundary: "Explicit covers and descriptions are prohibited. Exploitation, force, incest, bestiality and child material are prohibited. Japan has an extra illustrated-content setting.",
        sources: [
          {
            name: "Kobo Writing Life prohibited content",
            url: "https://kobowritinglife.zendesk.com/hc/en-us/articles/32021666379803-What-Content-is-Not-Allowed",
            type: "PLATFORM POLICY"
          }
        ]
      },
      {
        name: "Google Books Partner",
        route: "Direct platform",
        formats: "Ebook",
        model: "Wide distribution",
        useful: "Artistically meaningful adult content may be considered when correctly marked as mature.",
        boundary: "Pornography, explicit metadata and child sexual abuse material are prohibited. Mature-content settings do not replace local law.",
        sources: [
          {
            name: "Google Books publisher content policy",
            url: "https://support.google.com/books/partner/answer/1067634?hl=en",
            type: "PLATFORM POLICY"
          },
          {
            name: "Google Books mature-content setting",
            url: "https://support.google.com/books/partner/answer/4492057?hl=en",
            type: "PLATFORM POLICY"
          }
        ]
      },
      {
        name: "Draft2Digital",
        route: "Aggregator",
        formats: "Ebook and print services",
        model: "Wide partner network",
        useful: "Can route eligible books to Kobo, Apple Books, Tolino, Everand and other partners.",
        boundary: "Adult content needs certification. Partner acceptance differs, and several library routes exclude erotica.",
        sources: [
          {
            name: "Draft2Digital content guidelines",
            url: "https://draft2digital.com/content-guidelines/",
            type: "PLATFORM POLICY"
          },
          {
            name: "Draft2Digital partner network",
            url: "https://draft2digital.com/partners/",
            type: "PLATFORM INFORMATION"
          }
        ]
      },
      {
        name: "IngramSpark",
        route: "Print-on-demand and wholesale network",
        formats: "Print and ebook services",
        model: "Wide print availability",
        useful: "The vendor describes access to a network of more than 40,000 retailers, libraries and schools.",
        boundary: "That is a vendor network claim, not guaranteed shelf placement or sales. Review content, returns, print costs and territory settings.",
        sources: [
          {
            name: "IngramSpark self-publishing guide",
            url: "https://www.ingramspark.com/hubfs/downloads/How-to-Self-Publish-Guide.pdf",
            type: "VENDOR INFORMATION"
          }
        ]
      }
    ],
    countries: [
      {
        id: "australia",
        name: "Australia",
        region: "Oceania",
        route: "local-review",
        routeLabel: "Local edition review",
        mapPoint: { lat: -35.2809, lng: 149.13, label: "Canberra" },
        summary: "Most ordinary books are not pre-classified. A publication that may be refused classification, offend a reasonable adult or be unsuitable for minors can become submittable.",
        action: "Check Commonwealth classification and import rules plus the state or territory where stock will be supplied.",
        sources: [
          {
            name: "Australian Classification: what is classified",
            url: "https://www.classification.gov.au/classification-ratings/what-we-classify",
            type: "REGULATOR GUIDANCE"
          },
          {
            name: "Australian Border Force prohibited-goods categories",
            url: "https://www.abf.gov.au/importing-exporting-and-manufacturing/prohibited-goods/categories",
            type: "REGULATOR GUIDANCE"
          }
        ]
      },
      {
        id: "united-states",
        name: "United States",
        region: "North America",
        route: "local-review",
        routeLabel: "Local edition review",
        mapPoint: { lat: 38.9072, lng: -77.0369, label: "Washington, DC" },
        summary: "Obscenity law can apply to written material. The whole work, community standards, defined sexual conduct and serious literary, artistic, political or scientific value can be relevant.",
        action: "Review federal, state and local exposure, plus each retailer's separate policy.",
        sources: [
          {
            name: "US Department of Justice obscenity overview",
            url: "https://www.justice.gov/criminal/criminal-ceos/obscenity",
            type: "GOVERNMENT GUIDANCE"
          }
        ]
      },
      {
        id: "united-kingdom",
        name: "United Kingdom",
        region: "Europe",
        route: "local-review",
        routeLabel: "Local edition review",
        mapPoint: { lat: 51.5074, lng: -0.1278, label: "London" },
        summary: "In England and Wales, the Obscene Publications Act can cover written and electronic articles. Adult consent and effective exclusion of minors reduce risk but are not a safe harbour.",
        action: "Obtain a separate Scotland or Northern Ireland review rather than applying England and Wales guidance across the UK.",
        sources: [
          {
            name: "Crown Prosecution Service obscene-publications guidance",
            url: "https://www.cps.gov.uk/prosecution-guidance/obscene-publications",
            type: "PROSECUTOR GUIDANCE"
          }
        ]
      },
      {
        id: "canada",
        name: "Canada",
        region: "North America",
        route: "local-review",
        routeLabel: "Local edition review",
        mapPoint: { lat: 45.4215, lng: -75.6972, label: "Ottawa" },
        summary: "Criminal Code section 163 addresses obscene written matter where the dominant characteristic is undue exploitation of sex, including combinations with crime, horror, cruelty or violence.",
        action: "Recheck criminal law, customs treatment and provincial retail requirements before importing print stock.",
        sources: [
          {
            name: "Canadian Criminal Code section 163",
            url: "https://laws-lois.justice.gc.ca/eng/acts/C-46/section-163.html",
            type: "LAW"
          },
          {
            name: "CBSA Memorandum D9-1-1",
            url: "https://www.cbsa-asfc.gc.ca/publications/dm-md/d9/d9-1-1-eng.html",
            type: "CUSTOMS GUIDANCE"
          }
        ]
      },
      {
        id: "new-zealand",
        name: "New Zealand",
        region: "Oceania",
        route: "local-review",
        routeLabel: "Local edition review",
        mapPoint: { lat: -41.2866, lng: 174.7756, label: "Wellington" },
        summary: "Books are not generally classified in advance, but existing restrictions bind sellers and objectionable material cannot be possessed, supplied or imported.",
        action: "A publisher can submit a concerning title for classification before distribution.",
        sources: [
          {
            name: "New Zealand Classification Office: books",
            url: "https://www.classificationoffice.govt.nz/classification-info/what-we-classify/books/",
            type: "REGULATOR GUIDANCE"
          },
          {
            name: "Supplying restricted books",
            url: "https://www.classificationoffice.govt.nz/resources/items/supplying-restricted-books-and-magazines/",
            type: "REGULATOR GUIDANCE"
          }
        ]
      },
      {
        id: "european-union",
        name: "European Union overlay",
        region: "Europe",
        route: "local-review",
        routeLabel: "National edition reviews",
        mapPoint: { lat: 50.8503, lng: 4.3517, label: "Brussels reference point" },
        summary: "EU accessibility requirements can apply to ebooks, reading software and ecommerce services from 28 June 2025. The EU is not one content, price or tax clearance zone.",
        action: "Build accessible ebook files and interfaces, then review the content and trading rules of each target country.",
        sources: [
          {
            name: "European Accessibility Act directive",
            url: "https://eur-lex.europa.eu/legal-content/ENG/TXT/?uri=CELEX%3A32019L0882",
            type: "LAW"
          }
        ]
      },
      {
        id: "germany",
        name: "Germany",
        region: "Europe",
        route: "high-caution",
        routeLabel: "Specialist local review",
        mapPoint: { lat: 52.52, lng: 13.405, label: "Berlin" },
        summary: "Criminal Code section 184 regulates access by minors and particular distribution, import and advertising of pornographic content. Related offences cover violent, animal, child and youth material.",
        action: "Commission a current German review covering youth-media protection and fixed book pricing.",
        sources: [
          {
            name: "German Criminal Code section 184",
            url: "https://www.gesetze-im-internet.de/stgb/__184.html",
            type: "LAW"
          }
        ]
      },
      {
        id: "france",
        name: "France",
        region: "Europe",
        route: "high-caution",
        routeLabel: "Specialist local review",
        mapPoint: { lat: 48.8566, lng: 2.3522, label: "Paris" },
        summary: "French law restricts pornographic, violent or seriously dignity-harming messages where minors may perceive them. A simple over-18 declaration may not be sufficient protection.",
        action: "Review minor access, youth-publication law and fixed-price requirements before activation.",
        sources: [
          {
            name: "French Penal Code article 227-24",
            url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044394218/2026-04-27",
            type: "LAW"
          }
        ]
      },
      {
        id: "india",
        name: "India",
        region: "Asia",
        route: "high-caution",
        routeLabel: "Specialist local review",
        mapPoint: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
        summary: "Bharatiya Nyaya Sanhita section 294 addresses sale, distribution, public exhibition, production, import, export and advertising of material meeting its obscenity test.",
        action: "Ask a local specialist how the literature, art and learning exceptions apply to the exact edition.",
        sources: [
          {
            name: "Bharatiya Nyaya Sanhita section 294",
            url: "https://www.indiacode.nic.in/show-data?actid=AC_CEN_5_23_00048_2023-45_1719292564123&orderno=294",
            type: "LAW"
          }
        ]
      },
      {
        id: "japan",
        name: "Japan",
        region: "Asia",
        route: "high-caution",
        routeLabel: "Specialist local review",
        mapPoint: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
        summary: "The government English translation of Penal Code article 175 addresses distributing, publicly displaying or transmitting obscene documents, drawings and electronic records.",
        action: "Check the current authoritative Japanese text and local practice. Retailers may add their own illustrated-content restrictions.",
        sources: [
          {
            name: "Government English translation of the 2017 Penal Code text",
            url: "https://www.japaneselawtranslation.go.jp/en/laws/view/3581/en",
            type: "HISTORIC LAW TRANSLATION"
          }
        ]
      },
      {
        id: "uae",
        name: "United Arab Emirates",
        region: "Middle East",
        route: "not-activated",
        routeLabel: "Route not yet mapped",
        mapPoint: { lat: 24.4539, lng: 54.3773, label: "Abu Dhabi" },
        summary: "Federal media law establishes licensing, permit, content-standard and age-rating controls for print and digital publishing.",
        action: "Map a licensed local distribution route and specialist review for the edition. Other Gulf states remain TO BE CONFIRMED.",
        sources: [
          {
            name: "UAE Federal Decree-Law No. 55 of 2023",
            url: "https://uaelegislation.gov.ae/en/legislations/2145",
            type: "LAW"
          },
          {
            name: "UAE Media Council",
            url: "https://uaemc.gov.ae/en/about-us/",
            type: "REGULATOR"
          }
        ]
      }
    ],
    audienceSources: [
      {
        name: "2017 US romance-reader survey",
        url: "https://www.rwa.org/about-romance-fiction",
        type: "HISTORIC INDUSTRY SURVEY",
        scope: "Historic 82% women / 18% men sample, not a current or global split."
      },
      {
        name: "Canadian Book Consumer 2024",
        url: "https://www.booknetcanada.ca/canadian-book-consumer-2024",
        type: "INDUSTRY SURVEY",
        scope: "English-speaking Canadian book buyers across all genres, not romance-only."
      },
    ]
  };

  const sourceMap = new Map();

  function collect(source, category, scope) {
    if (!source || !source.url || sourceMap.has(source.url)) return;
    sourceMap.set(source.url, {
      name: source.name,
      url: source.url,
      type: source.type,
      category,
      scope: scope || "See the linked record for its precise claim and limits.",
      checkedAt
    });
  }

  for (const item of data.marketSignals) collect(item.source, "Market", item.scope);
  for (const item of data.communities) {
    collect(item.source, "Community", item.note);
    collect(item.secondarySource, "Community", item.etiquette);
  }
  for (const item of data.events) collect(item.source, "Event", `${item.place} · ${item.start} to ${item.end}`);
  for (const item of data.channels) for (const source of item.sources) collect(source, "Platform", item.boundary);
  for (const item of data.countries) for (const source of item.sources) collect(source, "Law and regulation", `${item.name}: ${item.routeLabel}. ${item.action}`);
  for (const source of data.audienceSources) collect(source, "Audience", source.scope);

  data.sources = Array.from(sourceMap.values()).sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  window.DESIRE_ATLAS_DATA = Object.freeze(data);
})();
