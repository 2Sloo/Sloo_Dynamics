/* ==========================================================================
   2SLOO SETTINGS HUB — SHARED SITE LOGIC
   ==========================================================================
   Renders the header/nav and footer on every page from js/data.js, plus
   the card/grid/filter/search/release-detail rendering used across pages.
   Nothing in here needs to change when you add a release — see data.js.
   ========================================================================== */

/* ---------------------------- small helpers ---------------------------- */

function qs(sel, root) {
  return (root || document).querySelector(sel);
}
function qsa(sel, root) {
  return Array.from((root || document).querySelectorAll(sel));
}
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}
function gameById(id) {
  return GAMES.find((g) => g.id === id);
}
function releaseById(id) {
  return RELEASES.find((r) => r.id === id);
}
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function parseReleaseDate(d) {
  const t = new Date(d).getTime();
  return isNaN(t) ? 0 : t; // an invalid/typo'd date sinks to the bottom instead of breaking the sort
}
function visibleReleases() {
  return SITE.showPlaceholders ? RELEASES : RELEASES.filter((r) => !r.placeholder);
}
function releasesFor(categoryId, gameId) {
  return visibleReleases()
    .filter((r) => {
      if (categoryId && categoryId !== "all" && r.category !== categoryId) return false;
      if (gameId && gameId !== "all" && r.game !== gameId) return false;
      return true;
    })
    .sort((a, b) => parseReleaseDate(b.date) - parseReleaseDate(a.date));
}

const SORT_OPTIONS = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "name-asc", label: "Name (A\u2013Z)" },
  { id: "name-desc", label: "Name (Z\u2013A)" },
];

function sortReleases(list, sortId) {
  const sorted = [...list];
  switch (sortId) {
    case "oldest":
      return sorted.sort((a, b) => parseReleaseDate(a.date) - parseReleaseDate(b.date));
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
    default:
      return sorted.sort((a, b) => parseReleaseDate(b.date) - parseReleaseDate(a.date));
  }
}

function sortSelectHtml(id, current) {
  return `
    <label class="sort-control" for="${id}">
      <span>Sort</span>
      <select id="${id}">
        ${SORT_OPTIONS.map((o) => `<option value="${o.id}" ${o.id === current ? "selected" : ""}>${o.label}</option>`).join("")}
      </select>
    </label>
  `;
}

/* ------------------------------- header --------------------------------- */

