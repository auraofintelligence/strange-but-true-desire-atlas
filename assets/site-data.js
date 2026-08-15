(function () {
  "use strict";

  const checkedAt = "2026-08-15";

  const data = {
    checkedAt,
    marketSignals: [
      {
        id: "us-trade-may-2026",
        value: "US$3.8 billion",
        label: "reported US trade revenue, January–May 2026",
        detail: "Trade revenue rose 2.3%. Paperbacks reached US$1.4 billion, up 6.6%; digital audio reached US$500.4 million, up 14.5%; ebooks were down 3.5% at US$429.7 million.",
        scope: "United States · net publisher revenue · January–May 2026 · more than 1,416 reporting publishers · released 21 July 2026",
        source: {
          name: "AAP May 2026 StatShot",
          url: "https://publishers.org/news/aap-may-2026-statshot-report-overall-publishing-industry-up-6-8-for-month-of-may-and-up-2-6-year-to-date/",
          type: "PUBLISHER PANEL"
        }
      },
      {
        id: "us-audiobook-2025",
        value: "US$2.43 billion",
        label: "US audiobook sales revenue in 2025",
        detail: "The Audio Publishers Association reported 9% revenue growth and more than 750,000 active audiobook titles, up 43%.",
        scope: "United States · audiobook association sales survey conducted by Toluna · calendar year 2025 · released 5 June 2026",
        source: {
          name: "Audio Publishers Association 2026 survey release",
          url: "https://www.audiopub.org/surveys",
          type: "INDUSTRY SURVEY"
        }
      },
      {
        id: "uk-fiction-2025",
        value: "£1.1 billion",
        label: "UK fiction publisher revenue in 2025",
        detail: "Fiction revenue rose 8%. Consumer digital audio reached £255 million, up 10%, while print remained 79% of consumer publisher revenue.",
        scope: "United Kingdom · publisher income, home and export · calendar year 2025 · released 3 June 2026",
        source: {
          name: "Publishers Association: Publishing in 2025",
          url: "https://www.publishers.org.uk/publishing-reaches-highest-ever-revenue-in-2025/",
          type: "INDUSTRY DATA"
        }
      },
      {
        id: "canada-print-2025",
        value: "47.9 million",
        label: "tracked Canadian physical-book units in 2025",
        detail: "Tracked English-language trade print generated C$1.146 billion. Fiction represented 29% of units across 883,932 ISBNs in the measured market.",
        scope: "Canada · English-language trade print point of sale · approximately 85% market coverage · calendar year 2025 · released 31 March 2026",
        source: {
          name: "BookNet Canada: The Canadian Book Market 2025 sample",
          url: "https://booknetcanada.ca/wp-content/uploads/2026/04/CBM-2025-Sample.pdf",
          type: "POINT-OF-SALE DATA"
        }
      },
      {
        id: "australia-print-2025",
        value: "+3.2%",
        label: "Australian print-book revenue in 2025",
        detail: "NielsenIQ reported 1.4% unit growth alongside 3.2% revenue growth. Fiction grew in 15 of the 19 territories included in the international release.",
        scope: "Australia · tracked print point of sale · 2025 versus 2024 · released 16 March 2026 · no public absolute total in this release",
        source: {
          name: "NielsenIQ international book markets 2025",
          url: "https://nielseniq.com/global/en/news-center/2026/international-book-markets-2025-fiction-continues-to-drive-growth-as-non-fiction-remains-under-pressure-and-price-increases-partially-slow-down/",
          type: "POINT-OF-SALE DATA"
        }
      },
      {
        id: "us-print-romance-2025",
        value: "51 million",
        label: "tracked US romance print units in the rolling year to June 2025",
        detail: "Circana reported 24% year-to-date growth at publication. Romantasy and sports romance recorded triple-digit growth, but no equally specific free 2026 US romance total was located.",
        scope: "United States · BookScan tracked print only · rolling twelve-month benchmark published 4 June 2025 · retained for genre specificity, not labelled current 2026 volume",
        source: {
          name: "Circana BookScan romance report",
          url: "https://www.circana.com/post/another-year-of-romance-with-a-dark-twist-circana-bookscan-reports",
          type: "HISTORIC GENRE BENCHMARK"
        }
      }
    ],
    marketSupplementSources: [
      {
        name: "BookNet Canada: 5 key takeaways from trendspotting",
        url: "https://booknetcanada.ca/blog/2026/04/07/5-key-takeaways-from-trendspotting/",
        type: "POINT-OF-SALE ANALYSIS",
        scope: "English-language Canadian trade print · 2025 versus 2024 · Science Fiction, Fantasy and Romance / Science Fiction BISAC category movements; percentage growth does not show category size."
      },
      {
        name: "NielsenIQ: Bestsellers and trends in the UK and Ireland 2025",
        url: "https://nielseniq.com/global/en/insights/commentary/2026/bestsellers-and-trends-uk-and-ireland-2025/",
        type: "POINT-OF-SALE DATA",
        scope: "United Kingdom · BookScan print to 27 December 2025 · Adult Fiction value and volume movements."
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
        useful: "The US 70% ebook price band expanded to US$2.99–US$12.99 on 7 July 2026. Print royalties are now 50% or 60% by list price, less printing costs. Select remains a 90-day digital-exclusive programme; print and audio can remain wide.",
        boundary: "Content policy is separate from national law. KDP requires disclosure of AI-generated text, images or translations, while AI-assisted work does not require disclosure.",
        sources: [
          {
            name: "KDP content guidelines",
            url: "https://kdp.amazon.com/en_US/help/topic/G200672390",
            type: "PLATFORM POLICY"
          },
          {
            name: "KDP Select and Kindle Unlimited",
            url: "https://kdp.amazon.com/en_US/select?language=en_US",
            type: "PLATFORM POLICY"
          },
          {
            name: "KDP ebook pricing",
            url: "https://kdp.amazon.com/en_US/help/topic/G200634560",
            type: "PLATFORM POLICY"
          },
          {
            name: "KDP print royalties",
            url: "https://kdp.amazon.com/en_US/help/topic/G201834330",
            type: "PLATFORM POLICY"
          }
        ]
      },
      {
        name: "Kobo Writing Life",
        route: "Direct retailer",
        formats: "Ebook and selected audio routes",
        model: "Wide distribution",
        useful: "Kobo reports 70% on qualifying original ebooks at or above local thresholds and 45% below them. Audiobook rates differ between subscription-token and à-la-carte purchases.",
        boundary: "Explicit covers and descriptions are prohibited. Explicit illustrated erotic content cannot be sold in Japan and should have that territory deselected. Other exclusions still apply.",
        sources: [
          {
            name: "Kobo Writing Life prohibited content",
            url: "https://kobowritinglife.zendesk.com/hc/en-us/articles/32021666379803-What-Content-is-Not-Allowed",
            type: "PLATFORM POLICY"
          },
          {
            name: "Kobo Writing Life earnings",
            url: "https://kobowritinglife.zendesk.com/hc/en-us/articles/360058976032-What-will-my-earnings-be",
            type: "PLATFORM INFORMATION"
          }
        ]
      },
      {
        name: "Google Books Partner",
        route: "Direct platform",
        formats: "Ebook",
        model: "Wide distribution",
        useful: "Google Play Books reports a 70% revenue split in more than 60 eligible countries after acceptance of its updated terms; other territories use the default or territory-specific rate.",
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
          },
          {
            name: "Google Play Books revenue split",
            url: "https://support.google.com/books/partner/answer/9331459?hl=en",
            type: "PLATFORM INFORMATION"
          }
        ]
      },
      {
        name: "Draft2Digital",
        route: "Aggregator",
        formats: "Ebook and print services",
        model: "Wide partner network",
        useful: "Can route eligible books to Apple Books, Kobo, Barnes & Noble, Tolino and other partners. Its commission is about 10% of retail price.",
        boundary: "A non-refundable US$20 one-time activation fee applies to new publishing accounts. Accounts earning under US$100 in a year face a US$12 annual maintenance fee while titles remain in distribution. Adult-content acceptance still differs by partner, with listed library routes excluding erotica.",
        sources: [
          {
            name: "Draft2Digital content guidelines",
            url: "https://draft2digital.com/content-guidelines/",
            type: "PLATFORM POLICY"
          },
          {
            name: "Draft2Digital current fees and partners",
            url: "https://draft2digital.com/faq/",
            type: "PLATFORM INFORMATION"
          }
        ]
      },
      {
        name: "IngramSpark",
        route: "Print-on-demand and wholesale network",
        formats: "Print and ebook services",
        model: "Wide print availability",
        useful: "The February 2026 price sheet describes access to more than 45,000 retailers, libraries and other outlets, with a 1.875% market-access fee on local list price.",
        boundary: "That is a vendor network claim, not guaranteed shelf placement or sales. Publisher compensation still depends on list price, wholesale discount, print cost, applicable fee and returns settings.",
        sources: [
          {
            name: "IngramSpark price sheet effective 1 February 2026",
            url: "https://myaccount.ingramspark.com/documents/IngramSparkPriceSheet.pdf",
            type: "VENDOR INFORMATION"
          }
        ]
      },
      {
        name: "Apple Books for Authors",
        route: "Direct ebook retailer; approved-partner audio",
        formats: "Ebook; audiobook through preferred partners",
        model: "Wide distribution",
        useful: "Apple states a 70% ebook royalty regardless of price, with no exclusivity or file-delivery fee, and payment within 45 days after month end.",
        boundary: "Direct ebook account, tax, banking, territory, content and asset requirements still apply; audiobook delivery uses approved partners. Public royalty terms do not predict discoverability or sales volume.",
        sources: [
          {
            name: "Apple Books royalties and reporting",
            url: "https://authors.apple.com/measure",
            type: "PLATFORM INFORMATION"
          }
        ]
      }
    ],
    channelEvidenceSources: [
      {
        name: "Canadian Book Consumer Study 2025",
        url: "https://booknetcanada.ca/research/canadian-book-consumer-study-2025/",
        type: "BUYER SURVEY",
        scope: "Online versus in-person purchasing and format mix among 976 English-speaking Canadian book buyers; not retailer market share."
      },
      {
        name: "Audio Publishers Association 2026 surveys",
        url: "https://www.audiopub.org/surveys",
        type: "INDUSTRY AND CONSUMER SURVEYS",
        scope: "United States · fielded February 2026 · overlapping access behaviours among past-year audiobook listeners within an online spoken-word listener sample. Sales and consumer studies use different samples and should not be combined into platform shares."
      }
    ],
    coverageSources: [
      {
        name: "United Nations Member States",
        url: "https://www.un.org/en/about-us/member-states",
        type: "OFFICIAL WORLD REFERENCE",
        scope: "The 193 current UN member states used in the 195-state travel and research baseline."
      },
      {
        name: "United Nations Non-member States",
        url: "https://www.un.org/en/about-us/non-member-states",
        type: "OFFICIAL WORLD REFERENCE",
        scope: "Holy See and State of Palestine, added to the 193 UN members for the 195-state baseline."
      },
      {
        name: "UN M49 country and area reference",
        url: "https://unstats.un.org/unsd/methodology/m49/",
        type: "OFFICIAL WORLD REFERENCE",
        scope: "Country and area naming/coding reference. UN statistical groupings do not express a political-status finding."
      },
      {
        name: "mledoze Countries dataset",
        url: "https://github.com/mledoze/countries",
        type: "OPEN DATABASE",
        scope: "Snapshot source for names, ISO codes, regions and representative coordinates in the generated world baseline; ODbL attribution is retained."
      }
    ],
    countries: [
      {
        id: "australia",
        name: "Australia",
        region: "Oceania",
        route: "local-review",
        routeLabel: "Official-source start",
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
        routeLabel: "Official-source start",
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
        routeLabel: "Official-source start",
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
        routeLabel: "Official-source start",
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
        routeLabel: "Official-source start",
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
        routeLabel: "EU source overlay",
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
        routeLabel: "Local specialist next",
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
        routeLabel: "Local specialist next",
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
        routeLabel: "Local specialist next",
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
        routeLabel: "Local specialist next",
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
        routeLabel: "Route research queued",
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
        name: "Creative Transformations: National Arts Participation Survey 2025",
        url: "https://creative.gov.au/research/creative-transformations-results-national-arts-participation-survey",
        type: "NATIONAL PARTICIPATION SURVEY",
        scope: "Australia · fielded July–September 2025 · main n=9,065 · weighted to the 2021 Census · released in 2026. Reading and discovery evidence, not romance demand or sales."
      },
      {
        name: "Understanding Australian Readers",
        url: "https://australiareads.org.au/research/understanding-australian-readers/",
        type: "READER SURVEY",
        scope: "Australia · fielded August 2024 · n=1,622 · published 11 February 2025. Fiction genre preferences and format preference, not sales or a measured science-fiction-romance overlap."
      },
      {
        name: "Canadian Leisure & Reading Study 2025",
        url: "https://booknetcanada.ca/research/canadian-leisure-reading-study-2025/",
        type: "READER SURVEY",
        scope: "English-speaking Canada · fielded January 2026 about 2025 · n=1,278 including 1,005 readers/listeners · approximate ±3 points. Online panel; format and genre behaviours can overlap."
      },
      {
        name: "Canadian Book Consumer Study 2025",
        url: "https://booknetcanada.ca/research/canadian-book-consumer-study-2025/",
        type: "BUYER SURVEY",
        scope: "English-speaking Canada · fielded July and December 2025 · n=1,979 including 976 buyers · unweighted online panel · approximate ±3 points overall. Buyer evidence across all genres."
      },
      {
        name: "Audiobook Reading in Australia",
        url: "https://openresearch-repository.anu.edu.au/entities/publication/3648f712-2b52-4f65-b376-3ab718304a10",
        type: "AUDIOBOOK LISTENER SURVEY",
        scope: "Australia · fielded October 2025 · n=503 past-year audiobook listeners · released June 2026. Listener behaviour, not national prevalence or romance-specific demand."
      },
      {
        name: "Australian Romance Readers Survey 2025",
        url: "https://australianromancereaders.wordpress.com/2025/11/23/australian-romance-readers-survey-2025-results/",
        type: "COMMUNITY SURVEY",
        scope: "Australia · fielded 15 August–30 September 2025 · n=216 self-selected association respondents. Community pulse, not a population estimate."
      },
      {
        name: "r/FantasyRomance census 2026",
        url: "https://www.reddit.com/r/fantasyromance/comments/1sg0hxf/rfantasyromance_census_results_2026_edition/",
        type: "COMMUNITY CENSUS",
        scope: "Online fantasy-romance forum · n=1,021 self-selected respondents · public field dates not stated. Useful for the participating community only."
      }
    ]
  };

  const sourceMap = new Map();

  function collect(source, category, scope) {
    if (!source || !source.url) return;
    const key = `${category}\u001f${source.url}`;
    const preciseScope = scope || "See the linked record for its precise claim and limits.";
    const existing = sourceMap.get(key);
    if (existing) {
      if (!existing.scopes.includes(preciseScope)) existing.scopes.push(preciseScope);
      existing.scope = existing.scopes.join(" • ");
      return;
    }
    sourceMap.set(key, {
      name: source.name,
      url: source.url,
      type: source.type,
      category,
      scope: preciseScope,
      scopes: [preciseScope],
      checkedAt
    });
  }

  for (const item of data.marketSignals) collect(item.source, "Market", item.scope);
  for (const source of data.marketSupplementSources) collect(source, "Market", source.scope);
  for (const item of data.communities) {
    collect(item.source, "Community", item.note);
    collect(item.secondarySource, "Community", item.etiquette);
  }
  for (const item of data.events) collect(item.source, "Event", `${item.place} · ${item.start} to ${item.end}`);
  for (const item of data.channels) for (const source of item.sources) collect(source, "Platform", item.boundary);
  for (const source of data.channelEvidenceSources) collect(source, "Platform", source.scope);
  for (const source of data.coverageSources) collect(source, "World coverage", source.scope);
  for (const item of data.countries) for (const source of item.sources) collect(source, "Law and regulation", `${item.name}: ${item.routeLabel}. ${item.action}`);
  for (const source of data.audienceSources) collect(source, "Audience", source.scope);

  data.sources = Array.from(sourceMap.values()).sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  window.DESIRE_ATLAS_DATA = Object.freeze(data);
})();
