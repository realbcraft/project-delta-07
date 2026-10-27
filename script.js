// ==========================================================
// IMAGE FILE NAMES (everything lives in the images/ folder)
// Every image has its own name that says where it belongs.
// Never reuse one file for two places.
//
// Sub-folders inside images/:
//   images/avatars/       client profile pictures (reviews)
//   images/decorations/   avatar decorations (socials page): socials-deco-<id>.webp
//   images/work/          the work page: featured-*, portfolio-* and work-hero.webp
//
//   logo.webp                              the Bcraft Designs logo (header, footer)
//
//   hero-main-01.webp                      homepage hero, big piece
//   hero-secondary-01.webp                 homepage hero, small piece
//   homepage-twitter-pfp-01.webp           profile picture in the X/Twitter post (Your Perks section)
//
//   work/featured-gfx-01.webp              Featured Work (homepage) + portfolio
//   work/featured-thumbnail-01.webp
//   work/featured-ui-01.webp               (portfolio only now, no longer on the homepage)
//   work/featured-pfp-01.webp              the profile picture on the homepage
//   work/featured-logo-01.webp
//   work/featured-thumbnail-02.webp
//   work/featured-gfx-02.webp
//
//   work/portfolio-gfx-01.webp ... -03.webp      portfolio page only
//   work/portfolio-thumbnail-01.webp ... -02.webp
//   work/portfolio-logo-01.webp ... -02.webp
//   work/portfolio-ui-01.webp ... -02.webp
//
//   mega-work-banner-01.webp               Work mega menu, wide banner
//   mega-work-gfx-01.webp                  Work mega menu previews
//   mega-work-thumbnail-01.webp
//   mega-work-logo-01.webp
//   mega-work-ui-01.webp
//
//   social-gfx-01.webp                     homepage Socials: Roblox Community tile
//   social-gfx-02.webp                     homepage Socials: YouTube tile
//   social-gfx-03.webp                     homepage Socials: Roblox Profile tile
//
//   price-renders-01.webp                  Pricing page (pricing.html) product cards
//   price-profile-pictures-01.webp
//   price-game-thumbnails-01.webp
//   price-youtube-thumbnails-01.webp
//   price-game-icons-01.webp
//   price-ads-posters-01.webp
//   price-youtube-banners-01.webp         (file name kept; it is the Social Banners pricing card art)
//   price-sheet-designs-01.webp
//   payment-render-01.webp                 your own render next to the payment methods
//   welcome-offer-01.webp                  your render on the sticky Welcome Offer card (transparent PNG/WebP, about 600 x 800)
//
//   review-project-gfx-01.webp             artwork shown inside a review (example entries)
//   review-project-ui-01.webp
//   review-avatar-01.webp                  optional client pictures (-02, -03 ...)
// ==========================================================

// ==========================================================
// MEGA MENU ARTWORK PREVIEWS
// NOTE: the preview panel on the right of the Work menu is currently removed
// from the pages, so this list is not shown. It is kept in case you want it back.
// This is where you add your real artwork.
//
// For every category you can set:
//   title       - name shown under the preview
//   image       - path to your image inside the images folder
//   description - optional short line under the title
//
// Example: save your image as  images/mega-work-gfx-01.webp
// and it shows up automatically (nothing breaks if the file is missing).
//
// The keys (thumbnails, game-icons, ui, more) must match the data-preview
// attributes on the links in index.html. (Only the Work menu has
// previews: Pricing is a normal link to pricing.html.) Don't rename them
// unless you change both places.
// ==========================================================
const MEGA_MENU_DATA = {
  work: {
    thumbnails: {
      title: "Thumbnails",
      image: "/images/mega-work-gfx-01.webp",
      description: "Game and YouTube thumbnails."
    },
    "game-icons": {
      title: "Game Icons",
      image: "/images/mega-work-thumbnail-01.webp",
      description: "Small squares, big first impressions."
    },
    ui: {
      title: "UI",
      image: "/images/mega-work-ui-01.webp",
      description: "Roblox interface and UI design."
    },
    more: {
      title: "More",
      image: "/images/mega-work-logo-01.webp",
      description: "Everything else I make."
    }
  }
};


// ----------------------------------------------------------
// MEGA MENU BANNER (the large slot under "View all work")
// Save your artwork as images/mega-work-banner-01.webp (about 1600 x 500 px,
// a long 16:5 shape) and it appears automatically.
//   image - path to the picture inside the images folder
// ----------------------------------------------------------
const MEGA_BANNER_DATA = {
  work: {
    image: "/images/mega-work-banner-01.webp"
  }
};


// ----------------------------------------------------------
// MEGA MENU TRIGGER LINKS
// On desktop the menu opens on hover, and a click on the nav item itself
// goes to this address. "#all" opens the portfolio with the filter on All.
// (On a phone, tapping the item still opens its list of links.)
// ----------------------------------------------------------
const MEGA_TRIGGER_LINKS = {
  work: "/work/#all"
};


// ==========================================================
// CURSOR LIGHT  <-- true = on, false = off
//   MOUSE_LIGHT   the soft light that follows your cursor (real mice only)
// The design grid background is pure CSS (style.css, section 3b), so it has
// no switches in this file.
// ==========================================================
const MOUSE_LIGHT = true;




// ==========================================================
// SEASONS ARE AUTOMATIC NOW
// The theme (Halloween, Christmas or Summer) switches itself on by date, and so
// do the sale popups below (their end dates follow the current year).
//   SEASON_MODE    "auto" = follow the dates below
//                  "halloween" / "christmas" / "summer" = force one season
//                  "none" = no seasonal theme at all
//   SEASON_WINDOWS [month, day] to [month, day], inclusive. They must not overlap.
// ==========================================================
const SEASON_MODE = "auto";
const SEASON_WINDOWS = {
  halloween: { from: [10, 1],  to: [10, 31] },
  christmas: { from: [12, 1],  to: [12, 26] },
  summer:    { from: [6, 1],   to: [8, 31] }
};
const SEASON_YEAR = new Date().getFullYear();
const CURRENT_SEASON = (function () {
  if (SEASON_MODE !== "auto") return SEASON_MODE === "none" ? "" : SEASON_MODE;
  const now = new Date();
  const today = (now.getMonth() + 1) * 100 + now.getDate();
  const key = (pair) => pair[0] * 100 + pair[1];
  const names = Object.keys(SEASON_WINDOWS);
  for (let i = 0; i < names.length; i++) {
    const w = SEASON_WINDOWS[names[i]];
    if (today >= key(w.from) && today <= key(w.to)) return names[i];
  }
  return "";
})();
// Lets style.css tint the page background for the season (see "SEASONAL BACKGROUND TINT")
if (CURRENT_SEASON) document.documentElement.setAttribute("data-season", CURRENT_SEASON);


// ==========================================================
// HALLOWEEN DECORATIONS  <-- true = on, false = off
// In the hero of every page except the homepage: cobwebs, a dangling spider,
// bats, ghosts, a harvest moon with a passing witch, blinking eyes, floating
// candy corn and pumpkins, rising embers. On every page (homepage too) the
// buttons, the Seasonal Sales perk card and the Work menu get small icons.
// Automatic: it follows SEASON_MODE / SEASON_WINDOWS (see above), nothing to switch by hand.
// ==========================================================
const HALLOWEEN_DECOR = CURRENT_SEASON === "halloween";


// ==========================================================
// CHRISTMAS THEME  <-- true = on, false = off
// Snow across every page (the embed.im snow script is added to the page
// for you) plus decorations in the hero of every page except the homepage:
// a pine garland with tiny lights, hanging baubles, a star and a snowflake,
// Santa's sleigh (a flying silhouette) passing the moon. The
// buttons, the Seasonal Sales card and the Work menu get small icons everywhere.
// Automatic: it follows SEASON_MODE / SEASON_WINDOWS (see above), nothing to switch by hand.
// Tip: switch on one season at a time (Halloween, Christmas or Summer).
// ==========================================================
const CHRISTMAS_DECOR = CURRENT_SEASON === "christmas";

// Snow on the top edge of every blue primary button (only while the Christmas
// theme above is on). Set to false to keep the rest of the theme without it.
const CHRISTMAS_SNOW_ON_ITEMS = true;

// A short burst of snowflakes when a button is clicked (Christmas theme only).
// Skipped for visitors who ask their device for less motion.
const SEASON_CLICK_EFFECTS = true;

// Slim countdown bar above the top bar: days until Christmas (or Halloween,
// whichever theme is on). It disappears the day after the holiday.
const HOLIDAY_COUNTDOWN = {
  enabled: true,
  christmas: { name: "Christmas", month: 12, day: 25 },
  halloween: { name: "Halloween", month: 10, day: 31 }
};


// ==========================================================
// SUMMER THEME  <-- true = on, false = off
// Decorations in the hero of every page except the homepage: a glowing sun,
// drifting clouds, gentle waves at the bottom and rising bubbles.
// Automatic: it follows SEASON_MODE / SEASON_WINDOWS (see above), nothing to switch by hand.
// ==========================================================
const SUMMER_DECOR = CURRENT_SEASON === "summer";


// ==========================================================
// HALLOWEEN SALE POPUP  <-- change the offer and the picture here
// A card in the bottom-right corner of every page. When it is closed it
// stays as a small quiet tab in the same corner (it never pops up again
// by itself; the visitor's choice is remembered).
//
//   enabled    - set to false to remove the popup from every page
//   image      - your picture, saved at 1430 x 731 px
//                (you can point this at images/mega-work-banner-01.webp
//                 to reuse the menu banner)
//   alt        - description of the picture for screen readers
//   eyebrow    - small line above the offer
//   percent    - the big number
//   off        - the word next to the number
//   note       - optional line under the offer (leave "" for none),
//                for example what the sale covers or when it ends
//   buttonText - text of the button
//   buttonLink - where the button goes
//   tabText    - text on the small tab after closing
//   delay      - milliseconds before the popup appears on a first visit
//   endsAt     - when the sale ends: the popup shows a live countdown to this
//                moment and then disappears for good (the tab too). It uses
//                the visitor's own clock/time zone. Currently 31 October at
//                23:59:59, one second before 1 November.
// ==========================================================
const HALLOWEEN_POPUP = {
  enabled: CURRENT_SEASON === "halloween",
  image: "/images/halloween-popup-01.webp",
  alt: "Halloween sale artwork",
  eyebrow: "Halloween Sale",
  percent: "20%",
  off: "off",
  note: "",
  buttonText: "Commission Me",
  buttonLink: "/pricing/",
  tabText: "20% off",
  delay: 3000,
  endsAt: SEASON_YEAR + "-10-31T23:59:59"
};


// ==========================================================
// CHRISTMAS SALE POPUP  <-- same settings as the Halloween popup above
//   enabled - set to true to show it, false to remove it from every page
//   image   - your picture, saved at 1430 x 731 px
//   endsAt  - the sale ends here (countdown, then the popup is gone).
//             Currently 26 December at 23:59:59.
// All other settings work exactly like in HALLOWEEN_POPUP.
// The offer below is a placeholder: change percent, text and date.
// ==========================================================
const CHRISTMAS_POPUP = {
  enabled: CURRENT_SEASON === "christmas",
  image: "/images/christmas-popup-01.webp",
  alt: "Christmas sale artwork",
  eyebrow: "Christmas Sale",
  percent: "25%",
  off: "off",
  note: "",
  buttonText: "Commission Me",
  buttonLink: "/pricing/",
  tabText: "25% off",
  delay: 3000,
  endsAt: SEASON_YEAR + "-12-26T23:59:59"
};


// ==========================================================
// SUMMER SALE POPUP  <-- same settings as the Halloween popup above
//   enabled - set to true to show it, false to remove it from every page
//   image   - your picture, saved at 1430 x 731 px
//   endsAt  - the sale ends here (countdown, then the popup is gone).
//             Currently 31 August 2027 at 23:59:59.
// All other settings work exactly like in HALLOWEEN_POPUP.
// The offer below is a placeholder: change percent, text and date.
//
// All three popups sit in the same corner, so only one shows at a time:
// the first enabled one (Halloween, then Christmas, then Summer).
// ==========================================================
const SUMMER_POPUP = {
  enabled: CURRENT_SEASON === "summer",
  image: "/images/summer-popup-01.webp",
  alt: "Summer sale artwork",
  eyebrow: "Summer Sale",
  percent: "20%",
  off: "off",
  note: "",
  buttonText: "Commission Me",
  buttonLink: "/pricing/",
  tabText: "20% off",
  delay: 3000,
  endsAt: SEASON_YEAR + "-08-31T23:59:59"
};


// ==========================================================
// HERO ARTWORK  <-- your real artwork goes here
// The homepage hero has two image slots. Save your images under these
// names (or change the paths) and they replace the placeholders.
//   main      - the large featured panel (looks best around 4:3, 1600 x 1200 px)
//   secondary - the smaller overlapping panel (16:10, 1200 x 750 px)
// "alt" is the description for screen readers: describe the artwork.
// Until a file exists, a clean placeholder is shown instead.
// ==========================================================
const HERO_ARTWORK = {
  main: {
    image: "/images/hero-main-01.webp",
    alt: "Featured Bcraft Designs artwork"
  },
  secondary: {
    image: "/images/hero-secondary-01.webp",
    alt: "Bcraft Designs artwork"
  }
};

// ==========================================================
// HERO SLIDESHOW (homepage)
// The hero cycles through several pieces with a soft fade and drift (see style.css, .hero-slide).
//   images    - leave [] to auto-detect: it loads images/hero-main-01.webp,
//               hero-main-02.webp, hero-main-03.webp ... in order and stops at
//               the first missing number. Or list the files yourself, e.g.
//               ["/images/a.webp", "/images/b.webp"] (they play in that order).
//   folder / prefix / maxSlides - how auto-detect names and counts the files.
//   interval  - milliseconds each piece stays on screen.
// With only one image there is no slideshow and no dots.
// ==========================================================
const HERO_SLIDESHOW = {
  images: [],
  folder: "/images/",
  prefix: "hero-main-",
  maxSlides: 10,
  interval: 6500
};

// The homepage has <body class="is-home">. A few things (hero decorations,
// the colour change between sections) are switched off only there.
const IS_HOME_PAGE = document.body.classList.contains("is-home");

// Shared helper: creates an element with an optional class and text.
function createEl(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// Shared helper: loads an image, fades it in when ready, and removes the
// <img> if the file is missing (so the placeholder underneath stays).
function loadImage(img, src) {
  loadImageFlex(img, src);
}

// Checks that an image file exists WITHOUT touching the page. Resolves with the URL or null.
function probeImage(src) {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve(src);
    probe.onerror = () => resolve(null);
    probe.src = src;
  });
}

// Loads an image and fades it in. If the file is missing, the <img> is removed.
function loadImageFlex(img, src) {
  img.addEventListener("load", () => img.classList.add("is-loaded"));
  img.addEventListener("error", () => {
    if (img.parentElement) img.parentElement.classList.add("is-missing");
    img.remove();
  });
  img.src = src;
}


// ==========================================================
// PORTFOLIO / WORK DATA  <-- your real artwork goes here
//
// HOW TO ADD A PIECE:     add one line to its category in WORK (below).
// HOW TO REMOVE A PIECE:  delete its line.
// That is all. The portfolio, the homepage and the viewer update by themselves.
//
//   "/images/my-new-piece.webp",                    <- the simplest line
//   { image: "/images/my-new-piece.webp", featured: true },   <- with extras
//
// Extras you can add inside { }:
//   featured - true = also shown in Featured Work on the homepage.
//              A number (1, 2, 3 ...) sets its place there: 1 is the large
//              first piece. Pieces without a number come after the numbered ones.
//              Featured Work shows up to WORK_FEATURED_LIMIT pieces.
//   alt      - description for screen readers (optional)
//   title    - the name shown on the piece's card and in the viewer (optional).
//              Leave it out and the category name is shown, e.g. "Social Banners".
//              Example: { image: "/images/x.webp", title: "YouTube Banner" }
//   id       - ONLY needed if a page refers to the piece by number
//              (the About page does, see data-glimpse-grid). Leave it out
//              otherwise: the file name is used. Never change an id that is
//              already in use, it is also part of the piece's share link.
//
// The CATEGORY decides the image format (see WORK_FORMATS), so every image in
// a category must be saved at that format. Put the images in images/.
// Never reuse one file for two different pieces.
// Until an image file exists, a clean placeholder slot is shown instead.
//
// !!! These entries are PLACEHOLDERS: no real artwork or project names.
// ==========================================================
// GFX is the umbrella term for all of this work, so it is NOT a category.
const WORK_CATEGORIES = [
  "Game Thumbnails",
  "Game Icons",
  "Profile Pictures",
  "Commission Sheets",
  "Ads & Posters",
  "Renders",
  "YouTube Thumbnails",
  "Social Banners",
  "UI/UX",
  "More"
];
const WORK_FEATURED_LIMIT = 7;

// ----------------------------------------------------------
// IMAGE FORMATS: one per category (work.html)
// The gallery frame for a category always has exactly this shape, so
// artwork is never stretched or cropped. Save your files at this size:
//   Game Thumbnails 1920 x 1080   Game Icons 1000 x 1000
//   Renders         1000 x 1000   UI/UX      1920 x 1080
// The others are sized for what they hold. "fit: contain" shows the whole
// image without cropping (used for "More", where sizes can vary).
// ----------------------------------------------------------
const WORK_FORMATS = {
  "Game Thumbnails":    { width: 1920, height: 1080 },
  "Game Icons":         { width: 1000, height: 1000 },
  "Profile Pictures":   { width: 1000, height: 1000 },
  "Commission Sheets":  { width: 1920, height: 1080 },
  "Ads & Posters":      { width: 1920, height: 1080 },
  "Renders":            { width: 1000, height: 1000 },
  "YouTube Thumbnails": { width: 1920, height: 1080 },
  "Social Banners":    { width: 2560, height: 1440 },
  "UI/UX":              { width: 1920, height: 1080 },
  "More":               { width: 4, height: 3, fit: "contain" }
};

// One block per category. Use exactly the names from WORK_CATEGORIES above.
// Example with an extra:
//   { image: "/images/new-piece.webp", featured: true }
// A category with nothing in it (like "More") just shows "More coming soon".
const WORK = {
  "Game Thumbnails": [
    { image: "/images/work/featured-gfx-01.webp",              id: 1,  featured: 1 },
    { image: "/images/work/portfolio-thumbnail-01.webp",       id: 9,  featured: 3 },
    { image: "/images/work/portfolio-game-thumbnail-03.webp",  id: 17 },
    { image: "/images/work/portfolio-game-thumbnail-04.webp",  id: 18 },
    { image: "/images/work/portfolio-game-thumbnail-05.webp",  id: 19 },
    { image: "/images/work/portfolio-game-thumbnail-06.webp",  id: 20 },
    { image: "/images/work/portfolio-game-thumbnail-07.webp",  id: 21 }
  ],
  "Game Icons": [
    { image: "/images/work/featured-logo-01.webp",             id: 4,  featured: 5 }
  ],
  "Profile Pictures": [
    { image: "/images/work/featured-pfp-01.webp",              id: 26, featured: 4 },
    { image: "/images/work/portfolio-logo-01.webp",            id: 8 },
    { image: "/images/work/portfolio-pfp-02.webp",             id: 24 },
    { image: "/images/work/portfolio-pfp-03.webp",             id: 25 }
  ],
  "Commission Sheets": [
    { image: "/images/work/portfolio-gfx-02.webp",             id: 11 }
  ],
  "Ads & Posters": [
    { image: "/images/work/portfolio-ad-01.webp",              id: 22 }
  ],
  "Renders": [
    { image: "/images/work/featured-gfx-02.webp",              id: 6,  featured: 7 },
    { image: "/images/work/portfolio-gfx-01.webp",             id: 7 },
    { image: "/images/work/portfolio-render-03.webp",          id: 21 }
  ],
  "YouTube Thumbnails": [
    { image: "/images/work/featured-thumbnail-01.webp",        id: 2,  featured: 2 },
    { image: "/images/work/featured-thumbnail-02.webp",        id: 5,  featured: 6 }
  ],
  "Social Banners": [
    { image: "/images/work/portfolio-thumbnail-02.webp",       id: 13, title: "YouTube Banner" }
  ],
  "UI/UX": [
    { image: "/images/work/featured-ui-01.webp",               id: 3 }
  ],
  "More": []
};

// The flat list the rest of the site uses, built from WORK. (No need to edit this.)
// Order: category by category (the order of WORK_CATEGORIES), top to bottom.
const WORK_ITEMS = (function () {
  const items = [];
  const names = WORK_CATEGORIES.concat(Object.keys(WORK).filter((name) => WORK_CATEGORIES.indexOf(name) === -1));
  names.forEach((category) => {
    (WORK[category] || []).forEach((entry) => {
      const piece = typeof entry === "string" ? { image: entry } : entry;
      const file = piece.image.split("/").pop().replace(/\.[^.]+$/, "");
      items.push({
        id: piece.id !== undefined ? piece.id : file.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        title: piece.title || "Artwork",
        label: piece.title || category,   // what the card and the viewer show
        category: category,
        image: piece.image,
        alt: piece.alt || "",
        featured: piece.featured || false
      });
    });
  });
  if (typeof console !== "undefined") {
    Object.keys(WORK).forEach((name) => {
      if (WORK_CATEGORIES.indexOf(name) === -1) console.warn('WORK has a category "' + name + '" that is not in WORK_CATEGORIES.');
    });
  }
  return items;
})();

// ==========================================================
// CARD EXTRAS
// Used by the portfolio, Featured Work on the homepage and the viewer.
//
// Automatic: a glow under the card in the main colour of its artwork
// (on hover), and a shimmer while the image loads.
// ==========================================================

// Where "Order one like this" remembers the piece (read by the "You liked this" banner)
const LIKED_PIECE_KEY = "bcraft-liked-piece";

// Which pricing.html product matches a category (for "Order one like this")
const WORK_PRICING_SLUG = {
  "Game Thumbnails": "game-thumbnails",
  "Game Icons": "game-icons",
  "Renders": "renders",
  "Profile Pictures": "profile-pictures",
  "YouTube Thumbnails": "youtube-thumbnails",
  "Social Banners": "youtube-banners",
  "Ads & Posters": "ads-posters",
  "Commission Sheets": "commission-sheets"
};

// The main colour of an image as "r, g, b" (for the glow). Null if the browser
// does not allow reading the pixels (e.g. when the site is opened from a file).
function sampleColour(img) {
  try {
    const size = 24;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;
    let r = 0, g = 0, b = 0, total = 0;
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3] / 255;
      if (alpha < 0.4) continue;
      const R = data[i], G = data[i + 1], B = data[i + 2];
      const light = (R + G + B) / 3;
      // Colourful pixels count more than grey, white or black ones
      const weight = (Math.max(R, G, B) - Math.min(R, G, B) + 20) * (light > 235 || light < 25 ? 0.2 : 1) * alpha;
      r += R * weight; g += G * weight; b += B * weight; total += weight;
    }
    if (!total) return null;
    r /= total; g /= total; b /= total;
    const mean = (r + g + b) / 3;
    const lift = (v) => Math.round(Math.min(255, Math.max(0, mean + (v - mean) * 1.25)));
    return lift(r) + ", " + lift(g) + ", " + lift(b);
  } catch (error) {
    return null;
  }
}

// Adds the extras to a card: shimmer and the glow colour.
// Call it right after the <img> has been added to the art link.
function decorateArt(card, art, img, item) {
  const shimmer = createEl("span", "art-shimmer");
  shimmer.setAttribute("aria-hidden", "true");
  art.appendChild(shimmer);
  img.addEventListener("load", () => {
    const colour = sampleColour(img);
    if (colour) card.style.setProperty("--glow", colour);
  });
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true, () => false);
  }
  return new Promise((resolve) => {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (error) { ok = false; }
    area.remove();
    resolve(ok);
  });
}


// ==========================================================
// REVIEWS DATA
//
// Every review on the whole site comes from this one list:
//   - the homepage carousel shows the first 6 featured ones (REVIEWS_FEATURED_LIMIT)
//   - reviews.html is its own static page and is not built from this list
//
// Each review is one { ... } object. Fields:
//   id        - any unique number
//   name      - the client's name
//   pageOrder - position on reviews.html (the homepage carousel follows the
//               order of this list instead)
//   rating    - 1 to 5
//   text      - the review itself (a blank line "\n\n" starts a new paragraph)
//   avatar    - optional: path or link to a client picture
//               (leave "" and the first letter of the name is shown)
//   premium   - true = the highlighted card style (glow + top highlight)
//   verified  - true = verified tick next to the name
//   youtuber  - true = YouTuber badge next to the name
//   featured  - true = may appear in the homepage carousel (the first
//               REVIEWS_FEATURED_LIMIT featured ones are used)
//   category / projectImage / placeholder - optional, not used by these reviews
//
// ORDER: the 3 highlighted reviews (Scott, Nadz, HobPlayzRoblox) come
// first, the other 26 follow in a fixed shuffled order.
// ==========================================================
const REVIEW_CATEGORIES = ["GFX", "Thumbnails", "Logos", "UI", "Branding", "Other"];
const REVIEWS_FEATURED_LIMIT = 6;

const REVIEWS = [
  {
    id: 1,
    name: "Scott",
    pageOrder: 3,
    rating: 5,
    text: "5/5 Stars, absolutely exceeded my expectations. Id rate it more if I could, super patient and listens very well. I will definitely be returning for more work. I also have someone interested in working with Bcraft after seeing the work.",
    avatar: "/images/avatars/Scott.webp",
    premium: true,
    featured: true
  },
  {
    id: 2,
    name: "Nadz",
    pageOrder: 7,
    rating: 5,
    text: "Amazing service, lovely to work with, would definitely recommend to others! 🙂",
    avatar: "/images/avatars/Nadz.webp",
    premium: true,
    verified: true,
    featured: true
  },
  {
    id: 3,
    name: "HobPlayzRoblox",
    pageOrder: 13,
    rating: 5,
    text: "This GFX is AMAZING. Went beyond expectations and let me have alot of revisions. Highly recommend! 5/5 stars!",
    avatar: "/images/avatars/HobPlayzRoblox.webp",
    premium: true,
    verified: true,
    youtuber: true,
    featured: true
  },
  {
    id: 4,
    name: "Masol",
    pageOrder: 29,
    rating: 4,
    text: "fast worker. Does what you ask 🙂",
    avatar: "/images/avatars/Masol.webp",
    featured: true
  },
  {
    id: 5,
    name: "Hero_Ravensong",
    pageOrder: 19,
    rating: 5,
    text: "Definitely exceeded my expectations, and was patient with my revisions.",
    avatar: "/images/avatars/Hero_Ravensong.webp",
    featured: true
  },
  {
    id: 6,
    name: "supaa",
    pageOrder: 11,
    rating: 5,
    text: "fast worker good art and cheap not much else to say 5 stars",
    avatar: "/images/avatars/supaa.webp",
    featured: true
  },
  {
    id: 7,
    name: "✝ dankz",
    pageOrder: 9,
    rating: 5,
    text: "🌟 5-Star Review for Bcraft! 🌟\n\nBcraft did an amazing job on the graphics for my Roblox game. Professional, creative, and timely, they delivered outstanding quality that perfectly matched my vision. Great customer service and reasonable pricing make Bcraft my go‒to for Roblox graphics. Highly recommend!\n\nThank you, Bcraft! ⭐⭐⭐⭐⭐",
    avatar: "/images/avatars/%E2%9C%9D%20dankz.webp",
    featured: true
  },
  {
    id: 8,
    name: "fadeluc_123",
    pageOrder: 6,
    rating: 5,
    text: "Finished work in a timely manner, was very communicative, made necessary changes, and over all high quality product.",
    avatar: "/images/avatars/fadeluc_123.webp",
    featured: true
  },
  {
    id: 9,
    name: "Leviathan",
    pageOrder: 25,
    rating: 4,
    text: "This pfp is vibrant and eye-catching, showcasing a unique outfit that reflects creativity. The background complements the character but feels a bit generic; incorporating thematic elements could enhance its appeal. Overall, it’s a fun and engaging pfp that effectively represents the my style.",
    avatar: "/images/avatars/Leviathan.webp",
    featured: true
  },
  {
    id: 10,
    name: "TeenTitansgoneu",
    pageOrder: 24,
    rating: 5,
    text: "This is so good fast reply and perfectly graphic.",
    avatar: "/images/avatars/TeenTitansgoneu.webp",
    featured: true
  },
  {
    id: 11,
    name: "ChrisC",
    pageOrder: 22,
    rating: 5,
    text: "Worked with BCraft to get a few thumbnails done, He was very accommodating and quick to implemented changes. 5/5 Would recommend 👍",
    avatar: "/images/avatars/ChrisC.webp",
    featured: true
  },
  {
    id: 12,
    name: "! Xonlz",
    pageOrder: 8,
    rating: 5,
    text: "I’ll rate it a 5, very quick and just how I imagined it.",
    avatar: "/images/avatars/%21%20Xonlz.webp",
    featured: true
  },
  {
    id: 13,
    name: "V4lkran",
    pageOrder: 5,
    rating: 5,
    text: "He's very trusted in my opinion and cheap! I asked to change a lot of things and he didnt complain once! He deserves 5 stars! Go check him out!\n\nRating: (5/5)\n\n⭐ ⭐ ⭐ ⭐ ⭐",
    avatar: "/images/avatars/V4lkran.webp",
    featured: true
  },
  {
    id: 14,
    name: "trickytactical",
    pageOrder: 14,
    rating: 5,
    text: "5 Stars, perfect work, and very good communication with this man! Totally recommend him.",
    avatar: "/images/avatars/trickytactical.webp",
    featured: true
  },
  {
    id: 15,
    name: "exodus",
    pageOrder: 10,
    rating: 5,
    text: "Great person to work with not only a good person but also a very talented artist. They made sure I was happy with my product and made the necessary changes. I have worked with many artists, but he is by far one of the best!",
    avatar: "/images/avatars/exodus.webp",
    featured: true
  },
  {
    id: 16,
    name: "mitrix",
    pageOrder: 2,
    rating: 5,
    text: "Bcraft is an outstanding GFX artist, Fast, Efficient, and really cooperative....will soon hire him more for future commissions.",
    avatar: "/images/avatars/mitrix.webp",
    featured: true
  },
  {
    id: 17,
    name: "jaytee",
    pageOrder: 18,
    rating: 5,
    text: "paid for a icon and thumbnail, both came out crazy good. fast worker and knows how to shape it into what u like",
    avatar: "/images/avatars/jaytee.webp",
    featured: true
  },
  {
    id: 18,
    name: "CvshLvrs_29k",
    pageOrder: 1,
    rating: 5,
    text: "perfect experince fast and easy and is easy to talk to no matter what and walks you through the proccess you can fully custumize it to your liking",
    avatar: "/images/avatars/CvshLvrs_29k.webp",
    featured: true
  },
  {
    id: 19,
    name: "sonny",
    pageOrder: 17,
    rating: 5,
    text: "responded quick asked for 50% first and got to work showed me progress and and asked me if i wanted the add or change something too and not a scam great service",
    avatar: "/images/avatars/sonny.webp",
    featured: true
  },
  {
    id: 20,
    name: "Shadow_Hunter",
    pageOrder: 16,
    rating: 4,
    text: "The Thumbnails Were Great, Captivating and Full Of Bright Colous. Bcraft Did Exactly What I Said !! Plus The Delivery Was Always On Time.",
    avatar: "/images/avatars/Shadow_Hunter.webp",
    featured: true
  },
  {
    id: 21,
    name: "bobbetadev_32611",
    pageOrder: 27,
    rating: 5,
    text: "I have ordered a game Thumbnail and a game Icon, I was speechless when I saw the high quality of these! This guy is an absolute professional! I can only recommend you buying from him! This is just such an amazing, fantastic, unforgettable experience!!!",
    avatar: "/images/avatars/bobbetadev_32611.webp",
    featured: true
  },
  {
    id: 22,
    name: "jehrice",
    pageOrder: 20,
    rating: 5,
    text: "Good service, 5 stars",
    avatar: "/images/avatars/jehrice.webp",
    featured: true
  },
  {
    id: 23,
    name: "Dante",
    pageOrder: 28,
    rating: 5,
    text: "5 Stars\n\nQuick and quality! Matched the style of my game perfectly.",
    avatar: "/images/avatars/Dante.webp",
    featured: true
  },
  {
    id: 24,
    name: "MJBroski",
    pageOrder: 12,
    rating: 5,
    text: "The work was done quickly and with high quality👍 We could make changes and discuss every detail during the process. I highly recommend this author 10/10",
    avatar: "/images/avatars/MJBroski.webp",
    featured: true
  },
  {
    id: 25,
    name: "Bodeyo",
    pageOrder: 26,
    rating: 5,
    text: "5 Stars: Extremely professional and an expert at graphics. Very quick response and adaptable to changes, giving the buyer the perfect product based on their needs.",
    avatar: "/images/avatars/Bodeyo.webp",
    featured: true
  },
  {
    id: 26,
    name: "𝙈𝙧. 𝘿𝙞𝙣𝙤🦖",
    pageOrder: 23,
    rating: 5,
    text: "🔥epic service, he literally works as hard as he can to get the one you feel the most satisfaction!! He reacts to messages almost instantly except for when he has work! He includes every small detail you ask for!! Also he has good attitude for a seller lmao (If u mess with braft I come for u)🔥",
    avatar: "/images/avatars/%F0%9D%99%88%F0%9D%99%A7.%20%F0%9D%98%BF%F0%9D%99%9E%F0%9D%99%A3%F0%9D%99%A4%F0%9F%A6%96.webp",
    featured: true
  },
  {
    id: 27,
    name: "ItsDavid_Dev",
    pageOrder: 15,
    rating: 4,
    text: "Very attentive, he leaves it as you want, good treat, very recommended!",
    avatar: "/images/avatars/ItsDavid_Dev.webp",
    featured: true
  },
  {
    id: 28,
    name: "shocly",
    pageOrder: 4,
    rating: 5,
    text: "Great service, very quick respond. The work was done at it's highest level, all expectation were done! I could only recommend this GFX maker, @Bcraft! I would definitely purchase more in future!",
    avatar: "/images/avatars/shocly.webp",
    featured: true
  },
  {
    id: 29,
    name: "propemet",
    pageOrder: 21,
    rating: 5,
    text: "The delivery was very fast and the price was extremely reasonable. Bcraft was easy to work with and realized my vision well. I'm highly satisfied with the final product.",
    avatar: "/images/avatars/propemet.webp",
    featured: true
  }
];