const SOCIAL_ICONS = {
  youtube: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" stroke-width="1.6"/><path d="M10 9l6 3-6 3V9z" fill="currentColor"/></svg>`,
  discord: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8.5c3-1.3 7-1.3 10 0M6 9.5c-1 2.7-1.3 5-1 7 1.8 1.3 3.6 2 3.6 2l.8-1.4M18 9.5c1 2.7 1.3 5 1 7-1.8 1.3-3.6 2-3.6 2l-.8-1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/><circle cx="9" cy="13.5" r="1.2" fill="currentColor"/><circle cx="15" cy="13.5" r="1.2" fill="currentColor"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 4v10.2a3.2 3.2 0 1 1-2.4-3.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M14 4c.3 2.4 2 4.2 4.4 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg>`,
};

function brandWordmarkHtml(brand) {
  const m = brand.match(/^([0-9]*)([A-Za-z].*)$/);
  if (!m) return `<span class="brand-mark">${brand}</span>`;
  const [, prefix, rest] = m;
  return `<span class="brand-mark">${
    prefix ? `<span class="brand-prefix">${prefix}</span>` : ""
  }<span class="brand-suffix">${rest}</span></span>`;
}

function renderHeader(activePage) {
  const mount = qs("#site-header");
  if (!mount) return;

  const brandInner = SITE.logoImage
    ? `<img src="${SITE.logoImage}" alt="${SITE.brand}" class="brand-logo-img">`
    : brandWordmarkHtml(SITE.brand);

  const links = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "ffb-settings.html", label: "FFB Settings", key: "ffb" },
    { href: "graphics.html", label: "Graphics", key: "graphics" },
    { href: "vehicle-setups.html", label: "Vehicle Setups", key: "vehicle-setups" },
    { href: "other.html", label: "Other", key: "other" },
    { href: "changelog.html", label: "Changelog", key: "changelog" },
    { href: "about.html", label: "About", key: "about" },
  ];

  const socialIconLinks = Object.entries(SITE.social)
    .filter(([, url]) => url && !url.startsWith("YOUR_"))
    .map(([key, url]) => {
      const label = key[0].toUpperCase() + key.slice(1);
      const icon = SOCIAL_ICONS[key] || "";
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="nav-social-link" aria-label="${SITE.brand} on ${label}">${icon}</a>`;
    })
    .join("");

  mount.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="brand" aria-label="${SITE.brand} home">
        ${brandInner}
        ${SITE.tagline ? `<span class="brand-tagline">${SITE.tagline}</span>` : ""}
      </a>
      <nav class="main-nav" aria-label="Primary">
        <ul>
          ${links
            .map(
              (l) => `<li><a href="${l.href}" ${l.key === activePage ? 'aria-current="page" class="is-active"' : ""}>${l.label}</a></li>`
            )
            .join("")}
        </ul>
      </nav>
      <div class="nav-actions">
        ${socialIconLinks ? `<div class="nav-social">${socialIconLinks}</div>` : ""}
        <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="mobile-nav" id="mobileNav" hidden>
      <ul>
        ${links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}
        <li><a href="all-settings.html" class="btn btn-accent btn-sm mobile-explore">Explore Settings</a></li>
      </ul>
    </div>
  `;

  const toggle = qs("#navToggle");
  const mobileNav = qs("#mobileNav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const isOpen = !mobileNav.hidden;
      mobileNav.hidden = isOpen;
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("nav-open", !isOpen);
    });
  }
}

/* ------------------------------- footer ---------------------------------- */

function renderFooter() {
  const mount = qs("#site-footer");
  if (!mount) return;

  const socialLinks = Object.entries(SITE.social)
    .filter(([, url]) => url && !url.startsWith("YOUR_"))
    .map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${key[0].toUpperCase() + key.slice(1)}</a>`);

  const socialPlaceholders = Object.entries(SITE.social)
    .filter(([, url]) => !url || url.startsWith("YOUR_"))
    .map(([key]) => `<span class="social-placeholder" title="Add your ${key} link in js/data.js">${key[0].toUpperCase() + key.slice(1)}</span>`);

  mount.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="brand-mark">${SITE.brand}</span>
        <p>Free sim-racing settings, presets, and setups. No accounts, no paywalls.</p>
      </div>
      <div class="footer-col">
        <h4>Browse</h4>
        <ul>
          ${CATEGORIES.map((c) => `<li><a href="${c.page}">${c.name}</a></li>`).join("")}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Site</h4>
        <ul>
          <li><a href="all-settings.html">All Settings</a></li>
          <li><a href="changelog.html">Changelog</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Follow</h4>
        <ul class="social-list">
          ${socialLinks.map((l) => `<li>${l}</li>`).join("")}
          ${socialPlaceholders.map((l) => `<li>${l}</li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} ${SITE.brand}. Settings shared for free — downloads through ModsFire help support future releases.</p>
    </div>
  `;
}

/* --------------------------- external link helper ------------------------ */

function externalLinkNote() {
  return `<span class="external-note">You'll leave the ${SITE.brand} site</span>`;
}

function downloadButtonsHtml(links) {
  const hasModsfire = links.modsfire && links.modsfire !== "#";
  const hasMediafire = links.mediafire && links.mediafire !== "#";
  const hasGdrive = links.googledrive && links.googledrive !== "#";

  return `
    <div class="download-block">
      <a class="btn btn-accent btn-lg dl-primary" ${hasModsfire ? `href="${links.modsfire}" target="_blank" rel="noopener noreferrer"` : `aria-disabled="true" tabindex="-1"`}>
        <span>Download from ModsFire</span>
        <em>Primary</em>
      </a>
      ${!hasModsfire ? '<p class="dl-pending">Unavailable — link not added yet.</p>' : ""}
      <p class="dl-support">Help support 2Sloo — downloading through ModsFire helps fund future releases. All settings are and always will be free.</p>

      <div class="dl-mirrors">
        <a class="btn btn-outline btn-sm" ${hasMediafire ? `href="${links.mediafire}" target="_blank" rel="noopener noreferrer"` : `aria-disabled="true" tabindex="-1"`}>
          Download from MediaFire ${hasMediafire ? "" : "(unavailable)"}
        </a>
        <a class="btn btn-outline btn-sm" ${hasGdrive ? `href="${links.googledrive}" target="_blank" rel="noopener noreferrer"` : `aria-disabled="true" tabindex="-1"`}>
          Download from Google Drive ${hasGdrive ? "" : "(unavailable)"}
        </a>
      </div>
      ${externalLinkNote()}
    </div>
  `;
}

function youtubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
  }
  return null;
}

