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

  
   ========================================================================== */

/* --------------------------------------------------------------------
   SITE-WIDE SETTINGS
   -------------------------------------------------------------------- */
const SITE = {
  brand: "Sloo Dynamics",
  tagline: "SIM RACING SETTINGS HUB",

  // Replace with a path to your own logo (e.g. "assets/logo.png") to
  // switch from text branding to an image logo. Leave as null to use
  // the text-based "2SLOO" wordmark everywhere.
  logoImage: "",

  // Optional background image for the homepage hero (the big "2SLOO"
  // section at the top). Add your image to /assets, then set the path
  // here, e.g. "assets/hero-bg.jpg". Leave as "" for no image — the
  // hero will just use the plain dark background like today.
  // A wide, high-contrast automotive/track photo works best. The site
  // automatically dims it and adds a dark gradient behind the text so
  // everything stays readable — you don't need to darken the image
  // yourself.
  heroBackground: "assets/hero-bg.jpg",

  // Optional background image PER PAGE — this replaces the old grey
  // diagonal-line texture. Add an image to /assets, then set its path
  // for any page below. Leave a value as "" to keep that page plain.
  // The image shows through in the open space around cards/panels (this
  // is most visible on pages with fewer big panels, like Changelog and
  // About) with a dark gradient automatically layered on top so text
  // stays readable — you don't need to darken the image yourself.
  // Keys: home, all-settings, changelog, about, and one per category
  // (ffb, graphics, vehicle-setups, other). game.html and release.html
  // share the "game" and "release" keys across every combination.
  pageBackgrounds: {
    home: "assets/backgrounds/homebackground.jpg",
    "all-settings": "",
    changelog: "",
    about: "",
    ffb: "assets/backgrounds/ffbbackground.jpg",
    graphics: "assets/backgrounds/graphicsbackground.jpg",
    "vehicle-setups": "assets/backgrounds/setupsbackground.jpg",
    other: "assets/backgrounds/otherbackground.jpg",
    game: "",
    release: "",
  },

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

  // Set to false to hide every release marked "placeholder: true" below
  // from the homepage, category pages, game pages, All Settings, search,
  // and the changelog. Their release.html pages still work if someone has
  // a direct link, they just won't show up while browsing.
  showPlaceholders: false,
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
     image: "assets/thumbs/ffbthumb.jpg",
    tagline: "Force-feedback presets and wheel settings.",
    description:
      "Force-feedback presets tuned for drift, street, and racing driving styles.",
    page: "ffb-settings.html",
  },
  {
    id: "graphics",
    name: "Graphics",
    shortName: "Graphics",
     image: "assets/thumbs/graphicsthumb.jpg",
    tagline: "Visual settings, ReShade presets, and optimization configs.",
    description:
      "Graphics presets, ReShade profiles, and performance configs.",
    page: "graphics.html",
  },
  {
    id: "vehicle-setups",
    name: "Vehicle Setups",
    shortName: "Setups",
     image: "assets/thumbs/setupsthumb.jpg",
    tagline: "Tuning files for grip, drift, and track driving.",
    description:
      "Suspension, alignment, and gearing setups for grip, drift, and track driving.",
    page: "vehicle-setups.html",
  },
  {
    id: "other",
    name: "Other",
    shortName: "Other",
     image: "assets/thumbs/otherthumb.jpg",
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
     videos        - optional. Paste a YouTube link into "tutorial" and/or
                     "showcase" and it will embed on the release page,
                     labeled accordingly. Leave either one as "" (empty
                     string) to skip it entirely — nothing shows, no gap,
                     no placeholder. Works with youtube.com/watch?v=...,
                     youtu.be/..., and YouTube Shorts links.
     images        - optional. An array of image paths for a scrollable
                     screenshot gallery on the release page — handy for
                     things like camera settings where a screenshot says
                     it all and there's no separate download pack video.
                     One image just shows on its own; two or more get
                     arrows + dots so people can swipe/click through them,
                     like an Instagram post. Leave as an empty array [] to
                     skip the gallery entirely.
                     Example: images: ["assets/releaseimages/shot1.jpg", "assets/releaseimages/shot2.jpg"],
     blurImagesUntilRelease - optional, defaults to false. Only matters
                     while a release is "Coming Soon" (see releaseAt
                     below). Set to true and its screenshots still show
                     (not hidden entirely) but blurred out, with a
                     "Coming Soon" label over them — good for releases
                     that are ONLY screenshots with no separate download
                     yet, like a camera-settings post, where you don't
                     want the exact settings visible before launch. Leave
                     false (or leave it out) for releases where showing
                     the screenshots clearly ahead of time is fine.
     releaseAt     - optional. Set a future date & time to launch this
                     release as "Coming Soon" until that exact moment,
                     then have it unlock automatically — no manual flip
                     needed, no revisit required. Leave as "" for a
                     release that's available right away (the normal,
                     default behavior every release has used so far).

                     FORMAT: "YYYY-MM-DDTHH:MM:SSZ" — the "Z" means the
                     time is in UTC. Example — releasing at 6:00 PM UTC
                     on September 1, 2026:
                       releaseAt: "2026-09-01T18:00:00Z",

                     TIMEZONE: by default, write the time in UTC (that's
                     what the "Z" means) — every visitor still sees an
                     accurate countdown in THEIR OWN local time
                     automatically; you only ever set the one UTC time,
                     once. If you'd rather write it in your own timezone
                     instead of converting to UTC yourself, swap the "Z"
                     for your timezone's offset from UTC instead, e.g.
                     "-04:00" for US Eastern Daylight Time:
                       releaseAt: "2026-09-01T14:00:00-04:00", // 2:00 PM Eastern = 6:00 PM UTC
                     Not sure of your offset? Search "current time UTC"
                     and work from there.

                     While a release is "Coming Soon": it still shows up
                     while browsing (with a "Coming Soon" badge) so people
                     know it's on the way, but its page shows a live
                     countdown instead of download buttons, and it won't
                     count toward the homepage release counter or show up
                     in the Changelog until it actually goes live.
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
    featured: false,
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
     // Example: images: ["assets/releaseimages/shot1.jpg", "assets/releaseimages/shot2.jpg"],
    images: [],
    blurImagesUntilRelease: false,
     //2026-09-01    T    18:00:00         Z
    //   date     divider    time    "this is UTC"