// ==========================================================
// SOCIAL LINKS  <-- replace the placeholder URLs with your real ones
// One list feeds BOTH the navbar icons and the homepage Socials section
// (every <a data-social="..."> on every page picks its link from here).
// The URLs below are PLACEHOLDERS (example.com). Paste your real
// profile links between the quotes. Nothing else needs to change.
// "commission" is where every "Start a commission" button goes
// (a Discord invite, a form, a mailto: link ... your choice).
// ==========================================================
const SOCIAL_LINKS = {
  x:               "https://x.com/realbcraft",
  discord:         "https://discordid.netlify.app/?id=1433205220892217496",
  youtube:         "https://www.youtube.com/@realbcraft",
  tiktok:          "https://www.tiktok.com/@realbcraft",
  robloxCommunity: "https://www.roblox.com/communities/35405048/Bcraft-Designs",
  robloxProfile:   "https://www.roblox.com/users/2504673556/profile",   // your Roblox profile
  commission:      "/pricing/"      // where "commission" links go (or a Discord invite, form, mailto: ...)
};


// ==========================================================
// COMMISSION PRICING  <-- edit your prices here
// One list feeds BOTH the price cards and the ESTIMATE calculator on
// pricing.html. It is only an estimate: no payment is taken and
// nothing is booked.
//
// For every product:
//   label    - name shown on the card, the button and in the result
//   category - picks the little shape on the button (see "Category
//              glyphs" in style.css; anything else gets a circle)
//   base     - price of ONE piece in dollars. Estimate = base x quantity.
//              0 means "not set yet": the page then shows
//              "Price not set yet" instead of a fake number.
//   robux    - price of ONE piece in Robux (0 = no Robux price shown)
//   note     - optional short line shown under the price
//
// To add a product, copy a line and give it a new key. (A matching
// card in pricing.html needs data-price-key set to that same key.)
// ==========================================================
const commissionPricing = {
  renders:    { label: "Renders",                        category: "Renders",           base: 7,  robux: 2000, note: "Bulk order discounts available!" },
  profile:    { label: "Profile Pictures",               category: "Profile Pictures",  base: 10, robux: 2500 },
  thumbnails: { label: "Game Thumbnails",                category: "Game Thumbnails",   base: 30, robux: 8000 },
  ytthumbs:   { label: "YouTube Thumbnails",             category: "YouTube Thumbnails", base: 20, robux: 5000 },
  icons:      { label: "Game Icons",                     category: "Game Icons",        base: 25, robux: 7500 },
  ads:        { label: "Ads & Posters",                  category: "Ads & Posters",     base: 20, robux: 5000 },
  banners:    { label: "Social Banners",                category: "Social Banners",   base: 20, robux: 5000 },
  sheets:     { label: "Commission/Price Sheet Designs", category: "Commission Sheets", base: 20, robux: 5000 }
};

const commissionSettings = {
  currency: "$",       // shown in front of the dollar total
  maxQuantity: 20      // the most pieces the calculator allows
};

// ==========================================================
// PAYMENT METHODS  <-- edit the accepted payment methods here
// Shown as interactive cards on pricing.html. Each card is a simple,
// made-up look-alike of the real thing (not an official logo or card).
// Each entry:
//   icon   - the card style: "robux", "paypal", "roblox", "steam",
//            or the plain "card" / "gift" (see PAYMENT_MARKS)
//   label  - the name under the card
//   detail - optional small line next to the name
// Empty list = the whole section is hidden.
// ==========================================================
const PAYMENT_METHODS = [
  { icon: "robux",  label: "Robux" },
  { icon: "paypal", label: "PayPal" },
  { icon: "roblox", label: "Roblox Gift Card" },
  { icon: "steam",  label: "Steam Gift Card", detail: "EUR \u20AC" }
];

// Robux icon: your own file, images/robux-icon.webp.
const ROBUX_ICON_URL = "/images/robux-icon.webp";

const PAYMENT_ICONS = {
  robux: '<img class="robux-icon" src="' + ROBUX_ICON_URL + '" alt="" width="64" height="64" decoding="async" draggable="false">'
};

// Images shown on the PayPal / Roblox / Steam cards. Change the links here.
// (To host one yourself, save it in the images folder and use e.g. "/images/paypal.webp".)
// If a link ever stops working, the card falls back to the drawn mark below.
const PAYMENT_IMAGES = {
  paypal: "https://newsroom.deatch.paypal-corp.com/images/fillers/Library_PayPal_VenmoBlue.png",
  roblox: "https://images.rbxcdn.com/d572cc8714e0ec771ad8268977880ddf.png",
  steam:  "https://www.pcworld.com/wp-content/uploads/2025/06/store_home_share.png?quality=50&strip=all"
};

function paymentImage(type) {
  return '<img class="pay-mark-img" src="' + PAYMENT_IMAGES[type] + '" alt="" loading="lazy" decoding="async" draggable="false" referrerpolicy="no-referrer">';
}

// The drawn marks (used when a card has no image, or its image fails to load)
const PAYMENT_DRAWN_MARKS = {
  paypal: '<span class="pp-pay">Pay</span><span class="pp-pal">Pal</span>',
  roblox: '<span class="rb-word">ROBLOX</span>',
  steam:  '<span class="st-ring"></span><span class="st-word">STEAM</span>'
};

// What is drawn on the face of each payment card (CSS does the colours)
const PAYMENT_MARKS = {
  robux:  PAYMENT_ICONS.robux,
  paypal: PAYMENT_IMAGES.paypal ? paymentImage("paypal") : PAYMENT_DRAWN_MARKS.paypal,
  roblox: PAYMENT_IMAGES.roblox ? paymentImage("roblox") : PAYMENT_DRAWN_MARKS.roblox,
  steam:  PAYMENT_IMAGES.steam  ? paymentImage("steam")  : PAYMENT_DRAWN_MARKS.steam,
  card:   '<svg viewBox="0 0 24 24" focusable="false"><rect x="2.5" y="5" width="19" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2.5 10h19M6.5 15h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  gift:   '<svg viewBox="0 0 24 24" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="9" width="17" height="11" rx="2"/><path d="M3 9h18v3.5H3zM12 9v11"/><path d="M12 9C10 9 8 8 8 6.5S10 4.5 12 9ZM12 9c2 0 4-1 4-2.5S14 4.5 12 9Z"/></g></svg>'
};

// Price formatting, shared by the price cards and the calculator
function formatUsd(amount) {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return commissionSettings.currency + amount.toLocaleString("en-US", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  });
}

// 1300 -> "1.3K", 13000 -> "13K", 800 -> "800"
function formatRobuxAmount(amount) {
  return amount >= 1000
    ? (Math.round(amount / 10) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 }) + "K"
    : amount.toLocaleString("en-US");
}

// Fills an element with: [optional prefix] [Robux icon] [amount]. Amount 0 = empty.
function setRobux(node, amount, prefix) {
  node.textContent = "";
  if (!(amount > 0)) return;
  if (prefix) node.appendChild(document.createTextNode(prefix));
  const holder = document.createElement("span");
  holder.innerHTML = PAYMENT_ICONS.robux;
  const icon = holder.firstChild;
  icon.alt = "Robux";
  node.appendChild(icon);
  node.appendChild(document.createTextNode(formatRobuxAmount(amount)));
}


// ==========================================================
// WELCOME OFFER  <-- change the offer here
// A sticky card in the bottom-right corner of every page, stacked right
// above the sale popup (and its small tab). It starts minimized as a small
// tab; clicking the tab opens the card. The card's button opens a small
// "how to redeem" window: the offer is redeemed by DM.
// The offer does not change any price on the site.
// The card is built by script.js (see "WELCOME OFFER CARD" near the end),
// so no page needs extra HTML.
//
//   enabled      - false removes the card everywhere
//   discountUsd  - dollars taken off the order total (shown on the card)
//   robuxOff     - Robux taken off when paying in Robux (0 = no Robux part)
//   endsAt       - optional end, e.g. "2026-11-30T23:59:59" (null = no end)
//   dmLink       - where the "DM me" button in the redeem window goes. The contact
//                  page fills its message box when the link ends in ?offer=welcome
//   dmMessage    - the line the contact page pre-fills in the message box
//   image        - your GFX render (the shopping bag). A transparent .webp / .png.
//                  Its bottom edge always sits exactly on the bottom edge of the
//                  art area: empty transparent margins around the render are cut
//                  off automatically, so the bag can never float above the
//                  edge. Until the file exists the card simply has no picture
//                  (and no glow / rays / particles), so nothing looks broken.
//   glowX/glowY  - where the light comes out of the render (the opening of the
//                  bag), as a share of the render: "45%" from the left and
//                  "19%" from the top. Move these if the light is off.
//   particles    - how many floating sparks (0 = none)
//   nudge / nudgeDelay / nudgeMax - the tab gives one soft pulse + shine to get noticed.
//                  nudgeDelay = ms after it appears, nudgeMax = on how many page views at most.
//                  It stops for good once the visitor has opened the offer.
//   endsText / countdownTabDays - only when endsAt is set: "Ends in 3 days" on the card and
//                  in the redeem window, and "$5 off . 2d left" on the tab once there are
//                  countdownTabDays days or fewer left. The offer disappears by itself at endsAt.
//   (the widget is not shown on the contact page itself: the notice there takes over)
//   contactNotice - the notice on the contact page about redeeming by DM:
//                  "always" = for every visitor while the offer runs,
//                  "off"    = no notice
//   contactText  - the wording of that notice (shown in the small "i" reminder)
//   eyebrow / amountNote / sub / terms / buttonText / tabText - the wording of the card
//   pathSteps    - the three tiny labels on the card (DM me > Mention it > Done)
//   modalTitle / modalText / modalSteps / modalButtonText / modalCloseText -
//                  the wording of the redeem window
//   modalEmailText / emailLink / emailSubject - the second contact option in the redeem
//                  window ("Email me"). emailLink is a mailto: link with YOUR address
//                  (empty = the button is hidden). The e-mail opens with the subject and
//                  the dmMessage line already filled in.
//   delay        - milliseconds before the tab slides in on a page
// ==========================================================
const WELCOME_OFFER = {
  enabled: true,
  discountUsd: 5,
  robuxOff: 1500,
  endsAt: null,
  dmLink: "/contact/?offer=welcome",
  dmMessage: "Hi! I\u2019d like to redeem the welcome offer.",
  image: "/images/welcome-offer-01.webp",
  alt: "",
  glowX: "45%",
  glowY: "19%",
  particles: 18,
  contactNotice: "always",
  contactText: "To redeem it, DM me and mention the welcome offer. If you don\u2019t, I can\u2019t apply it to your order.",
  eyebrow: "Welcome offer",
  off: "off",
  sub: "your first order",
  terms: "New clients only \u00b7 $10 minimum order \u00b7 TOS apply",
  buttonText: "Redeem",
  pathSteps: ["DM me", "Mention it", "Done"],
  tabText: "$5.00 off",
  modalTitle: "A little gift for you",
  modalText: "New here? Mention it when you message me and I\u2019ll take it off your first order.",
  modalSteps: [
    "Send me a DM",
    "Mention the gift",
    "I take it off"
  ],
  modalButtonText: "DM me",
  modalEmailText: "Email me",
  emailLink: "mailto:YOUR-EMAIL@example.com",   // <-- put your real e-mail address here
  emailSubject: "Welcome offer",
  modalCloseText: "Not now",
  delay: 5000,
  nudge: true,
  nudgeDelay: 4500,
  nudgeMax: 3,
  endsText: "Ends in",
  countdownTabDays: 3
};

const WELCOME_UI_KEY = "bcraft-welcome-offer-ui";      // "open" once the visitor opened the card
const WELCOME_SEEN_KEY = "bcraft-welcome-offer-seen";  // "1" once the visitor opened the card or the redeem window
const WELCOME_NUDGE_KEY = "bcraft-welcome-offer-nudge"; // how many page views the tab has pulsed on
const welcomeMemory = {};                              // used if the browser blocks storage

function welcomeGet(key) {
  try { return window.localStorage.getItem(key); } catch (error) { return welcomeMemory[key] || null; }
}

function welcomeSet(key, value) {
  welcomeMemory[key] = value;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch (error) { /* storage blocked: it only lasts for this page view */ }
}

// Is the offer running at all? (switched on, and not past its end date)
function welcomeOfferLive() {
  if (!WELCOME_OFFER.enabled) return false;
  if (WELCOME_OFFER.endsAt) {
    const end = new Date(WELCOME_OFFER.endsAt).getTime();
    if (!isNaN(end) && Date.now() >= end) return false;
  }
  return true;
}


// ==========================================================
// NAVIGATION: MOBILE MENU + MEGA MENUS
// Desktop: Work opens on hover; clicking it opens the portfolio (see
// MEGA_TRIGGER_LINKS). Arrow Down opens the menu with the keyboard.
// Mobile: the same items expand as simple lists.
// ==========================================================
const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.getElementById("site-menu");
const desktopQuery = window.matchMedia("(min-width: 861px)");

const megaMenus = Array.from(document.querySelectorAll(".nav-item.has-mega")).map((item) => {
  const panel = item.querySelector(".mega");
  return {
    name: panel.dataset.mega,
    item: item,
    trigger: item.querySelector(".nav-trigger"),
    panel: panel,
    links: Array.from(panel.querySelectorAll(".mega-link")),
    preview: panel.querySelector(".mega-preview"),
    previewKey: null,
    previewTimer: 0,
    bannerLoaded: false
  };
});

let activeMega = null;      // the mega menu that is currently open
let megaPinned = false;     // true when opened by click / keyboard (stays open)
let megaCloseTimer = 0;
const failedImages = new Set();

const isDesktop = () => desktopQuery.matches;

// ----- Position (desktop) -----
// The panel is centred on the screen when it has data-center, otherwise it
// is lined up under the nav item that opens it. It is kept inside the screen, and the little
// notch and the animation origin follow the trigger.
const MEGA_EDGE = 16; // px, keep in sync with --mega-edge in style.css

function positionMega(mega) {
  const parent = mega.panel.offsetParent;
  if (!parent) return;

  const inner = mega.panel.querySelector(".mega-inner");
  const innerStyle = getComputedStyle(inner);
  const sideSpace = (parseFloat(innerStyle.paddingLeft) || 0) + (parseFloat(innerStyle.borderLeftWidth) || 0);

  const parentLeft = parent.getBoundingClientRect().left;
  const trigger = mega.trigger.getBoundingClientRect();
  const panelWidth = mega.panel.offsetWidth;
  const viewport = document.documentElement.clientWidth;

  // The panel starts exactly where its launcher starts (kept on screen at the edges)
  const wanted = trigger.left;
  const maxLeft = Math.max(MEGA_EDGE, viewport - MEGA_EDGE - panelWidth);
  const left = Math.min(Math.max(wanted, MEGA_EDGE), maxLeft);

  // Where the trigger's centre sits inside the panel (notch + animation origin)
  const centre = trigger.left + trigger.width / 2 - left;
  const notch = Math.min(Math.max(centre, 32), panelWidth - 32);

  mega.panel.style.left = (left - parentLeft) + "px";
  mega.panel.style.transformOrigin = Math.round(centre) + "px 0";
  mega.panel.style.setProperty("--mega-caret", Math.round(notch) + "px");
}

function resetMegaPosition() {
  megaMenus.forEach((mega) => {
    mega.panel.style.removeProperty("left");
    mega.panel.style.removeProperty("transform-origin");
    mega.panel.style.removeProperty("--mega-caret");
  });
}

// ----- Banner image (loaded the first time its menu opens) -----
function loadBanner(mega) {
  if (mega.bannerLoaded) return;
  mega.bannerLoaded = true;

  const data = MEGA_BANNER_DATA[mega.name];
  const image = mega.panel.querySelector(".mega-banner-image");
  if (!data || !data.image || !image) return;

  image.onload = () => {
    requestAnimationFrame(() => image.classList.add("is-loaded"));
  };
  image.onerror = () => {
    image.classList.remove("is-loaded");
  };
  image.src = data.image;
}

// ----- Open / close -----
function hideMega(mega) {
  mega.item.classList.remove("is-open");
  mega.panel.classList.remove("is-open");
  mega.trigger.setAttribute("aria-expanded", "false");
}

function openMega(mega, pinned) {
  clearTimeout(megaCloseTimer);
  if (activeMega && activeMega !== mega) hideMega(activeMega);
  if (isDesktop()) positionMega(mega);
  loadBanner(mega);
  activeMega = mega;
  megaPinned = pinned;
  mega.item.classList.add("is-open");
  mega.panel.classList.add("is-open");
  mega.trigger.setAttribute("aria-expanded", "true");
  if (isDesktop() && mega.links.length) {
    showPreview(mega, mega.links[0].dataset.preview, true);
  }
}

function closeMega(returnFocus) {
  clearTimeout(megaCloseTimer);
  if (!activeMega) return;
  const mega = activeMega;
  hideMega(mega);
  activeMega = null;
  megaPinned = false;
  if (returnFocus) mega.trigger.focus();
}

// ----- Artwork preview -----
function applyPreview(mega, data) {
  const image = mega.preview.querySelector(".mega-preview-image");
  const placeholder = mega.preview.querySelector(".mega-preview-placeholder");
  mega.preview.querySelector(".mega-preview-label").textContent = data.title;
  mega.preview.querySelector(".mega-preview-title").textContent = data.title;
  mega.preview.querySelector(".mega-preview-description").textContent = data.description || "";

  const src = data.image;
  image.onload = null;
  image.onerror = null;

  if (src && !failedImages.has(src)) {
    image.onload = () => {
      image.hidden = false;
      placeholder.hidden = true;
    };
    image.onerror = () => {
      failedImages.add(src);
      image.hidden = true;
      placeholder.hidden = false;
    };
    image.hidden = true;
    placeholder.hidden = false;
    image.src = src;
    if (image.complete && image.naturalWidth > 0) image.onload();
  } else {
    image.hidden = true;
    image.removeAttribute("src");
    placeholder.hidden = false;
  }
}

function showPreview(mega, key, instant) {
  const data = MEGA_MENU_DATA[mega.name] && MEGA_MENU_DATA[mega.name][key];
  if (!data || !mega.preview) return;

  mega.links.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.preview === key);
  });
  if (mega.previewKey === key) return;
  mega.previewKey = key;

  const body = mega.preview.querySelector(".mega-preview-body");
  clearTimeout(mega.previewTimer);

  if (instant) {
    applyPreview(mega, data);
    body.classList.remove("is-changing");
    return;
  }

  // Quick fade out, swap the content, fade back in
  body.classList.add("is-changing");
  mega.previewTimer = setTimeout(() => {
    applyPreview(mega, data);
    body.classList.remove("is-changing");
  }, 160);
}

// ----- Events for each mega menu -----
megaMenus.forEach((mega) => {
  // Hover (desktop)
  mega.item.addEventListener("mouseenter", () => {
    if (!isDesktop()) return;
    clearTimeout(megaCloseTimer);
    if (activeMega !== mega) openMega(mega, false);
  });

  mega.item.addEventListener("mouseleave", () => {
    if (!isDesktop() || activeMega !== mega || megaPinned) return;
    clearTimeout(megaCloseTimer);
    megaCloseTimer = setTimeout(() => {
      if (activeMega === mega && !megaPinned) closeMega(false);
    }, 180);
  });

  // Click or Enter/Space on the nav item
  mega.trigger.addEventListener("click", () => {
    if (isDesktop()) {
      const target = MEGA_TRIGGER_LINKS[mega.name];
      if (target) {
        window.location.href = target;
        return;
      }
      if (activeMega === mega && megaPinned) closeMega(false);
      else openMega(mega, true);
    } else if (activeMega === mega) {
      closeMega(false);
    } else {
      openMega(mega, false);
    }
  });

  // Arrow Down opens the menu and moves into it
  mega.trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMega(mega, true);
      if (mega.links.length) mega.links[0].focus();
    }
  });

  // Arrow keys move between the links inside the menu
  mega.panel.addEventListener("keydown", (event) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const focusable = Array.from(mega.panel.querySelectorAll("a"));
    const index = focusable.indexOf(document.activeElement);
    if (index === -1) return;
    event.preventDefault();

    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % focusable.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + focusable.length) % focusable.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = focusable.length - 1;
    focusable[next].focus();
  });

  // Close when keyboard focus leaves the menu
  mega.item.addEventListener("focusout", (event) => {
    if (event.relatedTarget && !mega.item.contains(event.relatedTarget) && activeMega === mega) {
      closeMega(false);
    }
  });

  // Change the artwork preview when a category is hovered or focused
  mega.links.forEach((link) => {
    const show = () => {
      if (isDesktop()) showPreview(mega, link.dataset.preview, false);
    };
    link.addEventListener("mouseenter", show);
    link.addEventListener("focus", show);
  });
});

// ----- Mobile menu button -----
function setMenuOpen(isOpen) {
  siteMenu.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  if (!isOpen) closeMega(false);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(!siteMenu.classList.contains("is-open"));
});

// Close everything after tapping any link inside the menu
siteMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMega(false);
    setMenuOpen(false);
  }
});

// Escape closes the open mega menu first, then the mobile menu
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (activeMega) {
    closeMega(activeMega.item.contains(document.activeElement));
  } else if (siteMenu.classList.contains("is-open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

// Clicking outside the header closes everything
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) {
    closeMega(false);
    if (siteMenu.classList.contains("is-open")) setMenuOpen(false);
  }
});

// Reset when the window changes between mobile and desktop layouts
desktopQuery.addEventListener("change", () => {
  closeMega(false);
  setMenuOpen(false);
  resetMegaPosition();
});

// Keep an open mega menu lined up with its trigger when the window is resized
window.addEventListener("resize", () => {
  if (activeMega && isDesktop()) positionMega(activeMega);
});


// ==========================================================
// FEATURED WORK (homepage)
// Builds the artwork slots inside [data-work-grid] from WORK_ITEMS.
// The layout itself (one large piece, smaller ones around it) is
// done in style.css, by position. The first piece is the large one.
// The first piece of each category also gets an id (work-gfx,
// work-thumbnails, work-logos, work-ui) so the Work menu links
// jump to it.
// ==========================================================
(function () {
  const grid = document.querySelector("[data-work-grid]");
  if (!grid) return;

  const make = createEl;
  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const formatOf = (category) => WORK_FORMATS[category] || { width: 4, height: 3, fit: "contain" };

  // Same cards as the portfolio on work.html (.portfolio-grid / .portfolio-item /
  // .portfolio-art), so both pages look identical. Each card links to its
  // category in the portfolio.
  grid.classList.add("portfolio-grid");

  // featured: 1, 2, 3 ... sets the order; pieces marked only with true come after those
  const featuredRank = (item) => (typeof item.featured === "number" ? item.featured : 999);
  const list = WORK_ITEMS.filter((item) => item.featured)
    .sort((a, b) => featuredRank(a) - featuredRank(b))
    .slice(0, WORK_FEATURED_LIMIT);
  const seenCategories = new Set();

  const ratios = list.map((item) => formatOf(item.category).width / formatOf(item.category).height);
  let layout = "mixed";
  if (ratios.length && ratios.every((r) => r > 1.2)) layout = "landscape";
  else if (ratios.length && ratios.every((r) => r === 1)) layout = "square";
  grid.dataset.layout = layout;

  list.forEach((item, index) => {
    const slug = slugify(item.category);
    const format = formatOf(item.category);

    const card = make("figure", "portfolio-item");
    card.setAttribute("data-reveal", "");
    card.dataset.revealIndex = String(Math.min(index, 3));
    card.dataset.category = item.category;
    if (format.fit) card.dataset.fit = format.fit;
    card.dataset.shape = format.width === format.height ? "square" : "wide";
    card.style.setProperty("--art-ratio", format.width + " / " + format.height);
    if (!seenCategories.has(slug)) {
      seenCategories.add(slug);
      card.id = "work-" + slug;
    }

    const art = make("a", "portfolio-art");
    art.href = "/work/#" + slug;
    art.setAttribute("aria-label", "View in portfolio: " + item.title + ", " + item.category);


    const img = make("img", "work-image");
    img.alt = item.alt || item.category + " artwork by Bcraft Designs";
    img.loading = "lazy";
    img.decoding = "async";
    loadImage(img, item.image);
    art.appendChild(img);
    decorateArt(card, art, img, item);
    card.appendChild(art);

    const caption = make("figcaption", "portfolio-caption");
    caption.appendChild(make("span", "tag", item.label));
    card.appendChild(caption);

    grid.appendChild(card);
  });
})();


