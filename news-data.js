/* ==========================================================
   news-data.js : the Bcraft Designs news posts
   Loaded by news.html (full page) and index.html (the "Latest news"
   strip and the "Most recent X posts" section), so you only ever edit
   posts in this one file.
   ========================================================== */

/* ==========================================================
   NEWS POSTS  <-- this is the only place you edit to publish news
   ----------------------------------------------------------
   TO ADD A POST: copy one { ... } block below, paste it inside the
   list, and change the values. Order in the list does not matter:
   the page sorts everything newest first by "date".

     id        unique, lowercase, no spaces (used in the post's link)
     date      "2026-10" (month only) or "2026-10-20" (exact day).
               Use exact days when two posts share a month, so the
               order is right (a month-only date counts as the 1st).
     category  Announcements, Promotions or Updates
     title     the headline
     summary   one or two sentences shown on the card and in the post
     content   optional. More text for the post, a list of blocks:
                 "Plain text"                 a paragraph
                 { heading: "Subheading" }    a subheading
                 { list: ["One", "Two"] }     a bulleted list
               Leave it out for a one-sentence post.
     image     optional thumbnail, full path including the images/ folder
               (best at 1280 x 720 px). Also shown at the top of the post
               when it is opened.
               Leave it out and the post shows the Bcraft logo template tile.
               A missing file falls back to the same tile.
     imageAlt  optional description of the image for screen readers
     imageSize optional. The image's resolution as "width x height", e.g. "1280x720"
               (default 1280x720). Sets the thumbnail's shape for this post only.
     featured  optional. true = shown large at the top of "All".
               If no post is marked, the newest one is featured.
     badge     optional label on the post, e.g. "Draft".
     cta       optional button: { text: "Button text", href: "/page/" }

   IMAGE FILE NAMES: save each thumbnail in the images/ folder with
   exactly the name written in its "image" line below:
     images/news-website-launch-01.webp    "Our brand new website is live"
     images/halloween-popup-01.webp        "20% Off Everything Halloween Sale"
   For a new post, follow the same pattern: images/news-<topic>-01.webp

   Anything you still need to fill in can be written as [[LIKE THIS]]
   and it is highlighted orange so it can't be missed.
   To remove a post, delete its block (or comment it out).
   ========================================================== */
const NEWS_POSTS = [
  {
    id: "new-client-promotion",
    date: "2026-10-22",
    category: "Promotions",
    title: "New Client Offer: Get $5.00 Off Your First Commission!",
    summary: "We're introducing a special welcome offer for new Bcraft Designs clients! New clients can receive $5.00 or 1.500 Robux off their first eligible commission!",
    featured: true,
    image: "images/news-5-client-promotion.webp",
    imageAlt: "New $5 gift promotion",
    content: [
      { heading: "💸 How It Works:" },
      { list: ["$5.00 OFF your first eligible order.", "$10.00 minimum order value before the discount is applied.", "Available exclusively to new Bcraft Designs clients who have not previously commissioned me.", "The offer applies to one eligible order per new client.", "The discount cannot be combined with our usual seasonal discounts or other promotional offers."] },
      { heading: "❓ How to Claim Your Discount" },
      "Claiming your discount is simple, but you must DM me and explicitly mention this $5.00 New Client Offer before placing your order.",
      { list: ["1. Browse my Pricing page and choose the service you're interested in.", "2: Send me a direct message (DM) to discuss your commission.", "3: Clearly mention the $5.00 New Client Offer in your message.", "4: We'll confirm your eligibility and apply the discount to your first qualifying order."] },
      "Important: If you don't DM me and mention this specific offer, the discount will not be applied. The offer will not be granted retroactively to orders that have already been placed. TOS apply."
    ]
    },
  {
    id: "new-website-launch",
    date: "2026-10-20",
    category: "Announcements",
    title: "my brand new website is live",
    summary: "my work, pricing, client reviews and contact details are all in one place now. Better than ever!",
    featured: true,
    image: "images/news-website-launch-01.webp",
    imageAlt: "The new Bcraft Designs website",
    content: [
      "Take a look around on my new website, and if you'd like something made, you can commission me straight from the site."
    ]
    },
  {
    id: "halloween-sale-2026",
    date: "2026-10",
    category: "Promotions",
    title: "20% Off Everything Halloween Sale",
    imageSize: "1430x731",
    image: "images/halloween-popup-01.webp",
    imageAlt: "Halloween sale: 20% off everything",
    summary: "Everything is 20% off during my Halloween sale, which runs until October 31st.",
    cta: { text: "Commission Me", href: "/pricing/" }
    }
  
];