// Hours, Minutes, Seconds
   //  00:00:00 = midnight
// 06:00:00 = 6:00 AM
// 12:00:00 = noon
// 18:00:00 = 6:00 PM
// 23:00:00 = 11:00 PM
     // THIS USES UTC TIME

     // If it's during Daylight Saving Time (MDT, UTC-6) — roughly March–November — add 6 hours to convert to UTC.
// If it's during Standard Time (MST, UTC-7) — roughly November–March — add 7 hours to convert to UTC.
     
    releaseAt: "",
    videos: {
      tutorial: "",
      showcase: "",
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
     // Example: images: ["assets/releaseimages/shot1.jpg", "assets/releaseimages/shot2.jpg"],
    images: [],
    blurImagesUntilRelease: false,
     //2026-09-01    T    18:00:00         Z
    //   date     divider    time    "this is UTC"
// Hours, Minutes, Seconds
   //  00:00:00 = midnight
// 06:00:00 = 6:00 AM
// 12:00:00 = noon
// 18:00:00 = 6:00 PM
// 23:00:00 = 11:00 PM
     // THIS USES UTC TIME

     // If it's during Daylight Saving Time (MDT, UTC-6) — roughly March–November — add 6 hours to convert to UTC.
// If it's during Standard Time (MST, UTC-7) — roughly November–March — add 7 hours to convert to UTC.
     
    releaseAt: "",
    videos: {
      tutorial: "",
      showcase: "",
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
     // Example: images: ["assets/releaseimages/shot1.jpg", "assets/releaseimages/shot2.jpg"],
    images: [],
    blurImagesUntilRelease: false,
     //2026-09-01    T    18:00:00         Z
    //   date     divider    time    "this is UTC"
// Hours, Minutes, Seconds
   //  00:00:00 = midnight
// 06:00:00 = 6:00 AM
// 12:00:00 = noon
// 18:00:00 = 6:00 PM
// 23:00:00 = 11:00 PM
     // THIS USES UTC TIME

     // If it's during Daylight Saving Time (MDT, UTC-6) — roughly March–November — add 6 hours to convert to UTC.
// If it's during Standard Time (MST, UTC-7) — roughly November–March — add 7 hours to convert to UTC.
     
    releaseAt: "",
    videos: {
      tutorial: "",
      showcase: "",
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
     // Example: images: ["assets/releaseimages/shot1.jpg", "assets/releaseimages/shot2.jpg"],
    images: [],
    blurImagesUntilRelease: false,
     //2026-09-01    T    18:00:00         Z
    //   date     divider    time    "this is UTC"
// Hours, Minutes, Seconds
   //  00:00:00 = midnight
// 06:00:00 = 6:00 AM
// 12:00:00 = noon
// 18:00:00 = 6:00 PM
// 23:00:00 = 11:00 PM
     // THIS USES UTC TIME

     // If it's during Daylight Saving Time (MDT, UTC-6) — roughly March–November — add 6 hours to convert to UTC.
// If it's during Standard Time (MST, UTC-7) — roughly November–March — add 7 hours to convert to UTC.
     
    releaseAt: "",
    videos: {
      tutorial: "",
      showcase: "",
    },
    changelog: [
      { version: "1.0", date: "August 2026", notes: ["Initial release"] },
    ],
  },

   
   
   
   // THIS IS WHERE THE ACTUAL RELEASES START. ALL ABOVE ARE EXAMPLES AND TEMPLATES DO NOT REMOVE THEM pretty please



   
{
    id: "2Sloo EVP Beamng Graphics Pack",
    title: "2Sloo EVP Beamng Graphics Pack",
    category: "graphics",
    game: "beamng",
    version: "1.0",
    date: "2026-08-12",
    dateDisplay: "August 2026",
    featured: true,
    placeholder: false,
    thumbnail: "assets/releasethumbs/EVP_ Beamng.png",
    shortDescription: "My first graphics pack for Beamng. The 0.39 made me want to play the game more, therefore, I made a graphics pack!",
    description:
      "My first ever graphics pack for Beamng. It is a simple yet effective one consisting of a light reshade preset, in-game settings, and a TAA Mod.",
    whatsIncluded: ["In-game graphics config", "ReShade preset", "Performance-friendly variant"],
    recommendedFor: ["Mid-range and high-end GPUs", "1080p–1440p displays"],
    installation:
      "Watch the tutorial video above for full install steps.",
    tags: ["graphics", "reshade", "visuals", "Beamng", "Beamng Drive"],
    links: {
      modsfire: "https://modsfire.com/sCLE0MZ8u277Kva",
      mediafire: "https://www.mediafire.com/file/f5538mqy5ghnauj/2Sloo_Beamng_EVP.zip/file",
      googledrive: "#",
    },
    images: [],
    blurImagesUntilRelease: false,
    releaseAt: "",
    videos: {
      tutorial: "https://youtu.be/j4G5CuLFtag?si=GdUZVvysNtzli_OJ",
      showcase: "",
    },
    changelog: [
      {
        version: "1.0",
        date: "August 2026",
        notes: ["Initial Release"],
      },
    ],
  },

   // 2Sloo MasterSet FFB for the MozaR5 with Beamng

{
    id: "2sloo-masterset-fb-for-the-mozar5-with-beamng",
    title: "2Sloo MasterSet FFB for Moza",
    category: "ffb",
    game: "beamng",
    version: "1.0",
    date: "2026-08-15",
    dateDisplay: "August 2026",
    featured: true,
    placeholder: false,
    thumbnail: "assets/releasethumbs/MasterSetFFB.jpg",
    shortDescription: "All around ffb preset for Beamng Drive with Moza",
    description:
      "This is an all around ffb preset for Beamng Drive. Its AMAZING for drifting and racing. It feels good with off-roading, however, I don't know what off-roading feels like in real life, so I can't be accurate with it.",
    whatsIncluded: ["Universal FFB that is very good with drifting"],
    recommendedFor: ["Moza R3", "Moza R5", "Moza R9", "Moza", "Other direct-drive and maybe belt-driven wheels"],
    installation:
      "1. Download the pack from ModsFire.\n2. Extract the .zip to a folder you can find again.\n3. View the HowToUse.txt file for next steps.",
    tags: ["ffb", "force feedback", "beamng", "drift", "street", "racing", "moza"],
    links: {
      modsfire: "https://modsfire.com/ZJx5Se19AHe21X9",
      mediafire: "#",
      googledrive: "#",
    },
    images: [],
    blurImagesUntilRelease: false,
    releaseAt: "",
    videos: {
      tutorial: "",
      showcase: "https://youtu.be/VtHM2b1mVHs",
    },
    changelog: [
      {
        version: "1.0",
        date: "August 2026",
        notes: ["Initial release"],
      },
    ],
  },

   // Sloo Assetto Corsa Moza Drift Settings

   {
    id: "2sloo-assetto-corsa-drift-moza-settings",
    title: "2Sloo Assetto Corsa Moza Drift Settings",
    category: "ffb",
    game: "assetto-corsa",
    version: "1.0",
    date: "2026-08-15",
    dateDisplay: "August 2026",
    featured: true,
    placeholder: false,
    thumbnail: "assets/releasethumbs/2Sloo Assetto Corsa Moza Drift Settings Thumb.jpg",
    shortDescription: "Force-feedback settings for drifting with Moza",
    description:
      "This is my personal ffb preset that I use for drifting and tandems. It's smooth, accurate, and an overall good pick for Moza users.",
    whatsIncluded: ["Drift FFB"],
    recommendedFor: ["Moza R3", "Moza R5", "Moza R9", "Other direct-drive wheels"],
    installation:
      "1. Download the pack from ModsFire.\n2. Extract the .zip to a folder you can find again.\n3. View the HowToUse.txt file for next steps.",
    tags: ["ffb", "force feedback", "assetto corsa", "drift", "moza"],
    links: {
      modsfire: "https://modsfire.com/6DbxOGYrprR5bzM",
      mediafire: "#",
      googledrive: "#",
    },
    images: [],
    blurImagesUntilRelease: false,
    releaseAt: "2026-08-17T15:00:00Z",
    videos: {
      tutorial: "https://youtu.be/ZThMUkHDy2Q",
      showcase: "",
    },
    changelog: [
      {
        version: "1.0",
        date: "August 2026",
        notes: ["Initial release"],
      },
    ],
  },

   // Beamng Enhanced Chase Cam Settings

   {
    id: "2sloo-enhanced-chase-camera-settings-for-beamng",
    title: "2Sloo Enhanced Chase Camera Settings For Beamng",
    category: "other",
    game: "beamng",
    version: "1.0",
    date: "2026-08-16",
    dateDisplay: "August 2026",
    featured: true,
    placeholder: false,
    thumbnail: "assets/releasethumbs/EnhancedChaseCamSettingsThumb.jpg",
    shortDescription: "My settings for the Enhanced Chase Camera Mod in Beamng",
    description:
      "My settings for the Enhanced Chase Camera Mod in Beamng",
    whatsIncluded: ["Camera settings"],
    recommendedFor: ["Drifting"],
    installation:
      "1. Download the Mod https://www.beamng.com/resources/enhanced-chase-camera.29131/ \n2. Look at screenshot for settings. ",
    tags: ["camera", "settings"],
    links: {
      modsfire: "#",
      mediafire: "#",
      googledrive: "#",
    },
   // Example: images: ["assets/releaseimages/shot1.jpg", "assets/releaseimages/shot2.jpg"],
    images: ["assets/releaseimages/2Sloo Enhanced Chase Camera Settings.png"],
    blurImagesUntilRelease: true,
      releaseAt: "",
    videos: {
      tutorial: "",
      showcase: "",
    },
    changelog: [
      { version: "1.0", date: "August 2026", notes: ["Initial release"] },
    ],
  },
   


// PASTE BEFORE THIS
   
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