// ==========================================================
// SOCIAL LINKS + SOCIALS SECTION
// Applies SOCIAL_LINKS to every [data-social] link (navbar icons and
// the homepage Socials tiles) and loads the artwork slots in the
// Socials section. A missing image just leaves its slot showing.
// ==========================================================
(function () {
  // TikTok: one more icon right after YouTube in every icon row (navbar, hero,
  // footer ...), copied from the YouTube one so it looks the same everywhere.
  // Runs on every page, so no HTML file needs to change. The link itself comes
  // from SOCIAL_LINKS.tiktok below.
  const TIKTOK_PATH = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
  const tiktokIcon = (svg) => {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 24 24");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", TIKTOK_PATH);
    svg.appendChild(path);
  };
  document.querySelectorAll('a[data-social="youtube"]').forEach((youtube) => {
    const item = youtube.closest("li");
    if (!item || !item.parentElement || item.parentElement.querySelector('[data-social="tiktok"]')) return;
    const copy = item.cloneNode(true);
    const link = copy.querySelector("a[data-social]");
    if (!link) return;
    link.setAttribute("data-social", "tiktok");
    link.setAttribute("href", "#");
    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.setAttribute("aria-label", "Bcraft Designs on TikTok");
    if (link.hasAttribute("data-tooltip")) link.setAttribute("data-tooltip", "TikTok");
    if (link.hasAttribute("title")) link.setAttribute("title", "TikTok");
    copy.hidden = false;
    const svg = link.querySelector("svg");
    if (svg) tiktokIcon(svg);
    item.after(copy);
  });

  // Top bar: Roblox next to the other icons (added here too so every page gets them)
  const navSocials = document.querySelector(".nav-socials");
  if (navSocials) {
    [
      ["robloxCommunity", "Roblox", "Bcraft Designs on Roblox", "M18.926 23.998 0 18.892 5.075 0 24 5.108ZM15.348 10.09l-5.282-1.453-1.414 5.273 5.282 1.453z"],
      ["tiktok", "TikTok", "Bcraft Designs on TikTok", TIKTOK_PATH],
    ].forEach((entry) => {
      if (navSocials.querySelector('[data-social="' + entry[0] + '"]')) return;
      const li = document.createElement("li");
      li.innerHTML =
        '<a class="nav-social" href="#" data-social="' + entry[0] + '" data-tooltip="' + entry[1] + '" aria-label="' + entry[2] + '">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="' + entry[3] + '"/></svg></a>';
      navSocials.appendChild(li);
    });
  }

  document.querySelectorAll("a[data-social]").forEach((link) => {
    const url = SOCIAL_LINKS[link.dataset.social];
    // No real link yet (empty, or still an example.com placeholder): hide it, never leave a dead link
    if (!url || /example\.com/i.test(url)) {
      (link.closest("li") || link).hidden = true;
      return;
    }
    link.href = url;
    // Other sites open in a new tab; pages of this site open normally
    if (/^(https?:)?\/\//i.test(url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  // Artwork slots: Socials tiles on the homepage, product cards on pricing.html
  document.querySelectorAll("[data-social-art], [data-service-art]").forEach((img) => {
    if (img.dataset.serviceArt) loadImageFlex(img, img.dataset.serviceArt);
    else loadImage(img, img.dataset.socialArt);
  });
})();


// ==========================================================
// PRICING PAGE (pricing.html): price cards, payment cards, render slot
// Price cards carry data-price-key="<key from commissionPricing>"; the
// price, Robux price and note are filled in from that one list.
// ==========================================================
(function () {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Fills every price card
  function paintPrices() {
    document.querySelectorAll("[data-price-key]").forEach((card) => {
      const item = commissionPricing[card.dataset.priceKey];
      if (!item) return;

      const usd = card.querySelector("[data-price-usd]");
      const robux = card.querySelector("[data-price-robux]");
      const note = card.querySelector("[data-price-note]");

      if (usd) {
        const isSet = item.base > 0;
        usd.textContent = isSet ? formatUsd(item.base) : "Price not set yet";
        usd.classList.toggle("is-unset", !isSet);
      }
      if (robux) setRobux(robux, item.robux);
      if (note && item.note) {
        note.textContent = item.note;
        note.hidden = false;
      }
    });
  }
  paintPrices();

  // 3D hover: the card tilts toward the mouse and a soft light follows it.
  // The tilt is applied to the card FACE; the stage around it stays flat, so
  // the hover area never moves while the card is tilting (no flicker).
  function enableTilt(stage) {
    const MAX_TILT = 5;        // degrees (lower = less sensitive)
    const KEEP_POSE = true;    // true = the card stays as it was when the mouse leaves
    stage.addEventListener("pointerenter", () => stage.classList.add("is-tilting"));
    stage.addEventListener("pointermove", (event) => {
      const box = stage.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
      const y = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
      stage.style.setProperty("--ry", ((x - 0.5) * 2 * MAX_TILT).toFixed(2) + "deg");
      stage.style.setProperty("--rx", ((0.5 - y) * 2 * MAX_TILT).toFixed(2) + "deg");
      stage.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
      stage.style.setProperty("--my", (y * 100).toFixed(1) + "%");
    });
    stage.addEventListener("pointerleave", () => {
      if (KEEP_POSE) return;
      stage.classList.remove("is-tilting");
      stage.style.removeProperty("--rx");
      stage.style.removeProperty("--ry");
    });
  }

  const list = document.querySelector("[data-payment-list]");
  if (list) {
    PAYMENT_METHODS.forEach((method) => {
      const type = PAYMENT_MARKS[method.icon] ? method.icon : "card";
      const item = createEl("li", "pay-card");

      const stage = createEl("div", "pay-card-stage pay-card--" + type);
      stage.setAttribute("aria-hidden", "true");
      const face = createEl("div", "pay-card-face");
      face.appendChild(createEl("span", "pay-card-bg"));
      const mark = createEl("span", "pay-card-mark");
      mark.innerHTML = PAYMENT_MARKS[type];
      const markImage = mark.querySelector(".pay-mark-img");
      if (markImage) {
        mark.classList.add("has-image");
        stage.classList.add("has-art");
        markImage.addEventListener("error", () => {
          mark.classList.remove("has-image");
          stage.classList.remove("has-art");
          mark.innerHTML = PAYMENT_DRAWN_MARKS[type] || "";
        });
      }
      face.appendChild(mark);
      face.appendChild(createEl("span", "pay-card-glare"));
      stage.appendChild(face);

      const caption = createEl("p", "pay-card-caption");
      caption.appendChild(createEl("span", "pay-card-name", method.label));
      if (method.detail) caption.appendChild(createEl("span", "pay-card-detail", method.detail));

      item.appendChild(stage);
      item.appendChild(caption);
      list.appendChild(item);
      if (canHover && !reduceMotion) enableTilt(stage);
    });
    if (!PAYMENT_METHODS.length) {
      const section = list.closest(".payments");
      if (section) section.hidden = true;
    }
  }

  // Your own render next to the payment methods (PNG with a transparent
  // background works best). The slot shows a placeholder until the file exists.
  const slot = document.querySelector("[data-render-slot]");
  if (slot) {
    const img = slot.querySelector("img");
    if (img) {
      img.addEventListener("load", () => slot.classList.add("has-render"));
      loadImageFlex(img, img.dataset.renderArt);
    }
  }
})();


// ==========================================================
// HERO RATING (index.html)
// Average of every rating in REVIEWS, so it updates by itself when you
// replace the placeholder reviews. Stays hidden if there are no reviews.
// ==========================================================
(function () {
  const box = document.querySelector("[data-rating-summary]");
  if (!box) return;

  const ratings = REVIEWS.map((review) => Number(review.rating)).filter((n) => n >= 1 && n <= 5);
  if (!ratings.length) return;

  const average = ratings.reduce((sum, n) => sum + n, 0) / ratings.length;
  const score = (Math.round(average * 10) / 10).toFixed(1);
  const count = ratings.length + (ratings.length === 1 ? " review" : " reviews");

  box.querySelector("[data-rating-score]").textContent = score;
  box.querySelector("[data-rating-count]").textContent = count;
  box.querySelector("[data-rating-fill]").style.width = (average / 5 * 100) + "%";
  box.setAttribute("aria-label", "Rated " + score + " out of 5 from " + count + ". See all reviews");
  box.hidden = false;
})();


// ==========================================================
// COMMISSION ESTIMATE CALCULATOR (pricing.html)
// Reads commissionPricing (top of this file) and shows
// base price x quantity, in dollars and Robux. An estimate only: no checkout, no payment.
// ==========================================================
(function () {
  const root = document.querySelector("[data-calculator]");
  if (!root) return;

  const chipHolder = root.querySelector("[data-calc-services]");
  const qtyInput = root.querySelector("[data-calc-qty]");
  const minusButton = root.querySelector("[data-calc-minus]");
  const plusButton = root.querySelector("[data-calc-plus]");
  const totalEl = root.querySelector("[data-calc-total]");
  const breakdownEl = root.querySelector("[data-calc-breakdown]");
  const noteEl = root.querySelector("[data-calc-note]");
  const robuxEl = root.querySelector("[data-calc-robux]");

  const max = commissionSettings.maxQuantity;
  const keys = Object.keys(commissionPricing);
  let selected = keys[0];

  qtyInput.min = "1";
  qtyInput.max = String(max);

  function getQuantity() {
    const n = parseInt(qtyInput.value, 10);
    if (!Number.isFinite(n)) return 1;
    return Math.min(Math.max(n, 1), max);
  }

  function update() {
    const item = commissionPricing[selected];
    const quantity = getQuantity();

    minusButton.disabled = quantity <= 1;
    plusButton.disabled = quantity >= max;

    if (item.base > 0) {
      totalEl.textContent = formatUsd(item.base * quantity);
      totalEl.classList.remove("is-unset");
      setRobux(robuxEl, item.robux * quantity, "or ");
      breakdownEl.textContent = quantity + " \u00d7 " + item.label + " at " + formatUsd(item.base) + " each";
      noteEl.textContent = (item.note ? item.note + " " : "") +
        "Only an estimate. The final details are agreed with you before any work starts.";
    } else {
      totalEl.textContent = "Price not set yet";
      totalEl.classList.add("is-unset");
      setRobux(robuxEl, 0);
      breakdownEl.textContent = quantity + " \u00d7 " + item.label;
      noteEl.textContent = "Prices have not been added yet. Start a commission and we will talk it through.";
    }
  }

  keys.forEach((key) => {
    const item = commissionPricing[key];
    const chip = createEl("button", "filter-chip", item.label);
    chip.type = "button";
    chip.dataset.category = item.category || "Custom";
    chip.setAttribute("aria-pressed", key === selected ? "true" : "false");
    chip.addEventListener("click", () => {
      selected = key;
      chipHolder.querySelectorAll(".filter-chip").forEach((other) => {
        other.setAttribute("aria-pressed", other === chip ? "true" : "false");
      });
      update();
    });
    chipHolder.appendChild(chip);
  });

  minusButton.addEventListener("click", () => {
    qtyInput.value = String(Math.max(getQuantity() - 1, 1));
    update();
  });

  plusButton.addEventListener("click", () => {
    qtyInput.value = String(Math.min(getQuantity() + 1, max));
    update();
  });

  qtyInput.addEventListener("input", update);
  qtyInput.addEventListener("change", () => {
    qtyInput.value = String(getQuantity());
    update();
  });

  update();
})();


// ==========================================================
// FULL-SIZE VIEWER SETTINGS  <-- true = on, false = off
// The viewer that opens when a piece is clicked (portfolio and About page).
//   filmstrip        - the row of small previews under the picture
//   ambientGlow      - a soft blurred glow behind the picture, taken from the picture
// ==========================================================
const LIGHTBOX_SETTINGS = {
  filmstrip: true,
  ambientGlow: true
};


// ==========================================================
// PORTFOLIO PAGE (work.html)
// Builds the gallery inside [data-portfolio-grid] from WORK_ITEMS and
// filters it with the buttons in [data-portfolio-filters].
// Every piece opens in a full-size viewer (lightbox).
// The category can also come from the address, e.g.
//   work.html#game-thumbnails   work.html#renders   work.html#ui-ux
// and one piece can be opened directly with its id: work.html#renders/21
// Older menu links (#gfx, #thumbnails, #logos, #ui) still work.
// ==========================================================
(function () {
  const portfolioGrid = document.querySelector("[data-portfolio-grid]");
  const bar = document.querySelector("[data-portfolio-filters]");
  // about.html: a few pieces in the same cards and the same viewer.
  // <div data-glimpse-grid="1,3,2"> lists the WORK_ITEMS ids to show, in order.
  const glimpseGrid = document.querySelector("[data-glimpse-grid]");
  const grid = portfolioGrid || glimpseGrid;
  if (!grid || (portfolioGrid && !bar)) return;

  const buttons = bar ? Array.from(bar.querySelectorAll("[data-filter]")) : [];
  const note = document.querySelector("[data-filter-note]");

  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // Address slug -> category
  const SLUGS = { all: "All" };
  WORK_CATEGORIES.forEach((name) => { SLUGS[slugify(name)] = name; });
  // Links from the Work menu, written before the categories changed
  SLUGS.gfx = "All";
  SLUGS.thumbnails = "YouTube Thumbnails";
  SLUGS.logos = "More";
  SLUGS.ui = "UI/UX";
  SLUGS.ads = "Ads & Posters";

  // One short line under the filters. Change the wording freely.
  const FILTER_NOTES = {
    "All": "Everything in one pile.",
    "Game Thumbnails": "The first thing players see.",
    "Game Icons": "Small squares, big first impressions.",
    "Profile Pictures": "A face for your profile.",
    "Commission Sheets": "Everything about a commission, on one sheet.",
    "Ads & Posters": "Promo art that stops the scroll.",
    "Renders": "Renders and key art for games, groups and events.",
    "YouTube Thumbnails": "Made to get clicked.",
    "Social Banners": "Banners sized right for every platform.",
    "UI/UX": "Menus you can actually read.",
    "More": "Everything that does not fit in a box."
  };

  function formatOf(category) {
    return WORK_FORMATS[category] || { width: 4, height: 3, fit: "contain" };
  }

  // Warns in the browser console when a file does not match its category's
  // format, so a wrong export is easy to spot. Nothing changes on the page.
  function checkFormat(img, item) {
    const format = formatOf(item.category);
    if (format.fit === "contain") return;
    img.addEventListener("load", () => {
      const expected = format.width / format.height;
      const actual = img.naturalWidth / img.naturalHeight;
      if (Math.abs(actual - expected) / expected > 0.01) {
        console.warn(
          item.image + " is " + img.naturalWidth + "x" + img.naturalHeight +
          " but " + item.category + " should be " + format.width + "x" + format.height + "."
        );
      }
    });
  }

  let currentList = [];
  let activeCategory = "All";

  function render(category) {
    closeViewer(false, true);
    activeCategory = category;
    grid.textContent = "";
    const list = portfolioGrid
      ? (category === "All" ? WORK_ITEMS : WORK_ITEMS.filter((item) => item.category === category))
      : glimpseGrid.dataset.glimpseGrid.split(",")
          .map((id) => WORK_ITEMS.find((item) => String(item.id) === id.trim()))
          .filter(Boolean);
    currentList = list;

    // Categories without any piece (e.g. "More") only show the "More coming soon" line below
    if (!list.length && !(portfolioGrid && category !== "All")) {
      grid.appendChild(createEl("p", "portfolio-empty", "Nothing in this category yet."));
    }

    // Layout: pieces that are all landscape get two wide columns, all
    // squares get three, anything mixed flows in three columns.
    const ratios = list.map((item) => formatOf(item.category).width / formatOf(item.category).height);
    let layout = "mixed";
    if (ratios.length && ratios.every((r) => r > 1.2)) layout = "landscape";
    else if (ratios.length && ratios.every((r) => r === 1)) layout = "square";
    grid.dataset.layout = layout;

    list.forEach((item, index) => {
      const format = formatOf(item.category);
      const card = createEl("figure", "portfolio-item");
      card.dataset.category = item.category;
      if (format.fit) card.dataset.fit = format.fit;
      card.style.setProperty("--i", String(Math.min(index, 8)));
      card.style.setProperty("--art-ratio", format.width + " / " + format.height);

      // The whole picture is a link to the full-size image, opened in the viewer
      const art = createEl("a", "portfolio-art");
      art.href = item.image;
      art.setAttribute("aria-label", "View full size: " + item.title + ", " + item.category);
      art.addEventListener("click", (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openViewer(index, art);
      });


      const img = createEl("img", "work-image");
      img.alt = item.alt || item.category + " artwork by Bcraft Designs";
      img.loading = "lazy";
      img.decoding = "async";
      checkFormat(img, item);
      loadImage(img, item.image);
      art.appendChild(img);
      decorateArt(card, art, img, item);
      card.appendChild(art);

      const caption = createEl("figcaption", "portfolio-caption");
      caption.appendChild(createEl("span", "tag", item.label));
      card.appendChild(caption);

      grid.appendChild(card);
    });

    // "More coming soon" at the end of every section of the portfolio page
    if (portfolioGrid) {
      grid.appendChild(createEl("p", "portfolio-soon", "More coming soon"));
    }

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === category));
    });

    if (note) note.textContent = FILTER_NOTES[category] || "";
    if (surpriseButton) surpriseButton.hidden = !list.length;
  }

  // ----------------------------------------------------------
  // SURPRISE ME (work.html)
  // The dashed button at the end of the filters opens a random piece of
  // the current list in the viewer.
  // ----------------------------------------------------------
  const surpriseButton = document.querySelector("[data-surprise]");
  let lastSurprise = -1;
  if (portfolioGrid && surpriseButton) {
    surpriseButton.addEventListener("click", () => {
      if (!currentList.length) return;
      let pick = Math.floor(Math.random() * currentList.length);
      if (currentList.length > 1 && pick === lastSurprise) pick = (pick + 1) % currentList.length;
      lastSurprise = pick;
      document.dispatchEvent(new CustomEvent("portfolio:surprise"));
      openViewer(pick, surpriseButton);
    });
  }

  // ----------------------------------------------------------
  // FULL-SIZE VIEWER (lightbox)
  // Built the first time a piece is opened. What it can do:
  //   - top left: the category and where you are ("Renders  ·  2 / 6")
  //   - big arrows, arrow keys, swipe, or the small previews at the bottom
  //   - zoom: click / double-tap, scroll wheel, pinch, + and -; drag to move
  //   - fullscreen (F), copy link (C), help (?)
  //   - "Order one like this": opens the matching product on pricing.html
    //   - a soft glow behind the picture, taken from the picture itself
  //   - every piece has its own link: work.html#renders/21 opens it directly
  // Esc steps back: closes help, then un-zooms, then closes the viewer.
  // Settings: LIGHTBOX_SETTINGS (above this section).
  // ----------------------------------------------------------
  const LB_ICONS = {
    prev:    '<path d="M15 5l-7 7 7 7"/>',
    next:    '<path d="M9 5l7 7-7 7"/>',
    expand:  '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    shrink:  '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
    link:    '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    help:    '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1.1.9-1.1 1.7M12 17h.01"/>',
    close:   '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow:   '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };

  function lbIcon(name, size) {
    const px = size || 20;
    return '<svg viewBox="0 0 24 24" width="' + px + '" height="' + px + '" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      LB_ICONS[name] + '</svg>';
  }

  function lbButton(icon, label, className, size) {
    const button = createEl("button", className);
    button.type = "button";
    button.title = label;
    button.setAttribute("aria-label", label);
    button.innerHTML = lbIcon(icon, size);
    return button;
  }

  const LB_SHORTCUTS = [
    ["\u2190 \u2192", "Browse the pieces"],
    ["Click", "Zoom in and out"],
    ["Scroll  + \u2212", "Zoom at the cursor"],
    ["0", "Back to fit"],
    ["F", "Fullscreen"],
    ["C", "Copy a link to this piece"],
    ["Esc", "Back / close"]
  ];

  const calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const touchOnly = window.matchMedia("(hover: none)");
  const resolvedImages = new Map();   // image path -> Promise of the file that really exists (or null)

  let viewer = null;
  let viewerIndex = 0;
  let viewerOpener = null;
  let viewerOpen = false;
  let loadToken = 0;                  // ignores an image that finishes loading after you moved on
  let zoom = { s: 1, x: 0, y: 0 };    // scale and the move of the picture, in px
  let toastTimer = 0;
  let ambientIndex = 0;
  let stripFor = null;                // the list the previews at the bottom were built for
  let hintShown = false;

  // Finds the file that exists (png, webp, jpg ...). Cached, so it also preloads.
  function resolveImage(item) {
    if (!resolvedImages.has(item.image)) resolvedImages.set(item.image, probeImage(item.image));
    return resolvedImages.get(item.image);
  }

  function buildViewer() {
    const root = createEl("div", "lightbox");
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Full size artwork viewer");
    root.tabIndex = -1;

    // Two layers that cross-fade, so the glow behind the picture changes softly
    const ambient = [createEl("div", "lightbox-ambient"), createEl("div", "lightbox-ambient")];
    ambient.forEach((layer) => {
      layer.setAttribute("aria-hidden", "true");
      root.appendChild(layer);
    });

    // ----- Top bar: category + counter on the left, tools on the right -----
    const bar = createEl("div", "lightbox-bar");
    const count = createEl("p", "lightbox-count");
    const countCat = createEl("span", "lightbox-count-cat");
    const countPos = createEl("span", "lightbox-count-pos");
    count.appendChild(countCat);
    count.appendChild(countPos);
    const info = createEl("div", "lightbox-info");
    info.appendChild(count);

    const tools = createEl("div", "lightbox-tools");
    const orderButton = createEl("button", "lightbox-order");
    orderButton.type = "button";
    orderButton.title = "Order one like this piece";
    orderButton.innerHTML = '<span class="lb-order-long">Order one like this</span><span class="lb-order-short">Order</span>' + lbIcon("arrow", 16);
    const fullButton = lbButton("expand", "Fullscreen (F)", "lightbox-icon lb-hide-sm");
    const linkButton = lbButton("link", "Copy link to this piece (C)", "lightbox-icon");
    const helpButton = lbButton("help", "Keyboard shortcuts (?)", "lightbox-icon lb-hide-sm");
    const divider = createEl("span", "lightbox-tools-divider");
    divider.setAttribute("aria-hidden", "true");
    const close = lbButton("close", "Close (Esc)", "lightbox-icon lightbox-close", 18);

    fullButton.hidden = !document.fullscreenEnabled;
    [orderButton, fullButton, linkButton, helpButton, divider, close]
      .forEach((node) => tools.appendChild(node));
    bar.appendChild(info);
    bar.appendChild(tools);

    // ----- Stage: the picture, with big arrows on both sides -----
    const main = createEl("div", "lightbox-main");
    const stage = createEl("div", "lightbox-stage");
    const pan = createEl("div", "lightbox-pan");
    const img = createEl("img", "lightbox-image");
    img.alt = "";
    img.draggable = false;
    pan.appendChild(img);
    const missing = createEl("p", "lightbox-missing");
    missing.hidden = true;
    const spinner = createEl("span", "lightbox-spinner");
    spinner.setAttribute("aria-hidden", "true");
    stage.appendChild(pan);
    stage.appendChild(missing);
    stage.appendChild(spinner);

    const prev = lbButton("prev", "Previous (\u2190)", "lightbox-arrow lightbox-arrow--prev", 24);
    const next = lbButton("next", "Next (\u2192)", "lightbox-arrow lightbox-arrow--next", 24);
    main.appendChild(stage);
    main.appendChild(prev);
    main.appendChild(next);

    // ----- Previews along the bottom -----
    const strip = createEl("div", "lightbox-strip");
    strip.setAttribute("role", "group");
    strip.setAttribute("aria-label", "All pieces in this category");

    const toast = createEl("p", "lightbox-toast");
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");

    // ----- Shortcut help -----
    const help = createEl("div", "lightbox-help");
    help.hidden = true;
    help.appendChild(createEl("p", "lightbox-help-title", "Keyboard & touch"));
    LB_SHORTCUTS.forEach((row) => {
      const line = createEl("p", "lightbox-help-row");
      line.appendChild(createEl("span", "", row[1]));
      line.appendChild(createEl("kbd", "", row[0]));
      help.appendChild(line);
    });
    help.appendChild(createEl("p", "lightbox-help-note", "On a phone: swipe to browse, pinch or tap to zoom, swipe down to close."));

    root.appendChild(bar);
    root.appendChild(main);
    root.appendChild(strip);
    root.appendChild(toast);
    root.appendChild(help);
    document.body.appendChild(root);

    viewer = {
      root, ambient, countCat, countPos, orderButton, fullButton,
      linkButton, helpButton, close, stage, pan, img, missing, prev, next, strip, thumbs: [], toast, help
    };

    // ----- Buttons -----
    prev.addEventListener("click", () => step(-1));
    next.addEventListener("click", () => step(1));
    close.addEventListener("click", () => closeViewer(true));
    fullButton.addEventListener("click", toggleFullscreen);
    linkButton.addEventListener("click", copyLink);
    orderButton.addEventListener("click", orderLikeThis);
    helpButton.addEventListener("click", () => toggleHelp());

    document.addEventListener("fullscreenchange", () => {
      const on = document.fullscreenElement === root;
      fullButton.innerHTML = lbIcon(on ? "shrink" : "expand");
      fullButton.setAttribute("aria-pressed", String(on));
    });

    // ----- Picture events -----
    img.addEventListener("load", () => onImageLoaded(img));
    img.addEventListener("error", () => {
      const item = currentList[viewerIndex];
      root.classList.remove("is-loading");
      img.classList.remove("is-ready");
      showMissing(item);
    });

    // Mouse wheel / trackpad: zoom towards the cursor
    stage.addEventListener("wheel", (event) => {
      event.preventDefault();
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      zoomAt(zoom.s * Math.exp(-delta * (event.ctrlKey ? 0.01 : 0.0016)), event.clientX, event.clientY);
      zoomToast();
    }, { passive: false });

    // One pointer: tap = zoom, drag = move (zoomed) or swipe (touch). Two pointers: pinch.
    const pointers = new Map();
    let gesture = null;

    stage.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      try { stage.setPointerCapture(event.pointerId); } catch (error) { /* ignore */ }
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 1) {
        gesture = {
          id: event.pointerId, startX: event.clientX, startY: event.clientY, time: Date.now(),
          x0: zoom.x, y0: zoom.y, moved: false, pinched: false, pinch: null,
          target: event.target, touch: event.pointerType !== "mouse"
        };
      } else if (pointers.size === 2 && gesture) {
        const [a, b] = Array.from(pointers.values());
        gesture.pinched = true;
        gesture.pinch = {
          d: Math.hypot(a.x - b.x, a.y - b.y) || 1,
          cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, s: zoom.s, x: zoom.x, y: zoom.y
        };
        pan.classList.add("is-dragging");
      }
    });

    stage.addEventListener("pointermove", (event) => {
      if (!gesture || !pointers.has(event.pointerId)) return;
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (gesture.pinch && pointers.size >= 2) {
        const [a, b] = Array.from(pointers.values());
        const box = stage.getBoundingClientRect();
        const ox = box.left + box.width / 2;
        const oy = box.top + box.height / 2;
        const cx = (a.x + b.x) / 2;
        const cy = (a.y + b.y) / 2;
        const p = gesture.pinch;
        const s = Math.min(maxScale(), Math.max(1, p.s * Math.hypot(a.x - b.x, a.y - b.y) / p.d));
        const k = s / p.s;
        zoom.s = s;
        zoom.x = (cx - ox) - k * (p.cx - ox - p.x);
        zoom.y = (cy - oy) - k * (p.cy - oy - p.y);
        applyZoom();
        return;
      }
      if (event.pointerId !== gesture.id) return;

      const dx = event.clientX - gesture.startX;
      const dy = event.clientY - gesture.startY;
      if (!gesture.moved && Math.hypot(dx, dy) > 6) {
        gesture.moved = true;
        pan.classList.add("is-dragging");
      }
      if (!gesture.moved) return;

      if (zoom.s > 1.01) {
        zoom.x = gesture.x0 + dx;
        zoom.y = gesture.y0 + dy;
        applyZoom();
      } else if (gesture.touch && !gesture.pinched) {
        // The picture follows the finger a little, so a swipe feels alive
        pan.style.transform = "translate3d(" + (dx * 0.6) + "px," + (Math.max(0, dy) * 0.6) + "px,0)";
      }
    });

    function endPointer(event) {
      if (!pointers.has(event.pointerId)) return;
      pointers.delete(event.pointerId);
      if (!gesture) return;

      // One finger of a pinch lifted: carry on with the other one
      if (pointers.size > 0) {
        const [id, point] = Array.from(pointers.entries())[0];
        gesture.id = id;
        gesture.startX = point.x;
        gesture.startY = point.y;
        gesture.x0 = zoom.x;
        gesture.y0 = zoom.y;
        gesture.pinch = null;
        return;
      }

      const g = gesture;
      gesture = null;
      pan.classList.remove("is-dragging");
      if (event.type === "pointercancel") { applyZoom(); return; }

      if (g.pinched) {
        if (zoom.s < 1.05) resetZoom(); else applyZoom();
        return;
      }

      const dx = event.clientX - g.startX;
      const dy = event.clientY - g.startY;

      // A tap: on the picture it zooms, on the dark area it un-zooms or closes
      if (!g.moved && Date.now() - g.time < 500) {
        if (g.target === img) {
          toggleZoom(event.clientX, event.clientY);
          zoomToast();
        } else if (zoom.s > 1.01) {
          resetZoom();
        } else {
          closeViewer(true);
        }
        return;
      }

      // A swipe (touch, not zoomed): sideways = next / previous, down = close
      if (zoom.s <= 1.01 && g.touch) {
        if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.2 && currentList.length > 1) {
          applyZoom();
          step(dx < 0 ? 1 : -1);
        } else if (dy > 110 && dy > Math.abs(dx)) {
          closeViewer(true);
        } else {
          applyZoom();
        }
      } else {
        applyZoom();
      }
    }
    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);

    window.addEventListener("resize", () => {
      if (!viewerOpen) return;
      fitImage();
      applyZoom();
    });
  }

  // ----- Fit and zoom -----
  // The picture is sized in JS (never larger than its real size, never larger than the
  // free space), so zoom and move limits are exact.
  function fitImage() {
    const img = viewer.img;
    if (!img.naturalWidth) return;
    const pad = touchOnly.matches ? 8 : 20;
    const availW = viewer.stage.clientWidth - pad * 2;
    const availH = viewer.stage.clientHeight - pad * 2;
    if (availW <= 0 || availH <= 0) return;
    const ratio = Math.min(availW / img.naturalWidth, availH / img.naturalHeight, 1);
    img.style.width = Math.round(img.naturalWidth * ratio) + "px";
    img.style.height = Math.round(img.naturalHeight * ratio) + "px";
  }

  function maxScale() {
    const shown = viewer.img.offsetWidth || 1;
    return Math.min(8, Math.max(3, (viewer.img.naturalWidth / shown) * 2));
  }

  function clampPan() {
    const w = viewer.img.offsetWidth * zoom.s;
    const h = viewer.img.offsetHeight * zoom.s;
    const mx = Math.max(0, (w - viewer.stage.clientWidth) / 2);
    const my = Math.max(0, (h - viewer.stage.clientHeight) / 2);
    zoom.x = Math.min(mx, Math.max(-mx, zoom.x));
    zoom.y = Math.min(my, Math.max(-my, zoom.y));
  }

  function applyZoom() {
    clampPan();
    const flat = zoom.s === 1 && !zoom.x && !zoom.y;
    viewer.pan.style.transform = flat ? "" : "translate3d(" + zoom.x + "px," + zoom.y + "px,0) scale(" + zoom.s + ")";
    const zoomed = zoom.s > 1.01;
    viewer.root.classList.toggle("is-zoomed", zoomed);
  }

  // Zoom to a scale, keeping the point under (clientX, clientY) where it is
  function zoomAt(scale, clientX, clientY) {
    const box = viewer.stage.getBoundingClientRect();
    const px = (clientX === undefined ? box.left + box.width / 2 : clientX) - (box.left + box.width / 2);
    const py = (clientY === undefined ? box.top + box.height / 2 : clientY) - (box.top + box.height / 2);
    const s = Math.min(maxScale(), Math.max(1, scale));
    const k = s / zoom.s;
    zoom.x = px - k * (px - zoom.x);
    zoom.y = py - k * (py - zoom.y);
    zoom.s = s;
    if (s === 1) { zoom.x = 0; zoom.y = 0; }
    applyZoom();
  }

  function resetZoom() {
    zoom.s = 1;
    zoom.x = 0;
    zoom.y = 0;
    if (viewer) applyZoom();
  }

  function toggleZoom(clientX, clientY) {
    if (zoom.s > 1.01) { resetZoom(); return; }
    // Real pixels (100%), but at least a clear step in
    const real = viewer.img.naturalWidth / Math.max(1, viewer.img.offsetWidth);
    zoomAt(Math.max(2.5, Math.min(real, 4)), clientX, clientY);
  }

  function zoomToast() {
    // 100% means one picture pixel per screen pixel
    const percent = Math.round(zoom.s * viewer.img.offsetWidth / Math.max(1, viewer.img.naturalWidth) * 100);
    showToast(percent + "%", 900);
  }

  // ----- Messages -----
  function showToast(text, ms) {
    viewer.toast.textContent = text;
    viewer.toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => viewer.toast.classList.remove("is-on"), ms || 1800);
  }

  function showMissing(item) {
    viewer.img.classList.remove("is-ready");
    viewer.missing.hidden = false;
    viewer.missing.textContent = "This artwork has not been added yet" + (item ? " (" + item.image + ")." : ".");
  }

  // ----- Showing a piece -----
  function onImageLoaded(img) {
    if (!viewerOpen) return;
    fitImage();
    viewer.missing.hidden = true;
    viewer.root.classList.remove("is-loading");
    img.classList.add("is-ready");
    if (viewer.pendingDirection && !calmMotion.matches && img.animate) {
      img.animate(
        [{ transform: "translateX(" + (viewer.pendingDirection * 40) + "px) scale(0.985)" }, { transform: "none" }],
        { duration: 320, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" }
      );
    }
    viewer.pendingDirection = 0;
  }

  function setAmbient(url) {
    if (!LIGHTBOX_SETTINGS.ambientGlow) return;
    const old = viewer.ambient[ambientIndex];
    ambientIndex = 1 - ambientIndex;
    const fresh = viewer.ambient[ambientIndex];
    fresh.style.backgroundImage = 'url("' + url + '")';
    fresh.classList.add("is-on");
    old.classList.remove("is-on");
  }

  function buildStrip() {
    const list = currentList;
    viewer.strip.textContent = "";
    viewer.thumbs = [];
    list.forEach((item, index) => {
      const format = formatOf(item.category);
      const thumb = createEl("button", "lightbox-thumb");
      thumb.type = "button";
      thumb.tabIndex = -1;   // keyboard users have the arrow keys
      thumb.setAttribute("aria-label", "Show piece " + (index + 1) + " of " + list.length + ", " + item.category);
      thumb.style.aspectRatio = format.fit ? "4 / 3" : format.width + " / " + format.height;
      const image = createEl("img");
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      image.draggable = false;
      thumb.appendChild(image);
      loadImage(image, item.image);
      thumb.addEventListener("click", () => {
        if (index !== viewerIndex) showInViewer(index, index > viewerIndex ? 1 : -1);
      });
      viewer.strip.appendChild(thumb);
      viewer.thumbs.push(thumb);
    });
    stripFor = list;
  }

  function syncStrip(instant) {
    viewer.thumbs.forEach((thumb, index) => {
      const on = index === viewerIndex;
      thumb.classList.toggle("is-current", on);
      if (on) thumb.setAttribute("aria-current", "true"); else thumb.removeAttribute("aria-current");
    });
    const current = viewer.thumbs[viewerIndex];
    if (!current || viewer.strip.hidden) return;
    viewer.strip.scrollTo({
      left: current.offsetLeft - (viewer.strip.clientWidth - current.offsetWidth) / 2,
      behavior: instant || calmMotion.matches ? "auto" : "smooth"
    });
  }

  function addressFor(item) {
    return "#" + (activeCategory === "All" ? "all" : slugify(activeCategory)) + "/" + encodeURIComponent(item.id);
  }

  function showInViewer(index, direction, instant) {
    const count = currentList.length;
    if (!count) return;
    viewerIndex = (index + count) % count;
    const item = currentList[viewerIndex];
    const token = ++loadToken;

    resetZoom();

    // Name (the piece's title, or its category) and position
    viewer.countCat.textContent = item.label;
    viewer.countPos.textContent = count > 1 ? (viewerIndex + 1) + " / " + count : "";
    viewer.prev.hidden = count < 2;
    viewer.next.hidden = count < 2;
    viewer.strip.hidden = count < 2 || !LIGHTBOX_SETTINGS.filmstrip;
    if (stripFor !== currentList) buildStrip();
    syncStrip(instant);

    // Every piece has its own link
    if (portfolioGrid) history.replaceState(null, "", addressFor(item));

    viewer.img.alt = item.alt || item.category + " artwork by Bcraft Designs";
    viewer.img.classList.remove("is-ready");
    viewer.missing.hidden = true;
    viewer.root.classList.add("is-loading");
    viewer.pendingDirection = direction || 0;

    resolveImage(item).then((url) => {
      if (token !== loadToken || !viewerOpen) return;
      if (!url) {
        viewer.root.classList.remove("is-loading");
        showMissing(item);
        return;
      }
      setAmbient(url);
      viewer.img.removeAttribute("src");
      viewer.img.src = url;
      // Get the neighbours ready so the next click is instant
      resolveImage(currentList[(viewerIndex + 1) % count]);
      resolveImage(currentList[(viewerIndex - 1 + count) % count]);
    });
  }

  function step(direction) {
    const count = currentList.length;
    if (count < 2) return;
    const target = viewerIndex + direction;
    if (target >= count) showToast("Back to the first piece", 1200);
    else if (target < 0) showToast("That was the first one, here is the last", 1400);
    showInViewer(target, direction);
  }

  // ----- Fullscreen, link, help -----
  function toggleFullscreen() {
    if (!document.fullscreenEnabled) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (viewer.root.requestFullscreen) {
      viewer.root.requestFullscreen().catch(() => {});
    }
  }

  function copyLink() {
    const item = currentList[viewerIndex];
    if (!item) return;
    const url = new URL("/work/", window.location.href);
    url.hash = slugify(item.category) + "/" + encodeURIComponent(item.id);
    copyText(url.toString()).then((ok) => showToast(ok ? "Link copied" : "Could not copy the link"));
  }

  function toggleHelp(force) {
    const open = force === undefined ? viewer.help.hidden : force;
    viewer.help.hidden = !open;
    viewer.helpButton.setAttribute("aria-pressed", String(open));
  }

  // ----- Order one like this -----
  // Opens the product that matches the piece's category on pricing.html.
  function orderLikeThis() {
    const item = currentList[viewerIndex];
    if (!item) return;
    const slug = WORK_PRICING_SLUG[item.category];
    // Remember the piece, so pricing.html and contact.html can show the "You liked this" banner
    try {
      sessionStorage.setItem(LIKED_PIECE_KEY, JSON.stringify({ id: item.id, category: item.category, image: item.image, slug: slug || "" }));
    } catch (error) { /* storage blocked: the banner is simply skipped */ }
    window.location.href = "/pricing/" + (slug ? "#" + slug : "");
  }

  // ----- Open and close -----
  function openViewer(index, opener) {
    if (!viewer) buildViewer();
    viewerOpener = opener || null;
    viewerOpen = true;
    viewer.root.classList.add("is-open");
    document.documentElement.classList.add("lightbox-lock");
    showInViewer(index, 0, true);
    viewer.close.focus({ preventScroll: true });
    if (!hintShown) {
      hintShown = true;
      showToast(touchOnly.matches ? "Swipe to browse \u00b7 tap to zoom" : "Click to zoom \u00b7 \u2190 \u2192 to browse \u00b7 ? for shortcuts", 2800);
    }
  }

  function closeViewer(returnFocus, keepAddress) {
    if (!viewer || !viewerOpen) return;
    viewerOpen = false;
    loadToken += 1;
    resetZoom();
    toggleHelp(false);
    if (document.fullscreenElement === viewer.root) document.exitFullscreen().catch(() => {});
    viewer.root.classList.remove("is-open", "is-loading");
    document.documentElement.classList.remove("lightbox-lock");
    viewer.img.classList.remove("is-ready");
    viewer.img.removeAttribute("src");
    viewer.ambient.forEach((layer) => layer.classList.remove("is-on"));
    viewer.toast.classList.remove("is-on");

    // Back to the address of the filter (without the piece)
    if (portfolioGrid && !keepAddress) {
      history.replaceState(null, "", activeCategory === "All"
        ? window.location.pathname + window.location.search
        : "#" + slugify(activeCategory));
    }
    if (returnFocus && viewerOpener && document.contains(viewerOpener)) viewerOpener.focus();
    viewerOpener = null;
  }

  document.addEventListener("keydown", (event) => {
    if (!viewerOpen) return;
    const key = event.key;

    if (key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      if (!viewer.help.hidden) toggleHelp(false);
      else if (zoom.s > 1.01) resetZoom();
      else closeViewer(true);
      return;
    }

    if (key === "Tab") {
      // Keep keyboard focus inside the viewer while it is open
      const focusable = Array.from(viewer.root.querySelectorAll("button:not([tabindex='-1'])"))
        .filter((b) => !b.hidden && !b.disabled && b.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!viewer.root.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
      return;
    }

    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const lower = key.length === 1 ? key.toLowerCase() : key;
    let handled = true;

    if (key === "ArrowRight") step(1);
    else if (key === "ArrowLeft") step(-1);
    else if (key === "Home" && currentList.length > 1) showInViewer(0, -1);
    else if (key === "End" && currentList.length > 1) showInViewer(currentList.length - 1, 1);
    else if (key === "+" || key === "=") { zoomAt(zoom.s * 1.4); zoomToast(); }
    else if (key === "-" || key === "_") { zoomAt(zoom.s / 1.4); zoomToast(); }
    else if (key === "0") resetZoom();
    else if (lower === "z") toggleZoom();
    else if (lower === "f") toggleFullscreen();
    else if (lower === "c") copyLink();
    else if (key === "?" || lower === "h") toggleHelp();
    else handled = false;

    if (handled) event.preventDefault();
  }, true);

  // ----- Address: category, and optionally one piece (work.html#renders/21) -----
  function categoryFromAddress() {
    const slug = window.location.hash.replace("#", "").toLowerCase().split("/")[0];
    return SLUGS[slug] || "All";
  }

  function pieceFromAddress() {
    const id = decodeURIComponent(window.location.hash.replace("#", "").split("/")[1] || "");
    return id ? id.toLowerCase() : null;
  }

  function openFromAddress() {
    if (!portfolioGrid) return;
    const id = pieceFromAddress();
    if (id === null) return;
    const index = currentList.findIndex((item) => String(item.id).toLowerCase() === id);
    if (index > -1) openViewer(index, null);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      render(category);
      history.replaceState(null, "", category === "All" ? window.location.pathname + window.location.search : "#" + slugify(category));
    });
  });

  if (portfolioGrid) {
    // Menu links like work.html#renders change the address while the page is open
    window.addEventListener("hashchange", () => {
      render(categoryFromAddress());
      openFromAddress();
    });
    render(categoryFromAddress());
    openFromAddress();
  } else {
    render("All");
  }
})();