/* ==========================================================
   X POSTS  <-- the "Most recent X posts" sections (news page + homepage)
   ----------------------------------------------------------
   Each post is drawn as a small custom card (same look as the X card
   in "Your Perks"). Nothing is loaded from X, so the pages stay fast,
   and "View on X" opens the real post.

   TO ADD A POST: copy one { ... } block, paste it into the list (newest
   first) and change the values. 3 or 4 posts is plenty.

     url       the real post's address (copied from the browser bar on X)
     date      "2026-10-17"  (shown on the card)
     image     optional picture, full path including images/
               (best at 1280 x 720 px, 16:9)
     imageAlt  optional description of the picture for screen readers
     text      the post text, one entry per line/paragraph. Web addresses
               inside it become links on their own.
     tags      optional hashtags WITHOUT the # sign
     name      optional, the name shown (default: X_NAME below)
     verified  optional, false hides the verified badge (default: true)

   A plain address on its own line (just "https://x.com/...") still works
   and gives the old click-to-load card, but the custom card is faster.
   To remove a post, delete its block. With an empty list the sections
   show an "Open @realbcraft on X" card instead.
   To keep the section "recent", swap the oldest post for a new one now
   and then.

   IMAGE FILE: images/x-post-thumbnail-01.webp
   ========================================================== */
const X_HANDLE = "realbcraft";
const X_NAME = "Bcraft | bcraftdesigns.com";
/* X-POSTS:START  (auto-generated from x-links.txt by GitHub Actions. Do not edit by hand, add links to x-links.txt instead) */
const X_POSTS = [
  {
    "url": "https://x.com/realbcraft/status/2115164715811045873",
    "date": "2026-10-27",
    "image": "images/x-2115164715811045873.webp",
    "text": [
      "Do NOT go into the woods with someone you don't know.. 🌲",
      "My first official gore GFX. No warning since this isn't extreme.. yet."
    ],
    "tags": [
      "robloxart",
      "robloxgfx",
      "gfx",
      "robloxdev"
    ]
  },
  {
    "url": "https://x.com/realbcraft/status/2113664464348172378",
    "date": "2026-10-23",
    "image": "images/x-2113664464348172378.webp",
    "text": [
      "Linktree? Not anymore. 👀",
      "I built my own custom socials page for me. Complete with a new design, easter eggs, beautiful buttons, and all my socials in one place. 💙",
      "🫣Take a look: https://bcraftdesigns.com/socials"
    ]
  }
];
/* X-POSTS:END */

/* Reads "2026-10" or "2026-10-20". Used by both pages; no need to edit. */
const NEWS_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function parseNewsDate(value) {
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String(value || "").trim());
  if (!m) return null;
  const month = Number(m[2]);
  const day = m[3] ? Number(m[3]) : 0;
  if (month < 1 || month > 12 || day > 31) return null;
  return {
    iso: m[0],
    label: day ? NEWS_MONTHS[month - 1] + " " + day + ", " + m[1] : NEWS_MONTHS[month - 1] + " " + m[1],
    time: Date.UTC(Number(m[1]), month - 1, day || 1)
  };
}

/* Image paths: "images/x.webp" and "/images/x.webp" both work. Pages now live in
   folders (/news/, /socials/ ...), so a relative path is turned into a root path here. */
(function () {
  const root = (p) => (p && !/^(\/|[a-z][a-z0-9+.-]*:)/i.test(p) ? "/" + p : p);
  NEWS_POSTS.forEach((p) => { p.image = root(p.image); });
  X_POSTS.forEach((p) => { p.image = root(p.image); });
})();