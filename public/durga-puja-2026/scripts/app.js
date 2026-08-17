/* Phase 1 prototype — no framework. Progressive enhancement. */
(function () {
  const root = document.documentElement;
  const views = document.querySelectorAll("[data-view]");
  const navLinks = document.querySelectorAll("#site-nav a");
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const langButtons = document.querySelectorAll("[data-lang]");
  const live = document.getElementById("live");
  const state = { lang: "en", heroId: "H1", heroes: { en: null, bn: null }, events: null, stories: null };

  function pageFromHash() {
    const hash = (location.hash || "#home").replace("#", "");
    return hash.split("/")[0] || "home";
  }

  function applyLangStrings(lang) {
    document.querySelectorAll("[data-en], [data-bn]").forEach((el) => {
      if (el.closest("[data-hero-dynamic]")) return;
      const text = el.getAttribute("data-" + lang);
      if (text !== null) el.textContent = text;
    });
  }

  function setLang(lang) {
    state.lang = lang;
    root.lang = lang;
    root.dataset.lang = lang;
    applyLangStrings(lang);
    langButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
    applyHero();
    renderEvents();
    renderStories();
    updateMeta();
    if (live) live.textContent = lang === "bn" ? "ভাষা বাংলা" : "Language English";
    try { localStorage.setItem("bks-puja-lang", lang); } catch (e) { /* ignore */ }
  }

  function show(page) {
    views.forEach((view) => {
      const on = view.dataset.view === page;
      view.classList.toggle("is-active", on);
      view.hidden = !on;
    });
    navLinks.forEach((link) => {
      const on = link.getAttribute("href") === "#" + page;
      if (on) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (nav) nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
  }

  function currentHero() {
    const pack = state.heroes[state.lang];
    if (!pack || !pack.variants) return null;
    return pack.variants.find((h) => h.id === state.heroId) || pack.variants[0];
  }

  function applyHero() {
    const hero = currentHero();
    if (!hero) return;
    const map = {
      kicker: hero.kicker,
      title: hero.title,
      lede: hero.lede,
      who: hero.who,
      what: hero.what,
      when: hero.when,
      where: hero.where,
      why: hero.why,
      next: hero.next,
      ctaPrimary: hero.ctaPrimary,
      ctaSecondary: hero.ctaSecondary
    };
    Object.keys(map).forEach((key) => {
      document.querySelectorAll("[data-hero='" + key + "']").forEach((el) => {
        el.textContent = map[key];
      });
    });
    document.querySelectorAll("[data-hero-pick]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.heroPick === state.heroId));
    });
  }

  function formatCivicDate(iso, lang) {
    const parts = (iso || "").split("-");
    if (parts.length !== 3) return { day: "—", mon: "TBA" };
    const month = Number(parts[1]);
    const day = String(Number(parts[2]));
    const en = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const bn = ["জানু", "ফেব", "মার্চ", "এপ্রি", "মে", "জুন", "জুল", "আগ", "সেপ", "অক্টো", "নভে", "ডিসে"];
    const labels = lang === "bn" ? bn : en;
    return { day: day, mon: labels[month - 1] || "TBA", iso: iso };
  }

  function renderEvents() {
    const list = document.getElementById("event-list");
    if (!list) return;
    if (!state.events || !state.events.events) return;
    const lang = state.lang;
    list.innerHTML = "";
    state.events.events.forEach((ev) => {
      const li = document.createElement("li");
      li.className = "event-card";
      li.id = ev.event_id;
      const title = ev.title[lang] || ev.title.en;
      const desc = ev.description[lang] || ev.description.en;
      const timeLabel = lang === "bn" ? "সময়: TBA" : "Time: TBA";
      const placeLabel = lang === "bn" ? "স্থান: TBA" : "Place: TBA";
      const shareLabel = lang === "bn" ? "শেয়ারের খসড়া" : "Share draft text";
      const civic = lang === "bn" ? "নাগরিক ছুটি — বি কে এস অনুষ্ঠান নয়" : "Civic holiday — not a BKS event";
      const d = formatCivicDate(ev.date, lang);
      li.innerHTML =
        "<div class='event-date'><span class='day'>" + d.day + "</span><span class='mon'>" + d.mon + "</span></div>" +
        "<div>" +
        "<span class='badge badge-research'>CIVIC</span>" +
        "<span class='badge badge-pending'>pending_panjika</span>" +
        "<span class='badge badge-tba'>TBA</span>" +
        "<h3>" + title + "</h3>" +
        "<p class='muted'>" + civic + "</p>" +
        "<p class='event-meta'><time datetime='" + ev.date + "'>" + ev.date + "</time> · " + timeLabel + " · " + placeLabel + "</p>" +
        "<p>" + desc + "</p>" +
        "<p class='event-actions'><button type='button' class='btn btn-secondary' data-share='" + ev.event_id + "'>" + shareLabel + "</button></p>" +
        "</div>";
      list.appendChild(li);
    });
    list.querySelectorAll("[data-share]").forEach((btn) => {
      btn.addEventListener("click", () => shareEvent(btn.dataset.share));
    });
  }

  function shareEvent(id) {
    const ev = state.events.events.find((e) => e.event_id === id);
    if (!ev) return;
    const lang = state.lang;
    const title = ev.title[lang] || ev.title.en;
    const text =
      title +
      " · " +
      ev.date +
      " · civic date, pending panjika · Bharatiya Krishak Samaj · Durga Puja 2026 seasonal gathering · not a confirmed BKS programme";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (live) live.textContent = lang === "bn" ? "শেয়ারের খসড়া কপি হয়েছে" : "Share text copied";
      });
    }
  }

  function renderStories() {
    const list = document.getElementById("story-wells");
    if (!list || !state.stories || !state.stories.wells) return;
    const lang = state.lang;
    list.innerHTML = "";
    state.stories.wells.forEach((well) => {
      const li = document.createElement("li");
      li.className = "empty-well";
      const material = well.material || "clay";
      const coming = lang === "bn" ? "গল্প আসবে" : "Story coming soon";
      li.innerHTML =
        "<div class='slot slot--card slot--" + material + "' role='img' aria-label='" + coming + "'>" +
        "<span class='slot__label'>" + coming + "</span></div>" +
        "<span class='badge badge-empty'>EMPTY</span>" +
        "<h3>" + well[lang] + "</h3>" +
        "<p>" + well.placeholder[lang] + "</p>";
      list.appendChild(li);
    });
  }

  function updateMeta() {
    const titleEn = "BKS Durga Puja 2026 — seasonal gathering | Bharatiya Krishak Samaj";
    const titleBn = "বি কে এস দুর্গা পূজা ২০২৬ — মরশুমি আয়োজন | ভারতীয় কৃষক সমাজ";
    const descEn = "A seasonal Durga Puja gathering under Bharatiya Krishak Samaj, West Bengal. Culture first. Venue, programme and donations are not claimed.";
    const descBn = "ভারতীয় কৃষক সমাজের মরশুমি দুর্গা পূজার আয়োজন, পশ্চিমবঙ্গ। আগে সংস্কৃতি। স্থান, অনুষ্ঠান ও চাঁদার দাবি নেই।";
    document.title = state.lang === "bn" ? titleBn : titleEn;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", state.lang === "bn" ? descBn : descEn);
    const ogt = document.querySelector('meta[property="og:title"]');
    const ogd = document.querySelector('meta[property="og:description"]');
    const ogl = document.querySelector('meta[property="og:locale"]');
    if (ogt) ogt.setAttribute("content", document.title);
    if (ogd) ogd.setAttribute("content", state.lang === "bn" ? descBn : descEn);
    if (ogl) ogl.setAttribute("content", state.lang === "bn" ? "bn_IN" : "en_IN");
  }

  window.addEventListener("hashchange", () => {
    const page = pageFromHash();
    show(page);
    const active = document.querySelector(".view.is-active");
    const heading = active && active.querySelector("h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  });
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }
  langButtons.forEach((btn) => btn.addEventListener("click", () => setLang(btn.dataset.lang)));
  document.querySelectorAll("[data-hero-pick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.heroId = btn.dataset.heroPick;
      applyHero();
    });
  });

  let lang = "en";
  try { lang = localStorage.getItem("bks-puja-lang") || "en"; } catch (e) { /* ignore */ }
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "bn" || q === "en") lang = q;
  } catch (e) { /* ignore */ }
  setLang(lang === "bn" ? "bn" : "en");
  show(pageFromHash());

  const dataBase = "/durga-puja-2026/";
  Promise.all([
    fetch(dataBase + "data/content/en/heroes.json").then((r) => r.json()),
    fetch(dataBase + "data/content/bn/heroes.json").then((r) => r.json()),
    fetch(dataBase + "data/events/events.json").then((r) => r.json()),
    fetch(dataBase + "data/stories/stories.json").then((r) => r.json())
  ])
    .then(([enH, bnH, events, stories]) => {
      state.heroes.en = enH;
      state.heroes.bn = bnH;
      state.events = events;
      state.stories = stories;
      applyHero();
      renderEvents();
      renderStories();
    })
    .catch(() => {
      const note = document.getElementById("events-fallback");
      if (note) note.hidden = false;
    });
})();