// ==========================================================
// TALKING HERO (work.html)
// The floating character's chat bubble reacts to what you do: it comments
// on the filters, on pieces you hover, on Surprise me,
// says something now and then when it is quiet, and has a small secret
// (click the character 5 times).
// Keep the lines short (about 24 characters), the bubble is small.
// ==========================================================
(function () {
  const grid = document.querySelector("[data-portfolio-grid]");
  const bar = document.querySelector("[data-portfolio-filters]");
  const stage = document.querySelector(".hover-stage");
  const floatBox = document.querySelector(".hover-float");
  let bubble = document.querySelector(".hover-bubble");
  if (!grid || !stage || !bubble) return;

  const CATEGORY_LINES = {
    "All": "Take your time :)",
    "Game Thumbnails": "First thing players see",
    "Game Icons": "Tiny, but mighty!",
    "Profile Pictures": "Your face, my art",
    "Commission Sheets": "Sheets, sorted.",
    "Ads & Posters": "Made to stop scrolls",
    "Renders": "Shiny, shiny renders",
    "YouTube Thumbnails": "Click magnets!",
    "Social Banners": "Banner time!",
    "UI/UX": "Menus you can read",
    "More": "Secrets live here"
  };
  const HOVER_LINES = [
    "Ooh, nice pick!", "That one was fun", "Good eye!", "Click it, I dare you",
    "One of my favourites", "Ooh, shiny!", "Go on, open it"
  ];
  const IDLE_LINES = [
    "Psst... Surprise me?", "Still here ;)",
    "Click me five times", "I update regularly ;)"
  ];

  let lastSaid = 0;
  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  // Replacing the bubble restarts its typing animation, then the new line pops in
  function say(text, force) {
    const now = Date.now();
    if (!force && now - lastSaid < 6000) return;
    lastSaid = now;
    const next = bubble.cloneNode(true);
    const line = next.querySelector(".about-bubble-hi");
    if (line) line.textContent = " " + text + " ";
    bubble.replaceWith(next);
    bubble = next;
  }

  if (bar) {
    bar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (button) say(CATEGORY_LINES[button.dataset.filter] || "Have a look!", true);
    });
  }

  let hoverTimer = 0;
  let hoverCard = null;
  grid.addEventListener("mouseover", (event) => {
    const card = event.target.closest(".portfolio-item");
    if (!card || card === hoverCard) return;
    hoverCard = card;
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => say(pick(HOVER_LINES)), 1000);
  });
  grid.addEventListener("mouseleave", () => {
    hoverCard = null;
    clearTimeout(hoverTimer);
  });

  document.addEventListener("portfolio:surprise", () => say("Surprise!", true));

  // A line now and then when nothing happens (only while the hero is on screen)
  setInterval(() => {
    if (document.hidden || Date.now() - lastSaid < 30000) return;
    const box = stage.getBoundingClientRect();
    if (box.bottom < 0 || box.top > window.innerHeight) return;
    say(pick(IDLE_LINES), true);
  }, 10000);

  // The secret: five clicks on the character within 3 seconds
  let clicks = [];
  if (floatBox) {
    floatBox.addEventListener("click", () => {
      const now = Date.now();
      clicks = clicks.filter((time) => now - time < 3000);
      clicks.push(now);
      if (clicks.length < 5) return;
      clicks = [];
      say("You found me!!", true);
      stage.classList.add("is-excited");
      const sparks = [];
      for (let i = 0; i < 16; i += 1) {
        const spark = createEl("span", "hover-spark hover-spark--burst");
        spark.style.setProperty("--x", (18 + Math.random() * 64).toFixed(1) + "%");
        spark.style.setProperty("--d", (1.3 + Math.random() * 1.1).toFixed(2) + "s");
        spark.style.setProperty("--delay", (Math.random() * 0.4).toFixed(2) + "s");
        spark.style.setProperty("--s", (3 + Math.random() * 4).toFixed(1) + "px");
        stage.appendChild(spark);
        sparks.push(spark);
      }
      setTimeout(() => {
        stage.classList.remove("is-excited");
        sparks.forEach((spark) => spark.remove());
      }, 2800);
    });
  }
})();

// ==========================================================
// REVIEWS: card rendering, homepage carousel, reviews page
// Runs on every page and only does something where the matching
// element exists:
//   [data-review-carousel]  homepage carousel (featured reviews)
//   [data-review-archive]   reviews.html (all reviews)
// ==========================================================
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const SVG_NS = "http://www.w3.org/2000/svg";
  const STAR_PATH = "M8 1.3l2.08 4.36 4.77.62-3.5 3.3.88 4.74L8 11.95 3.77 14.32l.88-4.74-3.5-3.3 4.77-.62z";

  // ----- Small helpers -----
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  // ----- Data helpers (the filtering foundation) -----
  // getReviewsByCategory("GFX") already works; "All" returns everything.
  function getReviewsByCategory(category) {
    if (!category || category === "All") return REVIEWS;
    return REVIEWS.filter((review) => review.category === category);
  }

  function getFeaturedReviews() {
    const flagged = REVIEWS.filter((review) => review.featured);
    const pool = flagged.length ? flagged : REVIEWS;
    return pool.slice(0, REVIEWS_FEATURED_LIMIT);
  }

  // ----- Card pieces -----
  function createStars(rating) {
    const value = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    const wrap = el("span", "review-stars");
    wrap.setAttribute("role", "img");
    wrap.setAttribute("aria-label", value + " out of 5 stars");
    for (let i = 0; i < 5; i++) {
      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", "0 0 16 16");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      svg.setAttribute("class", i < value ? "review-star is-on" : "review-star");
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", STAR_PATH);
      svg.appendChild(path);
      wrap.appendChild(svg);
    }
    return wrap;
  }

  function createArtwork(review) {
    const art = el("div", "review-art");
    const placeholder = el("div", "review-art-placeholder");
    placeholder.appendChild(el("p", "review-art-label", "Project artwork"));
    placeholder.appendChild(el("p", "review-art-hint", review.category || "Artwork slot"));
    art.appendChild(placeholder);

    const img = el("img", "review-art-image");
    img.alt = review.projectAlt || ((review.category || "Project") + " artwork made for " + review.name);
    img.loading = "lazy";
    img.decoding = "async";
    art.appendChild(img);
    loadImage(img, review.projectImage);
    return art;
  }

  // First letter or digit of the name, for the fallback circle ("! Xonlz" -> X, fancy letters -> plain)
  function avatarInitial(review) {
    const match = String(review.name || "").normalize("NFKD").match(/[\p{L}\p{N}]/u);
    return match ? match[0].toUpperCase() : "?";
  }

  function avatarAlt(review) {
    return (review.name || "Client") + "'s profile picture";
  }

  function createAvatar(review) {
    const avatar = el("span", "review-avatar");
    const initial = el("span", "review-avatar-initial", avatarInitial(review));
    initial.setAttribute("aria-hidden", "true");
    avatar.appendChild(initial);
    if (review.avatar) {
      const img = el("img", "review-avatar-image");
      img.alt = avatarAlt(review);
      img.width = 40;
      img.height = 40;
      img.loading = "lazy";
      img.referrerPolicy = "no-referrer";
      avatar.appendChild(img);
      loadImage(img, review.avatar);
    }
    return avatar;
  }

  // Badges next to the name (same markup as reviews.html)
  const VERIFIED_HTML = '<span class="review-verified" role="img" aria-label="Verified client" data-tooltip="Verified client"><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path class="review-verified-seal" d="M10 .8l2.1 1.5 2.6-.1 1 2.4 2.3 1.2-.1 2.6 1.5 2.1-1.5 2.1.1 2.6-2.3 1.2-1 2.4-2.6-.1L10 19.2l-2.1-1.5-2.6.1-1-2.4-2.3-1.2.1-2.6L.6 9.5 2.1 7.4 2 4.8l2.3-1.2 1-2.4 2.6.1z"/><path class="review-verified-tick" d="M6.2 10.2l2.5 2.5 5-5.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  const YOUTUBER_HTML = '<span class="review-youtuber" role="img" aria-label="YouTuber" data-tooltip="YouTuber"><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><rect class="review-youtuber-bg" x="0.5" y="3.5" width="19" height="13" rx="4"/><path class="review-youtuber-play" d="M8 7l5 3-5 3z"/></svg></span>';

  function createName(review) {
    const name = el("span", "review-name");
    name.appendChild(document.createTextNode(review.name));
    if (review.verified) name.insertAdjacentHTML("beforeend", " " + VERIFIED_HTML);
    if (review.youtuber) name.insertAdjacentHTML("beforeend", " " + YOUTUBER_HTML);
    return name;
  }

  // A review is a chat-style bubble (artwork, category, stars, text) with
  // the client's name underneath, where the bubble's tail points.
  function createReviewCard(review, options) {
    const card = el("article", "review-card");
    card.dataset.reviewId = review.id;
    card.dataset.category = review.category || "";
    if (options && options.compact) card.classList.add("is-compact");
    if (review.premium) card.classList.add("is-premium");
    if (review.verified) card.classList.add("is-verified");

    const bubble = el("div", "review-bubble");

    if (review.projectImage) {
      card.classList.add("has-artwork");
      bubble.appendChild(createArtwork(review));
    }

    const body = el("div", "review-body");

    const meta = el("div", "review-meta");
    if (review.category) meta.appendChild(el("span", "review-category", review.category));
    meta.appendChild(createStars(review.rating));
    body.appendChild(meta);

    const quote = el("blockquote", "review-text");
    // Homepage (compact): one shortened paragraph so every card stays an even height.
    // Reviews page style (not compact): one paragraph per blank line, full text.
    const parts = String(review.text).split(/\n\s*\n/);
    if (options && options.compact) quote.appendChild(el("p", null, parts.join(" ")));
    else parts.forEach((part) => quote.appendChild(el("p", null, part)));
    body.appendChild(quote);

    bubble.appendChild(body);
    card.appendChild(bubble);

    const author = el("footer", "review-author");
    author.appendChild(createAvatar(review));
    author.appendChild(createName(review));
    if (review.placeholder) {
      author.appendChild(el("span", "review-placeholder-tag", "Placeholder"));
    }
    card.appendChild(author);

    return card;
  }

  // ----- Entrance animation (fades things in as they scroll into view) -----
  let revealObserver = null;

  function observeReveals(nodes) {
    nodes.forEach((node) => {
      if (!("IntersectionObserver" in window)) {
        node.classList.add("is-visible");
        return;
      }
      if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          });
        }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
      }
      revealObserver.observe(node);
    });
  }

  // ----- Reviews page: every review -----
  function renderArchive(grid, category) {
    grid.textContent = "";
    const list = getReviewsByCategory(category);

    if (!list.length) {
      grid.appendChild(el("p", "review-empty", "Reviews are coming soon."));
      return;
    }

    list.forEach((review, index) => {
      const card = createReviewCard(review, { compact: false });
      card.classList.add("reveal");
      card.style.setProperty("--reveal-i", String(index % 3));
      grid.appendChild(card);
    });
    observeReveals(grid.querySelectorAll(".reveal"));
  }

  // ----- reviews.html grid: built from REVIEWS (same markup the page always had) -----
  function createPageCard(review) {
    const card = el("article", "review-card");
    if (review.premium) card.classList.add("is-premium");
    if (review.premium && review.verified) card.classList.add("is-verified");

    const bubble = el("div", "review-bubble");
    const body = el("div", "review-body");
    const meta = el("div", "review-meta");

    const value = Math.max(0, Math.min(5, Math.round(Number(review.rating) || 0)));
    const stars = el("div", "review-stars");
    stars.setAttribute("role", "img");
    stars.setAttribute("aria-label", value + " out of 5 stars");
    for (let i = 0; i < 5; i++) {
      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("class", i < value ? "review-star is-on" : "review-star");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      const use = document.createElementNS(SVG_NS, "use");
      use.setAttribute("href", "#review-star-shape");
      svg.appendChild(use);
      stars.appendChild(svg);
    }
    meta.appendChild(stars);
    body.appendChild(meta);

    const text = el("div", "review-text");
    String(review.text).split(/\n\s*\n/).forEach((part) => text.appendChild(el("p", null, part)));
    body.appendChild(text);
    bubble.appendChild(body);
    card.appendChild(bubble);

    const author = el("div", "review-author");
    const avatar = el("span", "review-avatar");
    const initial = el("span", null, avatarInitial(review));
    initial.setAttribute("aria-hidden", "true");
    avatar.appendChild(initial);
    if (review.avatar) {
      const img = el("img", "review-avatar-image");
      img.referrerPolicy = "no-referrer";
      img.alt = avatarAlt(review);
      img.width = 40;
      img.height = 40;
      img.loading = "lazy";
      // Inline handlers (not addEventListener) so the featured strip, which clones these cards, keeps them.
      // If the picture is missing, it is removed and the letter circle stays.
      img.setAttribute("onload", "this.classList.add('is-loaded')");
      img.setAttribute("onerror", "this.remove()");
      img.src = review.avatar;
      avatar.appendChild(img);
    }
    author.appendChild(avatar);
    author.appendChild(createName(review));
    card.appendChild(author);
    return card;
  }

  function renderPageGrid(grid) {
    grid.textContent = "";
    REVIEWS.slice()
      .sort((a, b) => (a.pageOrder || 0) - (b.pageOrder || 0))
      .forEach((review) => grid.appendChild(createPageCard(review)));
  }

  // ----- Homepage: calm, swipeable carousel of featured reviews -----
  function initCarousel(root) {
    const track = root.querySelector("[data-review-track]");
    const controls = root.querySelector(".review-controls");
    const prev = root.querySelector("[data-review-prev]");
    const next = root.querySelector("[data-review-next]");
    const dotsBox = root.querySelector("[data-review-dots]");

    const list = getFeaturedReviews();
    if (!list.length) {
      track.appendChild(el("p", "review-empty", "Reviews are coming soon."));
      controls.hidden = true;
      return;
    }
    list.forEach((review) => track.appendChild(createReviewCard(review, { compact: false })));

    const MAX_DOTS = 12;  // more pages than this: show "3 / 10" instead of dots
    let step = 1;         // distance between two cards
    let pageStep = 1;     // distance between two pages (one screenful of cards)
    let max = 0;          // furthest the track can scroll
    let pages = 1;        // number of dots
    let counter = null;
    let ticking = false;

    function measure() {
      const first = track.firstElementChild;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.columnGap) || 0;
      const inner = track.clientWidth - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0);
      step = first ? first.getBoundingClientRect().width + gap : 1;
      const perPage = Math.max(1, Math.round((inner + gap) / step));
      pageStep = step * perPage;
      max = Math.max(0, track.scrollWidth - track.clientWidth);
      pages = max > 2 ? Math.ceil((max - 2) / pageStep) + 1 : 1;
    }

    function currentPage() {
      if (track.scrollLeft >= max - 2) return pages - 1;
      return Math.min(pages - 1, Math.round(track.scrollLeft / pageStep));
    }

    function goTo(page) {
      const target = Math.min(Math.max(page, 0) * pageStep, max);
      track.scrollTo({ left: target, behavior: reduceMotion.matches ? "auto" : "smooth" });
    }

    function buildDots() {
      if (pages > MAX_DOTS) {
        if (!counter) {
          dotsBox.textContent = "";
          counter = el("span", "review-count");
          dotsBox.appendChild(counter);
        }
        return;
      }
      if (counter) {
        counter = null;
        dotsBox.textContent = "";
      }
      if (dotsBox.children.length === pages) return;
      dotsBox.textContent = "";
      for (let i = 0; i < pages; i++) {
        const dot = el("button", "review-dot");
        dot.type = "button";
        dot.setAttribute("aria-label", "Show reviews, page " + (i + 1) + " of " + pages);
        dot.addEventListener("click", () => goTo(i));
        dotsBox.appendChild(dot);
      }
    }

    function update() {
      measure();
      buildDots();
      controls.hidden = pages <= 1;

      const page = currentPage();
      if (counter) {
        counter.textContent = (page + 1) + " / " + pages;
        counter.setAttribute("aria-label", "Page " + (page + 1) + " of " + pages);
      } else {
        Array.from(dotsBox.children).forEach((dot, index) => {
          dot.classList.toggle("is-active", index === page);
          if (index === page) dot.setAttribute("aria-current", "true");
          else dot.removeAttribute("aria-current");
        });
      }
      prev.setAttribute("aria-disabled", String(page === 0));
      next.setAttribute("aria-disabled", String(page === pages - 1));
    }

    function scheduleUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    }

    prev.addEventListener("click", () => goTo(currentPage() - 1));
    next.addEventListener("click", () => goTo(currentPage() + 1));

    // Arrow keys / Home / End when the carousel has keyboard focus
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); goTo(currentPage() + 1); }
      if (event.key === "ArrowLeft")  { event.preventDefault(); goTo(currentPage() - 1); }
      if (event.key === "Home")       { event.preventDefault(); goTo(0); }
      if (event.key === "End")        { event.preventDefault(); goTo(pages - 1); }
    });

    track.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);
    update();
  }

  // ----- Start -----
  const carousel = document.querySelector("[data-review-carousel]");
  if (carousel) initCarousel(carousel);

  const pageGrid = document.querySelector("[data-review-grid]");
  if (pageGrid) renderPageGrid(pageGrid);

  const archive = document.querySelector("[data-review-archive]");
  if (archive) renderArchive(archive, "All");

  document.querySelectorAll("[data-reveal]").forEach((node) => {
    node.classList.add("reveal");
    node.style.setProperty("--reveal-i", node.dataset.revealIndex || "0");
  });
  observeReveals(document.querySelectorAll("[data-reveal]"));

  // Footer year (fixed at 2026)
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = "2026";
  });
})();


// ==========================================================
// HERO: artwork slots + subtle depth shift
// Fills the image slots from HERO_ARTWORK. On large screens with a
// real mouse, the layered panels drift a few pixels with the cursor.
// Off on touch devices and with reduced motion.
// ==========================================================
(function () {
  const visual = document.querySelector("[data-hero-visual]");
  if (!visual) return;

  // ----- Slideshow: the first image is the <img> already in the page; the others are
  // found and added one by one. Each switch = a soft fade and drift (see style.css, .hero-slide).
  function initHeroSlideshow(slot, firstImg, data) {
    const frame = slot.querySelector(".hero-art-frame");
    const heroEl = visual.closest(".hero");
    if (!frame || !heroEl) { loadImage(firstImg, data.image); return; }

    const cfg = HERO_SLIDESHOW;
    const explicit = Array.isArray(cfg.images) && cfg.images.length > 0;
    const sources = [];
    if (explicit) {
      cfg.images.forEach((s) => sources.push(s));
    } else {
      for (let n = 1; n <= cfg.maxSlides; n++) sources.push(cfg.folder + cfg.prefix + String(n).padStart(2, "0") + ".webp");
      if (data.image) sources[0] = data.image;
    }

    const sheen = createEl("span", "hero-sheen");
    sheen.setAttribute("aria-hidden", "true");
    frame.appendChild(sheen);

    const dots = createEl("div", "hero-dots");
    dots.setAttribute("role", "group");
    dots.setAttribute("aria-label", "Featured artwork");
    dots.hidden = true;
    heroEl.appendChild(dots);
    heroEl.style.setProperty("--hero-interval", cfg.interval + "ms");

    const slides = [];
    const dotButtons = [];
    let current = 0, timer = 0, leaveTimer = 0;

    function updateDots() {
      dotButtons.forEach((dot, i) => {
        const on = i === current;
        dot.classList.toggle("is-current", on);
        dot.setAttribute("aria-current", on ? "true" : "false");
      });
    }

    function go(i) {
      if (i === current || !slides[i]) return;
      const prev = slides[current];
      const next = slides[i];
      clearTimeout(leaveTimer);
      slides.forEach((s) => {
        s.classList.remove("is-first");
        if (s !== prev && s !== next) s.classList.remove("is-active", "is-leaving");
      });
      prev.classList.remove("is-active");
      prev.classList.add("is-leaving");   // stays fully visible underneath while the new one fades in
      next.classList.remove("is-leaving");
      next.classList.add("is-active");
      sheen.classList.remove("is-playing");
      void sheen.offsetWidth;
      sheen.classList.add("is-playing");
      current = i;
      updateDots();
      leaveTimer = setTimeout(() => prev.classList.remove("is-leaving"), 1800);
    }

    function schedule() {
      clearTimeout(timer);
      if (slides.length < 2) return;
      const dot = dotButtons[current];
      if (dot) { dot.classList.remove("is-current"); void dot.offsetWidth; dot.classList.add("is-current"); }
      timer = setTimeout(() => {
        if (!document.hidden) go((current + 1) % slides.length);
        schedule();
      }, cfg.interval);
    }

    function register(img) {
      const index = slides.length;
      img.classList.add("hero-slide");
      slides.push(img);
      const dot = createEl("button", "hero-dot");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show artwork " + (index + 1));
      dot.addEventListener("click", () => { go(index); schedule(); });
      dots.appendChild(dot);
      dotButtons.push(dot);
      dots.hidden = slides.length < 2;
      if (index === 0) { img.classList.add("is-active", "is-first"); updateDots(); }
      if (index === 1) schedule();
    }

    function findTheRest() {
      let i = 1;
      const next = () => {
        if (i >= sources.length) return;
        probeImage(sources[i++]).then((found) => {
          if (!found) { if (explicit) next(); return; } // auto-detect stops at the first missing number
          const img = document.createElement("img");
          img.className = "hero-art-image";
          img.alt = "";
          img.setAttribute("aria-hidden", "true");
          img.decoding = "async";
          img.addEventListener("load", () => {
            img.classList.add("is-loaded");
            frame.insertBefore(img, sheen);
            register(img);
            next();
          }, { once: true });
          img.src = found;
        });
      };
      next();
    }

    firstImg.alt = data.alt || "";
    const begin = () => { register(firstImg); findTheRest(); };
    // The <img> now has its src in the HTML, so it may already be loaded before this runs.
    if (firstImg.complete && firstImg.naturalWidth > 0) {
      firstImg.classList.add("is-loaded");
      begin();
    } else {
      firstImg.addEventListener("load", begin, { once: true });
      loadImage(firstImg, sources[0]);
    }
  }

  visual.querySelectorAll("[data-hero-art]").forEach((slot) => {
    const data = HERO_ARTWORK[slot.dataset.heroArt];
    const img = slot.querySelector(".hero-art-image");
    if (!data || !data.image || !img) return;
    img.alt = data.alt || "";
    if (slot.dataset.heroArt === "main") initHeroSlideshow(slot, img, data);
    else loadImage(img, data.image);
  });

  const hero = visual.closest(".hero");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const capable = window.matchMedia("(min-width: 960px) and (hover: hover) and (pointer: fine)");

  let targetX = 0, targetY = 0;   // where the cursor is (-1 to 1)
  let currentX = 0, currentY = 0; // eased value used by the CSS
  let frameId = 0;

  function tick() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    visual.style.setProperty("--mx", currentX.toFixed(3));
    visual.style.setProperty("--my", currentY.toFixed(3));

    const moving = Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002;
    frameId = moving ? requestAnimationFrame(tick) : 0;
  }

  function start() {
    if (!frameId) frameId = requestAnimationFrame(tick);
  }

  // The image keeps following the cursor everywhere (over the headline, the
  // navbar, ...) and only lets go once the cursor reaches the section BELOW
  // the hero, or leaves the window.
  let following = false;

  function release() {
    if (!following) return;
    following = false;
    targetX = 0;
    targetY = 0;
    start();
  }

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || !capable.matches || reduceMotion.matches) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight || event.clientY > rect.bottom) {
      release();
      return;
    }
    following = true;
    targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    start();
  });

  document.documentElement.addEventListener("pointerleave", release);
  window.addEventListener("blur", release);
})();


// ==========================================================
// CURSOR LIGHT
// A soft glow that follows a real mouse pointer (switch: MOUSE_LIGHT near
// the top of this file). It is one small element (#cursor-light) moved with
// a CSS transform, so it stays cheap. Touch screens and visitors who prefer
// reduced motion never see it.
// ==========================================================
(function () {
  const cursorLight = document.getElementById("cursor-light");
  if (!cursorLight) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  function lightAllowed() {
    return MOUSE_LIGHT && !mobileQuery.matches && !reduceMotion.matches;
  }

  function hideLight() {
    cursorLight.classList.remove("is-active");
  }

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || !lightAllowed()) return;
    // Homepage: no cursor light while the pointer is over the hero artwork
    if (IS_HOME_PAGE && event.target instanceof Element && event.target.closest(".hero")) {
      hideLight();
      return;
    }
    cursorLight.style.transform = "translate3d(" + event.clientX + "px, " + event.clientY + "px, 0)";
    cursorLight.classList.add("is-active");
  });

  document.addEventListener("pointerleave", hideLight);
  window.addEventListener("blur", hideLight);
  reduceMotion.addEventListener("change", () => { if (!lightAllowed()) hideLight(); });
  mobileQuery.addEventListener("change", () => { if (!lightAllowed()) hideLight(); });
  if (!lightAllowed()) hideLight();
})();


// ==========================================================
// SALE POPUPS (built here, so no page needs extra HTML)
// Settings are in HALLOWEEN_POPUP, CHRISTMAS_POPUP and SUMMER_POPUP near
// the top of this file. Only one popup shows at a time: the first enabled
// one (Halloween, then Christmas, then Summer).
// ==========================================================
// Shared by the two corner popups (the seasonal sale popup and the welcome offer card):
// the button label scrolls up on hover and a soft shine sweeps across now and then (and once
// on hover). The real label stays for screen readers.
//   opts.gift    - the arrow becomes a little gift whose lid pops open on hover and lets
//                  light out; now and then it wiggles to get noticed (welcome "Redeem")
//   opts.tag     - a little price tag ("20% off") hangs on the button's corner and swings
//                  on a pin when the button is hovered (seasonal popup)
//   neither      - seven stars burst out above the button (not used right now)
function addButtonFx(button, textEl, opts) {
  opts = opts || {};
  if (!button || !textEl || button.classList.contains("hfx-btn")) return;
  const text = textEl.textContent;
  if (!text.trim()) return;
  const mk = (tag, cls) => { const n = document.createElement(tag); n.className = cls; return n; };
  textEl.textContent = "";
  textEl.classList.add("hfx-roll");
  const a = mk("span", "hfx-roll-a");
  const b = mk("span", "hfx-roll-b");
  a.textContent = text;
  b.textContent = text;
  b.setAttribute("aria-hidden", "true");
  textEl.appendChild(a);
  textEl.appendChild(b);

  const shine = mk("span", "hfx-shine");
  shine.setAttribute("aria-hidden", "true");
  button.appendChild(shine);

  if (opts.tag) {
    const tag = mk("span", "hfx-tag");
    tag.setAttribute("aria-hidden", "true");
    const body = mk("span", "hfx-tag-body");
    body.textContent = opts.tag;
    tag.appendChild(body);
    button.appendChild(tag);
  } else if (opts.gift) {
    const arrowIcon = button.querySelector(":scope > svg");
    const gift = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    gift.setAttribute("class", "wo-gift");
    gift.setAttribute("width", "18");
    gift.setAttribute("height", "18");
    gift.setAttribute("viewBox", "0 0 24 24");
    gift.setAttribute("aria-hidden", "true");
    gift.setAttribute("focusable", "false");
    gift.setAttribute("fill", "none");
    gift.setAttribute("stroke", "currentColor");
    gift.setAttribute("stroke-width", "1.8");
    gift.setAttribute("stroke-linecap", "round");
    gift.setAttribute("stroke-linejoin", "round");
    gift.innerHTML =
      '<circle class="wo-gift-glow" cx="12" cy="10" r="5"/>' +
      '<path d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8"/><path d="M12 12v9"/>' +
      '<g class="wo-gift-lid"><rect x="3" y="8" width="18" height="4" rx="1"/>' +
      '<path d="M12 8c-1.2-3.4-5-3.6-5-1.6 0 1.4 2.6 1.6 5 1.6zM12 8c1.2-3.4 5-3.6 5-1.6 0 1.4-2.6 1.6-5 1.6z"/></g>';
    if (arrowIcon) arrowIcon.replaceWith(gift); else button.appendChild(gift);
  } else {
    const SPARK = '<svg viewBox="0 0 16 16" focusable="false"><path d="M8 1.3l2.08 4.36 4.77.62-3.5 3.3.88 4.74L8 11.95 3.77 14.32l.88-4.74-3.5-3.3 4.77-.62z"/></svg>';
    const sparks = mk("span", "hfx-sparks");
    sparks.setAttribute("aria-hidden", "true");
    for (let i = 1; i <= 7; i++) {
      const s = mk("span", "hfx-spark hfx-spark--" + i);
      s.innerHTML = SPARK;
      sparks.appendChild(s);
    }
    button.appendChild(sparks);
  }
  button.classList.add("hfx-btn", "hfx-pop");
}

