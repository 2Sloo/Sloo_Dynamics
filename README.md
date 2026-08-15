# 2Sloo Settings Hub

A free, self-hosted (GitHub Pages, $0/month) website for distributing 2Sloo's sim-racing FFB settings, graphics presets, and vehicle setups across Assetto Corsa, Assetto Corsa EVO, Assetto Corsa Rally, and BeamNG.drive.

The site is plain HTML/CSS/JavaScript — no build step, no framework, no paid services. Everything you'll ever need to edit lives in **one file**: `js/data.js`.

---

## 1. What's in this folder

```
2sloo-site/
├── index.html              Homepage
├── ffb-settings.html        Category page: FFB Settings
├── graphics.html             Category page: Graphics
├── vehicle-setups.html       Category page: Vehicle Setups
├── other.html                 Category page: Other
├── game.html                  Shows releases for one category + one game (e.g. FFB + BeamNG)
├── release.html                Individual release page (works for every release)
├── all-settings.html           The full searchable/filterable library
├── changelog.html              Auto-generated changelog of every release update
├── about.html                  About page + social links
├── 404.html                    "Page not found" page
├── css/
│   └── style.css              All site styling
├── js/
│   ├── data.js                 ⭐ EVERYTHING YOU EDIT LIVES HERE ⭐
│   └── main.js                 Rendering logic — you shouldn't need to touch this
├── assets/
│   ├── favicon.svg
│   ├── logo-placeholder.txt
│   └── thumbs/                 Placeholder thumbnail images for each category
└── README.md                   You are here
```

### How the site actually works

`game.html`, `release.html`, and `all-settings.html` are **templates**, not one-off pages. They read information from the page's URL (e.g. `release.html?id=2sloo-ffb-pack-beamng`) and from `js/data.js`, then build the page with JavaScript when it loads. That's what makes it possible to add hundreds of releases without ever creating a new HTML file — one template serves all of them.

---

## 2. Adding a new release (the main thing you'll do)

Open `js/data.js` and find the `RELEASES` array. Copy one of the existing release objects, paste it as a new entry, and edit the fields:

```js
{
  id: "2sloo-drift-ffb-pack-ac",          // unique, lowercase, hyphens only — used in the URL
  title: "2Sloo Drift FFB Pack",
  category: "ffb",                          // must match a CATEGORIES id: ffb, graphics, vehicle-setups, other
  game: "assetto-corsa",                    // must match a GAMES id (see below)
  version: "1.0",
  date: "2026-09-01",                       // YYYY-MM-DD, used for sorting "latest"
  dateDisplay: "September 2026",            // shown on the site
  featured: false,                          // set true to feature it on the homepage (only one at a time)
  placeholder: false,                       // set false once this is a real release
  thumbnail: "assets/thumbs/ffb.svg",       // swap in your own image if you have one
  shortDescription: "One sentence for cards.",
  description: "A longer paragraph for the release page.",
  whatsIncluded: ["Item one", "Item two"],
  recommendedFor: ["Hardware or use case"],
  installation: "1. Step one.\n2. Step two.\n3. Step three.",
  tags: ["ffb", "drift", "assetto corsa"],  // used by search
  links: {
    modsfire: "#",                          // replace with your real link when ready
    mediafire: "#",
    googledrive: "#",
  },
  changelog: [
    { version: "1.0", date: "September 2026", notes: ["Initial release"] },
  ],
},
```

Save the file. That's it — the release will automatically show up:
- on its category page (under the right game),
- on the game page for that category + game,
- on the "All Settings" page and in search results,
- on the changelog page,
- and on the homepage if `featured: true`.

**Available `category` values:** `ffb`, `graphics`, `vehicle-setups`, `other`
**Available `game` values:** `assetto-corsa`, `assetto-corsa-evo`, `assetto-corsa-rally`, `beamng`

---

## 3. Changing a download link

Open `js/data.js`, find the release, and edit its `links` object:

```js
links: {
  modsfire: "https://modsfire.com/your-real-link",
  mediafire: "https://www.mediafire.com/your-real-link",
  googledrive: "https://drive.google.com/your-real-link",
},
```

Leave any of these as `"#"` if you don't have that link yet — the button will automatically show as disabled with a "coming soon" label instead of linking nowhere. ModsFire is always shown first as the primary, recommended download.

---

## 4. Changing social links

Open `js/data.js` and edit the `SITE.social` object near the top:

```js
social: {
  youtube: "https://youtube.com/@2sloo",
  discord: "https://discord.gg/yourcode",
  tiktok: "https://tiktok.com/@2sloo",
  instagram: "https://instagram.com/2sloo",
},
```

Leave a value as `""` (empty) or starting with `YOUR_` to hide it. These links appear in the site footer and on the About page automatically.

---

## 5. Replacing the logo

