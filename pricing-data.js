// ==========================================================
// PRICING DATA: the one place for prices and bundles.
// The pricing page and the Pricing mega menu (script.js) both read this.
// Edit prices and bundles HERE. Load it with a normal
// <script src="/pricing-data.js"></script> in the <head>, before script.js.
// ==========================================================
var PRICING_DATA = (function () {
      var PRICES = {
        "game-thumbnails":    { usd: "$30", robux: "7900 R$" },
        "game-icons":         { usd: "$25", robux: "6600 R$" },
        "game-logos":         { usd: "$15", robux: "3900 R$" },
        "renders":            { usd: "$7",  robux: "1800 R$", note: "Bulk Order Discounts Available!" },
        "profile-pictures":   { usd: "$10", robux: "2600 R$" },
        "youtube-thumbnails": { usd: "$20", robux: "5300 R$" },
        "ads-posters":        { usd: "$20", robux: "5300 R$" },
        "youtube-banners":    { usd: "$20", robux: "5300 R$" },
        "commission-sheets":  { usd: "$20", robux: "5300 R$" }
      };

      // BUNDLES: several pieces together. The three cards in the Bundles section are built from this list, in this order.
      //   The MIDDLE card is the big one, so keep the featured bundle (popular: true) second in the list.
      //   items       : { product: <a key from PRICES>, qty: <number>, art: [<image paths>] }
      //                 art is optional: one image per piece (a list shorter than qty repeats). Leave it out to use the product's own artwork.
      //   usd, robux  : the bundle price as text, like in PRICES. Left out (or "") shows "Price coming soon".
      //   tag         : optional small label ("New", "Budget Pick", ...) shown on the card.
      //   popular     : true makes it the featured card: bigger, soft violet border, star badge. badge: sets that badge text (default "Most Popular").
      //   The "Bought separately" price, the saving and the percent badge are worked out from PRICES.
      var BUNDLES = [
        { id: "render-pack", tag: "Budget Pick", icon: "render", name: "Render Pack",
          text: "For creators and devs who just need a clean, matching set of renders.",
          items: [ { product: "renders", qty: 3, art: [ "/images/work/featured-gfx-02.webp", "/images/work/portfolio-gfx-01.webp", "/images/work/portfolio-render-03.webp" ] } ],
          usd: "$17", robux: "4500 R$" },
        { id: "game-launch-pack", popular: true, badge: "Most Popular", icon: "rocket", name: "Game Launch Pack",
          text: "For Roblox developers ready to launch: icon, thumbnails and ads in one go.",
          items: [ { product: "game-icons", qty: 1 }, { product: "game-thumbnails", qty: 2, art: [ "/images/work/featured-gfx-01.webp", "/images/work/portfolio-thumbnail-01.webp", "/images/work/portfolio-thumbnail-02.webp" ] }, { product: "ads-posters", qty: 2 } ],
          usd: "$100", robux: "26300 R$" },
        { id: "creator-starter-pack", icon: "youtube", name: "YouTuber Starter Pack",
          text: "For new YouTubers who want a full channel look from the very first upload.",
          items: [ { product: "profile-pictures", qty: 1 }, { product: "youtube-banners", qty: 1 }, { product: "youtube-thumbnails", qty: 2, art: [ "/images/work/featured-thumbnail-01.webp", "/images/work/featured-thumbnail-02.webp" ] } ],
          usd: "$60", robux: "15800 R$" }
      ];

  return { robuxIcon: "/images/robux-icon.webp", prices: PRICES, bundles: BUNDLES };
})();