function buildSalePopup(cfg, STORAGE_KEY, theme) {
  if (!cfg || !cfg.enabled) return false;

  // The sale has an end: after it, nothing is built at all
  const endTime = cfg.endsAt ? new Date(cfg.endsAt).getTime() : NaN;
  const hasEnd = !isNaN(endTime);
  if (hasEnd && Date.now() >= endTime) return false;

  let memoryState = null; // used if the browser blocks storage

  function readState() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return memoryState;
    }
  }

  function saveState(value) {
    memoryState = value;
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      /* storage blocked: the choice only lasts for this page view */
    }
  }

  const arrow = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const tagIcon = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z"/><circle cx="8" cy="8" r="1.4" fill="currentColor"/></svg>';
  // Dropdown arrow: the button folds the popup down into its small tab
  const closeIcon = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M3 5.2l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const popup = document.createElement("aside");
  popup.className = "sale-popup" + (theme ? " sale-popup--" + theme : "");
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-label", cfg.eyebrow + ", " + cfg.percent + " " + cfg.off);
  popup.setAttribute("aria-hidden", "true");
  popup.innerHTML =
    '<button class="sale-popup-close" type="button" aria-label="Minimize the offer">' + closeIcon + '</button>' +
    '<div class="sale-popup-art">' +
      '<img class="sale-popup-image" alt="" width="1430" height="731">' +
    '</div>' +
    '<div class="sale-popup-body">' +
      '<p class="sale-popup-eyebrow"></p>' +
      '<p class="sale-popup-offer"><span class="sale-popup-percent"></span><span class="sale-popup-off"></span></p>' +
      '<p class="sale-popup-note"></p>' +
      (hasEnd
        ? '<p class="sale-popup-timer-label">Ends in</p>' +
          '<div class="sale-popup-timer" role="timer" aria-label="Time left in the sale">' +
            [['days', 'Days'], ['hours', 'Hrs'], ['minutes', 'Min'], ['seconds', 'Sec']].map((pair) =>
              '<div class="sale-timer-cell"><span class="sale-timer-num" data-unit="' + pair[0] + '">00</span>' +
              '<span class="sale-timer-unit">' + pair[1] + '</span></div>'
            ).join('') +
          '</div>'
        : '') +
      '<a class="button button-primary sale-popup-cta" href="#"><span></span>' + arrow + '</a>' +
    '</div>';

  const tab = document.createElement("button");
  tab.className = "sale-tab" + (theme ? " sale-tab--" + theme : "");
  tab.type = "button";
  tab.setAttribute("aria-label", "Open the " + cfg.eyebrow + " offer");
  const chevron = '<svg class="sale-tab-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 7.5 6 4l3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  tab.innerHTML = '<span class="sale-tab-icon">' + tagIcon + '</span><span class="sale-tab-text"></span>' + chevron;

  // Text is set with textContent so nothing in the settings can inject markup
  popup.querySelector(".sale-popup-eyebrow").textContent = cfg.eyebrow;
  popup.querySelector(".sale-popup-percent").textContent = cfg.percent;
  popup.querySelector(".sale-popup-off").textContent = cfg.off;
  const note = popup.querySelector(".sale-popup-note");
  if (cfg.note) note.textContent = cfg.note; else note.remove();
  popup.querySelector(".sale-popup-cta span").textContent = cfg.buttonText;
  popup.querySelector(".sale-popup-cta").setAttribute("href", cfg.buttonLink);
  addButtonFx(popup.querySelector(".sale-popup-cta"), popup.querySelector(".sale-popup-cta span"), { tag: cfg.percent + " " + cfg.off });
  tab.querySelector(".sale-tab-text").textContent = cfg.tabText;

  document.body.appendChild(popup);
  document.body.appendChild(tab);

  // Picture: fades in once it has loaded
  const image = popup.querySelector(".sale-popup-image");
  image.alt = cfg.alt || "";
  image.onload = () => {
    requestAnimationFrame(() => image.classList.add("is-loaded"));
  };
  image.onerror = () => {
    image.classList.remove("is-loaded");
  };
  image.src = cfg.image;

  let openTimer = 0;

  // ----- Countdown -----
  const pad = (n) => String(n).padStart(2, "0");
  const timerCells = {};
  popup.querySelectorAll(".sale-timer-num").forEach((el) => { timerCells[el.dataset.unit] = el; });
  let tickTimer = 0;

  function tick() {
    const left = endTime - Date.now();
    if (left <= 0) {
      // The sale is over: remove everything
      clearInterval(tickTimer);
      clearTimeout(openTimer);
      popup.remove();
      tab.remove();
      return;
    }
    const total = Math.floor(left / 1000);
    if (timerCells.days) timerCells.days.textContent = pad(Math.floor(total / 86400));
    if (timerCells.hours) timerCells.hours.textContent = pad(Math.floor(total % 86400 / 3600));
    if (timerCells.minutes) timerCells.minutes.textContent = pad(Math.floor(total % 3600 / 60));
    if (timerCells.seconds) timerCells.seconds.textContent = pad(total % 60);
  }

  if (hasEnd) {
    tick();
    tickTimer = window.setInterval(tick, 1000);
  }

  function openPopup(remember) {
    clearTimeout(openTimer);
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
    tab.classList.remove("is-visible");
    tab.setAttribute("aria-hidden", "true");
    tab.tabIndex = -1;
    if (remember) saveState("open");
  }

  function closePopup(returnFocus) {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    tab.classList.add("is-visible");
    tab.setAttribute("aria-hidden", "false");
    tab.tabIndex = 0;
    saveState("closed");
    if (returnFocus) tab.focus();
  }

  popup.querySelector(".sale-popup-close").addEventListener("click", () => closePopup(true));
  tab.addEventListener("click", () => {
    openPopup(true);
    popup.querySelector(".sale-popup-close").focus({ preventScroll: true });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup.classList.contains("is-open") && popup.contains(document.activeElement)) {
      closePopup(true);
    }
  });

  // Start: after the delay, the sale popup is the widget that opens by itself.
  // It only starts as the small tab if the visitor minimized it on an earlier visit.
  // (Nothing is shown, not even the tab, until the delay is over.)
  tab.setAttribute("aria-hidden", "true");
  tab.tabIndex = -1;
  const minimizedBefore = readState() === "closed";
  openTimer = window.setTimeout(() => {
    if (minimizedBefore) closePopup(false);
    else openPopup(false);
  }, cfg.delay || 0);
  return true;
}

[
  [HALLOWEEN_POPUP, "bcraft-halloween-popup-v2", "halloween"],
  [CHRISTMAS_POPUP, "bcraft-christmas-popup-v2", "christmas"],
  [SUMMER_POPUP, "bcraft-summer-popup-v2", "summer"]
].some((entry) => buildSalePopup(entry[0], entry[1], entry[2]));


// ==========================================================
// WELCOME OFFER CARD (settings: WELCOME_OFFER near the top of this file)
// A sticky card in the bottom-right corner, always stacked right above the
// sale popup, or above its small tab (it moves by itself when the popup opens
// or closes). It opens by itself on a visit; the close button minimizes it to a
// small blue tab, and clicking the tab opens it again.
// The card's Redeem button opens a small window that explains how to redeem
// the offer (DM me). Nothing is added to the HTML pages.
// ==========================================================
(function () {
  if (!welcomeOfferLive()) return;
  const cfg = WELCOME_OFFER;

  // Not on the contact page: the form is right there, and a notice above it says what to do
  const page = window.location.pathname.replace(/\/+$/, "").split("/").pop().replace(/\.html$/i, "").toLowerCase();
  if (page === "contact") return;

  const arrow = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const closeIcon = '<svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M2 2l10 10M12 2 2 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  // Dropdown arrow: the card's button folds the card down into the small tab
  const dropIcon = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M3 5.2l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const mailIcon = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6.5L20.5 7"/></svg>';
  const giftIcon = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>';
  const chevron = '<svg class="welcome-offer-tab-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 7.5 6 4l3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const amount = formatUsd(cfg.discountUsd);

  // Tiny icons for the little path on the card (chat, price tag, check)
  const pathIcons = [
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H10l-5 4v-4H4z"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12V4h8l9 9-8 8z"/><circle cx="7.5" cy="8.5" r="1"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  ];
  let pathMarkup = "";
  (cfg.pathSteps || []).slice(0, 3).forEach((label, i) => {
    if (i) pathMarkup += '<span class="wo-path-line"></span>';
    pathMarkup += '<span class="wo-path-step"><span class="wo-path-dot">' + pathIcons[i] + '</span><span class="wo-path-label"></span></span>';
  });

  // Light show behind the text: floor glow, rays, glow from the bag, the render, sparks.
  // The card and the redeem window each get their own copy. It is clipped to the
  // box and only shown once the render exists.
  const fxMarkup =
    '<span class="welcome-offer-fx" aria-hidden="true">' +
      '<span class="wo-floor"></span>' +
      '<span class="wo-stage">' +
        '<span class="wo-halo"></span>' +
        '<span class="wo-burst"></span>' +
        '<span class="wo-beam"></span>' +
        '<span class="wo-glow"></span>' +
        '<img class="welcome-offer-image" alt="" decoding="async">' +
        '<span class="wo-rim"></span>' +
        '<span class="wo-particles"></span>' +
      '</span>' +
    '</span>';

  // ----- The card -----
  const card = document.createElement("aside");
  card.className = "welcome-offer";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-hidden", "true");
  card.innerHTML =
    fxMarkup +
    '<button class="welcome-offer-close" type="button" aria-label="Minimize the welcome offer">' + dropIcon + '</button>' +
    '<div class="welcome-offer-link">' +
      '<span class="welcome-offer-text">' +
        '<span class="tag welcome-offer-tag" data-category="GFX"></span>' +
        '<span class="welcome-offer-deal">' +
          '<span class="welcome-offer-row"><span class="welcome-offer-amount"></span><span class="welcome-offer-off"></span></span>' +
          '<span class="welcome-offer-row welcome-offer-row--robux"><span class="welcome-offer-or">or</span><span class="welcome-offer-robux"></span></span>' +
        '</span>' +
        '<span class="welcome-offer-sub"></span>' +
        '<button class="button button-primary welcome-offer-cta" type="button" aria-haspopup="dialog"><span class="welcome-offer-cta-text"></span>' + arrow + '</button>' +
      '</span>' +
    '</div>' +
    // The info strip: small print in the bottom right corner
    '<div class="welcome-offer-terms"><span class="welcome-offer-ends"></span><span class="welcome-offer-terms-text"></span></div>';

  // Text is set with textContent so nothing in the settings can inject markup
  const tag = card.querySelector(".welcome-offer-tag");
  const cta = card.querySelector(".welcome-offer-cta");
  card.querySelector(".welcome-offer-cta-text").textContent = cfg.buttonText;
  addButtonFx(cta, card.querySelector(".welcome-offer-cta-text"), { gift: true });
  tag.textContent = cfg.eyebrow;
  card.querySelector(".welcome-offer-sub").textContent = cfg.sub;
  card.querySelector(".welcome-offer-terms-text").textContent = cfg.terms;

  // The price line ("$5 off or [Robux] 1.5K"): same for the card and the redeem window
  function fillDeal(host) {
    host.querySelector(".welcome-offer-amount").textContent = amount;
    host.querySelector(".welcome-offer-off").textContent = cfg.off;
    const robuxBox = host.querySelector(".welcome-offer-robux");
    if (cfg.robuxOff > 0) {
      setRobux(robuxBox, cfg.robuxOff);
      robuxBox.setAttribute("aria-label", formatRobuxAmount(cfg.robuxOff) + " Robux");
    } else {
      host.querySelector(".welcome-offer-row--robux").hidden = true;
    }
  }
  fillDeal(card);

  // ----- The small tab (after closing, or when the card does not fit) -----
  const tab = document.createElement("button");
  tab.className = "welcome-offer-tab";
  tab.type = "button";
  tab.setAttribute("aria-hidden", "true");
  tab.tabIndex = -1;
  tab.innerHTML = '<span class="welcome-offer-tab-icon">' + giftIcon + '</span><span class="welcome-offer-tab-text"></span>' + chevron;
  const tabText = tab.querySelector(".welcome-offer-tab-text");

  // ----- The redeem window (small, opens from the Redeem button) -----
  // Built like the card: same panel, same light show behind the render, same price line.
  const modal = document.createElement("div");
  modal.className = "welcome-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML =
    '<div class="welcome-modal-box" role="dialog" aria-modal="true" aria-labelledby="welcome-modal-title" tabindex="-1">' +
      fxMarkup +
      '<span class="welcome-modal-grab" aria-hidden="true"></span>' +
      '<button class="welcome-modal-close" type="button" aria-label="Close">' + closeIcon + '</button>' +
      '<div class="welcome-modal-body">' +
        '<span class="tag welcome-offer-tag" data-category="GFX"></span>' +
        '<div class="welcome-modal-col welcome-modal-col--main">' +
        '<h2 class="welcome-modal-title" id="welcome-modal-title"></h2>' +
        '<span class="welcome-offer-deal welcome-modal-deal">' +
          '<span class="welcome-offer-row"><span class="welcome-offer-amount"></span><span class="welcome-offer-off"></span></span>' +
          '<span class="welcome-offer-row welcome-offer-row--robux"><span class="welcome-offer-or">or</span><span class="welcome-offer-robux"></span></span>' +
        '</span>' +
        '<span class="welcome-offer-sub"></span>' +
        '<p class="welcome-modal-text"></p>' +
        '<ol class="welcome-modal-steps"></ol>' +
        '</div>' +
        '<div class="welcome-modal-col welcome-modal-col--side">' +
        '<div class="welcome-modal-actions">' +
          '<a class="button button-primary welcome-modal-dm" href="#"><span class="welcome-modal-dm-text"></span>' + arrow + '</a>' +
          '<a class="button button-secondary welcome-modal-email" href="#">' + mailIcon + '<span class="welcome-modal-email-text"></span></a>' +
          '<button class="button button-secondary welcome-modal-dismiss" type="button"></button>' +
        '</div>' +
        '</div>' +
      '</div>' +
      '<div class="welcome-offer-terms"><span class="welcome-offer-ends"></span><span class="welcome-offer-terms-text"></span></div>' +
    '</div>';
  const modalBox = modal.querySelector(".welcome-modal-box");
  modal.querySelector(".welcome-offer-tag").textContent = cfg.eyebrow;
  fillDeal(modal);
  modal.querySelector(".welcome-offer-sub").textContent = cfg.sub;
  modal.querySelector(".welcome-modal-title").textContent = cfg.modalTitle;
  modal.querySelector(".welcome-modal-text").textContent = cfg.modalText;
  (cfg.modalSteps || []).forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    modal.querySelector(".welcome-modal-steps").appendChild(item);
  });
  modal.querySelector(".welcome-modal-steps").hidden = !(cfg.modalSteps && cfg.modalSteps.length);
  modal.querySelector(".welcome-modal-dm").setAttribute("href", cfg.dmLink);
  modal.querySelector(".welcome-modal-dm-text").textContent = cfg.modalButtonText;

  // Second contact option: e-mail (opens with subject and message already filled in)
  const emailBtn = modal.querySelector(".welcome-modal-email");
  modal.querySelector(".welcome-modal-email-text").textContent = cfg.modalEmailText || "Email me";
  if (cfg.emailLink) {
    emailBtn.setAttribute("href", cfg.emailLink + (cfg.emailLink.indexOf("?") < 0 ? "?" : "&") +
      "subject=" + encodeURIComponent(cfg.emailSubject || "") + "&body=" + encodeURIComponent(cfg.dmMessage || ""));
  } else {
    emailBtn.hidden = true;
  }
  modal.querySelector(".welcome-modal-dismiss").textContent = cfg.modalCloseText;
  modal.querySelector(".welcome-offer-terms-text").textContent = cfg.terms;

  document.body.appendChild(card);
  document.body.appendChild(tab);
  document.body.appendChild(modal);

  // ----- Your render -----
  const image = card.querySelector(".welcome-offer-image");
  image.alt = cfg.alt || "";
  card.style.setProperty("--wo-glow-x", cfg.glowX);
  card.style.setProperty("--wo-glow-y", cfg.glowY);

  // The redeem window shows the same render (it copies the card's finished picture)
  const modalImage = modalBox.querySelector(".welcome-offer-image");
  modalImage.alt = cfg.alt || "";
  modalImage.addEventListener("load", () => modalImage.classList.add("is-loaded"));
  modalBox.style.setProperty("--wo-glow-x", cfg.glowX);
  modalBox.style.setProperty("--wo-glow-y", cfg.glowY);

  // Finds the box around everything that is not transparent, so the bag can
  // stand exactly on the bottom edge of the card (and the light sits on the
  // right spot) even if the file has empty margins.
  function renderBounds() {
    const w = image.naturalWidth, h = image.naturalHeight;
    const scale = Math.min(1, 320 / Math.max(w, h));
    const cw = Math.max(1, Math.round(w * scale)), ch = Math.max(1, Math.round(h * scale));
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0, cw, ch);
    const data = context.getImageData(0, 0, cw, ch).data;
    let minX = cw, minY = ch, maxX = -1, maxY = -1;
    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        if (data[(y * cw + x) * 4 + 3] > 24) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) return null;
    const sx = Math.max(0, Math.floor(minX / scale) - 1);
    const sy = Math.max(0, Math.floor(minY / scale) - 1);
    const ex = Math.min(w, Math.ceil((maxX + 1) / scale) + 1);
    const ey = Math.min(h, Math.ceil((maxY + 1) / scale) + 1);
    return { sx: sx, sy: sy, tw: ex - sx, th: ey - sy };
  }

  function showRender(aspect) {
    if (aspect > 0) {
      card.style.setProperty("--wo-aspect", String(Math.round(aspect * 1000) / 1000));
      modalBox.style.setProperty("--wo-aspect", String(Math.round(aspect * 1000) / 1000));
    }
    card.classList.add("has-art");
    modalBox.classList.add("has-art");
    if (modalImage.getAttribute("src") !== image.src) modalImage.src = image.src;
    relayout();
  }

  image.addEventListener("load", () => {
    if (image.dataset.trimmed === "1") { showRender(image.naturalWidth / image.naturalHeight); return; }
    try {
      const box = renderBounds();
      const cuts = box && (box.tw < image.naturalWidth * 0.98 || box.th < image.naturalHeight * 0.98);
      if (cuts) {
        const out = document.createElement("canvas");
        out.width = box.tw;
        out.height = box.th;
        out.getContext("2d").drawImage(image, box.sx, box.sy, box.tw, box.th, 0, 0, box.tw, box.th);
        out.toBlob((blob) => {
          if (!blob) { showRender(image.naturalWidth / image.naturalHeight); return; }
          image.dataset.trimmed = "1";
          image.src = URL.createObjectURL(blob);     // loads again, then showRender runs
        }, "image/png");
        return;
      }
    } catch (error) { /* the file cannot be read as pixels: use it as it is */ }
    showRender(image.naturalWidth / image.naturalHeight);
  });
  loadImageFlex(image, cfg.image);

  // ----- Floating sparks: they rise from the opening of the bag -----
  const sparkColors = ["214,222,255", "255,255,255", "150,170,255", "110,130,255", "176,210,255"];   // the light of the bag
  const between = (low, high) => low + Math.random() * (high - low);
  function addSparks(sparkBox) {
  for (let i = 0; i < (cfg.particles || 0); i++) {
    const spark = document.createElement("span");
    const star = i % 4 === 0;            // every 4th one is a little 4-point star
    const ambient = i % 3 === 2;         // some only drift around the bag
    spark.className = "wo-particle" + (star ? " is-star" : "");
    const set = (name, value) => spark.style.setProperty(name, value);
    set("--ox", Math.round(ambient ? between(-110, 90) : between(-60, 60)) + "px");
    set("--oy", Math.round(ambient ? between(20, 120) : between(-6, 10)) + "px");
    set("--dx", Math.round(between(-70, 90)) + "px");
    set("--dy", "-" + Math.round(ambient ? between(24, 60) : between(80, 200)) + "px");
    set("--s", (star ? between(8, 13) : between(2, 4.6)).toFixed(1) + "px");
    set("--dur", between(3.6, 7.4).toFixed(1) + "s");
    set("--delay", "-" + between(0, 7).toFixed(1) + "s");
    set("--c", sparkColors[Math.floor(Math.random() * sparkColors.length)]);
    sparkBox.appendChild(spark);
  }
  }
  addSparks(card.querySelector(".wo-particles"));
  addSparks(modalBox.querySelector(".wo-particles"));

  // ----- State -----
  let ready = false;          // false until the short delay is over
  let ended = false;          // true once endsAt has passed: everything is removed
  // While a seasonal sale popup is running, that popup is the widget that opens on page load,
  // so the welcome offer starts as its small tab (it opens if the visitor opened it earlier).
  // With no seasonal popup, it opens by default, unless the visitor closed it earlier.
  const seasonalRunning = !!document.querySelector(".sale-popup");
  let userClosed = seasonalRunning
    ? welcomeGet(WELCOME_UI_KEY) !== "open"
    : welcomeGet(WELCOME_UI_KEY) === "closed";
  card.setAttribute("aria-label", cfg.eyebrow + ": " + amount + " " + cfg.off + " " + cfg.sub);

  const endTime = cfg.endsAt ? new Date(cfg.endsAt).getTime() : NaN;
  const hasEnd = !isNaN(endTime);

  // "3 days", "1 day 4h", "5h 20m", "40m"
  function leftLong(ms) {
    const total = Math.max(1, Math.ceil(ms / 60000));
    const d = Math.floor(total / 1440), h = Math.floor((total % 1440) / 60), m = total % 60;
    if (d >= 2) return d + " days";
    if (d === 1) return "1 day " + h + "h";
    if (h >= 1) return h + "h " + m + "m";
    return m + "m";
  }
  // "2d left", "5h left", "40m left"
  function leftShort(ms) {
    const total = Math.max(1, Math.ceil(ms / 60000));
    if (total >= 1440) return Math.floor(total / 1440) + "d left";
    if (total >= 60) return Math.floor(total / 60) + "h left";
    return total + "m left";
  }

  // The countdown wording (only does anything when endsAt is set)
  function refreshState() {
    if (ended) return;
    const ms = hasEnd ? endTime - Date.now() : Infinity;
    if (hasEnd && ms <= 0) { teardown(); return; }

    const endsLabel = hasEnd ? cfg.endsText + " " + leftLong(ms) : "";
    card.querySelector(".welcome-offer-ends").textContent = endsLabel;
    modal.querySelector(".welcome-offer-ends").textContent = endsLabel;

    const showLeft = hasEnd && ms <= (cfg.countdownTabDays || 0) * 86400000;
    tabText.textContent = cfg.tabText + (showLeft ? " \u00b7 " + leftShort(ms) : "");
    tab.setAttribute("aria-label", "Open the " + cfg.eyebrow.toLowerCase() + (showLeft ? ", " + leftShort(ms) : ""));
    relayout();
  }

  // Removes the whole widget when the offer ends while the page is open
  function teardown() {
    ended = true;
    closeModal();
    window.clearInterval(tickTimer);
    if (typeof watch !== "undefined") watch.disconnect();
    card.remove();
    tab.remove();
    modal.remove();
  }

  function render() {
    // The card stays open until the visitor closes it; the tab only shows after that
    const showCard = ready && !userClosed;
    const showTab = ready && userClosed;
    card.classList.toggle("is-open", showCard);
    card.setAttribute("aria-hidden", showCard ? "false" : "true");
    cta.tabIndex = showCard ? 0 : -1;
    card.querySelector(".welcome-offer-close").tabIndex = showCard ? 0 : -1;
    tab.classList.toggle("is-visible", showTab);
    tab.setAttribute("aria-hidden", showTab ? "false" : "true");
    tab.tabIndex = showTab ? 0 : -1;
  }

  // "$5 off or [Robux] 1.5K" is one line: it gets the largest size that still fits
  const dealBox = card.querySelector(".welcome-offer-deal");
  const textBox = card.querySelector(".welcome-offer-text");
  function fitDeal() {
    let size = 2.6;
    card.style.setProperty("--wo-deal-size", size + "rem");
    for (let guard = 0; guard < 40 && size > 1.3 && dealBox.scrollWidth > textBox.clientWidth + 1; guard++) {
      size -= 0.05;
      card.style.setProperty("--wo-deal-size", size.toFixed(2) + "rem");
    }
  }

  // Sit right above the sale popup (or its tab), whatever height the popup has.
  // The card never closes by itself. If the popup is tall and the window is
  // short, the card first shrinks a little (down to 80%), and only if that is
  // still not enough does it slide down over the top of the popup.
  function place() {
    if (ended) return;
    const rootStyle = getComputedStyle(document.documentElement);
    const rem = parseFloat(rootStyle.fontSize) || 16;
    const popup = document.querySelector(".sale-popup.is-open");
    const saleTab = document.querySelector(".sale-tab.is-visible");
    const ref = popup || saleTab;
    let base;                                   // the lowest spot: the corner
    if (document.documentElement.classList.contains("has-liked-banner")) {
      base = (parseFloat(rootStyle.getPropertyValue("--liked-banner-h")) || 0) + 0.75 * rem;
    } else {
      base = (window.matchMedia("(max-width: 520px)").matches ? 0.75 : 1.25) * rem;
    }
    const wanted = ref ? (parseFloat(getComputedStyle(ref).bottom) || 0) + ref.offsetHeight + 0.7 * rem : base;

    // Keep clear of the sticky header (and the countdown bar above it)
    const header = document.querySelector(".site-header");
    const bar = document.querySelector(".holiday-bar");
    const top = (header ? header.offsetHeight : 0) + (bar ? bar.offsetHeight : 0) + 8;
    const room = window.innerHeight - top - wanted;

    const cardHeight = card.offsetHeight;
    const scale = cardHeight > room ? Math.max(0.8, room / cardHeight) : 1;
    card.style.setProperty("--wo-scale", scale.toFixed(3));
    const cardBottom = Math.max(base, Math.min(wanted, window.innerHeight - top - cardHeight * scale));
    const tabBottom = Math.max(base, Math.min(wanted, window.innerHeight - top - tab.offsetHeight));
    card.style.bottom = cardBottom + "px";
    tab.style.bottom = tabBottom + "px";
    render();
  }

  function relayout() {
    fitDeal();
    place();
  }

  // ----- Events -----
  // The redeem window
  let modalReturn = null;
  function openModal() {
    modalReturn = document.activeElement;
    welcomeSet(WELCOME_SEEN_KEY, "1");
    // The page behind stays put while the window is open (and does not jump sideways)
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--wo-scrollbar", Math.max(0, gutter) + "px");
    document.documentElement.classList.add("welcome-modal-open");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modalBox.focus({ preventScroll: true });
  }
  function closeModal() {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("welcome-modal-open");
    if (modalReturn && document.contains(modalReturn)) modalReturn.focus({ preventScroll: true });
    modalReturn = null;
  }

  cta.addEventListener("click", openModal);

  // Phones: the window is a bottom sheet. Drag its handle down to close it.
  const grab = modal.querySelector(".welcome-modal-grab");
  let dragFrom = null, dragBy = 0;
  grab.addEventListener("touchstart", (event) => {
    dragFrom = event.touches[0].clientY;
    dragBy = 0;
    modalBox.style.transition = "none";
  }, { passive: true });
  grab.addEventListener("touchmove", (event) => {
    if (dragFrom === null) return;
    dragBy = Math.max(0, event.touches[0].clientY - dragFrom);
    modalBox.style.transform = "translateY(" + dragBy + "px)";
  }, { passive: true });
  const dragEnd = () => {
    if (dragFrom === null) return;
    const far = dragBy > 90;
    dragFrom = null;
    dragBy = 0;
    modalBox.style.transition = "";
    modalBox.style.transform = "";
    if (far) closeModal();
  };
  grab.addEventListener("touchend", dragEnd);
  grab.addEventListener("touchcancel", dragEnd);
  modal.querySelector(".welcome-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".welcome-modal-dismiss").addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });

  // Keep Tab inside the window while it is open
  modal.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const items = Array.from(modalBox.querySelectorAll("button, a[href]:not([hidden]), summary"));
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === modalBox)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  card.querySelector(".welcome-offer-close").addEventListener("click", () => {
    userClosed = true;
    welcomeSet(WELCOME_UI_KEY, "closed");
    render();
    if (tab.classList.contains("is-visible")) tab.focus({ preventScroll: true });
  });

  tab.addEventListener("click", () => {
    tab.classList.remove("is-nudging");
    welcomeSet(WELCOME_SEEN_KEY, "1");
    userClosed = false;
    welcomeSet(WELCOME_UI_KEY, "open");
    place();
    if (card.classList.contains("is-open")) cta.focus({ preventScroll: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (modal.classList.contains("is-open")) { closeModal(); return; }
    if (card.classList.contains("is-open") && card.contains(document.activeElement)) {
      card.querySelector(".welcome-offer-close").click();
    }
  });

  window.addEventListener("resize", relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);

  // Follow the sale popup: it opens, closes, and its height can change
  const watch = new MutationObserver(place);
  [document.querySelector(".sale-popup"), document.querySelector(".sale-tab")].forEach((node) => {
    if (node) watch.observe(node, { attributes: true, attributeFilter: ["class"] });
  });
  watch.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
  watch.observe(document.body, { childList: true });   // e.g. the countdown bar being closed
  const popupNode = document.querySelector(".sale-popup");
  if (popupNode && typeof ResizeObserver === "function") new ResizeObserver(place).observe(popupNode);

  // The countdown stays fresh
  const tickTimer = window.setInterval(refreshState, 30000);
  window.addEventListener("pageshow", refreshState);

  // One soft pulse + shine on the tab, only a few page views, never again once the offer was opened
  function nudgeTab() {
    if (ended || !cfg.nudge) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (welcomeGet(WELCOME_SEEN_KEY) === "1") return;
    const count = parseInt(welcomeGet(WELCOME_NUDGE_KEY) || "0", 10) || 0;
    if (count >= (cfg.nudgeMax || 0)) return;
    window.setTimeout(() => {
      if (ended || !tab.classList.contains("is-visible") || modal.classList.contains("is-open")) return;
      welcomeSet(WELCOME_NUDGE_KEY, String(count + 1));
      tab.classList.add("is-nudging");
      window.setTimeout(() => tab.classList.remove("is-nudging"), 2200);
    }, cfg.nudgeDelay || 0);
  }

  refreshState();
  window.setTimeout(() => { ready = true; relayout(); nudgeTab(); }, cfg.delay || 0);
})();


// ==========================================================
// WELCOME OFFER NOTICE ON THE CONTACT PAGE (settings: WELCOME_OFFER.contactNotice / contactText)
// A short notice above the contact form: the offer is only redeemed by
// sending a DM that mentions it. Added by script.js, so contact.html needs
// no change. It goes right above the form (or, if there is no form, right
// under the page heading).
// ==========================================================
(function () {
  const cfg = WELCOME_OFFER;
  if (!welcomeOfferLive() || cfg.contactNotice === "off") return;

  const page = window.location.pathname.replace(/\/+$/, "").split("/").pop().replace(/\.html$/i, "").toLowerCase();
  if (page !== "contact") return;
  if (cfg.contactNotice !== "always") return;

  // A small "i" chip with a short label; the reminder itself opens as a little popover
  const notice = document.createElement("div");
  notice.className = "welcome-offer-notice";
  notice.innerHTML =
    '<button class="welcome-offer-notice-btn" type="button" aria-expanded="false" aria-controls="welcome-offer-notice-pop">' +
      '<span class="welcome-offer-notice-icon" aria-hidden="true">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.6" r="0.5" fill="currentColor"/></svg>' +
      '</span>' +
      '<span class="welcome-offer-notice-label"></span>' +
      '<span class="welcome-offer-notice-badge"></span>' +
    '</button>' +
    '<div class="welcome-offer-notice-pop" id="welcome-offer-notice-pop" role="note">' +
      '<strong class="welcome-offer-notice-title"></strong>' +
      '<p class="welcome-offer-notice-text"></p>' +
    '</div>';
  notice.querySelector(".welcome-offer-notice-label").textContent = cfg.eyebrow;
  notice.querySelector(".welcome-offer-notice-badge").textContent = formatUsd(cfg.discountUsd) + " " + cfg.off;
  notice.querySelector(".welcome-offer-notice-title").textContent =
    cfg.eyebrow + ": " + formatUsd(cfg.discountUsd) + " " + cfg.off +
    (cfg.robuxOff > 0 ? " or " + formatRobuxAmount(cfg.robuxOff) + " Robux " + cfg.off : "");
  notice.querySelector(".welcome-offer-notice-text").textContent = cfg.contactText;

  const noticeBtn = notice.querySelector(".welcome-offer-notice-btn");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  let closeTimer = 0;

  // If the popover would run off the right edge of the screen, open it to the left instead
  function placeNotice() {
    notice.classList.remove("is-flip");
    const pop = notice.querySelector(".welcome-offer-notice-pop");
    const box = pop.getBoundingClientRect();
    if (box.right > window.innerWidth - 8) notice.classList.add("is-flip");
  }
  function setNotice(open) {
    window.clearTimeout(closeTimer);
    if (open) placeNotice();
    notice.classList.toggle("is-open", open);
    noticeBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  // Desktop (mouse): the info shows while the pointer is on the chip, and closes shortly after it leaves.
  // Only the chip itself keeps it open: the moment the pointer leaves the chip, the info closes,
  // even if the pointer ends up on the info frame (the frame ignores the mouse).
  noticeBtn.addEventListener("mouseenter", () => { if (canHover.matches) setNotice(true); });
  noticeBtn.addEventListener("mouseleave", () => { if (canHover.matches) setNotice(false); });
  // Keyboard users get it on focus
  noticeBtn.addEventListener("focus", () => { if (noticeBtn.matches(":focus-visible")) setNotice(true); });
  noticeBtn.addEventListener("blur", () => { if (canHover.matches) setNotice(false); });
  // Touch screens (no hover): tap to open and close
  noticeBtn.addEventListener("click", () => {
    if (canHover.matches) return;
    setNotice(!notice.classList.contains("is-open"));
  });
  document.addEventListener("click", (event) => { if (!notice.contains(event.target)) setNotice(false); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && notice.classList.contains("is-open")) { setNotice(false); noticeBtn.focus({ preventScroll: true }); }
  });

  // Placement: in the row of contact buttons, as the last item after "DM Me on X".
  // The row is found from the buttons themselves (their closest shared parent).
  function findButtonRow() {
    const scope = document.querySelector(".contact-hero") || document.querySelector("main") || document.body;
    const labels = [/contact me directly/i, /email me/i, /dm me on x/i];
    const found = labels.map((re) =>
      Array.from(scope.querySelectorAll("a, button")).find((el) => !notice.contains(el) && re.test(el.textContent || ""))
    ).filter(Boolean);
    if (found.length < 2) return null;
    let row = found[0].parentElement;
    while (row && !found.every((el) => row.contains(el))) row = row.parentElement;
    if (!row || row === document.body || row === scope) return null;
    // the item of the row that holds the last button (the button plus its caption)
    const last = found[found.length - 1];
    let item = last;
    while (item.parentElement && item.parentElement !== row) item = item.parentElement;
    return item.parentElement === row ? { row: row, item: item } : null;
  }

  const slot = findButtonRow();
  if (slot) {
    notice.classList.add("welcome-offer-notice--inline");
    slot.item.insertAdjacentElement("afterend", notice);

    // On wide screens the chip floats right next to the last button, level with the buttons
    // (it takes no space in the row, so the row can never wrap it onto a new line).
    // When there is no room on the right it simply stays where it is, as a normal item.
    const lastButton = Array.from(slot.item.querySelectorAll("a, button")).find((el) => /dm me on x/i.test(el.textContent || "")) ||
      slot.item.querySelector("a, button");
    function placeChip() {
      notice.classList.remove("is-floating");
      notice.style.left = notice.style.top = notice.style.minHeight = "";
      slot.row.classList.remove("welcome-offer-row-host");
      if (window.innerWidth < 900) return;
      const rowBox = slot.row.getBoundingClientRect();
      const itemBox = slot.item.getBoundingClientRect();
      const btnBox = (lastButton || slot.item).getBoundingClientRect();
      const chipWidth = 16 * parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
      const left = itemBox.right - rowBox.left + 24;
      if (rowBox.left + left + chipWidth > window.innerWidth - 24) return;
      slot.row.classList.add("welcome-offer-row-host");
      notice.classList.add("is-floating");
      notice.style.left = Math.round(left) + "px";
      notice.style.top = Math.round(btnBox.top - rowBox.top) + "px";
      notice.querySelector(".welcome-offer-notice-btn").style.minHeight = Math.round(btnBox.height) + "px";
    }
    placeChip();
    window.addEventListener("resize", placeChip);
    window.addEventListener("load", placeChip);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeChip);
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(placeChip).observe(slot.row);
    window.setTimeout(placeChip, 400);
    window.setTimeout(placeChip, 1500);
    return;
  }

  const form = document.querySelector("main form") || document.querySelector("form");
  if (form && form.parentNode) {
    form.parentNode.insertBefore(notice, form);
    return;
  }
  const heading = document.querySelector("main h1, h1");
  const anchor = heading && (heading.closest("header, section") || heading);
  if (anchor) anchor.insertAdjacentElement("afterend", notice);
  else (document.querySelector("main") || document.body).prepend(notice);
})();


