/* ==========================================================
   companion-data.js : everything Bcraft Junior SAYS.
   Edit the text here. You never need to touch companion.js for words.

   - INTRO / BACK / FIFTH ... the greeting on the hero (before any scrolling)
   - TIME ................... lines for morning / afternoon / evening / night
   - SEASONS ................ Halloween + Christmas: quips, greetings, ring colour, confetti
   - FIVES / PROMPTS / QUIPS  menu actions
   - LINES .................. the comment for each section of each page
   - BLUSH .................. sections where he blushes
   - REACT .................. comments when something happens on the site
   - QUIZ ................... "What should I order?"
   ========================================================== */
(function () {
  "use strict";

  var FOOTER = [".site-footer", "Leaving already? Commission me first."];

  window.SX_PAL_DATA = {

    /* ---------- Greeting on the hero, shown once per visit before any scrolling ---------- */
    INTRO: "Hey, I'm Bcraft Junior and I'm your little companion!",     // very first visit
    BACK: [                                                              // every visit after that
      "Welcome back! Bcraft Junior reporting for duty.",
      "Welcome back! I kept your spot warm.",
      "Oh hey, you're back! I missed the scrolling."
    ],
    FIFTH: [                                                             // the 5th visit gets a joke
      "Visit number 5! Joke time: why did the pixel go to therapy? Too many resolution issues.",
      "5th visit! Fun fact: you're basically staff now. Your badge is one glowy pixel.",
      "Visit number 5! Why was the layer so calm? Nothing could get merged into it."
    ],

    /* ---------- Time of day (the visitor's own clock) ---------- */
    TIME: {
      morning: [
        "Good morning! Coffee first, pixels second.",
        "Early bird! The layers are still waking up."
      ],
      afternoon: [
        "Afternoon! Perfect time for a little scroll.",
        "Post-lunch design brain: activated."
      ],
      evening: [
        "Evening! Golden hour for glow effects.",
        "Winding down? Same. Just one more layer."
      ],
      night: [
        "It's late! Even the pixels are sleepy.",
        "Night owl mode on. Glow looks better in the dark anyway.",
        "Shouldn't we both be asleep? One more scroll, though."
      ]
    },

    /* ---------- Seasons: used when <html data-season="halloween|christmas"> is set,
                    or, if that is missing, October / December ---------- */
    SEASONS: {
      halloween: {
        rgb: "74,163,255",                  // ring + bubble border colour (blue, like the default)
        bright: "#86c5ff",                  // hover colour
        confetti: ["#ff8c28", "#ffb066", "#b57bff", "#ffd166", "#ff6b3d", "#7cfc9a"],
        greet: [
          "Happy Halloween season! I'm dressed as a pixel.",
          "Spooky season is here. Don't worry, I only haunt layers."
        ],
        quips: [
          "Boo! Did I scare your layers?",
          "This whole site is haunted. By cute pixels.",
          "Trick or treat? I pick treat. Always treat.",
          "I'm not scared of ghosts. I'm scared of a 1px offset."
        ]
      },
      christmas: {
        rgb: "235,72,84",
        bright: "#ff9aa3",
        confetti: ["#eb4854", "#3ddc84", "#ffd166", "#ffffff", "#86c5ff"],
        greet: [
          "Merry Christmas! I wrapped all my pixels.",
          "Happy holidays! The glow is extra festive today."
        ],
        quips: [
          "Ho ho hold on, let me align this snowflake.",
          "Snow much to see here!",
          "I asked Santa for more glow. He delivered.",
          "Jingle bells, pixel smells. Okay, that one needs work."
        ]
      }
    },

    /* ---------- Menu actions ---------- */
    FIVES: [
      "High five! That one landed.",
      "Up top! No leaving me hanging.",
      "Clap! Right on the pixel.",
      "Nice one. My hand is a little glowy now."
    ],

    PROMPTS: [
      "A neon fox DJing on a hoverboard.",
      "A tiny castle inside a lightbulb.",
      "A pizza astronaut, but make it epic.",
      "A robot gardener at sunrise.",
      "A sleepy dragon guarding a cosy cafe.",
      "A ghost that is scared of ghosts.",
      "A paper boat sailing through a galaxy.",
      "A cat wizard who only knows one spell."
    ],

    QUIPS: [
      "Hey! Careful with the pixels.",
      "Sparkles? Say less.",
      "Okay okay, that tickles.",
      "Hmm... which thumbnail next?",
      "One more layer. Just one.",
      "Is that 1px off, or is it me?",
      "More glow. Okay, a bit more.",
      "Ctrl+Z is my best friend."
    ],

    /* ---------- Annoyance control ---------- */
    QUIETER: "Want me quieter?",

    /* ---------- Hero speech: said on EVERY page before any scrolling begins ----------
       (The first page of a visit starts with the greeting above; after that each page uses its own line.) */
    HERO: {
      index: [
        "Roblox GFX that stands out? Let me show you around.",
        "Thumbnails, icons, UI. Scroll down and I'll point out the good stuff.",
        "Welcome to Bcraft Designs! Scroll, and I'll narrate."
      ],
      work: [
        "The portfolio! Filter by category, zoom in, admire the glow.",
        "Every piece here was nudged by hand. Take your time.",
        "Can't decide? There's a Surprise me button in here."
      ],
      reviews: [
        "Kind words from real clients. Try not to make me blush.",
        "Don't take my word for it. Scroll and see.",
        "Reviews! My favourite kind of reading."
      ],
      pricing: [
        "Pricing time! Pick a product, or grab a bundle.",
        "Psst, check the commission status before you pick.",
        "Your vision, my next creation. Let's find the right product."
      ],
      about: [
        "That's the creator behind the pixels. Say hi!",
        "Meet the human behind Bcraft Designs.",
        "The story so far. Scroll, there's a then-and-now in here."
      ],
      contact: [
        "Got a project in mind? Tell me everything.",
        "Let's create something great. I reply as fast as I render.",
        "Half-formed ideas welcome. Seriously."
      ],
      news: [
        "What's happening? Fresh posts, newest first.",
        "News time! Catch up on what's new."
      ],
      tos: [
        "The Terms of Service. Boring but important, I'll keep you company.",
        "Quick read before ordering. Future you says thanks."
      ],
      privacy: [
        "Privacy policy! The short version: no accounts, no analytics.",
        "Here's what happens with your data. Spoiler: not much."
      ],
      socials: [
        "My links page! Pick a spot, say hi.",
        "All my corners of the internet, in one place."
      ]
    },

    /* ---------- Section comments ----------
       TO EDIT A COMMENT: change the text.
       TO ADD ONE: add  [ "css selector of the section", "what he says" ]  to that page.
       A line can also be a list of texts; the bubble rotates through them.
       (Every selector below was checked against the real pages.) */
    LINES: {
      index: [
        ["#work", "Fresh off the layer stack."],
        ["#reviews", "Don't take my word for it. Take theirs."],
        ["#perks", "Perks! Everybody loves perks."],
        ["#behind-the-scenes", "Drag the handle and watch the magic happen."],
        ["[data-news-strip]", "Hot off the press."],
        ["#x-posts", "Sneak peeks land here first."],
        ["#socials", "Find me anywhere. Except under my desk."],
        ["#faq", "Got questions? I might have answers."],
        [".tos-teaser", "Quick read before we start."],
        FOOTER
      ],
      about: [
        [".about-journey", "The origin story. Cue dramatic music."],
        ["#progress", "Drag the handle. 2024 me had a lot to learn."],
        [".about-glimpse", "A little peek at the good stuff."],
        [".page-cta", "Ready when you are."],
        FOOTER
      ],
      work: [
        [".portfolio", ["Take your time. Zoom in. Admire the glow.", "Every pixel here was nudged by hand.", "Is that 1px off, or is it me?", "Spot a favourite yet?", "That one took more layers than it looks.", "More glow? Always more glow."]],
        [".page-cta", "Like what you see? Let's talk."],
        FOOTER
      ],
      pricing: [
        ["#catalogue", ["Pick your favourite. No wrong answers.", "More glow? Okay, a bit more.", "Every price is for one piece."]],
        ["#bundles", "Bundles are the best deal here."],
        [".tos-teaser", "Read before ordering. Future you says thanks."],
        ["#payments", "Payments: the least fun part."],
        [".pc-custom", "Don't see it? Ask anyway."],
        [".process", "Here's how it all goes down."],
        ["#faq", "Got questions? I might have answers."],
        [".page-cta:not(.tos-teaser)", "Let's make something great."],
        FOOTER
      ],
      reviews: [
        [".review-featured", "The ones people loved most."],
        [".review-leave", "Ordered from me? A review makes my day."],
        [".review-grid", ["Straight from the people I've worked with.", "I'm not blushing. You're blushing.", "Wow, these are kind.", "Kind words fuel the next render.", "Okay, I'm officially blushing.", "Reading these never gets old."]],
        [".page-cta", "Your project could be next."],
        FOOTER
      ],
      contact: [
        [".collab-yt", "Long-term YouTuber collab? I'm listening."],
        [".collab-grid", "Bulk and custom orders are welcome."],
        ["#payments", "Payments: the least fun part."],
        ["#faq", "Got questions? I might have answers."],
        [".contact-bottom", "Still looking around?"],
        [".site-footer", "Don't ghost me. Say hi first!"]
      ],
      news: [
        [".news", "Fresh from the desk."],
        ["#x-posts", "Same sneak peeks, straight from X."],
        FOOTER
      ],
      privacy: [
        ["#who", "Hi, that's me. Nice to meet you."],
        ["#visiting", "No accounts, no ads, no analytics. Simple."],
        ["#storage", "Boring but important. Worth a skim."],
        ["#links", "Other platforms have their own rules."],
        ["#messages", "Questions about any of this? Just ask."],
        ["#reviews", "Reviews show a name and avatar. Your call."],
        ["#sharing", "I don't sell your data. Ever."],
        ["#rights", "Your data, your rights."],
        ["#changes", "Fine print finished. You're a legend."],
        FOOTER
      ],
      socials: [
        ["[aria-labelledby='h-work']", "Need a thumbnail? You're in the right place."],
        ["[aria-labelledby='h-yt']", "Subscribe so I can pretend I'm consistent."],
        ["[aria-labelledby='h-rbx']", "Join a community. We're friendly, promise."],
        ["[aria-labelledby='h-x']", "Sneak peeks land here first."],
        ["[aria-labelledby='h-more']", "Say hi on Discord. I reply faster than I render."],
        [".site-footer", "Leaving already? Commission me first."]
      ],
      tos: [
        ["#payment", "Fair warning: this part matters."],
        ["#refunds", "Refunds: worth reading twice."],
        ["#age", "Age requirement. Keeping things responsible."],
        ["#respect", "Be kind, get great work. Simple."],
        ["#delays", "Delays happen. Here's how I make up for them."],
        ["#cancellation", "Changed your mind? Here's how cancelling works."],
        ["#characters", "Characters per order: check the limit."],
        ["#more", "Questions? Ask before you order."],
        FOOTER
      ]
    },

    /* ---------- Sections where he blushes (same selectors as in LINES) ---------- */
    BLUSH: [".review-featured", ".review-grid"],

    /* ---------- Reacting to the site (matched to the real script.js and pages) ----------
         events  : names of events the page fires
         watch   : css selector of a window; "overlay" ones hide him while open and he speaks when they close
         click   : css selector of a button; clicking it triggers the line
         copy    : true = also reacts when a link is copied with Ctrl+C */
    REACT: [
      {
        id: "news",                                    // a news post opens (a dialog on the news page)
        overlay: true,
        watch: "dialog.news-dialog[open]",
        lines: ["Nice read? There's more where that came from.", "Good pick. The newest posts are always on top.", "Hot off the press, as promised."]
      },
      {
        id: "copy",                                    // "Copy link" in a news post or in the artwork viewer
        copy: true,
        click: ".news-article-actions .button-secondary, .lightbox [aria-label^='Copy link']",
        lines: ["Did you copy that link? Share the love!", "Sharing is caring. Thanks for spreading the word!", "Spread the word, I'll keep the glow on."]
      },
      {
        id: "art",                                     // the full-size artwork viewer
        overlay: true,
        watch: ".lightbox.is-open",
        lines: ["Back from the zoom? Good eye.", "That one took ages. Glad you looked closely.", "Every pixel is on purpose. Told you."]
      },
      {
        id: "offer",                                   // the welcome offer's redeem window
        overlay: true,
        watch: ".welcome-modal.is-open",
        lines: ["Psst, that offer is real."]
      },
      {
        id: "surprise",                                // "Surprise me" on the portfolio
        events: ["portfolio:surprise"],
        lines: ["Ooh, feeling lucky? Let's see what lands.", "Surprise! Hope it's a good one."]
      }
    ],

    /* Extra selectors that make him hide while they are on screen
       (open <dialog>s and aria-modal windows are already covered) */
    OVERLAYS: [],

    /* ---------- Quiz: "What should I order?" ----------
       Each answer adds points to one or more results. The highest total wins.
       !! The four results below are placeholders: rename them to your real catalogue. */
    QUIZ: {
      questions: [
        {
          q: "What's it for?",
          options: [
            { label: "My YouTube channel", icon: "\uD83D\uDCFA", pts: { thumb: 2, banner: 1 } },
            { label: "My profile picture", icon: "\uD83D\uDE42", pts: { pfp: 2 } },
            { label: "A community or group", icon: "\uD83D\uDC65", pts: { banner: 2, pfp: 1 } },
            { label: "Something else", icon: "\uD83D\uDCA1", pts: { custom: 2 } }
          ]
        },
        {
          q: "How fast do you need it?",
          options: [
            { label: "ASAP", icon: "\u26A1", pts: { thumb: 1, pfp: 1 } },
            { label: "This week", icon: "\uD83D\uDCC5", pts: { banner: 1, thumb: 1 } },
            { label: "No rush", icon: "\uD83D\uDC22", pts: { custom: 1, banner: 1 } }
          ]
        },
        {
          q: "Pick a vibe.",
          options: [
            { label: "Loud and glowy", icon: "\u2728", pts: { thumb: 2 } },
            { label: "Clean and simple", icon: "\uD83E\uDDFC", pts: { pfp: 1, banner: 1 } },
            { label: "Cute and colourful", icon: "\uD83C\uDF08", pts: { pfp: 2 } },
            { label: "Dark and dramatic", icon: "\uD83C\uDF19", pts: { custom: 1, thumb: 1 } }
          ]
        }
      ],
      results: {
        thumb:  { title: "A thumbnail!", text: "Loud, glowy and made to get clicked." },
        pfp:    { title: "A profile picture!", text: "Small, shiny and instantly you." },
        banner: { title: "A banner!", text: "A big, clean welcome mat for your space." },
        custom: { title: "Something custom!", text: "Your idea deserves its own plan. Just ask." }
      },
      linkLabel: "See the catalogue",
      link: "/pricing#catalogue"
    }
  };
})();