function imageGalleryHtml(images, releaseTitle) {
  if (!images || !images.length) return "";
  const slides = images
    .map(
      (src, i) => `
      <div class="gallery-slide" data-index="${i}">
        <img src="${src}" alt="${escapeHtml(releaseTitle)} screenshot ${i + 1}" loading="${i === 0 ? "eager" : "lazy"}">
      </div>`
    )
    .join("");

  const multi = images.length > 1;

  const dots = multi
    ? `<div class="gallery-dots" role="tablist" aria-label="Screenshot navigation">
        ${images.map((_, i) => `<button type="button" class="gallery-dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Go to image ${i + 1}"></button>`).join("")}
      </div>`
    : "";

  const arrows = multi
    ? `<button type="button" class="gallery-arrow gallery-arrow-prev" aria-label="Previous image">&larr;</button>
       <button type="button" class="gallery-arrow gallery-arrow-next" aria-label="Next image">&rarr;</button>`
    : "";

  return `
    <div class="image-gallery" id="release-gallery">
      <div class="gallery-track">${slides}</div>
      ${arrows}
      ${dots}
    </div>
  `;
}

function initReleaseGallery() {
  const gallery = qs("#release-gallery");
  if (!gallery) return;
  const track = qs(".gallery-track", gallery);
  const slides = qsa(".gallery-slide", gallery);
  const dots = qsa(".gallery-dot", gallery);
  const prevBtn = qs(".gallery-arrow-prev", gallery);
  const nextBtn = qs(".gallery-arrow-next", gallery);
  if (!track || !slides.length) return;

  let activeIndex = 0;

  function setActive(index) {
    activeIndex = Math.max(0, Math.min(index, slides.length - 1));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === activeIndex));
  }

  function goTo(index) {
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    const slide = slides[clamped];
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
    setActive(clamped);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => goTo(parseInt(dot.getAttribute("data-index"), 10)));
  });
  if (prevBtn) prevBtn.addEventListener("click", () => goTo(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(activeIndex + 1));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActive(parseInt(entry.target.getAttribute("data-index"), 10));
          }
        });
      },
      { root: track, threshold: [0.6] }
    );
    slides.forEach((s) => observer.observe(s));
  }
}

function videoEmbedHtml(label, url) {
  const embed = youtubeEmbedUrl(url);
  if (!embed) return "";
  return `
    <div class="video-embed">
      <span class="video-label">${label}</span>
      <div class="video-frame">
        <iframe
          src="${embed}"
          title="${label} video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  `;
}

/* ------------------------------ release card ------------------------------ */

function releaseCardHtml(release) {
  const cat = categoryById(release.category);
  const game = gameById(release.game);
  return `
    <article class="card release-card">
      <a href="release.html?id=${release.id}" class="card-thumb-link" aria-hidden="true" tabindex="-1">
        <img src="${release.thumbnail}" alt="" loading="lazy" class="card-thumb">
      </a>
      <div class="card-body">
        <div class="card-tags">
          <span class="tag tag-cat">${cat ? cat.shortName : release.category}</span>
          <span class="tag tag-game">${game ? game.name : release.game}</span>
        </div>
        <h3 class="card-title"><a href="release.html?id=${release.id}">${release.title}</a></h3>
        <p class="card-desc">${release.shortDescription}</p>
        <div class="card-meta">
          <span>v${release.version}</span>
          <span class="dot">&middot;</span>
          <span>${release.dateDisplay}</span>
        </div>
        <a href="release.html?id=${release.id}" class="btn btn-outline btn-sm card-cta">View Pack</a>
      </div>
    </article>
  `;
}

function emptyStateHtml(message) {
  return `<div class="empty-state"><p>${message}</p></div>`;
}
function releaseCountHtml(count) {
  const cls = count > 0 ? "release-count has-releases" : "release-count";
  return `<span class="${cls}">${count} release${count === 1 ? "" : "s"}</span>`;
}

/* ------------------------------ homepage ---------------------------------- */