// ==========================================================
// WELCOME OFFER: PRE-FILLED MESSAGE ON THE CONTACT PAGE
// The "DM me" button in the redeem window opens /contact/?offer=welcome.
// Here the message box of the form is filled with WELCOME_OFFER.dmMessage
// (only if it is still empty), so the visitor only has to press send.
// ==========================================================
(function () {
  const cfg = WELCOME_OFFER;
  if (!welcomeOfferLive()) return;
  const page = window.location.pathname.replace(/\/+$/, "").split("/").pop().replace(/\.html$/i, "").toLowerCase();
  if (page !== "contact") return;
  let wanted = null;
  try { wanted = new URL(window.location.href).searchParams.get("offer"); } catch (error) { return; }
  if (wanted !== "welcome") return;

  function fill() {
    const area = document.querySelector("main form textarea") || document.querySelector("form textarea");
    if (!area) return false;
    if (!area.value.trim()) {
      area.value = cfg.dmMessage;
      area.dispatchEvent(new Event("input", { bubbles: true }));
    }
    return true;
  }
  if (fill()) return;
  // The form may be built after the page loads: look for it for a few seconds
  const looking = new MutationObserver(() => { if (fill()) looking.disconnect(); });
  looking.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => looking.disconnect(), 5000);
})();


// ==========================================================
// SEASON ARTWORK
// Small hand-drawn icons shared by the buttons, the Seasonal Sales perk card,
// the Work menu and the hero decorations. Flat shapes only (no gradients), so
// they also render inside hidden menus.
// ==========================================================
const SVG_OPEN = '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">';

const GHOST_SVG =
  '<svg viewBox="0 0 40 48" aria-hidden="true" focusable="false">' +
    '<path class="hw-ghost-body" d="M20 2C10.6 2 4.6 9.4 4.6 19.4V43.2c0 1.5 1.7 2.1 2.7 1.1l3-3 3.6 3.5c.6.6 1.6.6 2.2 0L20 41.2l3.9 3.6c.6.6 1.6.6 2.2 0l3.6-3.5 3 3c1 1 2.7.4 2.7-1.1V19.4C35.4 9.4 29.4 2 20 2Z"/>' +
    '<path class="hw-ghost-body" d="M5.4 24.6C2.4 24.2.6 26 0 29c2.2 1.2 4.9.8 6.6-1z"/>' +
    '<path class="hw-ghost-body" d="M34.6 24.6c3-.4 4.8 1.4 5.4 4.4-2.2 1.2-4.9.8-6.6-1z"/>' +
    '<ellipse class="hw-ghost-face" cx="14.2" cy="19.6" rx="2.5" ry="3.5"/><ellipse class="hw-ghost-face" cx="25.8" cy="19.6" rx="2.5" ry="3.5"/>' +
    '<circle class="hw-ghost-shine" cx="15" cy="18.2" r=".9"/><circle class="hw-ghost-shine" cx="26.6" cy="18.2" r=".9"/>' +
    '<ellipse class="hw-ghost-cheek" cx="9.6" cy="26" rx="2.6" ry="1.6"/><ellipse class="hw-ghost-cheek" cx="30.4" cy="26" rx="2.6" ry="1.6"/>' +
    '<ellipse class="hw-ghost-face" cx="20" cy="28.4" rx="3" ry="4"/>' +
  '</svg>';

const BAT_SVG =
  '<svg viewBox="0 0 60 28" aria-hidden="true" focusable="false">' +
    '<path d="M30 7L32 4L33.5 8C37 7 41 8 44 11C48 9 53 9 58 12C55 13 54 15 53 18C51 16 48 16 46 19C44 17 41 17 39 20C37 19 35 21 33.5 24L30 21L26.5 24C25 21 23 19 21 20C19 17 16 17 14 19C12 16 9 16 7 18C6 15 5 13 2 12C7 9 12 9 16 11C19 8 23 7 26.5 8L28 4Z"/>' +
    '<circle class="hw-bat-eye" cx="28.2" cy="11.6" r="1"/><circle class="hw-bat-eye" cx="31.8" cy="11.6" r="1"/>' +
  '</svg>';

const PUMPKIN_SVG = SVG_OPEN +
  '<path d="M18.6 11.4c-.5-3.6.9-6.2 4.4-7.9l1.7 2.3c-2.1 1-3 2.6-2.9 5.5z" fill="#4c8f32" stroke="#2f6a1f" stroke-width=".8" stroke-linejoin="round"/>' +
  '<path d="M24.8 6.4c3-1.5 5.7-.5 6.6 2" fill="none" stroke="#63c24a" stroke-width="1.5" stroke-linecap="round"/>' +
  '<ellipse cx="11.4" cy="25" rx="9.3" ry="12.4" fill="#d95f08" stroke="#9a3f00" stroke-width="1"/>' +
  '<ellipse cx="28.6" cy="25" rx="9.3" ry="12.4" fill="#d95f08" stroke="#9a3f00" stroke-width="1"/>' +
  '<ellipse cx="20" cy="25" rx="8.6" ry="13.3" fill="#ff8a1f" stroke="#b34c00" stroke-width="1"/>' +
  '<ellipse cx="14.2" cy="17" rx="2" ry="3.6" transform="rotate(24 14.2 17)" fill="#fff" opacity=".26"/>' +
  '<path d="M11.8 24.6l3.5-5.6 3.5 5.6z" fill="#ffe27a" stroke="#4a2200" stroke-width=".9" stroke-linejoin="round"/>' +
  '<path d="M21.2 24.6l3.5-5.6 3.5 5.6z" fill="#ffe27a" stroke="#4a2200" stroke-width=".9" stroke-linejoin="round"/>' +
  '<path d="M20 26.6l-1.9 3.1h3.8z" fill="#ffe27a" stroke="#4a2200" stroke-width=".8" stroke-linejoin="round"/>' +
  '<path d="M11.4 30.2c3.6 6.6 13.6 6.6 17.2 0l-2.6 1.2-1.7-2.2-2 3.1-2-3.1-2 3.1-1.7-2.2z" fill="#ffe27a" stroke="#4a2200" stroke-width=".9" stroke-linejoin="round"/>' +
'</svg>';

const WITCH_HAT_SVG = SVG_OPEN +
  '<path d="M9 31C12.6 24 14 15 19 7c1.5-2.5 4.6-3.6 8.2-2.6-2.6.3-4.2 1.7-4.6 3.9C24 15 27 22 31.5 31z" fill="#5b2f9e" stroke="#35196a" stroke-width="1" stroke-linejoin="round"/>' +
  '<ellipse cx="20.4" cy="31.2" rx="17.6" ry="4.6" fill="#44217f" stroke="#2c1457" stroke-width="1"/>' +
  '<path d="M11.2 26.2q8.8 3.8 17.6 0l1.1 3.2q-9.9 3.8-19.8 0z" fill="#ff8a1f"/>' +
  '<rect x="17.5" y="26.2" width="5.6" height="4.6" rx=".9" fill="#ffd36a" stroke="#b9852a" stroke-width=".7"/>' +
  '<path d="M15.4 19c.9-3.2 2-6 3.6-9" stroke="#9a72e0" stroke-width="1.3" fill="none" opacity=".65" stroke-linecap="round"/>' +
  '<path d="M30 12l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9z" fill="#ffd36a"/>' +
'</svg>';

const CANDY_CORN_SVG = SVG_OPEN +
  '<path d="M20 3.6c3.4 0 6.2 3.2 7.8 10.2H12.2C13.8 6.8 16.6 3.6 20 3.6z" fill="#fff8e6" stroke="#d8c8a0" stroke-width=".8" stroke-linejoin="round"/>' +
  '<path d="M12.2 13.8h15.6l3 11.2H9.2z" fill="#ff9a1f" stroke="#c46e00" stroke-width=".8" stroke-linejoin="round"/>' +
  '<path d="M9.2 25h21.6l1.6 5.6c.7 2.6-1.2 4.8-3.8 4.8H11.4c-2.6 0-4.5-2.2-3.8-4.8z" fill="#ffd23f" stroke="#c99a00" stroke-width=".8" stroke-linejoin="round"/>' +
  '<path d="M16 7c-.8 1.6-1.4 3.6-1.8 6" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7" stroke-linecap="round"/>' +
'</svg>';

const SANTA_HAT_SVG = SVG_OPEN +
  '<path d="M5.5 31C7 17 17 7.4 29.4 9.4c-3.2 2.4-5 6.2-4.6 11.6l9.6 10z" fill="#e5303a" stroke="#a31820" stroke-width="1" stroke-linejoin="round"/>' +
  '<path d="M12.6 27.6c.6-7.6 5.6-14.2 12.4-16.4" stroke="#ff7a80" stroke-width="1.6" fill="none" opacity=".6" stroke-linecap="round"/>' +
  '<rect x="2.4" y="28.2" width="33.2" height="9" rx="4.5" fill="#fff" stroke="#cfd7e6" stroke-width="1"/>' +
  '<circle cx="9" cy="32.7" r="1" fill="#dbe3f0"/><circle cx="16" cy="34" r="1" fill="#dbe3f0"/><circle cx="23" cy="32.4" r="1" fill="#dbe3f0"/><circle cx="30" cy="33.8" r="1" fill="#dbe3f0"/>' +
  '<circle cx="31.4" cy="8.6" r="5.2" fill="#fff" stroke="#cfd7e6" stroke-width="1"/>' +
  '<circle cx="29.2" cy="7" r="1" fill="#dbe3f0"/><circle cx="33.4" cy="10" r="1" fill="#dbe3f0"/>' +
'</svg>';

const CANDY_CANE_SVG = SVG_OPEN +
  '<path d="M26 36V14a7.2 7.2 0 1 0-14.4 0" fill="none" stroke="#c9d0de" stroke-width="7.4" stroke-linecap="round"/>' +
  '<path d="M26 36V14a7.2 7.2 0 1 0-14.4 0" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>' +
  '<path d="M26 36V14a7.2 7.2 0 1 0-14.4 0" fill="none" stroke="#e5303a" stroke-width="6" stroke-dasharray="3.4 4.4" stroke-dashoffset="1.4"/>' +
  '<path d="M23.4 33V15" stroke="#fff" stroke-width="1" opacity=".5" stroke-linecap="round"/>' +
'</svg>';

const GIFT_SVG = SVG_OPEN +
  '<rect x="6" y="17.5" width="28" height="18.5" rx="2.6" fill="#2fa564" stroke="#1d7a47" stroke-width="1"/>' +
  '<rect x="4" y="12.6" width="32" height="7.4" rx="2.6" fill="#3dc47a" stroke="#1d7a47" stroke-width="1"/>' +
  '<rect x="17.8" y="12.6" width="4.4" height="23.4" fill="#ffd166"/>' +
  '<path d="M20 12.6c-5.4-8.6-12.6-4.4-9 .2 2 2 6 1.4 9-.2zM20 12.6c5.4-8.6 12.6-4.4 9 .2-2 2-6 1.4-9-.2z" fill="#ffd166" stroke="#d3a233" stroke-width=".9" stroke-linejoin="round"/>' +
  '<circle cx="20" cy="12.2" r="2" fill="#f2b84b" stroke="#d3a233" stroke-width=".7"/>' +
'</svg>';

const SNOWMAN_SVG = SVG_OPEN +
  '<circle cx="20" cy="29.4" r="9.6" fill="#fff" stroke="#c4d2e8" stroke-width="1"/>' +
  '<circle cx="20" cy="15.4" r="6.6" fill="#fff" stroke="#c4d2e8" stroke-width="1"/>' +
  '<rect x="14.6" y="5.2" width="10.8" height="6" rx="1" fill="#27304a"/><rect x="12" y="10.6" width="16" height="2.4" rx="1.2" fill="#27304a"/><rect x="14.6" y="9.2" width="10.8" height="1.5" fill="#e5303a"/>' +
  '<circle cx="17.8" cy="14.6" r=".95" fill="#1b2236"/><circle cx="22.2" cy="14.6" r=".95" fill="#1b2236"/>' +
  '<path d="M20 16l5.4 1.3L20 18.4z" fill="#ff8a1f"/>' +
  '<path d="M13.4 21.6q6.6 3.2 13.2 0l-.7 3.2q-5.9 2.5-11.8 0z" fill="#e5303a"/><path d="M23.8 24l2.8 6.6-3.3.6-1.7-6.2z" fill="#c4202a"/>' +
  '<circle cx="20" cy="29.4" r="1.2" fill="#1b2236"/><circle cx="20" cy="33.6" r="1.2" fill="#1b2236"/>' +
'</svg>';

const BEACH_BALL_SVG = SVG_OPEN +
  '<circle cx="20" cy="20" r="17" fill="#fff"/>' +
  '<path d="M20 20L20 3A17 17 0 0 1 34.72 11.5Z" fill="#ff4d4d"/>' +
  '<path d="M20 20L34.72 28.5A17 17 0 0 1 20 37Z" fill="#2f8cff"/>' +
  '<path d="M20 20L5.28 28.5A17 17 0 0 1 5.28 11.5Z" fill="#ffc43d"/>' +
  '<circle cx="20" cy="20" r="17" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="1"/>' +
  '<circle cx="20" cy="20" r="3" fill="#fff" stroke="rgba(0,0,0,0.2)" stroke-width="0.8"/>' +
  '<ellipse cx="13" cy="11" rx="4" ry="2.4" transform="rotate(-35 13 11)" fill="rgba(255,255,255,0.55)"/>' +
'</svg>';

// ----- Silhouettes for the flying witch and Santa's sleigh -----
const WITCH_SIL =
'<svg viewBox="0 0 210 110" aria-hidden="true" focusable="false">' +
  '<g class="hw-witch-sil">' +
    // broom handle + bristles
    '<path d="M8 74L158 56L159 61L10 79Z"/>' +
    '<path d="M154 52C166 50 184 44 206 40C200 50 201 60 207 71C186 70 168 70 154 64Z"/>' +
    '<path class="hw-witch-cut" d="M168 55C180 54 192 52 200 51M168 60C182 61 194 62 202 64"/>' +
    // hair streaming behind
    '<path d="M80 34C94 28 110 34 126 28C120 36 114 40 108 41C116 43 122 47 130 48C114 52 96 48 82 44Z"/>' +
    // hat: cone with a bent tip + brim
    '<path d="M60 26C64 16 70 6 78 -4C82 -9 90 -10 95 -6C88 -6 84 -2 85 5C85 12 88 20 91 26Z"/>' +
    '<path d="M44 29C58 21 82 21 96 27C84 33 58 34 44 29Z"/>' +
    // head, nose, chin
    '<circle cx="68" cy="37" r="9.5"/>' +
    '<path d="M60 34L47 39L60 41Z"/>' +
    '<path d="M62 45L57 53L71 47Z"/>' +
    // body, cloak, skirt
    '<path d="M68 46C84 42 98 52 106 62L110 75C94 76 78 70 70 60C65 54 63 49 68 46Z"/>' +
    '<path d="M102 60C118 58 136 64 156 80C140 82 122 86 108 78Z"/>' +
    // arm holding the broom
    '<path d="M70 50C62 54 56 60 52 69L59 72C63 65 69 60 77 56Z"/>' +
    // legs + boots
    '<path d="M104 70L97 91L106 93L115 74Z"/>' +
    '<path d="M95 90L84 95L88 100L107 96Z"/>' +
    '<path d="M112 74L112 94L121 93L120 74Z"/>' +
    '<path d="M110 93L102 101L108 103L123 97Z"/>' +
  '</g>' +
'</svg>';

const SANTA_SIL =
'<svg viewBox="-110 -80 530 190" aria-hidden="true" focusable="false">' +
  '<g class="xm-sil">' +
    // sleigh
    '<g class="xm-sleigh-body">' +
      '<path d="M8 44H96C103 44 105 49 102 56C97 70 84 80 64 80H34C16 80 6 68 6 54Z"/>' +
      '<path d="M8 44C-2 42-4 30 6 25C3 32 8 37 15 37Z"/>' +
      '<path d="M-6 92H92C104 92 111 85 108 70" fill="none" stroke-width="4.5" stroke-linecap="round"/>' +
      '<path d="M26 80V92M72 80V92" fill="none" stroke-width="4" stroke-linecap="round"/>' +
      // gift sack
      '<path d="M2 46C-6 30 8 8 26 12C42 14 46 34 40 46Z"/>' +
      '<path d="M18 12C20 6 26 4 30 8L26 14Z"/>' +
      // Santa
      '<path d="M52 48C50 28 62 18 74 22C84 25 88 38 86 48Z"/>' +
      '<circle cx="70" cy="14" r="8"/>' +
      '<path d="M60 16C60 0 76 -8 90 4L86 10C80 4 70 4 64 12Z"/>' +
      '<circle cx="62" cy="2" r="4.2"/>' +
      '<path d="M63 20C65 32 77 32 79 20C73 24 69 24 63 20Z"/>' +
      '<g transform="translate(80 30)"><g class="xm-santa-arm"><path d="M0 0L22 -22" fill="none" stroke-width="6" stroke-linecap="round"/><circle cx="24" cy="-24" r="4.5"/></g></g>' +
    '</g>' +
    // reins
    '<path class="xm-reins" d="M96 50C140 40 190 40 232 52M96 54C150 52 200 52 262 62" fill="none" stroke-width="1.6"/>' +
    // reindeer (rear one is a little smaller)
    '<g transform="translate(176 56) scale(.92)">__DEER__</g>' +
    '<g transform="translate(262 52)">__DEER__</g>' +
  '</g>' +
  '<g class="xm-sparkles"><circle cx="-14" cy="62" r="3"/><circle cx="-30" cy="54" r="2.4"/><circle cx="-46" cy="64" r="2"/><circle cx="-62" cy="56" r="1.6"/><circle cx="-78" cy="63" r="1.3"/></g>' +
'</svg>';

const DEER_PARTS =
  '<g class="xm-deer-bob">' +
    // hind legs, then body, then front legs (so the body overlaps the hips)
    '<g transform="translate(8 10)"><path class="xm-leg xm-leg-b" d="M0 0L-10 14L-22 20L-18 25" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>' +
    '<g transform="translate(14 10)"><path class="xm-leg xm-leg-a" d="M0 0L-8 15L-18 22L-14 27" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>' +
    '<path d="M0 0C8-9 34-10 48-4C54-1 56 8 50 12C38 18 12 18 2 12C-3 8-3 3 0 0Z"/>' +
    '<path class="xm-tail" d="M2 0L-9-7L-3 5Z"/>' +
    '<path d="M44-4C52-14 58-24 62-32L70-28C66-18 62-6 56 6Z"/>' +
    '<g class="xm-deer-head">' +
      '<path d="M60-34C66-42 78-42 86-36L99-27C99-23 93-21 87-23C79-21 69-23 62-28Z"/>' +
      '<path d="M66-40L58-48L70-43Z"/>' +
      '<path d="M72-40L68-56M68-56L60-62M68-56L72-67M79-39L85-55M85-55L93-59M85-55L87-66" fill="none" stroke-width="2.6" stroke-linecap="round"/>' +
      '<circle class="xm-nose-glow" cx="98" cy="-26" r="7"/><circle class="xm-nose" cx="98" cy="-26" r="3.2"/>' +
    '</g>' +
    '<g transform="translate(40 10)"><path class="xm-leg xm-leg-a" d="M0 0L12 12L10 27L17 29" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>' +
    '<g transform="translate(46 9)"><path class="xm-leg xm-leg-b" d="M0 0L14 10L16 24L23 24" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>' +
  '</g>';

const SUNGLASSES_SVG = SVG_OPEN +
  '<path d="M3 15H37" stroke="#1b2236" stroke-width="2.4" stroke-linecap="round"/>' +
  '<path d="M4 16H18C19 25 15 31 10.5 31C6 31 3 25 4 16Z" fill="#1b2236" stroke="#ff8a3d" stroke-width="1.3" stroke-linejoin="round"/>' +
  '<path d="M22 16H36C37 25 34 31 29.5 31C25 31 21 25 22 16Z" fill="#1b2236" stroke="#ff8a3d" stroke-width="1.3" stroke-linejoin="round"/>' +
  '<path d="M18 18Q20 15.5 22 18" fill="none" stroke="#ff8a3d" stroke-width="1.6" stroke-linecap="round"/>' +
  '<path d="M7 20L11.5 18.6M25 20L29.5 18.6" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".6"/>' +
'</svg>';

const ICE_CREAM_SVG = SVG_OPEN +
  '<path d="M12.5 21L20 37.6L27.5 21Z" fill="#e0a85a" stroke="#a8742a" stroke-width="1" stroke-linejoin="round"/>' +
  '<path d="M15.2 26L24.8 26M17.2 31L22.8 31M16.6 22.4L22.4 34.4M23.4 22.4L17.6 34.4" stroke="#b9823a" stroke-width=".8" opacity=".8"/>' +
  '<circle cx="20" cy="17" r="8.4" fill="#ff9ec4" stroke="#d9608f" stroke-width="1"/>' +
  '<path d="M12.2 21.4C13 24.6 15.6 24.6 16.2 22C17.4 25 20 25 20.8 22C22 25 25 25 25.6 21.6" fill="#ff9ec4" stroke="#d9608f" stroke-width="1"/>' +
  '<circle cx="20" cy="9.6" r="6.6" fill="#fff1c9" stroke="#d9c58a" stroke-width="1"/>' +
  '<circle cx="20.6" cy="3.8" r="2.3" fill="#e5303a"/><path d="M20.6 3.8Q22 1.6 24 1.2" stroke="#4c8f32" stroke-width="1" fill="none"/>' +
  '<ellipse cx="16.4" cy="14" rx="2" ry="3" transform="rotate(25 16.4 14)" fill="#fff" opacity=".45"/>' +
'</svg>';

// Several icons per season: the buttons around the page take them in turn.
const SEASON_ART = {
  halloween: [PUMPKIN_SVG, WITCH_HAT_SVG, CANDY_CORN_SVG, GHOST_SVG],
  christmas: [SANTA_HAT_SVG, CANDY_CANE_SVG, GIFT_SVG, SNOWMAN_SVG],
  summer: [BEACH_BALL_SVG, SUNGLASSES_SVG, ICE_CREAM_SVG]
};


// ==========================================================
// HALLOWEEN DECORATIONS (the switch is HALLOWEEN_DECOR near the top)
// They sit in the top section (hero) of every page EXCEPT the homepage hero.
// Cobwebs, a dangling spider, bats, ghosts, embers, plus: a harvest moon,
// a witch crossing it now and then, blinking eyes in the dark, floating
// candy corn and pumpkins, and twinkling stars.
// ==========================================================
(function () {
  if (!HALLOWEEN_DECOR) return;
  const hero = document.querySelector(".hero, .page-hero, .about-hero, .contact-hero");
  if (!hero || IS_HOME_PAGE) return;

  const web = '<svg class="hw-web hw-web-__SIDE__" viewBox="0 0 190 190" aria-hidden="true" focusable="false"><path d="__WEB__"/></svg>';
  const bat = '<span class="hw-bat" style="--x:__Y__;--size:__SIZE__;--dur:__DUR__;--delay:__DELAY__;--s:__S__"><span class="hw-bat-bob">' + BAT_SVG + '</span></span>';
  const spider =
    '<span class="hw-spider"><span class="hw-thread"></span>' +
    '<svg viewBox="0 0 32 30" aria-hidden="true" focusable="false">' +
      '<g class="hw-spider-legs"><path d="M11 13C6 10 3 8 1 4"/><path d="M10 17C5 17 2 18 0 22"/><path d="M11 21C7 23 4 26 3 29"/>' +
      '<path d="M21 13C26 10 29 8 31 4"/><path d="M22 17C27 17 30 18 32 22"/><path d="M21 21C25 23 28 26 29 29"/></g>' +
      '<ellipse class="hw-spider-body" cx="16" cy="19" rx="7" ry="8"/><circle class="hw-spider-body" cx="16" cy="9" r="4.2"/>' +
      '<circle class="hw-spider-eye" cx="14.4" cy="8.6" r="1"/><circle class="hw-spider-eye" cx="17.6" cy="8.6" r="1"/>' +
    '</svg></span>';

  const webPath = "M0 0L178.0 0.0M0 0L169.3 55.0M0 0L144.0 104.6M0 0L104.6 144.0M0 0L55.0 169.3M0 0L0.0 178.0M34.0 0.0Q28.2 4.5 32.3 10.5M32.3 10.5Q25.4 13.0 27.5 20.0M27.5 20.0Q20.2 20.2 20.0 27.5M20.0 27.5Q13.0 25.4 10.5 32.3M10.5 32.3Q4.5 28.2 0.0 34.0M68.0 0.0Q56.4 8.9 64.7 21.0M64.7 21.0Q50.9 25.9 55.0 40.0M55.0 40.0Q40.4 40.4 40.0 55.0M40.0 55.0Q25.9 50.9 21.0 64.7M21.0 64.7Q8.9 56.4 0.0 68.0M102.0 0.0Q84.6 13.4 97.0 31.5M97.0 31.5Q76.3 38.9 82.5 60.0M82.5 60.0Q60.6 60.6 60.0 82.5M60.0 82.5Q38.9 76.3 31.5 97.0M31.5 97.0Q13.4 84.6 0.0 102.0M136.0 0.0Q112.8 17.9 129.3 42.0M129.3 42.0Q101.8 51.9 110.0 79.9M110.0 79.9Q80.8 80.8 79.9 110.0M79.9 110.0Q51.9 101.8 42.0 129.3M42.0 129.3Q17.9 112.8 0.0 136.0M170.0 0.0Q141.0 22.3 161.7 52.5M161.7 52.5Q127.2 64.8 137.5 99.9M137.5 99.9Q101.0 101.0 99.9 137.5M99.9 137.5Q64.8 127.2 52.5 161.7M52.5 161.7Q22.3 141.0 0.0 170.0";
  const decor = document.createElement("div");
  decor.className = "hw-decor";
  decor.setAttribute("aria-hidden", "true");

  let html = '<span class="hw-glow"></span>';
  html += web.replace("__SIDE__", "left").replace("__WEB__", webPath);
  html += web.replace("__SIDE__", "right").replace("__WEB__", webPath);

  // Twinkling stars across the upper half
  for (let i = 0; i < 14; i++) {
    const x = (i * 29 + 7) % 94 + 2;
    const y = (i * 47 + 5) % 44 + 4;
    html += '<span class="hw-star" style="--x:' + x + '%;--y:' + y + '%;--s:' + (2 + (i % 3)) + 'px;--dur:' + (3 + (i * 5) % 4) + 's;--delay:' + ((i * 1.1) % 5).toFixed(1) + 's"></span>';
  }

  // Harvest moon (top right) and the witch who flies across it every so often
  html += '<span class="hw-moon"><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
    '<circle cx="50" cy="50" r="42" fill="#ffd49a"/>' +
    '<path d="M50 8a42 42 0 1 1 0 84a54 54 0 0 0 0-84z" fill="#eda55a" opacity=".5"/>' +
    '<circle cx="36" cy="38" r="7" fill="#e49b52" opacity=".5"/><circle cx="62" cy="29" r="4" fill="#e49b52" opacity=".5"/>' +
    '<circle cx="62" cy="62" r="9" fill="#e49b52" opacity=".45"/><circle cx="35" cy="68" r="4.5" fill="#e49b52" opacity=".5"/>' +
  '</svg></span>';
  html += '<span class="hw-witch" style="--dur:42s;--delay:5s"><span class="hw-witch-bob">' + WITCH_SIL + '</span></span>';

  html += spider;

  // Three bats at different positions, each flying up through the hero, one after another
  [["12%", "46px", "15s", "1.5s", "1"], ["48%", "36px", "17s", "6s", "-1"], ["82%", "42px", "16s", "11s", "1"]].forEach((b) => {
    html += bat.replace("__Y__", b[0]).replace("__SIZE__", b[1]).replace("__DUR__", b[2]).replace("__DELAY__", b[3]).replace("__S__", b[4]);
  });

  // Ghosts: pale, slow, they fade in, drift and fade out again
  const floater = '<span class="hw-ghost __CLS__" style="--x:__X__;--y:__Y__;--size:__SIZE__;--dur:__DUR__;--delay:__DELAY__;--s:__S__"><span class="hw-ghost-bob">__ART__</span></span>';
  [["4%", "58%", "56px", "20s", "0.5s", "1", "", GHOST_SVG], ["72%", "34%", "46px", "23s", "7s", "-1", "", GHOST_SVG], ["38%", "70%", "40px", "19s", "13s", "1", "", GHOST_SVG],
   // Treats drifting by: candy corn and little pumpkins
   ["24%", "22%", "30px", "26s", "3s", "1", "hw-float", CANDY_CORN_SVG], ["60%", "62%", "34px", "28s", "9s", "-1", "hw-float", PUMPKIN_SVG], ["90%", "52%", "28px", "24s", "16s", "-1", "hw-float", CANDY_CORN_SVG]
  ].forEach((g) => {
    html += floater.replace("__X__", g[0]).replace("__Y__", g[1]).replace("__SIZE__", g[2]).replace("__DUR__", g[3]).replace("__DELAY__", g[4]).replace("__S__", g[5]).replace("__CLS__", g[6]).replace("__ART__", g[7]);
  });

  // Eyes in the dark that open, blink and close again
  [["1.5%", "46%", "0s"], ["95%", "58%", "6s"], ["88%", "26%", "11s"]].forEach((e) => {
    html += '<span class="hw-eyes" style="--x:' + e[0] + ';--y:' + e[1] + ';--delay:' + e[2] + '"><i></i><i></i></span>';
  });

  // Embers: slow orange sparks drifting up from the bottom
  for (let i = 0; i < 14; i++) {
    const x = 4 + (i * 97 / 14) + (i % 3) * 2;
    const size = 3 + (i % 4);
    const dur = 10 + (i * 7) % 9;
    const delay = (i * 1.7) % 12;
    const drift = (i % 2 ? 1 : -1) * (20 + (i * 13) % 50);
    html += '<span class="hw-ember" style="--x:' + x.toFixed(1) + '%;--s:' + size + 'px;--dur:' + dur + 's;--delay:' + delay.toFixed(1) + 's;--drift:' + drift + 'px"></span>';
  }

  decor.innerHTML = html;
  hero.classList.add("has-halloween");
  hero.insertBefore(decor, hero.firstChild);

  // How far a bat has to climb (the full height of the hero) and how far the witch has to fly (the full width)
  const setTravel = () => {
    decor.style.setProperty("--travel", (decor.offsetHeight + 120) + "px");
    decor.style.setProperty("--span", (decor.offsetWidth + 260) + "px");
  };
  setTravel();
  window.addEventListener("resize", setTravel);
})();


