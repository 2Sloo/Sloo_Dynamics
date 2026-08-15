/* ==========================================================================
   2SLOO SETTINGS HUB — CENTRAL DATA FILE
   ==========================================================================
   This is the ONLY file you need to edit to:
     - add a new release
     - change a download link (ModsFire / MediaFire / Google Drive)
     - change social links
     - add a new game
     - add a new category

   Every page on the site (home, category pages, game pages, release pages,
   changelog, search) reads from this file automatically. You do not need
   to touch any HTML when you add a release.

   See README.md for a full walkthrough with screenshots-in-words.
   ========================================================================== */

/* --------------------------------------------------------------------
   SITE-WIDE SETTINGS
   -------------------------------------------------------------------- */
const SITE = {
  brand: "2SLOO",
  tagline: "SIM RACING SETTINGS HUB",

  // Replace with a path to your own logo (e.g. "assets/logo.png") to
  // switch from text branding to an image logo. Leave as null to use
  // the text-based "2SLOO" wordmark everywhere.
  logoImage: null,

  // Social links. Replace the placeholder strings with your real URLs.
  // Leave a value as "" (empty string) to hide that link from the site.
  social: {
    youtube: "https://www.youtube.com/@2Sloo",
    discord: "",
    tiktok: "https://www.tiktok.com/@sloosight",
    instagram: "",
  },

  // Optional: paste an analytics snippet ID here later (e.g. Plausible,
  // GoatCounter, Google Analytics). See README "Adding analytics".
  analyticsId: "",
};

/* --------------------------------------------------------------------
   CATEGORIES
   To add a new category: add an object here, then add a matching link
   in the nav of every HTML page (see README "How to add a category").
   -------------------------------------------------------------------- */
const CATEGORIES = [
  {
    id: "ffb",
    name: "FFB Settings",
    shortName: "FFB",
    tagline: "Force-feedback presets and wheel settings.",
    description:
      "Force-feedback presets tuned for drift, street, and racing driving styles.",
    page: "ffb-settings.html",
  },
  {
    id: "graphics",
    name: "Graphics",
    shortName: "Graphics",
    tagline: "Visual settings, ReShade presets, and optimization configs.",
    description:
      "Graphics presets, ReShade profiles, and performance configs.",
    page: "graphics.html",
  },
  {
    id: "vehicle-setups",
    name: "Vehicle Setups",
    shortName: "Setups",
    tagline: "Tuning files for grip, drift, and track driving.",
    description:
      "Suspension, alignment, and gearing setups for grip, drift, and track driving.",
    page: "vehicle-setups.html",
  },
  {
    id: "other",
    name: "Other",
    shortName: "Other",
    tagline: "Camera settings, guides, tools, and whatever else I may add.",
    description:
      "Everything else that doesn't fit neatly anywhere else.",
    page: "other.html",
  },
];

/* --------------------------------------------------------------------
   GAMES
   To add a new game: add an object here, then add it to the nav game
   switcher markup on each category page (see README "How to add a game").
   -------------------------------------------------------------------- */
const GAMES = [
  { id: "assetto-corsa", name: "Assetto Corsa", shortName: "AC" },
  { id: "assetto-corsa-evo", name: "Assetto Corsa EVO", shortName: "AC EVO" },
  { id: "assetto-corsa-rally", name: "Assetto Corsa Rally", shortName: "AC Rally" },
  { id: "beamng", name: "BeamNG.drive", shortName: "BeamNG" },
];

/* --------------------------------------------------------------------
   RELEASES
   Add a new release by copying one of the objects below and editing it.
   That's it — it will automatically appear on the homepage (if
   featured), its category page, its game page, the All Settings page,
   search results, and the changelog.

   Field notes:
     id            - unique, lowercase, hyphenated. Used in the URL
                     (release.html?id=this-value) — never reuse one.
     category      - must match a CATEGORIES id above
     game          - must match a GAMES id above
     links         - leave a URL as "#" until you have the real one.
                     The site will show a disabled "Coming soon" state.
     changelog     - newest entry first
   -------------------------------------------------------------------- */