function renderHomepage() {
  const catMount = qs("#category-grid");
  const heroBg = qs("#hero-bg");
  const countStat = qs("#release-count-stat");

  if (heroBg && SITE.heroBackground) {
    heroBg.style.backgroundImage = `url('${SITE.heroBackground}')`;
  }

  if (countStat) {
    countStat.textContent = visibleReleases().length;
  }

  if (catMount) {
    catMount.innerHTML = CATEGORIES.map((c) => {
      const count = releasesFor(c.id, "all").length;
      return `
      <a class="cat-card" href="${c.page}">
        <div class="cat-card-inner">
          ${c.image ? `<img src="${c.image}" alt="${c.name}" class="cat-card-img">` : ""}
          <h3>${c.name}</h3>
          <p>${c.tagline}</p>
          <div class="cat-card-footer">
            ${releaseCountHtml(count)}
            <span class="cat-card-link">Browse ${c.shortName} &rarr;</span>
          </div>
        </div>
      </a>`;
    }).join("");
  }
}

/* ---------------------------- category page -------------------------------- */

function renderCategoryPage(categoryId) {
  const cat = categoryById(categoryId);
  if (!cat) return;

  qs("#category-title").textContent = cat.name;
  qs("#category-tagline").textContent = cat.tagline;
  qs("#category-description").textContent = cat.description;
  document.title = `${cat.name} — ${SITE.brand}`;

  const heroBg = qs("#category-hero-bg");
  if (heroBg && cat.image) {
    heroBg.style.backgroundImage = `url('${cat.image}')`;
  }

  const grid = qs("#game-grid");
  if (grid) {
    grid.innerHTML = GAMES.map((g) => {
      const count = releasesFor(cat.id, g.id).length;
      return `
        <a class="game-card" href="game.html?category=${cat.id}&game=${g.id}">
          <h3>${g.name}</h3>
          <p>${cat.tagline}</p>
          <div class="game-card-footer">
            ${releaseCountHtml(count)}
            <span class="btn btn-outline btn-sm">View Settings</span>
          </div>
        </a>
      `;
    }).join("");
  }
}

/* ------------------------------- game page ---------------------------------- */

function renderGamePage() {
  const categoryId = getParam("category");
  const gameId = getParam("game");
  const cat = categoryById(categoryId);
  const game = gameById(gameId);

  const titleGame = qs("#game-title");
  const titleCat = qs("#game-category");
  const crumbCat = qs("#crumb-category");
  const grid = qs("#release-grid");
  const sortMount = qs("#sort-control");
  const resultCount = qs("#game-result-count");

  if (!cat || !game) {
    if (titleGame) titleGame.textContent = "Not found";
    if (grid) grid.innerHTML = emptyStateHtml("That combination doesn't exist. Try browsing from a category page instead.");
    if (sortMount) sortMount.innerHTML = "";
    return;
  }

  document.title = `${game.name} — ${cat.name} — ${SITE.brand}`;
  if (titleGame) titleGame.textContent = game.name;
  if (titleCat) titleCat.textContent = cat.name;
  if (crumbCat) {
    crumbCat.textContent = cat.name;
    crumbCat.href = cat.page;
  }
  const crumbGameTitle = qs("#game-title-crumb");
  if (crumbGameTitle) crumbGameTitle.textContent = game.name;

  const baseList = releasesFor(cat.id, game.id);
  let sortId = "newest";

  function draw() {
    const list = sortReleases(baseList, sortId);
    if (grid) {
      grid.innerHTML =
        list.map(releaseCardHtml).join("") ||
        emptyStateHtml(`No ${cat.name} releases for ${game.name} yet — check back soon, or browse other games.`);
    }
    if (resultCount) resultCount.textContent = `${list.length} release${list.length === 1 ? "" : "s"}`;
  }

  if (sortMount && baseList.length) {
    sortMount.innerHTML = sortSelectHtml("game-sort", sortId);
    qs("#game-sort", sortMount).addEventListener("change", (e) => {
      sortId = e.target.value;
      draw();
    });
  } else if (sortMount) {
    sortMount.innerHTML = "";
  }

  draw();
}

/* ----------------------------- release page ---------------------------------- */