// ==========================================================
// CHRISTMAS SNOW (the switch is CHRISTMAS_DECOR near the top)
// Adds the snow script to every page. Visitors who ask their device for
// less motion do not get snow.
// ==========================================================
(function () {
  if (!CHRISTMAS_DECOR) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const SNOW_SRC = "https://app.embed.im/snow.js";
  if (document.querySelector('script[src="' + SNOW_SRC + '"]')) return;
  const snow = document.createElement("script");
  snow.src = SNOW_SRC;
  snow.defer = true;
  document.head.appendChild(snow);
})();


// ==========================================================
// CHRISTMAS DECORATIONS (the switch is CHRISTMAS_DECOR near the top)
// They sit in the top section (hero) of every page EXCEPT the homepage hero.
// A pine garland, striped baubles, a golden star and a snowflake on threads,
// and Santa's sleigh (a flying silhouette) passing a crescent moon.
// ==========================================================
(function () {
  if (!CHRISTMAS_DECOR) return;
  const hero = document.querySelector(".hero, .page-hero, .about-hero, .contact-hero");
  if (!hero || IS_HOME_PAGE) return;

  const decor = document.createElement("div");
  decor.className = "xm-decor";
  decor.setAttribute("aria-hidden", "true");

  let html = '<span class="xm-glow"></span>';

  // Pine garland: branches draped across the top, with red berries and a few cones.
  // It hangs from the bottom edge of the top bar.
  const greens = ["#1f6b3a", "#2f8f4e", "#1a5a31", "#3aa35e"];
  const pineSwag = (swag) => {
    const p0 = [0, 8], p1 = [120, 50], p2 = [240, 8];
    const at = (t) => [
      (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
      (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]
    ];
    const steps = 30;
    let needles = "";
    let extras = "";
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const pt = at(t), before = at(Math.max(0, t - 0.01)), after = at(Math.min(1, t + 0.01));
      const tx = after[0] - before[0], ty = after[1] - before[1];
      const len = Math.hypot(tx, ty) || 1;
      const nx = -ty / len, ny = tx / len; // points down, away from the stem
      for (let k = 0; k < 3; k++) {
        const j = ((i * 37 + k * 53 + swag * 17) % 100) / 100;
        const spread = [-0.75, 0, 0.75][k] + (j - 0.5) * 0.35;
        const dx = nx * Math.cos(spread) - ny * Math.sin(spread);
        const dy = nx * Math.sin(spread) + ny * Math.cos(spread);
        const l = 10 + j * 8;
        needles += '<path d="M' + pt[0].toFixed(1) + ' ' + pt[1].toFixed(1) + 'l' + (dx * l).toFixed(1) + ' ' + (dy * l).toFixed(1) + '" stroke="' + greens[(i + k) % greens.length] + '"/>';
      }
      if ((i + swag) % 6 === 2) {
        extras += '<circle cx="' + (pt[0] + nx * 9).toFixed(1) + '" cy="' + (pt[1] + ny * 9).toFixed(1) + '" r="2.7" fill="#e5303a"/>';
        extras += '<circle cx="' + (pt[0] + nx * 9 - 0.8).toFixed(1) + '" cy="' + (pt[1] + ny * 9 - 0.8).toFixed(1) + '" r="0.8" fill="#ff9aa0"/>';
      }
      if (i === 15 && swag % 2 === 0) {
        extras += '<ellipse cx="' + (pt[0] + nx * 12).toFixed(1) + '" cy="' + (pt[1] + ny * 12).toFixed(1) + '" rx="3.4" ry="5.6" fill="#7a4a24" transform="rotate(-8 ' + (pt[0] + nx * 12).toFixed(1) + ' ' + (pt[1] + ny * 12).toFixed(1) + ')"/>';
      }
      // A tiny warm light on every fifth step
      if (i % 5 === 3) {
        const c = ["#ffd166", "#ff6b6b", "#6ec1ff", "#7dffb0"][(i + swag) % 4];
        extras += '<circle class="xm-lightbulb" style="--d:' + (1.4 + ((i + swag) % 4) * 0.5) + 's;--delay:-' + (((i * 3 + swag) % 7) * 0.4).toFixed(1) + 's" cx="' + (pt[0] + nx * 5).toFixed(1) + '" cy="' + (pt[1] + ny * 5).toFixed(1) + '" r="2.1" fill="' + c + '"/>';
      }
    }
    return '<svg viewBox="0 0 240 64" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<path d="M0 8Q120 50 240 8" stroke="#5a3a1e" style="stroke-width:2.8px"/>' + needles + extras + '</svg>';
  };
  html += '<div class="xm-garland">';
  for (let s = 0; s < 6; s++) html += '<span class="xm-pine">' + pineSwag(s) + '</span>';
  html += '</div>';

  // Things hanging on threads (they swing gently)
  const hanging = (inner, cls, x, len, color, delay) =>
    '<span class="xm-ornament ' + cls + '" style="--x:' + x + ';--len:' + len + ';--c:' + color + ';--delay:' + delay + '"><span class="xm-thread"></span>' + inner + '</span>';

  const bauble =
    '<svg viewBox="0 0 28 36" aria-hidden="true" focusable="false">' +
      '<rect class="xm-cap" x="10" y="0" width="8" height="5.4" rx="1.5"/><rect class="xm-cap-ring" x="11.6" y="0" width="1.2" height="5.4"/>' +
      '<circle class="xm-ball" cx="14" cy="22" r="12.4"/>' +
      '<path class="xm-stripe" d="M2.8 19c7 4.2 15.4 4.2 22.4 0M2 25c7.4 4.4 16.6 4.4 24 0"/>' +
      '<ellipse class="xm-shine" cx="9.4" cy="15.6" rx="3" ry="5" transform="rotate(25 9.4 15.6)"/>' +
    '</svg>';
  const star =
    '<svg viewBox="0 0 30 30" aria-hidden="true" focusable="false">' +
      '<path class="xm-star-shape" d="M15 2l3.9 8.4 9.1 1.1-6.7 6.3 1.8 9.1L15 22.4 6.9 26.9l1.8-9.1L2 11.5l9.1-1.1z"/>' +
      '<path class="xm-star-shine" d="M15 6.4l1.9 4.4"/>' +
    '</svg>';
  const flake =
    '<svg viewBox="0 0 30 30" aria-hidden="true" focusable="false">' +
      '<g class="xm-flake-shape"><path d="M15 2v26M3.7 8.5l22.6 13M26.3 8.5L3.7 21.5"/>' +
      '<path d="M11.6 4.6L15 8l3.4-3.4M11.6 25.4L15 22l3.4 3.4M5.4 12.4l4.6-.9M5.2 17.6l4.6.9M24.6 12.4l-4.6-.9M24.8 17.6l-4.6.9"/></g>' +
    '</svg>';

  html += hanging(bauble, "xm-ornament-1", "46%", "58px", "#ff4d4d", "-1.2s");
  html += hanging(star, "xm-hang-star", "55%", "40px", "#ffd166", "-3.4s");
  html += hanging(bauble, "xm-ornament-2", "64%", "96px", "#3b9dff", "-2.6s");
  html += hanging(flake, "xm-hang-flake", "76%", "52px", "#bfe4ff", "-0.8s");
  html += hanging(bauble, "xm-ornament-3", "88%", "66px", "#3ddc84", "-0.4s");

  // Crescent moon, and Santa's sleigh with two reindeer flying past it
  html += '<span class="xm-moon"><svg viewBox="0 0 60 60" aria-hidden="true" focusable="false"><path d="M34 6a26 26 0 1 0 20 41A21 21 0 0 1 34 6z" fill="#fff1c9"/><circle cx="26" cy="36" r="2.4" fill="#f2dca0" opacity=".7"/><circle cx="32" cy="46" r="1.6" fill="#f2dca0" opacity=".7"/></svg></span>';

  // Santa's sleigh: a silhouette, flying left to right. Three layers move it:
  // the outer one carries it across, the middle one makes it rise and fall in a
  // wave, the inner one banks it. The reindeer gallop (legs, head, bobbing).
  html += '<span class="xm-sleigh" style="--dur:36s;--delay:3s"><span class="xm-sleigh-wave"><span class="xm-sleigh-tilt">' +
    SANTA_SIL.split("__DEER__").join(DEER_PARTS) + '</span></span></span>';

  // A few golden sparkles
  for (let i = 0; i < 12; i++) {
    const x = (i * 37 + 11) % 96;
    const y = (i * 53 + 7) % 62 + 20;
    const size = 2 + (i % 3);
    const dur = 3 + (i * 7) % 4;
    const delay = (i * 1.3) % 6;
    html += '<span class="xm-twinkle" style="--x:' + x + '%;--y:' + y + '%;--s:' + size + 'px;--dur:' + dur + 's;--delay:' + delay.toFixed(1) + 's"></span>';
  }

  decor.innerHTML = html;
  hero.classList.add("has-christmas");
  hero.insertBefore(decor, hero.firstChild);

  // How far the sleigh has to fly: the full width of the hero
  const setSpan = () => decor.style.setProperty("--span", (decor.offsetWidth + 420) + "px");
  setSpan();
  window.addEventListener("resize", setSpan);
})();


// ==========================================================
// SUMMER DECORATIONS (the switch is SUMMER_DECOR near the top)
// They sit in the top section (hero) of every page EXCEPT the homepage hero.
// A glowing sun, swaying palm fronds in the top corners, seagulls gliding
// past, a little sailboat on rolling waves, glittering water and bubbles.
// (No clouds.)
// ==========================================================
(function () {
  if (!SUMMER_DECOR) return;
  const hero = document.querySelector(".hero, .page-hero, .about-hero, .contact-hero");
  if (!hero || IS_HOME_PAGE) return;

  const decor = document.createElement("div");
  decor.className = "sm-decor";
  decor.setAttribute("aria-hidden", "true");

  let html = '<span class="sm-glow"></span>';

  // Sun: a disc with twelve rays that turn slowly and a soft pulse
  let rays = "";
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    const r2 = i % 2 ? 40 : 46;
    rays += '<path d="M' + (50 + Math.cos(a) * 31).toFixed(1) + ' ' + (50 + Math.sin(a) * 31).toFixed(1) +
            'L' + (50 + Math.cos(a) * r2).toFixed(1) + ' ' + (50 + Math.sin(a) * r2).toFixed(1) + '"/>';
  }
  html += '<span class="sm-rays" aria-hidden="true"></span>';
  html += '<span class="sm-sun"><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g class="sm-sun-rays">' + rays + '</g><circle class="sm-sun-disc" cx="50" cy="50" r="22"/><ellipse cx="43" cy="42" rx="7" ry="4" transform="rotate(-35 43 42)" fill="#fff" opacity=".35"/></svg></span>';

  // Palm fronds hanging into the top corners; each frond sways on its own
  const frondAngles = [4, 22, 40, 58, 76, 92];
  let fronds = "";
  frondAngles.forEach((a, i) => {
    const len = 118 - (i % 2) * 18;
    fronds += '<g transform="rotate(' + a + ')"><g class="sm-frond" style="--d:-' + (i * 0.9).toFixed(1) + 's">' +
      '<path class="sm-leaf" d="M0 0C' + (len * 0.25) + ' -13 ' + (len * 0.62) + ' -11 ' + len + ' 12C' + (len * 0.64) + ' 2 ' + (len * 0.28) + ' 6 0 0Z"/>' +
      '<path class="sm-rib" d="M2 0C' + (len * 0.3) + ' -2 ' + (len * 0.62) + ' -1 ' + (len * 0.94) + ' 9"/>' +
      '</g></g>';
  });
  const palm = '<svg viewBox="0 0 150 150" aria-hidden="true" focusable="false">' + fronds + '</svg>';
  html += '<span class="sm-palm sm-palm-left">' + palm + '</span><span class="sm-palm sm-palm-right">' + palm + '</span>';

  // Seagulls
  const gull = '<span class="sm-gull" style="--y:__Y__;--w:__W__;--dur:__DUR__;--delay:__DELAY__"><span class="sm-gull-glide"><svg viewBox="-14 -8 28 14" aria-hidden="true" focusable="false"><path class="sm-gull-wing" d="M-13 2Q-7-6 0 0Q7-6 13 2Q7-2 0 3Q-7-2-13 2Z"/></svg></span></span>';
  [["18%", "26px", "34s", "-4s"], ["27%", "20px", "42s", "-22s"], ["12%", "16px", "38s", "-30s"]].forEach((g) => {
    html += gull.replace("__Y__", g[0]).replace("__W__", g[1]).replace("__DUR__", g[2]).replace("__DELAY__", g[3]);
  });

  // Waves along the bottom edge (three layers moving at different speeds), with a sailboat riding them
  const wave = "M0 30Q150 6 300 30T600 30T900 30T1200 30T1500 30T1800 30T2100 30T2400 30V60H0Z";
  html += '<span class="sm-boat" style="--dur:150s"><span class="sm-boat-rock"><svg viewBox="0 0 60 58" aria-hidden="true" focusable="false">' +
    '<path d="M30 4V42" stroke="#e8d6b0" stroke-width="1.6" stroke-linecap="round"/>' +
    '<path d="M28 6L8 40H28Z" fill="#fff6e4"/><path d="M33 12L52 40H33Z" fill="#ffd9a0"/>' +
    '<path d="M4 44H56L49 54H11Z" fill="#c9563a"/><path d="M6 46H54" stroke="#ffe3c2" stroke-width="1.2"/>' +
  '</svg></span></span>';
  html += '<span class="sm-waves">' +
    '<svg class="sm-wave sm-wave-back" viewBox="0 0 2400 60" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="' + wave + '"/></svg>' +
    '<svg class="sm-wave sm-wave-mid" viewBox="0 0 2400 60" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="' + wave + '"/></svg>' +
    '<svg class="sm-wave sm-wave-front" viewBox="0 0 2400 60" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="' + wave + '"/></svg>' +
  '</span>';

  // Glitter on the water
  for (let i = 0; i < 10; i++) {
    const x = (i * 41 + 9) % 94 + 2;
    html += '<span class="sm-glint" style="--x:' + x + '%;--dur:' + (2.4 + (i % 4) * 0.7).toFixed(1) + 's;--delay:' + ((i * 0.8) % 4).toFixed(1) + 's"></span>';
  }

  // Bubbles rising slowly
  for (let i = 0; i < 10; i++) {
    const x = 5 + (i * 91 / 10) + (i % 3) * 2;
    const size = 6 + (i * 5) % 9;
    const dur = 12 + (i * 5) % 9;
    const delay = (i * 1.9) % 13;
    const drift = (i % 2 ? 1 : -1) * (14 + (i * 11) % 36);
    html += '<span class="sm-bubble" style="--x:' + x.toFixed(1) + '%;--s:' + size + 'px;--dur:' + dur + 's;--delay:' + delay.toFixed(1) + 's;--drift:' + drift + 'px"></span>';
  }

  decor.innerHTML = html;
  hero.classList.add("has-summer");
  hero.insertBefore(decor, hero.firstChild);

  const setSpan = () => decor.style.setProperty("--span", (decor.offsetWidth + 200) + "px");
  setSpan();
  window.addEventListener("resize", setSpan);
})();


// ==========================================================
// ABOUT LINK
// Every "About" link on every page points at the same file, whatever
// shape the link was written in (about, /about.html, ../about.html ...).
// ==========================================================
(function () {
  document.querySelectorAll("a[href]").forEach((link) => {
    const match = link.getAttribute("href").match(/^(?:\.{1,2}\/|\/)*about(?:\.html?)?\/?([?#].*)?$/i);
    if (match) link.setAttribute("href", "/about/" + (match[1] || ""));
  });
})();


// ==========================================================
// NAV BUTTON "COMMISSION ME": TEXT ROLL + CURSOR SPOTLIGHT
// Runs on every page, because every page has the same .site-menu button,
// so no HTML file needs to change. On hover / keyboard focus the label
// rolls up and a second line rolls in (NAV_CTA_ROLL_TEXT), and a soft light
// follows the cursor across the button. The styling is in style.css ("NAV
// BUTTON COMMISSION ME"). Set NAV_CTA_FX to false to switch the whole effect
// off. The season badges and webs are not touched.
// ==========================================================
const NAV_CTA_FX = true;
const NAV_CTA_ROLL_TEXT = "Let\u2019s Build It!";

(function () {
  if (!NAV_CTA_FX) return;

  document.querySelectorAll(".site-menu > .button").forEach((button) => {
    if (button.classList.contains("cta-fx")) return;

    // The label is the text that sits directly inside the button
    const textNodes = Array.from(button.childNodes).filter((node) => node.nodeType === 3 && node.nodeValue.trim());
    if (!textNodes.length) return;
    const label = textNodes.map((node) => node.nodeValue.trim()).join(" ");

    // Light layer: the spotlight and a bright edge that follow the cursor
    const light = document.createElement("span");
    light.className = "cta-fx-light";
    light.setAttribute("aria-hidden", "true");

    // Text roll: the real label stays readable for screen readers, the second line is decoration
    const roll = document.createElement("span");
    roll.className = "cta-roll";
    const lineA = document.createElement("span");
    lineA.className = "cta-roll-line";
    lineA.textContent = label;
    const lineB = document.createElement("span");
    lineB.className = "cta-roll-line cta-roll-line--alt";
    lineB.setAttribute("aria-hidden", "true");
    lineB.textContent = NAV_CTA_ROLL_TEXT;
    roll.append(lineA, lineB);

    textNodes[0].replaceWith(roll);
    textNodes.slice(1).forEach((node) => node.remove());
    button.insertBefore(light, button.firstChild);
    button.classList.add("cta-fx");

    // Cursor position inside the button (mouse only, only while it is over the button)
    button.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--cta-x", (event.clientX - rect.left).toFixed(1) + "px");
      button.style.setProperty("--cta-y", (event.clientY - rect.top).toFixed(1) + "px");
    });
  });
})();

// ==========================================================
// HOMEPAGE HOVER FX
// Homepage only. Adds the layers that the hover animations in style.css
// ("HOMEPAGE HOVER FX") need.
//
// SWITCHES (true = on, false = off):
//  - HERO_BUTTON_FX: the two hero buttons. "View My Work" = Uiverse stars
//    button (by MuhammadHasann). "View Reviews" = its text scrolls up on hover and five
//    rating stars pop out above it. The rating pill has its own, separate hover.
//    Off = the hero buttons look exactly like they did before.
//  - HOME_HOVER_FX: the FAQ (accent bar, nudge, cursor-following light).
// The real label always stays in the button for screen readers.
// ==========================================================
const HERO_BUTTON_FX = true;
const HOME_HOVER_FX = true;

(function () {
  if (!IS_HOME_PAGE) return;

  const mk = (tag, cls) => { const n = document.createElement(tag); n.className = cls; return n; };
  const labelOf = (button) => {
    const nodes = Array.from(button.childNodes).filter((n) => n.nodeType === 3 && n.nodeValue.trim());
    return nodes.length ? { nodes, text: nodes.map((n) => n.nodeValue.trim()).join(" ") } : null;
  };

  if (HERO_BUTTON_FX) {
    // ----- View My Work (Uiverse stars button) -----
    const primary = document.querySelector(".hero-actions .button-primary");
    const pl = primary && labelOf(primary);
    if (pl) {
      const label = mk("span", "hfx-label");
      label.textContent = pl.text;
      pl.nodes[0].replaceWith(label);
      pl.nodes.slice(1).forEach((n) => n.remove());

      // six four-point stars; the CSS flies them out of the button on hover
      const STAR = '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 0C12.9 7.5 16.5 11.1 24 12 16.5 12.9 12.9 16.5 12 24 11.1 16.5 7.5 12.9 0 12 7.5 11.1 11.1 7.5 12 0Z"/></svg>';
      const stars = mk("span", "hfx-stars");
      stars.setAttribute("aria-hidden", "true");
      for (let i = 1; i <= 6; i++) {
        const s = mk("span", "hfx-star hfx-star--" + i);
        s.innerHTML = STAR;
        stars.appendChild(s);
      }
      primary.appendChild(stars);
      primary.classList.add("hfx-btn");
    }

    // ----- View Reviews: scroll-up text + five rating stars (the rating pill above is NOT involved) -----
    const secondary = document.querySelector(".hero-actions .button-secondary");
    if (secondary) {
      const sl = labelOf(secondary);
      if (sl) {
        // rolling label: the real text stays for screen readers, a copy rolls up from below on hover
        const roll = mk("span", "hfx-roll");
        const a = mk("span", "hfx-roll-a");
        const b = mk("span", "hfx-roll-b");
        a.textContent = sl.text;
        b.textContent = sl.text;
        b.setAttribute("aria-hidden", "true");
        roll.appendChild(a);
        roll.appendChild(b);
        sl.nodes[0].replaceWith(roll);
        sl.nodes.slice(1).forEach((n) => n.remove());
      }
      const SPARK = '<svg viewBox="0 0 16 16" focusable="false"><path d="M8 1.3l2.08 4.36 4.77.62-3.5 3.3.88 4.74L8 11.95 3.77 14.32l.88-4.74-3.5-3.3 4.77-.62z"/></svg>';
      const sparks = mk("span", "hfx-sparks");
      sparks.setAttribute("aria-hidden", "true");
      for (let i = 1; i <= 5; i++) {
        const s = mk("span", "hfx-spark hfx-spark--" + i);
        s.innerHTML = SPARK;
        sparks.appendChild(s);
      }
      secondary.appendChild(sparks);
      secondary.classList.add("hfx-btn");
    }
  }

  if (HOME_HOVER_FX) {
    // ----- FAQ: light follows the cursor (one delegated listener) -----
    const CARDS = ".faq-item";
    let frame = 0;
    const host = (el) => {
      if (!el.classList.contains("hfx-host")) {
        if (getComputedStyle(el).position === "static") el.style.position = "relative";
        const glow = mk("span", "hfx-glow");
        glow.setAttribute("aria-hidden", "true");
        el.insertBefore(glow, el.firstChild);
        el.classList.add("hfx-host");
      }
      return el;
    };
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse" || frame) return;
      const card = e.target.closest && e.target.closest(CARDS);
      if (!card) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        host(card);
        const r = card.getBoundingClientRect();
        card.style.setProperty("--hx", (e.clientX - r.left).toFixed(1) + "px");
        card.style.setProperty("--hy", (e.clientY - r.top).toFixed(1) + "px");
      });
    }, { passive: true });
  }
})();

// Top bar "Commission Me": same scroll-up text + star burst as the hero buttons (all pages; the
// CSS removes the lighting-up hover for it). Off with HERO_BUTTON_FX = false.
(function () {
  if (!HERO_BUTTON_FX) return;
  const button = document.querySelector(".site-header .button-primary");
  if (!button || button.classList.contains("hfx-btn")) return;
  const mk = (tag, cls) => { const n = document.createElement(tag); n.className = cls; return n; };
  const nodes = Array.from(button.childNodes).filter((n) => n.nodeType === 3 && n.nodeValue.trim());
  if (!nodes.length) return;
  const text = nodes.map((n) => n.nodeValue.trim()).join(" ");
  const roll = mk("span", "hfx-roll");
  const a = mk("span", "hfx-roll-a");
  const b = mk("span", "hfx-roll-b");
  a.textContent = text;
  b.textContent = text;
  b.setAttribute("aria-hidden", "true");
  roll.appendChild(a);
  roll.appendChild(b);
  nodes[0].replaceWith(roll);
  nodes.slice(1).forEach((n) => n.remove());
  const SPARK = '<svg viewBox="0 0 16 16" focusable="false"><path d="M8 1.3l2.08 4.36 4.77.62-3.5 3.3.88 4.74L8 11.95 3.77 14.32l.88-4.74-3.5-3.3 4.77-.62z"/></svg>';
  const sparks = mk("span", "hfx-sparks");
  sparks.setAttribute("aria-hidden", "true");
  for (let i = 1; i <= 5; i++) {
    const s = mk("span", "hfx-spark hfx-spark--" + i);
    s.innerHTML = SPARK;
    sparks.appendChild(s);
  }
  button.appendChild(sparks);
  button.classList.add("hfx-btn", "hfx-nav");
})();


// ==========================================================
// SEASONAL EXTRAS: BUTTON DECORATIONS AND MEGA MENU DECOR
// Follows the same switches as the season decorations above
// (HALLOWEEN_DECOR, CHRISTMAS_DECOR, SUMMER_DECOR; the first one that is
// on wins). The icons come from SEASON_ART: Halloween = pumpkin, witch hat,
// candy corn, ghost; Christmas = Santa hat, candy cane, present, snowman;
// Summer = beach ball. The buttons take them in turn. Nothing here is
// clickable. (This part also runs on the homepage: only the HERO
// decorations are skipped there.)
// ==========================================================
(function () {
  const season = HALLOWEEN_DECOR ? "halloween" : CHRISTMAS_DECOR ? "christmas" : SUMMER_DECOR ? "summer" : "";
  if (!season) return;

  const ART = SEASON_ART[season];
  const art = (i) => ART[i % ART.length];

  // ----- "Your Perks" (homepage): the Seasonal Sales card dresses up for the active season -----
  const perkCard = document.querySelector("[data-perk-season]");
  if (perkCard && !perkCard.querySelector(".perk-season-art")) {
    perkCard.setAttribute("data-season", season);
    const perkArt = document.createElement("span");
    perkArt.className = "perk-season-art";
    perkArt.setAttribute("aria-hidden", "true");
    perkArt.innerHTML = art(0);
    perkCard.appendChild(perkArt);
  }

  // ----- Decorations on a few buttons around the page -----
  const targets = [
    ".site-menu > .button",
    ".hero-actions .button-primary",
    ".work-footer .button",
    ".footer-cta"
  ];
  let side = 0;
  targets.forEach((selector) => {
    document.querySelectorAll(selector).forEach((button) => {
      if (button.querySelector(".season-badge")) return;
      const badge = document.createElement("span");
      badge.className = "season-badge season-badge--" + season + (side % 2 ? " is-left" : " is-right");
      badge.setAttribute("aria-hidden", "true");
      badge.innerHTML = art(side);
      button.classList.add("has-season");
      button.appendChild(badge);
      side += 1;
    });
  });


  // ----- Spider webs (Halloween) on buttons and on some frames / image examples -----
  if (season === "halloween") {
    // A quarter spider web, drawn from the top-left corner
    const webD = (function () {
      const R = 58, n = 4;
      const pt = (r, a) => [r * Math.cos(a), r * Math.sin(a)];
      let d = "";
      for (let i = 0; i <= n; i++) { const p = pt(R, i * Math.PI / 2 / n); d += "M0 0L" + p[0].toFixed(1) + " " + p[1].toFixed(1); }
      [14, 28, 43].forEach((r) => {
        for (let i = 0; i < n; i++) {
          const a0 = i * Math.PI / 2 / n, a1 = (i + 1) * Math.PI / 2 / n;
          const p0 = pt(r, a0), p1 = pt(r, a1), c = pt(r * 0.84, (a0 + a1) / 2);
          d += "M" + p0[0].toFixed(1) + " " + p0[1].toFixed(1) + "Q" + c[0].toFixed(1) + " " + c[1].toFixed(1) + " " + p1[0].toFixed(1) + " " + p1[1].toFixed(1);
        }
      });
      return d;
    })();

    const keepPositioned = (el) => { if (getComputedStyle(el).position === "static") el.style.position = "relative"; };
    const dress = (el, kind, side) => {
      if (el.querySelector(":scope > .season-web")) return;
      const span = document.createElement("span");
      span.setAttribute("aria-hidden", "true");
      span.className = "season-web " + (side ? "is-left" : "is-right") + (kind === "frame" ? " season-web--frame" : "");
      span.innerHTML = '<svg viewBox="0 0 60 60" focusable="false"><path d="' + webD + '"/></svg>';
      keepPositioned(el);
      el.appendChild(span);
    };

    let b = 0;
    document.querySelectorAll(".button").forEach((button) => {
      const badge = button.querySelector(".season-badge");
      dress(button, "button", badge ? badge.classList.contains("is-right") : b % 2 === 0);
      b += 1;
    });

    let f = 0;
    document.querySelectorAll(".mock-post-art, .mock-tile--yours, .mega-banner, .social-art, .news-card-thumb, .portfolio-art, .work-grid > *").forEach((frame) => {
      f += 1;
      if (/portfolio-art|work-grid|news-card-thumb/.test(frame.className + " " + (frame.parentElement ? frame.parentElement.className : "")) && f % 2 === 0) return;
      dress(frame, "frame", f % 2 === 0);
    });
  }

  // ----- Decoration inside the Work mega menu (top right, never over the banner) -----
  const inner = document.querySelector(".mega-work .mega-inner");
  if (inner && !inner.querySelector(".mega-decor")) {
    const decor = document.createElement("div");
    decor.className = "mega-decor mega-decor--" + season;
    decor.setAttribute("aria-hidden", "true");
    let html = "";
    if (season === "halloween") {
      html += '<svg class="mega-decor-web" viewBox="0 0 90 90" focusable="false"><path d="M90 0L0 0M90 0L86 28M90 0L72 52M90 0L52 72M90 0L28 86M90 0L0 90M90 0L90 0M62 0Q64 8 58 12M58 12Q60 22 52 26M52 26Q52 36 44 40M34 0Q40 14 30 22M30 22Q34 38 22 46M12 0Q22 22 8 36"/></svg>';
      html += '<span class="mega-decor-item">' + PUMPKIN_SVG + '</span>';
      html += '<span class="mega-decor-item mega-decor-item--small mega-decor-ghost">' + GHOST_SVG + '</span>';
      html += '<span class="mega-decor-bat">' + BAT_SVG + '</span>';
    } else if (season === "christmas") {
      html += '<span class="mega-decor-item">' + SANTA_HAT_SVG + '</span>';
      html += '<span class="mega-decor-item mega-decor-item--small">' + CANDY_CANE_SVG + '</span>';
      html += '<i class="mega-decor-dot" style="--x:9%;--y:30%"></i><i class="mega-decor-dot" style="--x:26%;--y:62%"></i><i class="mega-decor-dot" style="--x:72%;--y:24%"></i><i class="mega-decor-dot mega-decor-dot--b" style="--x:46%;--y:20%"></i>';
    } else {
      html += '<span class="mega-decor-sun"></span>';
      html += '<span class="mega-decor-item">' + BEACH_BALL_SVG + '</span>';
      html += '<span class="mega-decor-item mega-decor-item--small">' + SUNGLASSES_SVG + '</span>';
    }
    decor.innerHTML = html;
    inner.appendChild(decor);
  }
})();


