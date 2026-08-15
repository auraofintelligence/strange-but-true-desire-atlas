(function () {
  "use strict";

  const data = window.DESIRE_ATLAS_DATA;
  const world = window.DESIRE_ATLAS_WORLD;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const routeMapState = {
    map: null,
    markers: new Map(),
    coverageMarkers: new Map(),
    europeCluster: null,
    resetBounds: null,
    activeFilter: "all",
    activeCoverageFilter: "all",
    coverageVisibleIds: new Set(),
    movementButton: null,
    movementEnabled: false
  };
  const europeanClusterIds = new Set(["united-kingdom", "european-union", "germany", "france"]);

  function make(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function addExternalLink(parent, label, url, className) {
    const link = make("a", className, label);
    link.href = url;
    link.rel = "external noopener";
    parent.append(link);
    return link;
  }

  function setEmpty(container, message) {
    container.replaceChildren(make("p", "empty-state", message));
  }

  function announceResults(id, count, label) {
    const status = document.getElementById(id);
    if (status) status.textContent = `${count} ${label} shown.`;
  }

  function setupNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    const groupButtons = Array.from(document.querySelectorAll(".nav-group-toggle"));

    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const open = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("is-open", !open);
      });
    }

    for (const button of groupButtons) {
      button.addEventListener("click", () => {
        const open = button.getAttribute("aria-expanded") === "true";
        for (const other of groupButtons) other.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-expanded", String(!open));
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      for (const button of groupButtons) button.setAttribute("aria-expanded", "false");
      if (menuButton && nav) {
        menuButton.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        if (menuButton.offsetParent !== null) menuButton.focus();
      }
    });
  }

  function setupBackToTop() {
    const control = document.querySelector(".back-to-top");
    if (!control) return;
    const update = () => control.classList.toggle("is-visible", window.scrollY > 700);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function renderMarketSignals() {
    const container = document.querySelector("#market-signals");
    if (!container || !data) return;
    const fragment = document.createDocumentFragment();

    for (const item of data.marketSignals) {
      const card = make("article", "metric-card");
      card.append(make("span", "source-type", item.source.type));
      card.append(make("p", "metric-value", item.value));
      card.append(make("p", "metric-label", item.label));
      card.append(make("p", "", item.detail));
      card.append(make("p", "metric-scope", item.scope));
      addExternalLink(card, `${item.source.name} ↗`, item.source.url, "source-link");
      fragment.append(card);
    }

    container.replaceChildren(fragment);
  }

  function setupFilterButtons(selector, onChange) {
    const buttons = Array.from(document.querySelectorAll(selector));
    if (!buttons.length) return;
    for (const button of buttons) {
      button.addEventListener("click", () => {
        for (const other of buttons) other.setAttribute("aria-pressed", "false");
        button.setAttribute("aria-pressed", "true");
        onChange(button.dataset.filter || "all");
      });
    }
  }

  function renderCommunities(filter = "all") {
    const container = document.querySelector("#community-grid");
    if (!container || !data) return;
    const normalised = filter.toLowerCase();
    const matches = data.communities.filter((item) => {
      if (normalised === "all") return true;
      return `${item.audience} ${item.format} ${item.region}`.toLowerCase().includes(normalised);
    });
    announceResults("community-status", matches.length, matches.length === 1 ? "community" : "communities");
    if (!matches.length) return setEmpty(container, "No community records match this view yet.");

    const fragment = document.createDocumentFragment();
    for (const item of matches) {
      const card = make("article", "community-card");
      const top = make("div", "card-topline");
      top.append(make("span", "source-type", item.source.type));
      top.append(make("span", "last-checked", `Checked ${data.checkedAt}`));
      card.append(top);
      card.append(make("h3", "", item.name));
      const facts = make("div", "card-facts");
      for (const fact of [item.region, item.audience, item.format, item.access]) facts.append(make("span", "", fact));
      card.append(facts);
      card.append(make("p", "", item.note));
      card.append(make("p", "etiquette", `Arrival note: ${item.etiquette}`));
      addExternalLink(card, `${item.source.name} ↗`, item.source.url, "source-link");
      fragment.append(card);
    }
    container.replaceChildren(fragment);
  }

  function todayIso() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
  }

  function eventStatus(item) {
    const today = todayIso();
    if (today < item.start) return "upcoming";
    if (today > item.end) return "past";
    return "now";
  }

  function formatDateRange(start, end) {
    const formatter = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
    const startDate = new Date(`${start}T00:00:00Z`);
    const endDate = new Date(`${end}T00:00:00Z`);
    if (start === end) return formatter.format(startDate);
    return `${formatter.format(startDate)} to ${formatter.format(endDate)}`;
  }

  function renderEvents(filter = "all") {
    const container = document.querySelector("#event-grid");
    if (!container || !data) return;
    const matches = data.events.filter((item) => filter === "all" || eventStatus(item) === filter);
    announceResults("event-status", matches.length, matches.length === 1 ? "gathering" : "gatherings");
    if (!matches.length) return setEmpty(container, "No gatherings match this time view. Use All dates to see the full watchlist.");

    const fragment = document.createDocumentFragment();
    for (const item of matches) {
      const status = eventStatus(item);
      const card = make("article", "event-card");
      const top = make("div", "card-topline");
      top.append(make("span", `event-status event-status--${status}`, status === "now" ? "Happening now" : status));
      top.append(make("span", "last-checked", `Checked ${data.checkedAt}`));
      card.append(top);
      card.append(make("h3", "", item.name));
      card.append(make("p", "card-meta", `${formatDateRange(item.start, item.end)} · ${item.place}`));
      const facts = make("div", "card-facts");
      facts.append(make("span", "", item.audience), make("span", "", item.format));
      card.append(facts);
      card.append(make("p", "", item.note));
      addExternalLink(card, `${item.source.name} ↗`, item.source.url, "source-link");
      fragment.append(card);
    }
    container.replaceChildren(fragment);
  }

  function renderChannels() {
    const container = document.querySelector("#channel-grid");
    if (!container || !data) return;
    const fragment = document.createDocumentFragment();

    for (const item of data.channels) {
      const card = make("article", "channel-card");
      card.append(make("span", "source-type", "PLATFORM ROUTE"));
      card.append(make("h3", "", item.name));
      const facts = make("div", "card-facts");
      for (const fact of [item.route, item.formats, item.model]) facts.append(make("span", "", fact));
      card.append(facts);
      card.append(make("p", "", item.useful));
      card.append(make("p", "boundary-box", `Watch for: ${item.boundary}`));
      const sourceList = make("ul", "channel-sources");
      for (const source of item.sources) {
        const itemElement = make("li");
        addExternalLink(itemElement, source.name, source.url);
        sourceList.append(itemElement);
      }
      card.append(sourceList);
      fragment.append(card);
    }
    container.replaceChildren(fragment);
  }

  function coverageStageLabel(place) {
    if (place.homeAnchor) return "Home anchor · recurring return";
    if (place.guideId) return "Official-source edition start";
    return "Baseline created · signal scan queued";
  }

  function coverageKindLabel(place) {
    if (place.kind === "country") return "State baseline";
    if (place.kind === "tracked-market") return "Separately tracked market";
    return "Island / territory / archipelago";
  }

  function focusWorldPlace(id) {
    const place = world?.places.find((item) => item.id === id);
    const map = routeMapState.map;
    if (!place || !map) return;
    const marker = place.guideId ? routeMapState.markers.get(place.guideId) : routeMapState.coverageMarkers.get(place.id);
    if (!marker) return;
    if (!map.hasLayer(marker)) marker.addTo(map);
    const target = marker.getLatLng();
    map.setView(target, place.guideId || place.kind !== "country" ? 6 : 4, { animate: !reducedMotion.matches });
    marker.openPopup();
    setRouteMapStatus(`${place.name} centred on the map. ${coverageStageLabel(place)}.`);
  }

  function renderWorldCoverage(filter = routeMapState.activeCoverageFilter) {
    const body = document.querySelector("#coverage-table-body");
    if (!body || !world) return;
    routeMapState.activeCoverageFilter = filter;
    const search = (document.querySelector("#coverage-search")?.value || "").trim().toLocaleLowerCase("en-AU");
    const region = document.querySelector("#coverage-region")?.value || "all";

    const matches = world.places.filter((place) => {
      const filterMatch = filter === "all"
        || (filter === "country" && place.kind === "country")
        || (filter === "island-territory" && place.kind === "island-territory")
        || (filter === "tracked-market" && place.kind === "tracked-market")
        || (filter === "guide" && Boolean(place.guideId))
        || (filter === "home" && place.homeAnchor);
      const regionMatch = region === "all" || place.region === region;
      const searchMatch = !search || [place.name, place.code, place.region, place.subregion, place.relationship]
        .some((value) => String(value || "").toLocaleLowerCase("en-AU").includes(search));
      return filterMatch && regionMatch && searchMatch;
    });

    routeMapState.coverageVisibleIds = new Set(matches.map((place) => place.id));
    const fragment = document.createDocumentFragment();
    for (const place of matches) {
      const row = make("tr");
      const nameCell = make("td");
      const button = make("button", "coverage-place-button", place.name);
      button.type = "button";
      button.addEventListener("click", () => focusWorldPlace(place.id));
      nameCell.append(button);
      if (place.homeAnchor) nameCell.append(make("span", "home-anchor-label", "Minjerribah return base"));
      row.append(nameCell);
      row.append(make("td", "", coverageKindLabel(place)));
      row.append(make("td", "", place.region));
      row.append(make("td", "", coverageStageLabel(place)));
      row.append(make("td", "", place.guideId ? "Edition/law sources started" : "8 signal lanes ready"));
      fragment.append(row);
    }

    if (!matches.length) {
      const row = make("tr");
      const cell = make("td", "empty-state", "No world-coverage records match this view.");
      cell.colSpan = 5;
      row.append(cell);
      fragment.append(row);
    }
    body.replaceChildren(fragment);
    announceResults("coverage-status", matches.length, matches.length === 1 ? "world destination" : "world destinations");
    updateCoverageMapMarkers();
    updateRouteMapMarkers(routeMapState.activeFilter);
  }

  function setupWorldCoverage() {
    const search = document.querySelector("#coverage-search");
    const region = document.querySelector("#coverage-region");
    if (!search || !region || !world) return;

    const regions = Array.from(new Set(world.places.map((place) => place.region))).sort((a, b) => a.localeCompare(b, "en"));
    for (const name of regions) {
      const option = make("option", "", name);
      option.value = name;
      region.append(option);
    }
    search.addEventListener("input", () => renderWorldCoverage());
    region.addEventListener("change", () => renderWorldCoverage());
  }

  function renderCountries(filter = "all") {
    const container = document.querySelector("#country-grid");
    if (!container || !data) return;
    routeMapState.activeFilter = filter;
    const matches = data.countries.filter((item) => filter === "all" || item.route === filter);
    announceResults("country-status", matches.length, matches.length === 1 ? "country-edition record" : "country-edition records");
    if (!matches.length) {
      setEmpty(container, "No country-edition records match this route view.");
      updateRouteMapMarkers(filter);
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const item of matches) {
      const card = make("article", "country-card");
      card.id = item.id;
      card.dataset.route = item.route;
      const top = make("div", "card-topline");
      top.append(make("span", `route-badge route-badge--${item.route}`, item.routeLabel));
      top.append(make("span", "last-checked", `Checked ${data.checkedAt}`));
      card.append(top);
      card.append(make("h3", "", item.name));
      card.append(make("p", "card-meta", item.region));
      card.append(make("p", "", item.summary));
      card.append(make("p", "country-action", `Next human action: ${item.action}`));
      const sourceList = make("ul", "channel-sources");
      for (const source of item.sources) {
        const li = make("li");
        addExternalLink(li, source.name, source.url);
        sourceList.append(li);
      }
      card.append(sourceList);
      fragment.append(card);
    }
    container.replaceChildren(fragment);
    updateRouteMapMarkers(filter);
  }

  function routeMapGlyph(route) {
    if (route === "high-caution") return "L";
    if (route === "not-activated") return "Q";
    return "S";
  }

  function makeRouteMapIcon(item) {
    const symbol = make("span", `country-map-symbol country-map-symbol--${item.route}`);
    symbol.setAttribute("aria-hidden", "true");
    symbol.append(make("span", "country-map-glyph", routeMapGlyph(item.route)));
    return window.L.divIcon({
      className: "country-map-marker-shell",
      html: symbol,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -20]
    });
  }

  function makeRouteMapClusterIcon(count) {
    const symbol = make("span", "country-map-cluster-symbol", String(count));
    symbol.setAttribute("aria-hidden", "true");
    return window.L.divIcon({
      className: "country-map-cluster-shell",
      html: symbol,
      iconSize: [56, 56],
      iconAnchor: [28, 28]
    });
  }

  function coverageAllowsGuide(id) {
    const place = world?.places.find((item) => item.guideId === id);
    if (place) return routeMapState.coverageVisibleIds.has(place.id);
    if (id === "european-union") {
      if (!["all", "guide"].includes(routeMapState.activeCoverageFilter)) return false;
      const region = document.querySelector("#coverage-region")?.value || "all";
      const search = (document.querySelector("#coverage-search")?.value || "").trim().toLocaleLowerCase("en-AU");
      const regionMatch = region === "all" || region === "Europe";
      const searchMatch = !search || ["european union", "eu", "europe"].some((value) => value.includes(search));
      return regionMatch && searchMatch;
    }
    return true;
  }

  function europeItemsForFilter(filter = routeMapState.activeFilter) {
    return data.countries.filter((item) => europeanClusterIds.has(item.id) && (filter === "all" || item.route === filter) && coverageAllowsGuide(item.id));
  }

  function zoomToEuropeCluster() {
    if (!routeMapState.map) return;
    routeMapState.map.setView([50.5, 7], 6, { animate: !reducedMotion.matches });
  }

  function makeRouteMapPopup(item) {
    const popup = make("div", "route-map-popup");
    popup.append(make("h3", "", item.name));

    const route = make("p", "route-map-popup-route");
    route.append(make("strong", "", "Research state: "), document.createTextNode(item.routeLabel));
    popup.append(route);
    popup.append(make("p", "", `Representative map anchor: ${item.mapPoint.label}.`));

    const link = make("a", "button button--secondary", `Read the full ${item.name} record`);
    link.href = `#${item.id}`;
    popup.append(link);
    return popup;
  }

  function makeWorldCoveragePopup(place) {
    const popup = make("div", "route-map-popup");
    popup.append(make("h3", "", place.name));
    popup.append(make("p", "route-map-popup-route", coverageStageLabel(place)));
    popup.append(make("p", "", `${coverageKindLabel(place)} · ${place.region}. ${place.relationship}.`));
    if (place.homeAnchor) popup.append(make("p", "", "Minjerribah is the recurring home anchor across the eleven-year world journey."));
    popup.append(make("p", "", "The repeatable record is ready for audience, language, format, community, channel, distribution, law and visit signals."));
    const link = make("a", "button button--secondary", "Open the world coverage index");
    link.href = "#world-coverage";
    popup.append(link);
    return popup;
  }

  function makeCoverageCircleOptions(place) {
    if (place.homeAnchor) {
      return { radius: 9, color: "#160d31", weight: 3, fillColor: "#f4b95f", fillOpacity: 1, keyboard: false };
    }
    if (place.kind === "island-territory") {
      return { radius: 5.5, color: "#351646", weight: 1.5, fillColor: "#ff715d", fillOpacity: 0.88, keyboard: false };
    }
    if (place.kind === "tracked-market") {
      return { radius: 6.5, color: "#160d31", weight: 2, fillColor: "#41c7b0", fillOpacity: 0.95, keyboard: false };
    }
    return { radius: 3.8, color: "#30276b", weight: 1, fillColor: "#7957ff", fillOpacity: 0.72, keyboard: false };
  }

  function updateCoverageMapMarkers() {
    const map = routeMapState.map;
    if (!map) return;
    for (const [id, marker] of routeMapState.coverageMarkers) {
      const shouldShow = routeMapState.coverageVisibleIds.has(id);
      const isShown = map.hasLayer(marker);
      if (shouldShow && !isShown) marker.addTo(map);
      if (!shouldShow && isShown) marker.removeFrom(map);
    }
  }

  function showRouteMapFallback(container, message) {
    container.classList.add("is-unavailable");
    const fallback = make("p", "route-map-fallback", message);
    const link = make("a", "", "Browse the country-edition records below.");
    link.href = "#country-grid";
    fallback.append(document.createTextNode(" "), link);
    container.replaceChildren(fallback);
  }

  function setRouteMapStatus(message) {
    const status = document.querySelector("#route-map-status");
    if (status) status.textContent = message;
  }

  function updateRouteMapMarkers(filter = routeMapState.activeFilter) {
    routeMapState.activeFilter = filter;
    if (!routeMapState.map) return;

    const europeItems = europeItemsForFilter(filter);
    const showEuropeCluster = routeMapState.map.getZoom() < 5.5 && europeItems.length > 1;

    for (const [id, marker] of routeMapState.markers) {
      const item = data.countries.find((country) => country.id === id);
      const shouldShow = item && coverageAllowsGuide(id) && (filter === "all" || item.route === filter) && !(showEuropeCluster && europeanClusterIds.has(id));
      const isShown = routeMapState.map.hasLayer(marker);
      if (shouldShow && !isShown) marker.addTo(routeMapState.map);
      if (!shouldShow && isShown) marker.removeFrom(routeMapState.map);
    }

    const cluster = routeMapState.europeCluster;
    if (!cluster) return;
    const clusterShown = routeMapState.map.hasLayer(cluster);
    if (showEuropeCluster) {
      const label = `Europe, ${europeItems.length} country-edition guides. Select to zoom in.`;
      cluster.setIcon(makeRouteMapClusterIcon(europeItems.length));
      cluster.setTooltipContent(label);
      if (!clusterShown) cluster.addTo(routeMapState.map);
      const element = cluster.getElement();
      element?.setAttribute("aria-label", label);
      element?.setAttribute("title", label);
    } else if (clusterShown) {
      cluster.removeFrom(routeMapState.map);
    }
  }

  function resetRouteMapView() {
    if (!routeMapState.map || !routeMapState.resetBounds) return;
    routeMapState.map.fitBounds(routeMapState.resetBounds, {
      padding: [36, 36],
      maxZoom: 2,
      animate: !reducedMotion.matches
    });
  }

  function setRouteMapMovement(enabled) {
    const map = routeMapState.map;
    const button = routeMapState.movementButton;
    if (!map || !button) return;

    routeMapState.movementEnabled = enabled;
    if (enabled) {
      map.dragging.enable();
      map.touchZoom.enable();
    } else {
      map.dragging.disable();
      map.touchZoom.disable();
    }
    button.textContent = enabled ? "Stop moving map" : "Enable map movement";
    button.setAttribute("aria-pressed", String(enabled));
    setRouteMapStatus(enabled ? "Map movement enabled. Drag or pinch inside the map." : "Map movement stopped. Page scrolling is available.");
  }

  function setupRouteMap() {
    const container = document.querySelector("#route-map");
    if (!container || !data) return;
    if (!window.L) {
      showRouteMapFallback(container, "The interactive map library could not load.");
      return;
    }

    try {
      container.replaceChildren();
      container.classList.remove("is-unavailable");
      const map = window.L.map(container, {
        center: [18, 12],
        zoom: 1,
        minZoom: 0,
        maxZoom: 6,
        zoomSnap: 0.25,
        zoomDelta: 0.5,
        maxBounds: [[-85, -180], [85, 180]],
        maxBoundsViscosity: 0.9,
        scrollWheelZoom: false,
        keyboard: true,
        zoomAnimation: !reducedMotion.matches,
        fadeAnimation: !reducedMotion.matches,
        markerZoomAnimation: !reducedMotion.matches,
        inertia: !reducedMotion.matches
      });
      routeMapState.map = map;
      container.routeMap = map;
      map.attributionControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');

      const tiles = window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 0,
        maxZoom: 6,
        noWrap: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      });
      let baseTileLoaded = false;
      let tileWarningTimer = null;
      tiles.on("tileload", () => {
        baseTileLoaded = true;
        if (tileWarningTimer) window.clearTimeout(tileWarningTimer);
        const status = document.querySelector("#route-map-status");
        if (status?.textContent.startsWith("The base map tiles")) status.textContent = "";
      });
      tiles.once("tileerror", () => {
        tileWarningTimer = window.setTimeout(() => {
          if (!baseTileLoaded) setRouteMapStatus("The base map tiles could not load. Country markers and the records below are still available.");
        }, 2000);
      });
      tiles.addTo(map);

      const bounds = window.L.latLngBounds();
      if (world) {
        if (!routeMapState.coverageVisibleIds.size) routeMapState.coverageVisibleIds = new Set(world.places.map((place) => place.id));
        for (const place of world.places) {
          if (!Number.isFinite(place.lat) || !Number.isFinite(place.lng)) continue;
          bounds.extend([place.lat, place.lng]);
          if (place.guideId) continue;
          const marker = window.L.circleMarker([place.lat, place.lng], makeCoverageCircleOptions(place));
          marker.bindTooltip(make("span", "", place.name), { direction: "top", opacity: 1 });
          marker.bindPopup(makeWorldCoveragePopup(place), { maxWidth: 430, minWidth: 280, autoPanPadding: [48, 48] });
          if (routeMapState.coverageVisibleIds.has(place.id)) marker.addTo(map);
          routeMapState.coverageMarkers.set(place.id, marker);
        }
      }

      for (const item of data.countries) {
        const point = item.mapPoint;
        if (!point || !Number.isFinite(point.lat) || !Number.isFinite(point.lng)) continue;

        const popup = makeRouteMapPopup(item);
        const marker = window.L.marker([point.lat, point.lng], {
          icon: makeRouteMapIcon(item),
          keyboard: true,
          title: `${item.name}: ${item.routeLabel}`,
          alt: `${item.name}. Research state: ${item.routeLabel}.`,
          riseOnHover: true,
          autoPanOnFocus: true
        });
        marker.bindTooltip(make("span", "", item.name), { direction: "top", offset: [0, -22], opacity: 1 });
        marker.bindPopup(popup, { maxWidth: 430, minWidth: 280, autoPanPadding: [48, 48] });
        marker.on("add", () => {
          const element = marker.getElement();
          if (!element) return;
          element.setAttribute("role", "button");
          element.setAttribute("aria-label", `${item.name}. Research state: ${item.routeLabel}.`);
          element.addEventListener("keydown", (event) => {
            if (event.key !== " ") return;
            event.preventDefault();
            marker.openPopup();
          });
        });
        marker.on("popupopen", () => {
          window.setTimeout(() => popup.querySelector("a")?.focus(), 0);
        });
        marker.addTo(map);
        routeMapState.markers.set(item.id, marker);
        bounds.extend([point.lat, point.lng]);
      }

      const europeCluster = window.L.marker([50.5, 7], {
        icon: makeRouteMapClusterIcon(4),
        keyboard: true,
        title: "Europe country-edition guides. Select to zoom in.",
        alt: "Europe country-edition guides. Select to zoom in.",
        riseOnHover: true
      });
      europeCluster.bindTooltip("Europe country-edition guides. Select to zoom in.", { direction: "top", offset: [0, -26], opacity: 1 });
      europeCluster.on("click", zoomToEuropeCluster);
      europeCluster.on("add", () => {
        const element = europeCluster.getElement();
        if (!element) return;
        element.setAttribute("role", "button");
        element.addEventListener("keydown", (event) => {
          if (event.key !== " ") return;
          event.preventDefault();
          zoomToEuropeCluster();
        });
      });
      routeMapState.europeCluster = europeCluster;

      if (!routeMapState.markers.size) throw new Error("No valid country map points were found.");
      routeMapState.resetBounds = bounds;
      resetRouteMapView();
      updateRouteMapMarkers(routeMapState.activeFilter);
      map.on("zoomend", () => updateRouteMapMarkers(routeMapState.activeFilter));

      const resetButton = document.querySelector("#route-map-reset");
      resetButton?.addEventListener("click", resetRouteMapView);

      const movementButton = document.querySelector("#route-map-movement");
      routeMapState.movementButton = movementButton;
      if (movementButton && window.matchMedia("(pointer: coarse)").matches) {
        movementButton.hidden = false;
        setRouteMapMovement(false);
        movementButton.addEventListener("click", () => setRouteMapMovement(!routeMapState.movementEnabled));
      }

      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        if (map._popup) {
          const source = map._popup._source;
          map.closePopup();
          source?.getElement()?.focus();
          event.preventDefault();
          return;
        }
        if (routeMapState.movementEnabled) {
          setRouteMapMovement(false);
          movementButton?.focus();
        }
      });

      window.setTimeout(() => map.invalidateSize(), 0);
    } catch (error) {
      console.error("The country route map could not initialise.", error);
      try {
        routeMapState.map?.remove();
      } catch {
        // The readable fallback below remains available even if cleanup fails.
      }
      routeMapState.map = null;
      routeMapState.markers.clear();
      routeMapState.coverageMarkers.clear();
      showRouteMapFallback(container, "The interactive map is temporarily unavailable.");
    }
  }

  function renderSources(filter = "all") {
    const container = document.querySelector("#source-register");
    if (!container || !data) return;
    const matches = data.sources.filter((source) => filter === "all" || source.category === filter);
    announceResults("source-status", matches.length, matches.length === 1 ? "source" : "sources");
    if (!matches.length) return setEmpty(container, "No sources match this evidence lane.");

    const fragment = document.createDocumentFragment();
    for (const source of matches) {
      const card = make("article", "source-card");
      const top = make("div", "card-topline");
      top.append(make("span", "source-type", source.type));
      top.append(make("span", "last-checked", source.checkedAt));
      card.append(top);
      card.append(make("h3", "", source.name));
      card.append(make("p", "source-meta", source.category));
      card.append(make("p", "", source.scope));
      addExternalLink(card, "Open source ↗", source.url, "source-link");
      fragment.append(card);
    }
    container.replaceChildren(fragment);
  }

  function setupSalesCalculator() {
    const target = document.querySelector("#monthly-target");
    const revenue = document.querySelector("#revenue-per-sale");
    if (!target || !revenue) return;

    const monthly = document.querySelector("#monthly-sales-result");
    const daily = document.querySelector("#daily-sales-result");
    const annual = document.querySelector("#annual-sales-result");
    const annualRevenue = document.querySelector("#annual-revenue-result");
    const number = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 });
    const money = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

    const update = () => {
      const targetValue = Math.max(0, Number(target.value) || 0);
      const revenueValue = Math.max(0.01, Number(revenue.value) || 0.01);
      const monthlySales = targetValue / revenueValue;
      if (monthly) monthly.textContent = number.format(monthlySales);
      if (daily) daily.textContent = number.format(monthlySales / 30.4);
      if (annual) annual.textContent = number.format(monthlySales * 12);
      if (annualRevenue) annualRevenue.textContent = money.format(targetValue * 12);
    };

    target.addEventListener("input", update);
    revenue.addEventListener("input", update);
    update();
  }

  setupNavigation();
  setupBackToTop();
  setupSalesCalculator();
  renderMarketSignals();
  renderCommunities();
  renderEvents();
  renderChannels();
  setupWorldCoverage();
  renderWorldCoverage();
  renderCountries();
  setupRouteMap();
  renderSources();

  setupFilterButtons("[data-community-filter]", renderCommunities);
  setupFilterButtons("[data-event-filter]", renderEvents);
  setupFilterButtons("[data-coverage-filter]", renderWorldCoverage);
  setupFilterButtons("[data-country-filter]", renderCountries);
  setupFilterButtons("[data-source-filter]", renderSources);
})();