function renderReleasePage() {
  const id = getParam("id");
  const release = releaseById(id);
  const root = qs("#release-root");
  if (!root) return;

  if (!release) {
    root.innerHTML = `<div class="empty-state"><h2>Release not found</h2><p>This release may have moved. Try the <a href="all-settings.html">All Settings</a> page.</p></div>`;
    document.title = `Not found — ${SITE.brand}`;
    return;
  }

  const cat = categoryById(release.category);
  const game = gameById(release.game);
  document.title = `${release.title} — ${SITE.brand}`;

  const metaDesc = qs('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", release.shortDescription);

  qs("#crumb-category") && (qs("#crumb-category").textContent = cat.name, (qs("#crumb-category").href = cat.page));
  qs("#crumb-game") &&
    (qs("#crumb-game").textContent = game.name,
    (qs("#crumb-game").href = `game.html?category=${cat.id}&game=${game.id}`));

  root.innerHTML = `
    <header class="release-header">
      <div class="release-header-media">
        <img src="${release.thumbnail}" alt="">
      </div>
      <div class="release-header-body">
        ${release.placeholder ? '<span class="badge badge-placeholder">Placeholder data — replace before launch</span>' : ""}
        <h1>${release.title}</h1>
        <div class="card-tags">
          <span class="tag tag-game">${game.name}</span>
          <span class="tag tag-cat">${cat.name}</span>
        </div>
        <dl class="meta-grid">
          <div><dt>Version</dt><dd>${release.version}</dd></div>
          <div><dt>Updated</dt><dd>${release.dateDisplay}</dd></div>
        </dl>
        <p class="release-lede">${release.description}</p>
      </div>
    </header>

    <div class="release-columns">
      <div class="release-main">
        ${
          (() => {
            const galleryHtml = imageGalleryHtml(release.images, release.title);
            return galleryHtml
              ? `<section class="release-section">
                  <h2>Screenshots</h2>
                  ${galleryHtml}
                </section>`
              : "";
          })()
        }

        ${
          (() => {
            const videosHtml = [
              videoEmbedHtml("Tutorial", release.videos && release.videos.tutorial),
              videoEmbedHtml("Showcase", release.videos && release.videos.showcase),
            ]
              .filter(Boolean)
              .join("");
            return videosHtml
              ? `<section class="release-section">
                  <h2>Videos</h2>
                  <div class="video-grid">${videosHtml}</div>
                </section>`
              : "";
          })()
        }

        <section class="release-section">
          <h2>What's Included</h2>
          <ul class="check-list">
            ${release.whatsIncluded.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </section>

        <section class="release-section">
          <h2>Recommended For</h2>
          <ul class="check-list">
            ${release.recommendedFor.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </section>

        <section class="release-section">
          <h2>Installation</h2>
          <ol class="install-steps">
            ${release.installation
              .split("\n")
              .filter(Boolean)
              .map((line) => `<li>${line.replace(/^\d+\.\s*/, "")}</li>`)
              .join("")}
          </ol>
        </section>

        ${
          release.changelog && release.changelog.length
            ? `<section class="release-section">
                <h2>Version History</h2>
                <div class="mini-changelog">
                  ${release.changelog
                    .map(
                      (c) => `
                    <div class="mini-changelog-entry">
                      <div class="mini-changelog-head">
                        <span class="v-tag">v${c.version}</span>
                        <span class="v-date">${c.date}</span>
                      </div>
                      <ul>${c.notes.map((n) => `<li>${n}</li>`).join("")}</ul>
                    </div>`
                    )
                    .join("")}
                </div>
              </section>`
            : ""
        }
      </div>

      <aside class="release-aside">
        ${downloadButtonsHtml(release.links)}
        <div class="tag-cloud">
          ${release.tags.map((t) => `<span class="tag tag-pill">${t}</span>`).join("")}
        </div>
      </aside>
    </div>
  `;

  initReleaseGallery();
}

/* --------------------------- all settings page --------------------------------- */

function renderAllSettingsPage() {
  const grid = qs("#all-release-grid");
  const catFilterMount = qs("#filter-category");
  const gameFilterMount = qs("#filter-game");
  const searchInput = qs("#search-input");
  const resultCount = qs("#result-count");
  const sortMount = qs("#sort-control");
  if (!grid) return;

  let state = {
    category: getParam("category") || "all",
    game: getParam("game") || "all",
    q: "",
    sort: "newest",
  };

  if (sortMount) {
    sortMount.innerHTML = sortSelectHtml("all-sort", state.sort);
    qs("#all-sort", sortMount).addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderResults();
    });
  }

  function buildFilterButtons(mount, items, key) {
    const all = [{ id: "all", name: "All", shortName: "All" }, ...items];
    mount.innerHTML = all
      .map(
        (item) =>
          `<button type="button" class="filter-pill${state[key] === item.id ? " is-active" : ""}" data-${key}="${item.id}">${
            item.shortName || item.name
          }</button>`
      )
      .join("");
    mount.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-" + key + "]");
      if (!btn) return;
      state[key] = btn.getAttribute("data-" + key);
      qsa("button", mount).forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderResults();
    });
  }

  function matchesSearch(release, q) {
    if (!q) return true;
    const haystack = [
      release.title,
      release.shortDescription,
      release.description,
      categoryById(release.category)?.name,
      gameById(release.game)?.name,
      ...(release.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q.toLowerCase());
  }

  function renderResults() {
    const filtered = releasesFor(state.category, state.game).filter((r) => matchesSearch(r, state.q));
    const list = sortReleases(filtered, state.sort);
    grid.innerHTML = list.map(releaseCardHtml).join("") || emptyStateHtml("Nothing matches those filters yet. Try clearing a filter or searching a different term.");
    if (resultCount) resultCount.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;
  }

  if (catFilterMount) buildFilterButtons(catFilterMount, CATEGORIES, "category");
  if (gameFilterMount) buildFilterButtons(gameFilterMount, GAMES, "game");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.q = e.target.value;
      renderResults();
    });
  }

  renderResults();
}