// ==========================================================
// CHRISTMAS SNOW ON THE BLUE PRIMARY BUTTONS
// Follows the Christmas switch (CHRISTMAS_DECOR) and has its own switch
// (CHRISTMAS_SNOW_ON_ITEMS) near the top. A small snow drift sits on the top
// edge of every blue primary button. Each drift is drawn to fit its own
// button, so each one looks a little different. Buttons that already wear a
// Santa hat or candy cane keep the snow on the other side. Buttons created
// later get theirs automatically. Nothing here can be clicked.
// ==========================================================
(function () {
  if (HALLOWEEN_DECOR || !CHRISTMAS_DECOR || !CHRISTMAS_SNOW_ON_ITEMS) return;

  const BUTTONS = ".button-primary";

  const records = new WeakMap();
  let serial = 0;

  // Small seeded random generator: the same element always gets the same snow
  const random = (seed) => {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const n1 = (value) => Math.round(value * 10) / 10;

  // Smooth curve through a list of points (each point pulls the curve towards it)
  const smooth = (points, start) => {
    let d = start ? "M" + n1(points[0][0]) + " " + n1(points[0][1]) : "";
    for (let i = 1; i < points.length - 1; i++) {
      d += "Q" + n1(points[i][0]) + " " + n1(points[i][1]) + " " +
        n1((points[i][0] + points[i + 1][0]) / 2) + " " + n1((points[i][1] + points[i + 1][1]) / 2);
    }
    const last = points[points.length - 1];
    return d + "L" + n1(last[0]) + " " + n1(last[1]);
  };

  const wrap = (width, height, body, drips) => {
    const shape = '<path d="' + body + '"/>' + drips;
    return '<svg width="' + n1(width) + '" height="' + n1(height) + '" viewBox="0 0 ' + n1(width) + " " + n1(height) +
      '" focusable="false" aria-hidden="true">' +
      '<g fill="rgba(104,156,238,0.55)" transform="translate(0 1.3)">' + shape + "</g>" +
      '<g fill="#f6faff">' + shape + "</g></svg>";
  };

  const drip = (x, y, width, height) =>
    '<rect x="' + n1(x - width / 2) + '" y="' + n1(y) + '" width="' + width + '" height="' + n1(height) + '" rx="' + width / 2 + '"/>';

  // Snow that sits ON TOP of a button: bumpy upper edge, a thin underside, a few tiny drips
  const overShape = (x0, x1, peak, rnd) => {
    const base = Math.ceil(peak * 1.6) + 3;   // where the button's top edge is inside the picture
    const bottom = base + 3;
    const span = x1 - x0;
    const top = [[x0, bottom], [x0 + 1.5, base - peak * 0.3]];
    let x = x0 + 5;
    while (x < x1 - 5) {
      const t = (x - x0) / span;
      const taper = 0.3 + 0.7 * Math.sin(Math.PI * t);
      const lump = rnd() < 0.35 ? 2.6 : 1;   // now and then a bigger mound
      top.push([x, base - (peak * 0.8 + rnd() * peak * 1.6 * lump) * taper]);
      x += 11 + rnd() * 10;
    }
    top.push([x1 - 1.5, base - peak * 0.3], [x1, bottom]);

    const under = [[x1, bottom]];
    let bx = x1 - 4;
    while (bx > x0 + 4) {
      under.push([bx, bottom + 0.5 + rnd() * 1.4]);
      bx -= 7 + rnd() * 7;
    }
    under.push([x0, bottom]);

    let drips = "";
    const count = span > 110 ? 2 : span > 50 ? (rnd() < 0.6 ? 1 : 0) : 0;
    for (let i = 0; i < count; i++) {
      drips += drip(x0 + 10 + rnd() * (span - 20), bottom - 1.5, 3.2, 3.5 + rnd() * 2.5);
    }
    return { base: base, height: bottom + 8, svg: (w) => wrap(w, bottom + 8, smooth(top, true) + smooth(under, false) + "Z", drips) };
  };

  function draw(el) {
    const rec = records.get(el);
    if (!rec || !rec.cap.isConnected) return;
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const key = width + "x" + height;
    if (key === rec.key) return;
    rec.key = key;

    if (width < 24) {
      rec.cap.innerHTML = "";
      return;
    }

    const rnd = random(rec.seed);
    const cs = getComputedStyle(el);
    const border = parseFloat(cs.borderTopWidth) || 0;
    const radius = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, height / 2, width / 2);
    let x0 = radius * 0.7 + 2;
    let x1 = width - radius * 0.7 - 2;

    // Keep clear of a Santa hat / candy cane / present on the same button
    const badge = el.querySelector(":scope > .season-badge");
    if (badge) {
      if (badge.classList.contains("is-right")) x1 = Math.min(x1, width - 38);
      else x0 = Math.max(x0, 38);
      if (x1 - x0 < 18) { rec.cap.innerHTML = ""; return; }
    } else if (x1 - x0 < 18) {
      const mid = width / 2;
      x0 = mid - 9;
      x1 = mid + 9;
    }

    // Long buttons only get snow on part of the edge, so it never looks heavy
    if (x1 - x0 > 230) {
      const keep = (x1 - x0) * (0.6 + rnd() * 0.15);
      x0 += rnd() * ((x1 - x0) - keep);
      x1 = x0 + keep;
    }

    const peak = height >= 40 ? 4.6 : 3.2;
    const shape = overShape(x0, x1, peak, rnd);
    rec.cap.style.left = -border + "px";
    rec.cap.style.top = -(shape.base + border) + "px";
    rec.cap.innerHTML = shape.svg(width);
  }

  const resizeWatcher = "ResizeObserver" in window
    ? new ResizeObserver((entries) => entries.forEach((entry) => draw(entry.target)))
    : null;

  function dress(el, kind) {
    if (el.querySelector(":scope > .snow-cap")) return;
    if (getComputedStyle(el).position === "static") el.style.position = "relative";

    const cap = document.createElement("span");
    cap.className = "snow-cap snow-cap--" + kind;
    cap.setAttribute("aria-hidden", "true");
    el.appendChild(cap);
    el.classList.add("has-snow");

    const old = records.get(el);
    records.set(el, { cap: cap, kind: kind, seed: old ? old.seed : (++serial * 7919 + 101), key: "" });
    if (resizeWatcher) resizeWatcher.observe(el);
    draw(el);
  }

  function scan() {
    queued = false;
    document.querySelectorAll(BUTTONS).forEach((el) => dress(el, "over"));
  }

  let queued = false;
  const queueScan = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(scan);
  };

  scan();

  // Filters, carousels and the gallery build their buttons and pictures after the page loads
  new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.target.classList && change.target.classList.contains("snow-cap")) continue;
      for (const node of change.addedNodes) {
        if (node.nodeType === 1 && !node.classList.contains("snow-cap")) {
          queueScan();
          return;
        }
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
})();


// ==========================================================
// SEASONAL CLICK EFFECT (switch: SEASON_CLICK_EFFECTS)
// Clicking a button sends a short burst from the cursor: snowflakes for
// Christmas, bats / pumpkins / ghosts / embers for Halloween.
// Skipped for visitors who ask their device for less motion.
// ==========================================================
(function () {
  if (!SEASON_CLICK_EFFECTS) return;
  const season = HALLOWEEN_DECOR ? "halloween" : CHRISTMAS_DECOR ? "christmas" : "";
  if (!season) return;
  const christmas = season === "christmas";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const TARGETS = ".button, .filter-chip, .cat-chip, .review-filter, .review-arrow, .pc-nav";
  const FLAKE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/></svg>';
  const EMBER = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="7" fill="#ffa86b"/></svg>';
  const BITS = christmas
    ? [{ html: FLAKE }]
    : [{ html: BAT_SVG, cls: "fx-bit--bat" }, { html: PUMPKIN_SVG }, { html: GHOST_SVG }, { html: EMBER }];

  const layer = document.createElement("div");
  layer.className = "fx-layer fx-layer--" + season;
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  function burst(x, y) {
    if (reduce.matches || !layer.animate) return;
    for (let i = 0; i < 12; i++) {
      if (layer.childElementCount > 60) return;
      const size = 16 + Math.random() * 12;
      const el = document.createElement("span");
      const bit = BITS[Math.floor(Math.random() * BITS.length)];
      el.className = "fx-bit" + (bit.cls ? " " + bit.cls : "");
      el.innerHTML = bit.html;
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.width = size + "px";
      el.style.height = size + "px";
      layer.appendChild(el);

      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
      const dist = 90 * (0.5 + Math.random() * 0.7);
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist + (christmas ? 42 : -8);   // snow drifts down, Halloween bits rise
      const spin = (Math.random() - 0.5) * 260;
      const at = (px, py) => "translate(calc(-50% + " + px.toFixed(1) + "px), calc(-50% + " + py.toFixed(1) + "px))";
      const anim = el.animate([
        { transform: at(0, 0) + " scale(0.3) rotate(0deg)", opacity: 0 },
        { transform: at(dx * 0.45, dy * 0.35) + " scale(1) rotate(" + (spin * 0.4).toFixed(0) + "deg)", opacity: 1, offset: 0.2 },
        { transform: at(dx * 0.8, dy * 0.7) + " scale(0.9) rotate(" + (spin * 0.8).toFixed(0) + "deg)", opacity: 1, offset: 0.6 },
        { transform: at(dx, dy) + " scale(0.6) rotate(" + spin.toFixed(0) + "deg)", opacity: 0 }
      ], { duration: 1000 * (0.75 + Math.random() * 0.5), easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" });
      anim.onfinish = () => el.remove();
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest ? event.target.closest(TARGETS) : null;
    if (!target || target.disabled || target.getAttribute("aria-disabled") === "true") return;
    let x = event.clientX;
    let y = event.clientY;
    if (!x && !y) {   // keyboard click: burst from the middle of the button
      const r = target.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    burst(x, y);
  }, true);
})();


// ==========================================================
// HOLIDAY COUNTDOWN BAR (settings: HOLIDAY_COUNTDOWN near the top)
// A slim bar above the top bar: "Christmas in 71d 04h 12m 09s". On the holiday itself it says Happy Christmas (Halloween);
// the day after, it is gone. Visitors can close it (remembered for the
// visit). Uses the visitor's own clock and time zone.
// ==========================================================
// ==========================================================
// HOLIDAY COUNTDOWN (settings: HOLIDAY_COUNTDOWN near the top)
// A small pill in the Work menu, in the heading row next to "Browse the work":
// "Christmas in 71d 04h 12m 09s". On the holiday itself it says Happy Christmas
// (Halloween); the day after, it is gone. Uses the visitor's own clock and time zone.
// ==========================================================
(function () {
  if (!HOLIDAY_COUNTDOWN.enabled) return;
  const season = HALLOWEEN_DECOR ? "halloween" : CHRISTMAS_DECOR ? "christmas" : "";
  const cfg = season && HOLIDAY_COUNTDOWN[season];
  const eyebrow = document.querySelector(".mega-work .mega-eyebrow");
  if (!cfg || !eyebrow) return;

  const year = new Date().getFullYear();
  const target = new Date(year, cfg.month - 1, cfg.day);
  const holidayEnd = new Date(year, cfg.month - 1, cfg.day + 1);
  if (Date.now() >= holidayEnd) return;

  const chip = document.createElement("span");
  chip.className = "mega-countdown mega-countdown--" + season;
  chip.setAttribute("role", "timer");
  chip.innerHTML =
    '<span class="holiday-bar-label"></span>' +
    '<span class="holiday-bar-time" data-hb-time></span>';
  eyebrow.appendChild(chip);

  const label = chip.querySelector(".holiday-bar-label");
  const time = chip.querySelector("[data-hb-time]");
  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const now = Date.now();
    const left = target - now;
    if (now >= holidayEnd) { chip.remove(); clearInterval(timer); return; }
    if (left <= 0) {
      label.textContent = "Happy " + cfg.name + "!";
      time.textContent = "";
      return;
    }
    const d = Math.floor(left / 86400000);
    const h = Math.floor(left / 3600000) % 24;
    const m = Math.floor(left / 60000) % 60;
    const sec = Math.floor(left / 1000) % 60;
    label.textContent = cfg.name + " in";
    time.innerHTML = "<b>" + d + "</b><span>d</span><b>" + pad(h) + "</b><span>h</span><b>" + pad(m) + "</b><span>m</span><b>" + pad(sec) + "</b><span>s</span>";
  }

  tick();
  const timer = setInterval(() => { if (!document.hidden) tick(); }, 1000);
})();


// ==========================================================
// "YOU LIKED THIS" BANNER (pricing.html and contact.html)
// Shown after a visitor clicked "Order one like this" in the work viewer:
// the piece they liked, with a button to carry on. On pricing.html the button
// goes to the contact page; on contact.html it goes back to the matching
// product. It sticks to the bottom of the screen; the sale popup, its tab and
// the back-to-top button move up to make room. The x closes it for good
// (until they like another piece).
// ==========================================================
(function () {
  const page = window.location.pathname.replace(/\/+$/, "").split("/").pop().replace(/\.html$/i, "").toLowerCase();   // "/pricing/" -> "pricing"
  if (page !== "pricing" && page !== "contact") return;
  let liked = null;
  try { liked = JSON.parse(sessionStorage.getItem(LIKED_PIECE_KEY) || "null"); } catch (error) { liked = null; }
  if (!liked || typeof liked.category !== "string" || typeof liked.image !== "string" || !/^\/?images\//.test(liked.image)) return;

  const slugOk = typeof liked.slug === "string" && /^[a-z0-9-]*$/.test(liked.slug);
  const productLink = "/pricing/" + (slugOk && liked.slug ? "#" + liked.slug : "");

  const wrap = createEl("div", "liked-banner-wrap");
  const banner = createEl("aside", "liked-banner");
  banner.setAttribute("aria-label", "The piece you liked");

  const thumb = createEl("span", "liked-banner-thumb");
  thumb.setAttribute("aria-hidden", "true");
  const img = createEl("img");
  img.alt = "";
  img.decoding = "async";
  img.addEventListener("error", () => thumb.remove());
  img.src = liked.image;
  thumb.appendChild(img);

  const text = createEl("div", "liked-banner-text");
  const title = createEl("p", "liked-banner-title", "You liked this");
  title.appendChild(createEl("span", "liked-banner-word", " piece"));   // hidden on phones
  text.appendChild(title);
  text.appendChild(createEl("p", "liked-banner-sub", liked.category + " \u00b7 want one made for you?"));

  const button = createEl("a", "button button-primary liked-banner-button", page === "pricing" ? "Start my order" : "See the pricing");
  button.href = page === "pricing" ? "/contact/" : productLink;

  const close = createEl("button", "liked-banner-close");
  close.type = "button";
  close.setAttribute("aria-label", "Hide this");
  close.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>';
  const root = document.documentElement;
  const syncHeight = () => root.style.setProperty("--liked-banner-h", wrap.offsetHeight + "px");
  let watcher = null;
  close.addEventListener("click", () => {
    if (watcher) watcher.disconnect();
    window.removeEventListener("resize", syncHeight);
    wrap.remove();
    root.classList.remove("has-liked-banner");
    root.style.removeProperty("--liked-banner-h");
    try { sessionStorage.removeItem(LIKED_PIECE_KEY); } catch (error) { /* ignore */ }
  });

  banner.appendChild(thumb);
  banner.appendChild(text);
  banner.appendChild(button);
  banner.appendChild(close);
  const inner = createEl("div", "container");
  inner.appendChild(banner);
  wrap.appendChild(inner);
  document.body.appendChild(wrap);

  // Tell the page how tall the banner is (it wraps on phones), so nothing hides behind it
  root.classList.add("has-liked-banner");
  syncHeight();
  if (typeof ResizeObserver === "function") {
    watcher = new ResizeObserver(syncHeight);
    watcher.observe(wrap);
  } else {
    window.addEventListener("resize", syncHeight);
  }
})();


// ==========================================================
// NAVBAR: NEWS
// "News" sits right before "Contact", and Contact is always the last
// link. Added here too, so a page whose markup has no News link yet
// (like news.html) still gets it. On news.html it is marked as the
// current page.
// ==========================================================
(function () {
  const list = document.querySelector(".nav-list");
  if (!list) return;
  const items = Array.from(list.children);
  const holding = (href) => items.find((li) => li.querySelector('a[href="' + href + '"]'));

  let news = holding("/news/");
  if (!news) {
    news = document.createElement("li");
    news.className = "nav-item";
    news.innerHTML = '<a class="nav-link" href="/news/">News</a>';
    list.appendChild(news);
  }
  const contact = holding("/contact/");
  if (contact) {
    list.insertBefore(news, contact);
    list.appendChild(contact);
  }

  if (/(^|\/)news(\.html|\/)?$/i.test(window.location.pathname)) {
    news.querySelector("a").setAttribute("aria-current", "page");
  }
})();


// ==========================================================
// NAVBAR: NEWS DOT
// A small dot above "News" while the newest post has not been seen yet.
// Clicking News (or opening the News page) hides it. The newest post's id
// is remembered in the browser, so the dot comes back when a NEW post is
// added to news-data.js. Pages that do not load news-data.js load it here.
// ==========================================================
(function () {
  const link = document.querySelector('.nav-list a[href="/news/"]');
  if (!link) return;

  const SEEN_KEY = "bcraft-news-seen";
  const onNewsPage = /(^|\/)news(\.html|\/)?$/i.test(window.location.pathname);

  function getSeen() {
    try { return window.localStorage.getItem(SEEN_KEY); } catch (error) { return null; }
  }
  function setSeen(id) {
    try { window.localStorage.setItem(SEEN_KEY, id); } catch (error) { /* storage blocked: the dot just returns next visit */ }
  }

  // The id of the newest post (same rules as the "Latest news" strip on the homepage)
  function newestPostId() {
    if (typeof NEWS_POSTS === "undefined" || !Array.isArray(NEWS_POSTS)) return null;
    const dated = typeof parseNewsDate === "function";
    let best = null;
    NEWS_POSTS.forEach((post, index) => {
      if (!post || !post.id || !post.title) return;
      const date = dated ? parseNewsDate(post.date) : null;
      if (dated && !date) return;
      const time = date ? date.time : 0;
      if (!best || time > best.time) best = { id: String(post.id), time: time };
    });
    return best ? best.id : null;
  }

  function addDot(id) {
    if (link.querySelector(".nav-news-dot")) return;
    const label = createEl("span", "nav-news-label");
    while (link.firstChild) label.appendChild(link.firstChild);
    const dot = createEl("span", "nav-news-dot");
    dot.setAttribute("aria-hidden", "true");
    label.appendChild(dot);
    link.appendChild(label);
    link.setAttribute("aria-label", "News, new post");

    link.addEventListener("click", () => {
      setSeen(id);
      link.removeAttribute("aria-label");
      dot.classList.add("is-gone");
      setTimeout(() => dot.remove(), 250);
    }, { once: true });
  }

  function start() {
    const id = newestPostId();
    if (!id) return;
    if (onNewsPage) { setSeen(id); return; }   // already looking at the news
    if (getSeen() !== id) addDot(id);
  }

  if (typeof NEWS_POSTS !== "undefined") {
    start();
  } else {
    const loader = document.createElement("script");
    loader.src = "/news-data.js";
    loader.addEventListener("load", start, { once: true });
    document.head.appendChild(loader);
  }
})();


// ==========================================================
// SCROLL PROGRESS (blue bar at the very top) AND BACK-TO-TOP BUTTON (bottom left)
// ==========================================================
(function () {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  bar.innerHTML = "<span></span>";
  document.body.appendChild(bar);

  const toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML =
    '<span class="to-top-inner"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="M9 14V4M4.5 8.5 9 4l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  document.body.appendChild(toTop);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduce.matches ? "auto" : "smooth" });
  });

  let queued = false;
  // PERF: the scrollable height is cached and re-read only when the page size
  // changes, so scrolling no longer forces a layout read every frame.
  let max = 0;
  function measureMax() {
    max = document.documentElement.scrollHeight - window.innerHeight;
  }
  function update() {
    queued = false;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.firstChild.style.transform = "scaleX(" + p.toFixed(4) + ")";
    toTop.style.setProperty("--p", p.toFixed(4));
    toTop.classList.toggle("is-visible", window.scrollY > 500);
  }
  function onScroll() {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { measureMax(); onScroll(); });
  window.addEventListener("load", () => { measureMax(); onScroll(); });
  if ("ResizeObserver" in window) {
    new ResizeObserver(() => { measureMax(); onScroll(); }).observe(document.body);
  }
  measureMax();
  update();
})();


// ==========================================================
// HERO: INTERACTIVE FEATURED PIECE
// The featured thumbnail tilts toward the cursor with a moving glare,
// small shapes float around it (and drift with the mouse), . Tilt only for a real mouse on a large
// screen; nothing moves with reduced motion.
// ==========================================================
(function () {
  const card = document.querySelector('[data-hero-art="main"]');
  const visual = document.querySelector("[data-hero-visual]");
  if (!card || !visual) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const capable = window.matchMedia("(min-width: 960px) and (hover: hover) and (pointer: fine)");

  // Same rule as the depth shift above: keep following the cursor over the
  // whole hero (text, navbar, ...) and only stop when it reaches the section
  // below the hero or leaves the window.
  const heroEl = visual.closest(".hero") || card;
  let held = false;

  function letGo() {
    if (!held) return;
    held = false;
    card.style.setProperty("--tx", "0");
    card.style.setProperty("--ty", "0");
  }

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || !capable.matches || reduce.matches) return;
    const zone = heroEl.getBoundingClientRect();
    if (zone.bottom <= 0 || zone.top >= window.innerHeight || event.clientY > zone.bottom) {
      letGo();
      return;
    }
    const rect = card.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    held = true;
    card.style.setProperty("--tx", (px - 0.5).toFixed(3));
    card.style.setProperty("--ty", (py - 0.5).toFixed(3));
  });

  document.documentElement.addEventListener("pointerleave", letGo);
  window.addEventListener("blur", letGo);

})();


// ==========================================================
// PERF: PAUSE OFF-SCREEN LOOPING ANIMATIONS
// Adds .is-offscreen (see style.css) to the decorations that loop forever,
// while they are outside the viewport. Nothing is removed or changed visually.
// ==========================================================
(function () {
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
    });
  }, { rootMargin: "100px" });
  document.querySelectorAll(".hero-fx-glow, .hero-fx-item, .footer-glow").forEach((el) => io.observe(el));
})();


// ==========================================================
// MOST RECENT X POSTS  (click to load)
// Fills every <div data-x-posts> (news page and homepage) with the posts
// listed in X_POSTS in news-data.js. Each post starts as a quiet card;
// nothing from X is downloaded until a visitor clicks "Load post" (or
// "Load all posts"). Only then is X's own script (platform.twitter.com)
// added to the page, with "do not track" switched on. If X is blocked or
// unreachable, the card stays and its "Open on X" link still works.
// ==========================================================
(function () {
  const lists = document.querySelectorAll("[data-x-posts]");
  if (!lists.length) return;

  const handle = typeof X_HANDLE === "string" && X_HANDLE ? X_HANDLE : "realbcraft";
  const profileUrl = "https://x.com/" + handle;
  const rawPosts = typeof X_POSTS !== "undefined" && Array.isArray(X_POSTS) ? X_POSTS : [];
  const siteName = typeof X_NAME === "string" && X_NAME ? X_NAME : "@" + handle;

  // Keep only real links to posts on x.com / twitter.com
  const hosts = ["x.com", "www.x.com", "twitter.com", "www.twitter.com", "mobile.twitter.com"];
  const posts = [];
  rawPosts.forEach((raw) => {
    const item = raw && typeof raw === "object" ? raw : { url: raw };
    try {
      const url = new URL(String(item.url).trim());
      const match = /^\/([A-Za-z0-9_]{1,15})\/status\/(\d{5,25})\/?$/.exec(url.pathname);
      if (url.protocol === "https:" && hosts.includes(url.hostname) && match) {
        posts.push(Object.assign({}, item, { url: "https://x.com/" + match[1] + "/status/" + match[2] }));
      }
    } catch (error) { /* not a link: skip it */ }
  });

  const XLOGO = '<svg class="x-post-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // ----- X's own script, added only after a click -----
  let widgetsPromise = null;
  function loadWidgets() {
    if (window.twttr && window.twttr.widgets) return Promise.resolve();
    if (!widgetsPromise) {
      widgetsPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        script.onload = () => (window.twttr && window.twttr.widgets ? resolve() : reject(new Error("X script missing")));
        script.onerror = () => { widgetsPromise = null; reject(new Error("X blocked")); };
        document.head.appendChild(script);
      });
    }
    return widgetsPromise;
  }

  function setNote(card, text) {
    const note = card.querySelector(".x-post-note");
    if (note) note.textContent = text;
  }

  function loadCard(card) {
    const state = card.dataset.state;
    if (state === "loading" || state === "loaded") return Promise.resolve();
    card.dataset.state = "loading";
    setNote(card, "Loading from X…");

    const holder = make("div", "x-post-embed");
    const quote = make("blockquote", "twitter-tweet");
    quote.setAttribute("data-theme", "dark");
    quote.setAttribute("data-dnt", "true");
    quote.setAttribute("data-conversation", "none");
    const link = make("a", "", "View this post on X");
    link.href = card.dataset.xUrl;
    quote.appendChild(link);
    holder.appendChild(quote);

    return loadWidgets()
      .then(() => {
        card.textContent = "";
        card.classList.add("is-loaded");
        card.appendChild(holder);
        return window.twttr.widgets.load(holder);
      })
      .then(() => { card.dataset.state = "loaded"; })
      .catch(() => {
        card.dataset.state = "error";
        setNote(card, "Couldn't reach X (an ad blocker can cause this). Use “Open on X” instead.");
      });
  }

  const XLOGO_BIG = '<svg class="mock-x" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>';
  const VERIFIED = '<svg class="x-post-verified" viewBox="0 0 24 24" role="img" aria-label="Verified account" focusable="false"><path fill="currentColor" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/></svg>';

  // Text with web addresses turned into links (built with DOM nodes, never innerHTML)
  function appendLinked(parent, text) {
    const parts = String(text).split(/(https?:\/\/[^\s]+)/g);
    parts.forEach((part) => {
      if (/^https?:\/\//.test(part)) {
        const a = make("a", "", part.replace(/^https?:\/\//, "").replace(/\/$/, ""));
        a.href = part;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        parent.appendChild(a);
      } else if (part) {
        parent.appendChild(document.createTextNode(part));
      }
    });
  }

  // A custom, plain-HTML version of the post. Nothing is loaded from X.
  function makeCustomCard(item) {
    const card = make("article", "x-post x-post--custom");
    card.dataset.state = "static";

    const head = make("div", "x-post-head");
    const avatar = make("span", "mock-avatar mock-avatar--pfp", "B");
    avatar.setAttribute("aria-hidden", "true");
    const pfp = document.createElement("img");
    pfp.src = "/images/homepage-twitter-pfp-01.webp";
    pfp.alt = "";
    pfp.loading = "lazy";
    pfp.addEventListener("error", () => pfp.remove());
    avatar.appendChild(pfp);
    head.appendChild(avatar);

    const who = make("span", "x-post-who");
    const nameRow = make("span", "x-post-name");
    nameRow.appendChild(make("span", "", item.name || siteName));
    if (item.verified !== false) nameRow.insertAdjacentHTML("beforeend", VERIFIED);
    who.appendChild(nameRow);
    who.appendChild(make("span", "x-post-meta", "@" + handle));
    head.appendChild(who);

    const xLink = make("a", "x-post-xlink");
    xLink.href = item.url;
    xLink.target = "_blank";
    xLink.rel = "noopener noreferrer";
    xLink.setAttribute("aria-label", "Open this post on X");
    xLink.style.marginLeft = "auto";
    xLink.style.display = "inline-flex";
    xLink.insertAdjacentHTML("beforeend", XLOGO_BIG);
    xLink.firstChild.style.marginLeft = "0";
    head.appendChild(xLink);
    card.appendChild(head);

    (Array.isArray(item.text) ? item.text : [item.text]).forEach((line) => {
      if (!line) return;
      const p = make("p", "x-post-text");
      appendLinked(p, line);
      card.appendChild(p);
    });

    if (Array.isArray(item.tags) && item.tags.length) {
      const tags = make("p", "x-post-text x-post-tags");
      item.tags.forEach((tag) => {
        const clean = String(tag).replace(/^#/, "").replace(/[^A-Za-z0-9_]/g, "");
        if (!clean) return;
        const a = make("a", "x-post-tag", "#" + clean);
        a.href = "https://x.com/hashtag/" + clean + "?src=hashtag_click";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        tags.appendChild(a);
      });
      card.appendChild(tags);
    }

    if (item.image) {
      const media = make("a", "x-post-media");
      media.href = item.url;
      media.target = "_blank";
      media.rel = "noopener noreferrer";
      media.style.setProperty("--img", 'url("' + String(item.image).replace(/"/g, "%22") + '")');
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.imageAlt || "";
      img.width = 1280;
      img.height = 720;
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => media.remove());
      media.appendChild(img);
      card.appendChild(media);
    }

    const actions = make("div", "x-post-actions");
    const dateInfo = typeof parseNewsDate === "function" ? parseNewsDate(item.date) : null;
    if (dateInfo) {
      const time = make("time", "x-post-date", dateInfo.label);
      time.dateTime = dateInfo.iso;
      actions.appendChild(time);
    }
    const open = make("a", "x-post-open", "View original on X \u2197");
    open.href = item.url;
    open.target = "_blank";
    open.rel = "noopener noreferrer";
    actions.appendChild(open);
    card.appendChild(actions);
    return card;
  }

  function makeCard(item) {
    if (item.text) return makeCustomCard(item);
    const url = item.url;
    const card = make("article", "x-post");
    card.dataset.xUrl = url;

    const top = make("div", "x-post-top");
    top.insertAdjacentHTML("beforeend", XLOGO);
    top.appendChild(make("span", "", "Post on X"));
    top.appendChild(make("span", "x-post-handle", "@" + handle));
    card.appendChild(top);

    card.appendChild(make("p", "x-post-note", "Click to load this post from X. Nothing from X loads until you do."));

    const actions = make("div", "x-post-actions");
    const load = make("button", "button button-secondary x-post-load", "Load post");
    load.type = "button";
    load.setAttribute("aria-label", "Load this post from X");
    load.addEventListener("click", () => loadCard(card));
    const open = make("a", "x-post-open", "Open on X");
    open.href = url;
    open.target = "_blank";
    open.rel = "noopener noreferrer";
    actions.appendChild(load);
    actions.appendChild(open);
    card.appendChild(actions);
    return card;
  }

  lists.forEach((list) => {
    list.textContent = "";

    if (!posts.length) {
      const empty = make("article", "x-post x-posts-empty");
      const top = make("div", "x-post-top");
      top.insertAdjacentHTML("beforeend", XLOGO);
      top.appendChild(make("span", "", "@" + handle));
      empty.appendChild(top);
      empty.appendChild(make("p", "x-post-note", "The newest posts, updates and sneak peeks live on X."));
      const actions = make("div", "x-post-actions");
      const open = make("a", "button button-primary", "Open @" + handle + " on X");
      open.href = profileUrl;
      open.target = "_blank";
      open.rel = "noopener noreferrer";
      actions.appendChild(open);
      empty.appendChild(actions);
      list.appendChild(empty);
      return;
    }

    const cards = posts.map(makeCard);
    cards.forEach((card) => list.appendChild(card));

    // "Load all posts" only matters for old-style cards that load from X
    if (cards.filter((card) => card.dataset.state !== "static").length > 1) {
      const bar = make("div", "x-posts-bar");
      const all = make("button", "button button-primary", "Load all posts");
      all.type = "button";
      const status = make("span", "x-posts-status");
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      all.addEventListener("click", () => {
        status.textContent = "Loading posts from X…";
        Promise.all(cards.filter((card) => card.dataset.state !== "static").map(loadCard)).then(() => {
          const failed = cards.some((card) => card.dataset.state === "error");
          status.textContent = failed ? "Some posts couldn't load. Use “Open on X” on those." : "";
          if (!failed) all.hidden = true;
        });
      });
      bar.appendChild(all);
      bar.appendChild(status);
      list.parentNode.insertBefore(bar, list);
    }
  });
})();

/* ---------- X posts: very subtle 3D tilt toward the mouse ----------
   Mouse only, and never with "reduce motion". The card under the pointer gets .is-tilting plus two CSS
   variables (--x-rx, --x-ry); style.css turns them into the tilt. Works for posts that are added later too. */
(function () {
  var mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  var MAX = 1;                       // strongest tilt, in degrees (very subtle)
  var card = null, raf = 0, ex = 0, ey = 0;
  function clear() {
    if (!card) return;
    card.classList.remove("is-tilting");
    card.style.removeProperty("--x-rx");
    card.style.removeProperty("--x-ry");
    card = null;
  }
  function apply() {
    raf = 0;
    if (!card) return;
    var r = card.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var px = Math.min(1, Math.max(0, (ex - r.left) / r.width));
    var py = Math.min(1, Math.max(0, (ey - r.top) / r.height));
    card.style.setProperty("--x-ry", ((px - 0.5) * 2 * MAX).toFixed(2) + "deg");
    card.style.setProperty("--x-rx", ((0.5 - py) * 2 * MAX).toFixed(2) + "deg");
  }
  document.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse" || !mq.matches) { clear(); return; }
    var t = e.target && e.target.closest ? e.target.closest(".x-post:not(.is-loaded)") : null;
    if (card && t !== card) {          // a tilted card moves a little: keep it while the pointer is within 3px of it
      var r = card.getBoundingClientRect();
      if (e.clientX >= r.left - 3 && e.clientX <= r.right + 3 && e.clientY >= r.top - 3 && e.clientY <= r.bottom + 3) t = card;
    }
    if (t !== card) { clear(); if (t) { card = t; card.classList.add("is-tilting"); } }
    if (!card) return;
    ex = e.clientX; ey = e.clientY;
    if (!raf) raf = requestAnimationFrame(apply);
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", clear);   // the mouse left the window
  window.addEventListener("blur", clear);
})();


// ==========================================================
// THEN VS. NOW SLIDERS ([data-compare] on about.html and index.html)
// The invisible range input drives --pos on .progress-frame (style.css, 2b).
// The first time a slider scrolls into view it gives a small nudge left and
// right, so visitors see it can be dragged. Skipped with reduced motion, and
// stopped the moment someone touches it.
// ==========================================================
(function () {
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-compare]").forEach((box) => {
    const frame = box.querySelector(".progress-frame");
    const input = box.querySelector(".progress-range");
    if (!frame || !input) return;

    const set = () => frame.style.setProperty("--pos", input.value + "%");
    let touched = false;
    ["pointerdown", "keydown", "input"].forEach((name) => {
      input.addEventListener(name, () => { touched = true; });
    });
    input.addEventListener("input", set);
    set();

    if (calm || !("IntersectionObserver" in window)) return;
    const watcher = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      watcher.disconnect();
      const t0 = performance.now();
      const duration = 1900;
      (function frameStep(t) {
        if (touched) return;
        const p = Math.min((t - t0) / duration, 1);
        input.value = String(50 + Math.sin(p * Math.PI * 2) * 20);
        set();
        if (p < 1) requestAnimationFrame(frameStep);
      })(t0);
    }, { threshold: 0.6 });
    watcher.observe(frame);
  });
})();