By default the site uses a text-based **2SLOO** wordmark. To use your own logo image instead:

1. Add your logo file (e.g. `logo.svg` or `logo.png`) to the `assets/` folder.
2. Open `js/data.js` and set:
   ```js
   logoImage: "assets/logo.svg",
   ```
3. Save. The image will replace the text wordmark in the navigation bar automatically.

---

## 6. Adding a new game

1. Open `js/data.js` and add an entry to the `GAMES` array:
   ```js
   { id: "assetto-corsa-competizione", name: "Assetto Corsa Competizione", shortName: "ACC" },
   ```
   (If it's already listed under `FUTURE_GAMES` at the bottom of the file, just move it up into `GAMES`.)
2. That's it — every category page will automatically show a card for the new game, and you can start adding releases with `game: "assetto-corsa-competizione"`.

---

## 7. Adding a new category

1. Open `js/data.js` and add an entry to the `CATEGORIES` array, including a `page` field pointing at a new HTML file you'll create (e.g. `camera-settings.html`).
2. Copy an existing category file — for example, copy `ffb-settings.html` to `camera-settings.html` — and change two things in it:
   - `data-category="ffb"` → `data-category="camera-settings"` (match the new category's `id`)
   - the `<title>` and meta description text
3. Add a link to the new page in the navigation. Open `js/main.js`, find the `links` array inside `renderHeader()`, and add a new entry, e.g.:
   ```js
   { href: "camera-settings.html", label: "Camera Settings", key: "camera-settings" },
   ```

---

## 8. Deploying to GitHub Pages

You don't need any coding tools for this — everything can be done from github.com in your browser.

1. **Create a GitHub account** at github.com if you don't already have one.
2. **Create a new repository:**
   - Click the **+** icon (top right) → **New repository**.
   - Name it anything, e.g. `2sloo-site`.
   - Set it to **Public**.
   - Do not add a README, .gitignore, or license (you already have one).
   - Click **Create repository**.
3. **Upload the site files:**
   - On your new repository's page, click **Add file → Upload files**.
   - Drag in every file and folder from this `2sloo-site` folder (keep the folder structure — `css`, `js`, and `assets` should each be their own folder in the repo).
   - Scroll down and click **Commit changes**.
4. **Turn on GitHub Pages:**
   - Go to your repository's **Settings** tab.
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment → Source**, choose **Deploy from a branch**.
   - Under **Branch**, choose `main` and folder `/ (root)`, then click **Save**.
   - Wait 1–2 minutes. Refresh the page — GitHub will show you your live URL, something like:
     `https://yourusername.github.io/2sloo-site/`

That's your live site. It costs nothing and stays up as long as the repository exists.

---

## 9. Updating the site later

Any time you want to change something (add a release, fix a typo, change a link):

1. Edit the file locally (or directly in GitHub's web editor — click the pencil icon on any file in your repo).
2. If editing locally, go to your repository page and use **Add file → Upload files** again to upload the changed file(s) — GitHub will overwrite the old version.
3. Click **Commit changes**.
4. GitHub Pages automatically republishes the site within about a minute. No extra steps needed.

---

## 10. Connecting a custom domain later (optional)

1. Buy a domain from any registrar (Namecheap, Google Domains, etc.).
2. In your repository, go to **Settings → Pages → Custom domain** and enter your domain (e.g. `2sloo.gg`).
3. GitHub will show you DNS records to add — go to your domain registrar's DNS settings and add them (usually a few `A` records or a `CNAME` record, exactly as GitHub shows you).
4. Wait for DNS to propagate (can take a few minutes to a few hours), then check the box for **Enforce HTTPS** back in GitHub Pages settings once it becomes available.

---

## 11. Adding analytics later (optional)

If you want visitor stats, a privacy-friendly option like [Plausible](https://plausible.io) or [GoatCounter](https://goatcounter.com) just needs a small script tag added to the `<head>` of every HTML page. Set `SITE.analyticsId` in `js/data.js` as a personal note-to-self of which ID you're using, and paste the actual `<script>` tag your analytics provider gives you into the `<head>` of each page (or ask a developer friend to help wire it up once, since it only needs doing once per page).

---

## 12. Quick troubleshooting

- **A page looks blank / cards don't show up:** open the browser's developer console (F12) and check for a red error. The most common cause is a typo in `js/data.js` (like a missing comma) — the console error will point at the line number.
- **A download button is greyed out and says "coming soon":** that release still has `"#"` as its link in `js/data.js` — add the real URL.
- **The site works locally but not on GitHub Pages:** make sure the folder structure (`css/`, `js/`, `assets/`) was uploaded exactly as-is, and that GitHub Pages is set to deploy from the `main` branch, root folder.

---

Built for **2Sloo** — free settings, presets, and setups for the sim-racing community.