const RELEASES = [
  {
    id: "2sloo-ffb-pack-beamng",
    title: "2Sloo FFB Pack",
    category: "ffb",
    game: "beamng",
    version: "1.0",
    date: "2026-08-01",
    dateDisplay: "August 2026",
    featured: true,
    placeholder: true,
    thumbnail: "assets/thumbs/ffb.svg",
    shortDescription: "Force-feedback settings tuned for different driving styles.",
    description:
      "A collection of force-feedback settings built for different driving styles and wheelbases — drift, street, and racing profiles that keep the wheel honest without wearing your arms out.",
    whatsIncluded: ["Drift FFB", "Street FFB", "Racing FFB", "Universal FFB"],
    recommendedFor: ["Moza R5", "Moza R9", "Other direct-drive and belt-driven wheels"],
    installation:
      "1. Download the pack from ModsFire (or a mirror below).\n2. Extract the .zip to a folder you can find again.\n3. Open BeamNG.drive and go to Options > Controls > Force Feedback.\n4. Import the .json profile that matches your driving style.\n5. Restart BeamNG.drive for the changes to fully apply.",
    tags: ["ffb", "force feedback", "beamng", "drift", "street", "racing", "moza"],
    links: {
      modsfire: "#",
      mediafire: "#",
      googledrive: "#",
    },
    changelog: [
      {
        version: "1.0",
        date: "August 2026",
        notes: ["Initial release", "Drift, street, racing, and universal profiles included"],
      },
    ],
  },
  {
    id: "2sloo-graphics-pack-ac",
    title: "2Sloo Graphics Pack",
    category: "graphics",
    game: "assetto-corsa",
    version: "1.0",
    date: "2026-08-01",
    dateDisplay: "August 2026",
    featured: false,
    placeholder: true,
    thumbnail: "assets/thumbs/graphics.svg",
    shortDescription: "A clean visual overhaul with a built-in ReShade preset.",
    description:
      "Graphics and post-processing settings for Assetto Corsa, paired with a ReShade preset tuned for clarity over gimmicks — better contrast and color without tanking your frame rate.",
    whatsIncluded: ["In-game graphics config", "ReShade preset", "Performance-friendly variant"],
    recommendedFor: ["Mid-range and high-end GPUs", "1080p–1440p displays"],
    installation:
      "1. Download the pack from ModsFire (or a mirror below).\n2. Extract the .zip to a folder you can find again.\n3. Copy the graphics config into your Assetto Corsa settings folder.\n4. Install ReShade if you haven't already, then load the included preset.\n5. Launch the game and select the preset from the ReShade overlay.",
    tags: ["graphics", "reshade", "visuals", "assetto corsa", "performance"],
    links: {
      modsfire: "#",
      mediafire: "#",
      googledrive: "#",
    },
    changelog: [
      { version: "1.0", date: "August 2026", notes: ["Initial release"] },
    ],
  },
  {
    id: "2sloo-vehicle-setup-pack-evo",
    title: "2Sloo Vehicle Setup Pack",
    category: "vehicle-setups",
    game: "assetto-corsa-evo",
    version: "1.0",
    date: "2026-08-01",
    dateDisplay: "August 2026",
    featured: false,
    placeholder: true,
    thumbnail: "assets/thumbs/setups.svg",
    shortDescription: "Grip-focused GT setups for a handful of popular cars.",
    description:
      "A starting-point setup pack for Assetto Corsa EVO — grip-oriented suspension, alignment, and gearing so you're not tuning from a flat baseline.",
    whatsIncluded: ["Grip setups", "Alignment presets", "Gearing presets"],
    recommendedFor: ["GT3-class cars", "Track-day and hotlap sessions"],
    installation:
      "1. Download the pack from ModsFire (or a mirror below).\n2. Extract the .zip to a folder you can find again.\n3. Copy each setup file into the matching car's setup folder.\n4. Load the setup from the in-game garage before your session.",
    tags: ["setups", "grip", "gt3", "assetto corsa evo", "tuning"],
    links: {
      modsfire: "#",
      mediafire: "#",
      googledrive: "#",
    },
    changelog: [
      { version: "1.0", date: "August 2026", notes: ["Initial release"] },
    ],
  },
  {
    id: "2sloo-misc-pack-ac-rally",
    title: "2Sloo Miscellaneous Pack",
    category: "other",
    game: "assetto-corsa-rally",
    version: "1.0",
    date: "2026-08-01",
    dateDisplay: "August 2026",
    featured: false,
    placeholder: true,
    thumbnail: "assets/thumbs/other.svg",
    shortDescription: "Camera and controller settings to round things out.",
    description:
      "A small grab-bag of quality-of-life settings for Assetto Corsa Rally — camera positioning and controller configs to get you comfortable faster.",
    whatsIncluded: ["Camera settings", "Controller config", "Quick-start notes"],
    recommendedFor: ["Controller and wheel users", "New Assetto Corsa Rally players"],
    installation:
      "1. Download the pack from ModsFire (or a mirror below).\n2. Extract the .zip to a folder you can find again.\n3. Follow the quick-start notes included in the pack for each file.",
    tags: ["camera", "controller", "misc", "assetto corsa rally", "guide"],
    links: {
      modsfire: "#",
      mediafire: "#",
      googledrive: "#",
    },
    changelog: [
      { version: "1.0", date: "August 2026", notes: ["Initial release"] },
    ],
  },
];

/* --------------------------------------------------------------------
   GAMES PLANNED FOR THE FUTURE (not shown in navigation yet)
   Kept here so the data structure is ready when you decide to add them.
   Move an entry into GAMES above (and add its nav markup) to launch it.
   -------------------------------------------------------------------- */
const FUTURE_GAMES = [
  { id: "assetto-corsa-competizione", name: "Assetto Corsa Competizione" },
  { id: "iracing", name: "iRacing" },
  { id: "le-mans-ultimate", name: "Le Mans Ultimate" },
  { id: "forza", name: "Forza" },
];