/* -------------------------------- changelog ------------------------------------- */

function renderChangelogPage() {
  const mount = qs("#changelog-list");
  if (!mount) return;

  const entries = [];
  visibleReleases().forEach((release) => {
    (release.changelog || []).forEach((entry) => {
      entries.push({ release, entry });
    });
  });

  entries.sort((a, b) => parseReleaseDate(b.release.date) - parseReleaseDate(a.release.date));

  mount.innerHTML =
    entries
      .map(({ release, entry }) => {
        const cat = categoryById(release.category);
        const game = gameById(release.game);
        return `
        <article class="changelog-entry">
          <a href="release.html?id=${release.id}" class="changelog-thumb-link" aria-hidden="true" tabindex="-1">
            <img src="${release.thumbnail}" alt="" loading="lazy" class="changelog-thumb">
          </a>
          <div class="changelog-body">
            <div class="changelog-meta">
              <span class="v-tag">v${entry.version}</span>
              <span class="v-date">${entry.date}</span>
            </div>
            <h3><a href="release.html?id=${release.id}">${release.title}</a></h3>
            <div class="card-tags">
              <span class="tag tag-cat">${cat ? cat.name : release.category}</span>
              <span class="tag tag-game">${game ? game.name : release.game}</span>
            </div>
            <ul>${entry.notes.map((n) => `<li>${n}</li>`).join("")}</ul>
          </div>
        </article>
      `;
      })
      .join("") || emptyStateHtml("No changelog entries yet.");
}

/* ----------------------------------- about ----------------------------------------- */

function renderAboutSocial() {
  const mount = qs("#social-grid");
  if (!mount) return;
  mount.innerHTML = Object.entries(SITE.social)
    .map(([key, url]) => {
      const isLive = url && !url.startsWith("YOUR_");
      const label = key[0].toUpperCase() + key.slice(1);
      return isLive
        ? `<a class="social-card is-live" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : `<span class="social-card" title="Add your ${key} link in js/data.js">${label}</span>`;
    })
    .join("");
}

/* ---------------------------------- init ------------------------------------------ */

function applyPageBackground(page, categoryId) {
  const key = page === "category" ? categoryId : page;
  const url = SITE.pageBackgrounds && SITE.pageBackgrounds[key];
  if (url) {
    document.body.style.setProperty("--page-bg-image", `url('${url}')`);
    document.body.classList.add("has-page-bg");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-page") || "";
  const categoryId = document.body.getAttribute("data-category") || "";
  applyPageBackground(page, categoryId);
  renderHeader(page);
  renderFooter();

  if (page === "home") renderHomepage();
  if (page === "category") renderCategoryPage(categoryId);
  if (page === "game") renderGamePage();
  if (page === "release") renderReleasePage();
  if (page === "all-settings") renderAllSettingsPage();
  if (page === "changelog") renderChangelogPage();
  if (page === "about") renderAboutSocial();
});
