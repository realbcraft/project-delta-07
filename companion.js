/* ==========================================================
   companion.js : Bcraft Junior, the little companion for every page.

   - The round profile picture is always in the corner (it slides over when the back-to-top button shows).
   - On the hero, before any scrolling, he introduces himself. Returning visitors get "Welcome back".
   - Scroll, and a speech bubble pops up next to the picture with a comment on the section you are in.
   - The bubble hides by itself after 5 seconds of no activity (the picture stays).
   - Hover the picture (or tap it) for a small menu bubble. Click it to keep it open.

   FILES (a page only needs  <script src="companion.js" defer></script> ; the others load themselves)
     companion.js         this file: logic only
     companion-data.js    ALL the text (lines, quips, greetings, seasons, quiz, reactions). Edit words there.
     companion-extras.js  confetti, "Catch the pixel", quiz, colour roulette, cursor pal.
                          Only downloaded the first time one of them is used.

   WHAT IT STORES ON THE VISITOR'S DEVICE (mention it on the Privacy page)
     localStorage   sx-pal-visits  how many visits (one number)
     localStorage   sx-pal-best    best "Catch the pixel" score (one number)
     localStorage   sx-pal-mute    "Mute comments" on/off (already existed)
     localStorage   sx-deco        avatar decoration (already existed, shared with the socials page)
     sessionStorage a few flags that vanish when the tab closes (greeted, dismissals, ...)
   ========================================================== */
(function () {
  "use strict";
  if (document.getElementById("sx-pal")) return;          // never build it twice

  /* ---------- SETTINGS ---------- */
  var NAME = "Bcraft Junior";
  var AFK_MS = 5000;                                       // no activity for this long = the bubble hides
  var ROTATE_SCREENS = 1.4;                                // in a long section with several lines: next line every this many screens of scrolling
  var MAX_AUTO = 10;                                       // at most this many automatic bubbles per page load
  var COOLDOWN_MS = 40000;                                 // a section will not speak again within this time
  var REACT_COOLDOWN_MS = 15000;                           // same for reactions to site events
  var SLEEP_MS = 30000;                                    // idle this long = sleepy face
  var PAUSE_MS = 350;                                      // short "thinking" pause before a bubble appears
  var IMG_PFP = "/images/socials-pfp";                      // the .webp file is used
  var DECO_KEY = "sx-deco";                                // same avatar decoration the socials page remembers
  var MUTE_KEY = "sx-pal-mute";                            // "Mute comments" is remembered on this device
  var VISIT_KEY = "sx-pal-visits";                         // visit count (one small number)
  var BEST_KEY = "sx-pal-best";                            // best score of "Catch the pixel"
  var SS_COUNTED = "sx-pal-counted", SS_GREETED = "sx-pal-greeted", SS_DISMISS = "sx-pal-dismiss", SS_QUIET = "sx-pal-quiet";
  var SEASON_DECO = { 9: "halloween-ghosts", 11: "christmas-aurora" };   // first-visit decoration when nothing is saved (month 0-11)

  // Where the sibling files live (same folder as this script)
  var cs = document.currentScript || document.querySelector("script[src*='companion.js']");
  var BASE = ((cs && cs.src) || location.href).replace(/[#?].*$/, "").replace(/[^\/]*$/, "");

  // The menu. "icon" is the little emoji in front of the label.
  //   { label, icon, act }                built-in action
  //   { label, icon, act, fineOnly:true } only offered with a mouse
  //   { label, icon, href [, external] }  opens a page
  var MENU = [
    { label: "Say something", icon: "\uD83D\uDCAC", act: "quip" },
    { label: "High five", icon: "\u270B", act: "five" },
    { label: "Design roulette", icon: "\uD83C\uDFB2", act: "roll" },
    { label: "Catch the pixel", icon: "\uD83C\uDFAF", act: "game" },
    { label: "What should I order?", icon: "\uD83D\uDED2", act: "quiz" },
    { label: "Confetti!", icon: "\uD83C\uDF89", act: "party" },
    { label: "Cursor pal", icon: "\u2728", act: "sparkle", fineOnly: true },
    { label: "Mute comments", icon: "\uD83D\uDD07", act: "mute" }
  ];

  var DEFAULT_CONFETTI = ["#4aa3ff", "#86c5ff", "#8270e1", "#ff9f43", "#ff6b9d", "#ffd166", "#3ddc84"];

  /* ---------- Small helpers ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  function make(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function loadScript(src, cb) {
    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = function () { cb(true); };
    s.onerror = function () { s.remove(); cb(false); };
    document.head.appendChild(s);
  }
  function idle(fn) {
    if (window.requestIdleCallback) window.requestIdleCallback(fn, { timeout: 2500 });
    else setTimeout(fn, 400);
  }

  /* ---------- Startup: wait until the browser is idle, so he never competes with the hero image ---------- */
  idle(function () {
    loadScript(BASE + "companion-data.js", function () { init(window.SX_PAL_DATA || {}); });
  });

  function init(D) {
    if (document.getElementById("sx-pal")) return;

    var LINES = D.LINES || {};
    var FIVES = D.FIVES || ["High five!"];
    var PROMPTS = D.PROMPTS || ["A tiny castle inside a lightbulb."];
    var BLUSH = D.BLUSH || [];
    var SEASONS = D.SEASONS || {};
    var REACT = D.REACT || [];

    /* ---------- Which page is this? (works with and without .html) ---------- */
    var page = (location.pathname.replace(/\/+$/, "").split("/").pop() || "index").replace(/\.html?$/i, "") || "index";
    var lines = LINES[page] || [];
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var fine = window.matchMedia ? window.matchMedia("(hover: hover) and (pointer: fine)") : { matches: false };

    /* ---------- No repeats: a shuffled queue per pool. A line never shows twice in a row. ---------- */
    var bags = {};
    function pick(key, arr) {
      if (!arr || !arr.length) return "";
      if (arr.length === 1) return arr[0];
      var b = bags[key] || (bags[key] = { q: [], last: null });
      if (!b.q.length) {
        var q = arr.slice(), i, j, t;
        for (i = q.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = q[i]; q[i] = q[j]; q[j] = t; }
        if (q[q.length - 1] === b.last) { t = q[0]; q[0] = q[q.length - 1]; q[q.length - 1] = t; }   // pop() takes the last one
        b.q = q;
      }
      b.last = b.q.pop();
      return b.last;
    }

    /* ---------- Time and season ---------- */
    function timeSlot() {
      var h = new Date().getHours();
      return h >= 5 && h < 12 ? "morning" : h < 18 && h >= 12 ? "afternoon" : h >= 18 && h < 22 ? "evening" : "night";
    }
    function seasonKey() {
      var a = (document.documentElement.getAttribute("data-season") || (document.body && document.body.getAttribute("data-season")) || "").toLowerCase();
      var k = null, m;
      if (a) {
        if (/hallo|spook/.test(a)) k = "halloween";
        else if (/christ|xmas/.test(a)) k = "christmas";
      } else {
        m = new Date().getMonth();
        k = m === 9 ? "halloween" : m === 11 ? "christmas" : null;
      }
      return k && SEASONS[k] ? k : null;
    }
    function quipPool() {
      var pool = (D.QUIPS || ["Hey!"]).slice(), k = seasonKey(), t = (D.TIME || {})[timeSlot()];
      if (t) pool = pool.concat(t);
      if (k && SEASONS[k].quips) pool = pool.concat(SEASONS[k].quips);
      return pool;
    }
    function confettiColors() {
      var k = seasonKey();
      return (k && SEASONS[k].confetti) || D.CONFETTI || DEFAULT_CONFETTI;
    }

    /* ---------- Styles (everything starts with "sx-pal", nothing else on the site is touched) ----------
       No fades and no blur on purpose: the bubble just appears and disappears (with a tiny scale pop),
       so there is nothing that can leave it half-painted or empty. */
    var css = [
      ".sx-pal{--pal-left:1.25rem;position:fixed;z-index:80;left:var(--pal-left);bottom:1.25rem;display:flex;align-items:flex-end;gap:0.6rem;pointer-events:none;transition:left .25s ease}",
      ".sx-pal>*{pointer-events:auto}",
      /* a dialog, the artwork viewer or the welcome window is open: he steps out of the way */
      ".sx-pal.is-away{display:none}",
      ".sx-pal-av{position:relative;flex:none;width:2.6rem;height:2.6rem;margin:0.3rem;padding:0;border:0;border-radius:50%;background:none;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .2s var(--spring,ease)}",
      ".sx-pal-av:hover{transform:scale(1.08) rotate(-4deg)}",
      /* a soft ring that grows around the picture while it is hovered or its menu is open */
      ".sx-pal-av::before{content:'';position:absolute;inset:-5px;border:2px solid rgba(var(--rgb-blue,74,163,255),0);border-radius:50%;box-shadow:0 0 0 rgba(var(--rgb-blue,74,163,255),0);transform:scale(0.82);transition:transform .3s var(--spring,ease),border-color .2s ease,box-shadow .3s ease;pointer-events:none}",
      ".sx-pal-av:hover::before,.sx-pal-av[aria-expanded='true']::before{transform:scale(1);border-color:rgba(var(--rgb-blue,74,163,255),0.55);box-shadow:0 0 20px rgba(var(--rgb-blue,74,163,255),0.55)}",
      ".sx-pal-av:focus-visible{outline:3px solid var(--color-accent-bright,#86c5ff);outline-offset:4px}",
      ".sx-pal-avatar{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden;border:2px solid rgba(var(--rgb-blue,74,163,255),0.55);border-radius:50%;background:var(--color-surface-raised,#0f1833);color:var(--color-accent-bright,#86c5ff);font:800 1rem var(--font-display,system-ui,sans-serif)}",
      ".sx-pal-avatar img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
      ".sx-pal .sx-deco-img{position:absolute;top:50%;left:50%;width:136%;height:136%;max-width:none;object-fit:contain;transform:translate(-50%,-50%);pointer-events:none}",
      /* expressions: a little badge (sleepy, sparkly...) and a blush, both pure CSS */
      ".sx-pal-mood{position:absolute;top:-0.45rem;right:-0.55rem;z-index:2;display:grid;place-items:center;min-width:1.2rem;height:1.2rem;padding:0 0.1rem;border:1px solid rgba(var(--rgb-blue,74,163,255),0.5);border-radius:999px;background:rgb(15,24,51);font-size:0.72rem;line-height:1;pointer-events:none;transform:scale(0);transition:transform .25s var(--spring,ease)}",
      ".sx-pal-mood.is-on{transform:scale(1)}",
      ".sx-pal-blush{position:absolute;inset:0;border-radius:50%;opacity:0;pointer-events:none;background:radial-gradient(circle at 25% 66%,rgba(255,107,157,0.8) 0 11%,transparent 14%),radial-gradient(circle at 75% 66%,rgba(255,107,157,0.8) 0 11%,transparent 14%);transition:opacity .3s ease}",
      ".sx-pal.is-blush .sx-pal-blush{opacity:1}",
      ".sx-pal-bubble{position:relative;max-width:min(18rem,calc(100vw - var(--pal-left) - 5rem));padding:0.65rem 1.7rem 0.7rem 0.95rem;border:1px solid rgba(var(--rgb-blue,74,163,255),0.45);border-radius:16px 16px 16px 4px;background:rgb(15,24,51);box-shadow:0 16px 34px -16px #000,0 0 40px -22px rgba(var(--rgb-blue,74,163,255),0.9);color:#fff;font:600 0.88rem/1.35 var(--font-display,system-ui,sans-serif);cursor:pointer;transform-origin:0 100%}",
      ".sx-pal-bubble[hidden]{display:none}",
      ".sx-pal-bubble.is-pop,.sx-pal-menu.is-pop{animation:sx-pal-pop .3s var(--spring,ease-out)}",
      "@keyframes sx-pal-pop{from{transform:translateX(-6px) scale(0.94)}to{transform:none}}",
      /* the text is typed in: an invisible copy of the full line holds the size, so the bubble never jumps around */
      ".sx-pal-text{display:block;position:relative;overflow-wrap:anywhere}",
      ".sx-pal-ghost{display:block;visibility:hidden}",
      ".sx-pal-typed{position:absolute;left:0;top:0;width:100%;display:block}",
      ".sx-pal-x{position:absolute;top:0.3rem;right:0.35rem;display:grid;place-items:center;width:1.2rem;height:1.2rem;padding:0;border:0;border-radius:50%;background:transparent;color:rgba(255,255,255,0.55);font:700 1rem/1 system-ui,sans-serif;cursor:pointer}",
      ".sx-pal-x::before{content:'';position:absolute;inset:-8px}",
      ".sx-pal-x:hover,.sx-pal-x:focus-visible{background:rgba(var(--rgb-blue,74,163,255),0.28);color:#fff}",
      ".sx-pal-x:focus-visible{outline:2px solid var(--color-accent-bright,#86c5ff);outline-offset:1px}",
      /* buttons inside the bubble (palette, quiz, "Want me quieter?") */
      ".sx-pal-rich{display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.55rem;cursor:default}",
      ".sx-pal-rich[hidden]{display:none}",
      ".sx-pal-rich.is-col{flex-direction:column;align-items:stretch}",
      ".sx-pal-chip{display:inline-flex;align-items:center;justify-content:center;padding:0.34rem 0.8rem;border:1px solid rgba(var(--rgb-blue,74,163,255),0.5);border-radius:999px;background:rgba(var(--rgb-blue,74,163,255),0.14);color:#fff;font:600 0.8rem var(--font-main,system-ui,sans-serif);text-align:center;text-decoration:none;cursor:pointer;transition:background-color .15s ease,border-color .15s ease}",
      ".sx-pal-chip:hover{border-color:rgba(var(--rgb-blue,74,163,255),0.85);background:rgba(var(--rgb-blue,74,163,255),0.32)}",
      ".sx-pal-chip:focus-visible{outline:2px solid var(--color-accent-bright,#86c5ff);outline-offset:2px}",
      /* announced by screen readers, never seen */
      ".sx-pal-live{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;pointer-events:none}",
      /* the menu is a bubble too: same look as the comment bubble, same spot next to the picture */
      ".sx-pal-menu{position:relative;display:grid;gap:0.3rem;min-width:min(13.5rem,calc(100vw - var(--pal-left) - 5rem));max-width:min(18rem,calc(100vw - var(--pal-left) - 5rem));padding:0.6rem;border:1px solid rgba(var(--rgb-blue,74,163,255),0.45);border-radius:18px 18px 18px 4px;background:linear-gradient(180deg,rgb(19,30,62),rgb(13,21,46));box-shadow:0 18px 38px -16px #000,0 0 44px -20px rgba(var(--rgb-blue,74,163,255),0.9);transform-origin:0 100%}",
      /* invisible bridge over the gap to the picture, so the menu does not close while the mouse travels to it */
      ".sx-pal-menu::before{content:'';position:absolute;top:0;bottom:0;left:-1.1rem;width:1.1rem}",
      ".sx-pal-menu[hidden],.sx-pal-menu [hidden]{display:none}",
      ".sx-pal-list{display:grid;gap:0.3rem;max-height:calc(100vh - 10rem);max-height:min(24rem,calc(100dvh - 10rem));overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;padding:2px 8px 2px 2px;margin:-2px -8px -2px -2px}",
      ".sx-pal-menu-t{padding:0.2rem 0.55rem 0.35rem;margin-bottom:0.1rem;border-bottom:1px solid rgba(var(--rgb-blue,74,163,255),0.2);color:#fff;font:700 0.95rem/1.3 var(--font-display,system-ui,sans-serif)}",
      ".sx-pal-menu a,.sx-pal-menu button{display:flex;align-items:center;gap:0.6rem;width:100%;padding:0.38rem 0.9rem 0.38rem 0.4rem;border:1px solid rgba(var(--rgb-blue,74,163,255),0.22);border-radius:999px;background:rgba(var(--rgb-blue,74,163,255),0.08);color:var(--color-text,#fff);font:600 0.9rem var(--font-main,system-ui,sans-serif);text-align:left;text-decoration:none;cursor:pointer;transition:background-color .15s ease,border-color .15s ease,color .15s ease,transform .2s var(--spring,ease)}",
      ".sx-pal-ico{display:grid;place-items:center;flex:none;width:1.8rem;height:1.8rem;border-radius:50%;background:rgba(var(--rgb-blue,74,163,255),0.18);font-size:0.95rem;line-height:1;transition:transform .25s var(--spring,ease),background-color .15s ease}",
      ".sx-pal-lbl{min-width:0}",
      ".sx-pal-menu a:active,.sx-pal-menu button:active{transform:scale(0.97)}",
      ".sx-pal-menu.is-pop a,.sx-pal-menu.is-pop button{animation:sx-pal-item .34s var(--spring,ease-out) backwards;animation-delay:calc(var(--n,0) * 45ms)}",
      "@keyframes sx-pal-item{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}",
      ".sx-pal-menu a:hover,.sx-pal-menu button:hover,.sx-pal-menu a:focus-visible,.sx-pal-menu button:focus-visible{border-color:rgba(var(--rgb-blue,74,163,255),0.7);background:rgba(var(--rgb-blue,74,163,255),0.24);color:var(--color-accent-bright,#86c5ff);transform:translateX(4px);outline:0}",
      ".sx-pal-menu a:hover .sx-pal-ico,.sx-pal-menu button:hover .sx-pal-ico,.sx-pal-menu a:focus-visible .sx-pal-ico,.sx-pal-menu button:focus-visible .sx-pal-ico{background:rgba(var(--rgb-blue,74,163,255),0.4);transform:rotate(-12deg) scale(1.15)}",
      /* phones: a narrower bubble */
      "@media (max-width:520px){.sx-pal-bubble{max-width:min(14.5rem,calc(100vw - var(--pal-left) - 4.5rem))}}",
      "@media (prefers-reduced-motion:reduce){.sx-pal,.sx-pal-av,.sx-pal-av::before,.sx-pal-ico,.sx-pal-mood,.sx-pal-blush,.sx-pal-chip,.sx-pal-menu a,.sx-pal-menu button{transition:none}.sx-pal-av:hover{transform:none}.sx-pal-bubble.is-pop,.sx-pal-menu.is-pop,.sx-pal-menu.is-pop a,.sx-pal-menu.is-pop button{animation:none}.sx-pal-menu a:hover,.sx-pal-menu button:hover,.sx-pal-menu a:focus-visible,.sx-pal-menu button:focus-visible{transform:none}}",
      "@media print{.sx-pal{display:none}}"
    ].join("\n");
    var style = document.createElement("style");
    style.id = "sx-pal-css";
    style.textContent = css;
    document.head.appendChild(style);

    /* ---------- Build it ---------- */
    var pal = make("div", "sx-pal");
    pal.id = "sx-pal";

    var btn = make("button", "sx-pal-av");
    btn.type = "button";
    btn.setAttribute("aria-haspopup", "menu");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "sx-pal-menu");
    btn.setAttribute("aria-label", NAME + "'s menu");
    var avatar = make("span", "sx-pal-avatar");
    var letter = make("span", "", "B");
    letter.setAttribute("aria-hidden", "true");
    var pic = document.createElement("img");
    pic.alt = "";
    pic.hidden = true;
    var blush = make("span", "sx-pal-blush");
    blush.setAttribute("aria-hidden", "true");
    avatar.appendChild(letter);
    avatar.appendChild(pic);
    avatar.appendChild(blush);
    var deco = document.createElement("img");
    deco.className = "sx-deco-img";
    deco.alt = "";
    deco.setAttribute("aria-hidden", "true");
    deco.hidden = true;
    var moodEl = make("span", "sx-pal-mood");
    moodEl.setAttribute("aria-hidden", "true");
    btn.appendChild(avatar);
    btn.appendChild(deco);
    btn.appendChild(moodEl);

    // The bubble. The typed text is hidden from screen readers (it would be read letter by letter);
    // they get the full line once, through the live region instead.
    var bubble = make("div", "sx-pal-bubble");
    bubble.hidden = true;
    var text = make("span", "sx-pal-text");
    var ghost = make("span", "sx-pal-ghost");
    var typed = make("span", "sx-pal-typed");
    ghost.setAttribute("aria-hidden", "true");
    typed.setAttribute("aria-hidden", "true");
    text.appendChild(ghost);
    text.appendChild(typed);
    var rich = make("div", "sx-pal-rich");
    rich.hidden = true;
    var xBtn = make("button", "sx-pal-x", "\u00D7");
    xBtn.type = "button";
    xBtn.setAttribute("aria-label", "Dismiss");
    bubble.appendChild(text);
    bubble.appendChild(rich);
    bubble.appendChild(xBtn);

    var live = make("div", "sx-pal-live");
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");

    var menu = make("div", "sx-pal-menu");
    menu.id = "sx-pal-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", NAME + "'s menu");
    menu.hidden = true;
    menu.appendChild(make("p", "sx-pal-menu-t", "Bored? Pick one."));
    var list = make("div", "sx-pal-list");
    menu.appendChild(list);
    var muteBtn = null, muteIco = null, muteLbl = null, bubbleBtns = [], items = [];
    MENU.forEach(function (it) {
      var el;
      if (it.fineOnly && !fine.matches) return;
      if (it.href) {
        if (!it.external && it.href.replace(/\/+$/, "").replace(/\.html?$/i, "").split("/").pop() === page) return;      // no link to the page you are on
        el = make("a", "");
        el.href = it.href;
        if (it.external) { el.target = "_blank"; el.rel = "noopener noreferrer"; }
      } else {
        el = make("button", "");
        el.type = "button";
        el.dataset.act = it.act;
        if (it.act === "mute") muteBtn = el;
        if (it.act === "quip" || it.act === "five" || it.act === "roll") bubbleBtns.push(el);   // these only talk, so they hide while comments are muted
      }
      var ico = make("span", "sx-pal-ico", it.icon || "");
      ico.setAttribute("aria-hidden", "true");
      var lbl = make("span", "sx-pal-lbl", it.label);
      el.appendChild(ico);
      el.appendChild(lbl);
      if (it.act === "mute") { muteIco = ico; muteLbl = lbl; }
      el.style.setProperty("--n", String(items.length));     // the buttons pop in one after another
      el.setAttribute("role", "menuitem");
      list.appendChild(el);
      items.push(el);
    });

    pal.appendChild(btn);
    pal.appendChild(bubble);
    pal.appendChild(menu);
    pal.appendChild(live);
    document.body.appendChild(pal);

    /* ---------- Images without a known extension ---------- */
    function probe(bases, exts, done) {
      var l = [];
      bases.forEach(function (b) { exts.forEach(function (e) { l.push(b + "." + e); }); });
      var i = 0;
      (function next() {
        if (i >= l.length) return done(null);
        var src = l[i++], im = new Image();
        im.onload = function () { done(src); };
        im.onerror = next;
        im.src = src;
      })();
    }
    probe([IMG_PFP], ["webp"], function (src) {
      if (src) { pic.src = src; pic.hidden = false; }
    });

    // Same avatar decoration the visitor picked on the socials page (or the seasonal one on a first visit)
    var saved = lsGet(DECO_KEY);
    var decoId = saved === "none" ? null : (saved || SEASON_DECO[new Date().getMonth()] || null);
    var decoSet = false;                                     // true once the socials picker has told us what is active
    if (decoId && /^[a-z0-9-]+$/i.test(decoId)) {
      probe(["/images/decorations/socials-deco-" + decoId], ["webp", "gif"], function (src) {
        if (src && !decoSet) { deco.src = src; deco.hidden = false; }
      });
    }
    // On the socials page the picker announces every change, so the picture follows it live
    window.addEventListener("sx-deco-change", function (e) {
      var d = (e && e.detail) || {};
      decoSet = true;
      if (d.src) { deco.src = d.src; deco.hidden = false; } else deco.hidden = true;
    });

    /* ---------- Season: ring colour, bubble border and confetti follow Halloween / Christmas ---------- */
    var seasonClass = "";
    function applySeason() {
      var k = seasonKey();
      if (seasonClass) pal.classList.remove(seasonClass);
      seasonClass = k ? "sx-pal--" + k : "";
      if (k) {
        pal.classList.add(seasonClass);
        if (SEASONS[k].rgb) pal.style.setProperty("--rgb-blue", SEASONS[k].rgb);
        if (SEASONS[k].bright) pal.style.setProperty("--color-accent-bright", SEASONS[k].bright);
      } else {                                                // no season: always the classic blue, whatever tint the page uses
        pal.style.setProperty("--rgb-blue", "74,163,255");
        pal.style.setProperty("--color-accent-bright", "#86c5ff");
      }
    }
    applySeason();
    window.addEventListener("load", applySeason);

    /* ---------- Back-to-top button: it sits right above Bcraft Junior, so he never has to move ----------
       The site keeps positioning the button (it even moves it up for the "You liked this" banner); we only
       nudge it with the CSS "translate" property on top of wherever the site put it. */
    var toTop = null, topRaf = 0;
    function placeTotop() {
      topRaf = 0;
      if (!toTop || away || !pal.offsetWidth) return;
      var w = toTop.offsetWidth, h = toTop.offsetHeight;
      if (!w || !h) return;
      var cx = pal.offsetLeft + btn.offsetLeft + btn.offsetWidth / 2;
      var top = pal.offsetTop + btn.offsetTop;
      var dx = cx - w / 2 - toTop.offsetLeft, dy = top - 10 - h - toTop.offsetTop;
      toTop.style.setProperty("translate", dx.toFixed(1) + "px " + dy.toFixed(1) + "px");
    }
    function queueTotop() { if (!topRaf) topRaf = requestAnimationFrame(placeTotop); }
    function syncTotop() {
      if (!toTop) {
        toTop = document.querySelector(".to-top");           // built by script.js, so it may appear a moment after this script runs
        if (toTop && window.MutationObserver) new MutationObserver(queueTotop).observe(toTop, { attributes: true, attributeFilter: ["class"] });
      }
      queueTotop();
    }
    syncTotop();
    setTimeout(syncTotop, 600);
    window.addEventListener("scroll", syncTotop, { passive: true });
    window.addEventListener("resize", queueTotop);
    window.addEventListener("load", syncTotop);

    /* ---------- State ---------- */
    var muted = false, menuOpen = false, heroSeen = true, away = false, introUp = false, busy = false, panelClose = null;
    var current = "", lastAct = Date.now(), afkTimer = null, holdMs = AFK_MS, shownText = "", shownY = 0;
    var step = {}, lastSaid = {}, autoCount = 0, pending = null;
    var pauseTimer = null, typeTimer = null, liveTimer = null;
    var dismissals = parseInt(ssGet(SS_DISMISS) || "0", 10) || 0;
    muted = lsGet(MUTE_KEY) === "1";

    // Visit count: one small number, counted once per browser session (not on every page you open)
    var visits = 1;
    (function () {
      var n = parseInt(lsGet(VISIT_KEY) || "0", 10) || 0;
      if (!ssGet(SS_COUNTED)) { n++; lsSet(VISIT_KEY, String(n)); ssSet(SS_COUNTED, "1"); }
      visits = Math.max(n, 1);
    })();

    function setMuted(v) {
      muted = v;
      lsSet(MUTE_KEY, muted ? "1" : "0");
      refreshMenu();
    }
    function refreshMenu() {
      if (muteLbl) muteLbl.textContent = muted ? "Unmute comments" : "Mute comments";
      if (muteIco) muteIco.textContent = muted ? "\uD83D\uDD14" : "\uD83D\uDD07";
      bubbleBtns.forEach(function (b) { b.hidden = muted; });
    }
    refreshMenu();

    /* ---------- Expressions: sleepy after 30 s idle, sparkly after confetti, blushing on the reviews ---------- */
    var moodTemp = null, moodTimer = null, sleeping = false;
    function paintMood() {
      var e = moodTemp || (sleeping ? "\uD83D\uDE34" : "");
      moodEl.textContent = e;
      moodEl.classList.toggle("is-on", !!e);
    }
    function setMood(e, ms) {
      moodTemp = e;
      paintMood();
      clearTimeout(moodTimer);
      if (ms) moodTimer = setTimeout(function () { moodTemp = null; paintMood(); }, ms);
    }
    function setBlush(on) { pal.classList.toggle("is-blush", !!on); }
    setInterval(function () {
      if (document.hidden) return;
      var idleNow = Date.now() - lastAct > SLEEP_MS;
      if (idleNow !== sleeping) { sleeping = idleNow; paintMood(); }
    }, 3000);

    /* ---------- The bubble: a short pause, then the text is typed in; hides itself after AFK_MS without activity ---------- */
    function announce(t) {
      clearTimeout(liveTimer);
      live.textContent = "";
      liveTimer = setTimeout(function () { live.textContent = t; }, 60);
    }
    function hideBubble() {
      clearTimeout(pauseTimer);
      clearTimeout(typeTimer);
      bubble.hidden = true;
      shownText = "";
      setBlush(false);
    }
    // Returns true when the bubble was accepted.
    //   force: the visitor asked for it (menu), so mute / hero do not apply
    //   o.react: say it even while the top of the page is on screen (greeting, reactions)
    //   o.ttl: how long it stays without activity;  o.instant: no pause, no typing
    //   o.rich(box): fill the buttons area after the text;  o.focusRich: move keyboard focus there
    function showBubble(t, force, o) {
      o = o || {};
      if (!t) return false;
      if (!force && (muted || menuOpen || away || busy)) return false;
      if (!force && !o.react && heroSeen) return false;
      clearTimeout(pauseTimer);
      holdMs = o.ttl || AFK_MS;
      lastAct = Date.now();
      if (reduced || o.instant || !bubble.hidden) present(t, o);
      else pauseTimer = setTimeout(function () { present(t, o); }, PAUSE_MS);
      return true;
    }
    function present(t, o) {
      clearTimeout(typeTimer);
      shownText = t;
      ghost.textContent = t;                                  // the full line is in place first (it sets the bubble size)
      typed.textContent = "";
      rich.textContent = "";
      rich.className = "sx-pal-rich";
      rich.hidden = true;
      bubble.hidden = false;
      setBlush(o.blush);
      if (!reduced) {                                         // restart the little pop
        bubble.classList.remove("is-pop");
        void bubble.offsetWidth;
        bubble.classList.add("is-pop");
      }
      lastAct = Date.now();
      shownY = window.pageYOffset || 0;                       // where on the page he last spoke (for long sections)
      armAfk();
      announce(t);
      var chars = Array.from ? Array.from(t) : t.split(""), n = 0;
      function finish() {
        typed.textContent = t;
        if (o.rich) {
          rich.hidden = false;
          o.rich(rich);
          if (o.focusRich) { var f = rich.querySelector("button,a"); if (f) f.focus(); }
        }
      }
      if (reduced || o.instant || chars.length < 2) { finish(); return; }
      var delay = Math.max(12, Math.min(26, 1300 / chars.length));
      (function tick() {
        n++;
        typed.textContent = chars.slice(0, n).join("");
        if (n >= chars.length) finish();
        else typeTimer = setTimeout(tick, delay);
      })();
    }
    function armAfk() {
      if (afkTimer) return;
      afkTimer = setTimeout(checkAfk, holdMs);
    }
    function checkAfk() {
      afkTimer = null;
      if (bubble.hidden) return;
      var left = holdMs - (Date.now() - lastAct);
      if (left > 0) afkTimer = setTimeout(checkAfk, left);    // they were active meanwhile: wait the rest
      else hideBubble();
    }
    function active() { return Date.now() - lastAct < AFK_MS; }
    function noteActivity() { lastAct = Date.now(); }
    ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "touchmove", "scroll"].forEach(function (ev) {
      window.addEventListener(ev, noteActivity, { passive: true, capture: true });
    });
    // Screen readers: the same text is announced, but never letter by letter
    function chip(label, fn) {
      var b = make("button", "sx-pal-chip", label);
      b.type = "button";
      b.addEventListener("click", function (e) { e.stopPropagation(); fn(e); });
      return b;
    }

    /* ---------- Annoyance control: dismiss twice and he offers to be quieter ---------- */
    function dismiss(count) {
      hideBubble();
      if (!count) return;
      dismissals++;
      ssSet(SS_DISMISS, String(dismissals));
      if (dismissals >= 2 && !ssGet(SS_QUIET)) {
        ssSet(SS_QUIET, "1");
        setTimeout(offerQuieter, 500);
      }
    }
    function offerQuieter() {
      if (muted || away) return;
      showBubble(D.QUIETER || "Want me quieter?", true, {
        ttl: 15000,
        rich: function (box) {
          box.appendChild(chip("Yes, mute me", function () {
            setMuted(true);
            showBubble("Okay, shhh. I'm in the menu if you need me.", true, { instant: true });
          }));
          box.appendChild(chip("Keep going", function () {
            dismissals = 0;
            ssSet(SS_DISMISS, "0");
            showBubble("Okay, I'll keep going!", true, { instant: true });
          }));
        }
      });
    }
    xBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dismiss(true);
      if (e.detail === 0) btn.focus();
    });

    /* ---------- Stay out of the way: hidden while a dialog, the artwork viewer or the welcome window is open ---------- */
    var ovSel = ["dialog[open]", "[aria-modal='true']:not(.lightbox):not(.welcome-modal-box)"].concat(D.OVERLAYS || []);
    REACT.forEach(function (en) { if (en.overlay && en.watch) ovSel.push(en.watch); });
    ovSel = ovSel.join(",");
    function shown(el) {
      if (!el || el.hidden || pal.contains(el) || el.getAttribute("aria-hidden") === "true") return false;
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      if (r.bottom <= 0 || r.right <= 0 || r.top >= (window.innerHeight || 800) || r.left >= (window.innerWidth || 1200)) return false;
      var s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden" && parseFloat(s.opacity) > 0.05;
    }
    function anyShown(sel) {
      var l, i;
      try { l = document.querySelectorAll(sel); } catch (e) { return false; }
      for (i = 0; i < l.length; i++) if (shown(l[i])) return true;
      return false;
    }
    function syncAway() {
      var a = anyShown(ovSel);
      if (a === away) return;
      away = a;
      pal.classList.toggle("is-away", a);
      if (a) { hideBubble(); closeMenu(false); }
    }
    function flushPending() {
      if (greetWaiting && !away) greet();
      if (!pending || away) return;
      var p = pending;
      pending = null;
      setTimeout(function () {
        if (away) { pending = p; return; }
        showBubble(p, false, { react: true });
      }, 500);
    }

    /* ---------- Reacting to the site ---------- */
    var reactState = {}, reactLast = {}, copyEntry = null;
    function react(en) {
      var now = Date.now(), line;
      if (muted || now - (reactLast[en.id] || 0) < REACT_COOLDOWN_MS) return;
      reactLast[en.id] = now;
      line = pick("react-" + en.id, en.lines);
      if (!line) return;
      if (en.overlay) { pending = line; scan(); return; }        // said once the window is closed again
      if (away) { pending = line; return; }
      showBubble(line, false, { react: true });
    }
    function scan() {
      scanT = null;
      syncAway();
      REACT.forEach(function (en) {
        if (!en.watch) return;
        var o = anyShown(en.watch);
        if (o && !reactState[en.id]) react(en);
        reactState[en.id] = o;
      });
      flushPending();
    }
    var scanT = null;
    REACT.forEach(function (en) {
      if (en.copy) copyEntry = en;
      (en.events || []).forEach(function (name) {
        var fire = function () { react(en); };
        window.addEventListener(name, fire);
        document.addEventListener(name, fire);
      });
      if (en.click) document.addEventListener("click", function (e) {
        if (e.target.closest && e.target.closest(en.click)) react(en);
      }, true);
    });
    document.addEventListener("copy", function () {                // Ctrl+C on a link
      if (!copyEntry) return;
      var s = "";
      try { s = String(window.getSelection() || ""); } catch (e) { /* ignore */ }
      if (/^\s*https?:\/\/\S+\s*$/i.test(s)) react(copyEntry);
    });
    if (window.MutationObserver) {
      new MutationObserver(function (ms) {
        for (var i = 0; i < ms.length; i++) {
          if (!pal.contains(ms[i].target)) { if (!scanT) scanT = setTimeout(scan, 120); return; }
        }
      }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "hidden", "open", "aria-hidden"] });
    }
    window.addEventListener("load", scan);

    /* ---------- Lazy loading: confetti, game, quiz... are only downloaded when first used ---------- */
    var extras = null, extrasQ = [], extrasLoading = false;
    var api = {
      make: make, chip: chip, data: D, page: page, name: NAME, btn: btn, pal: pal, kb: false,
      reduced: reduced,
      say: function (t, o) { return showBubble(t, true, o); },
      announce: announce,
      hideBubble: function () { hideBubble(); },
      busy: function (v) { busy = !!v; },                      // a menu-style panel (the quiz) is open: no automatic bubbles
      onClosePanel: function (fn) { panelClose = fn; },
      hop: function () { hop(); },
      mood: setMood,
      confettiColors: confettiColors,
      store: { get: lsGet, set: lsSet },
      keys: { best: BEST_KEY }
    };
    window.SXPal = { register: function (factory) { extras = factory(api); } };
    function withExtras(cb) {
      if (extras) { cb(extras); return; }
      extrasQ.push(cb);
      if (extrasLoading) return;
      extrasLoading = true;
      loadScript(BASE + "companion-extras.js", function () {
        var q = extrasQ;
        extrasLoading = false;
        extrasQ = [];
        if (!extras) { showBubble("Hmm, that one didn't load. Try again in a sec?", true); return; }
        q.forEach(function (f) { f(extras); });
      });
    }

    /* ---------- The menu: opens on hover (mouse) or tap/keyboard; a click keeps it open ---------- */
    var pinned = false, leaveTimer = null;
    function pop(el) {
      if (reduced) return;
      el.classList.remove("is-pop");
      void el.offsetWidth;
      el.classList.add("is-pop");
    }
    function openMenu(focusFirst) {
      clearTimeout(leaveTimer);
      if (!menuOpen) {
        menuOpen = true;
        if (panelClose) panelClose(false);
        hideBubble();
        refreshMenu();
        menu.hidden = false;
        pop(menu);
        btn.setAttribute("aria-expanded", "true");
      }
      if (focusFirst) {
        var first = items.filter(function (el) { return !el.hidden; })[0];
        if (first) first.focus();
      }
    }
    function closeMenu(refocus) {
      clearTimeout(leaveTimer);
      menuOpen = false;
      pinned = false;
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      if (refocus) btn.focus();
    }
    btn.addEventListener("click", function (e) {
      var byKeyboard = e.detail === 0;
      if (menuOpen && pinned) closeMenu(byKeyboard);          // open and kept: this click closes it
      else if (menuOpen) pinned = true;                       // opened by hovering: this click keeps it open
      else { openMenu(byKeyboard); pinned = true; }
    });
    bubble.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest(".sx-pal-rich")) return;      // buttons inside the bubble do their own thing
      openMenu(false);
      pinned = true;
    });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); openMenu(true); pinned = true; }
    });
    // Hover: the picture opens it (the comment bubble does not); leaving the picture or the menu closes it after a short grace period
    function hoverIn() { if (!fine.matches) return; clearTimeout(leaveTimer); if (!menuOpen) openMenu(false); }
    function hoverOut() {
      if (!fine.matches || !menuOpen || pinned) return;
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(function () { if (!pinned) closeMenu(false); }, 300);
    }
    [btn, menu].forEach(function (el) {
      el.addEventListener("mouseenter", hoverIn);
      el.addEventListener("mouseleave", hoverOut);
    });
    menu.addEventListener("keydown", function (e) {
      var l = items.filter(function (el) { return !el.hidden; }), i = l.indexOf(document.activeElement);
      if (!l.length) return;
      if (e.key === "Escape") { e.preventDefault(); closeMenu(true); }
      else if (e.key === "ArrowDown") { e.preventDefault(); l[(i + 1) % l.length].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); l[(i - 1 + l.length) % l.length].focus(); }
      else if (e.key === "Home") { e.preventDefault(); l[0].focus(); }
      else if (e.key === "End") { e.preventDefault(); l[l.length - 1].focus(); }
    });
    // Click outside: closes the menu; on a phone a tap anywhere else also dismisses the bubble
    document.addEventListener("click", function (e) {
      if (pal.contains(e.target)) return;
      if (menuOpen) closeMenu(false);
      else if (!fine.matches && !bubble.hidden) dismiss(rich.hidden);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (menuOpen) closeMenu(true);
        else if (!bubble.hidden) dismiss(false);
      }
    });
    pal.addEventListener("focusout", function (e) { if (menuOpen && e.relatedTarget && !pal.contains(e.relatedTarget)) closeMenu(false); });

    menu.addEventListener("click", function (e) {
      var el = e.target.closest ? e.target.closest("[role='menuitem']") : null;
      if (!el) return;
      var act = el.dataset.act, byKeyboard = e.detail === 0;
      if (!act) { closeMenu(false); return; }                  // a link: let it open
      closeMenu(byKeyboard);
      api.kb = byKeyboard;
      if (act === "mute") {
        setMuted(!muted);
        if (muted) hideBubble(); else showBubble("Okay, I'm back!", true);
      } else if (act === "quip") {
        showBubble(pick("quip", quipPool()), true);
      } else if (act === "five") {
        hop();
        setMood("\uD83D\uDE4C", 1800);
        showBubble(pick("five", FIVES), true);
      } else if (act === "roll") {
        showBubble("Draw this: " + pick("roll", PROMPTS), true);
      } else if (act === "game") {
        withExtras(function (x) { x.game(); });
      } else if (act === "quiz") {
        withExtras(function (x) { x.quiz(); });
      } else if (act === "sparkle") {
        if (reduced) showBubble("You asked for less motion, so I'll stay put.", true);
        else withExtras(function (x) { x.sparkle(); });
      } else if (act === "party") {
        if (reduced) showBubble("Imagine confetti. You asked for less motion.", true);
        else withExtras(function (x) { x.confetti(); hop(); setMood("\u2728", 2600); });
      }
    });

    // The picture does a little hop (high five, confetti, greeting)
    function hop() {
      if (reduced || !btn.animate) return;
      btn.animate([
        { transform: "translateY(0) rotate(0deg)" },
        { transform: "translateY(-12px) rotate(-10deg) scale(1.1)", offset: 0.4 },
        { transform: "translateY(0) rotate(4deg)", offset: 0.75 },
        { transform: "translateY(0) rotate(0deg)" }
      ], { duration: 460, easing: "ease-out" });
    }

    // Safety net: if the browser ever drops the painted text, writing it again forces a repaint
    document.addEventListener("visibilitychange", function () {
      if (document.hidden || bubble.hidden) return;
      var t = typed.textContent;
      typed.textContent = "";
      typed.textContent = t;
    });

    /* ---------- Greeting on the hero: first visit = intro, later = "Welcome back", 5th visit = a joke ---------- */
    function greetingText() {
      var k = seasonKey(), t = (D.TIME || {})[timeSlot()];
      if (visits <= 1) return D.INTRO || ("Hey, I'm " + NAME + " and I'm your little companion!");
      if (visits === 5 && D.FIFTH && D.FIFTH.length) return pick("fifth", D.FIFTH);
      if (k && SEASONS[k].greet && Math.random() < 0.5) return pick("sgreet", SEASONS[k].greet);
      if (t && t.length && Math.random() < 0.4) return pick("tgreet", t);
      return pick("back", D.BACK || ["Welcome back!"]);
    }
    var greetWaiting = false;
    function heroLine() {
      var l = (D.HERO || {})[page];
      return l && l.length ? pick("hero-" + page, l) : "";
    }
    function greet() {
      if (muted || menuOpen) return;
      if ((window.pageYOffset || 0) > 60) return;              // scrolling has already begun: stay quiet
      if (away) { greetWaiting = true; return; }               // a window is open: say hi as soon as it closes
      greetWaiting = false;
      var first = !ssGet(SS_GREETED);                          // first page of the visit: the greeting; every page after that: its own hero line
      ssSet(SS_GREETED, "1");
      introUp = true;
      var line;
      if (page === "index" && !(first && visits === 5 && D.FIFTH && D.FIFTH.length)) line = D.INTRO || ("Hey, I'm " + NAME + " and I'm your little companion!");   // the homepage always introduces him (only the 5th visit's joke goes first)
      else line = first ? greetingText() : (heroLine() || greetingText());
      if (showBubble(line, false, { react: true, ttl: 8000 })) hop();
    }
    setTimeout(greet, 1100);
    window.addEventListener("scroll", function () {            // the greeting belongs to the hero: it goes once scrolling begins
      if (introUp && (window.pageYOffset || 0) > 80) { introUp = false; hideBubble(); }
    }, { passive: true });

    scan();

    /* ---------- Follow the page ---------- */
    if (!("IntersectionObserver" in window)) return;

    var map = [];          // the sections that have a comment: { el, line, sel }
    var inBand = [];       // the ones crossing the middle of the screen right now (latest last)

    // A section's line. A list of lines gives the next one each time you ask for "next".
    function lineFor(i, next) {
      var l = map[i].line;
      if (!Array.isArray(l)) return l;
      if (step[i] === undefined) step[i] = 0;
      else if (next) step[i] = (step[i] + 1) % l.length;
      return l[step[i]];
    }
    function blushFor(i) { return BLUSH.indexOf(map[i].sel) > -1; }
    function speak(i, next, viaScroll) {
      if (autoCount >= MAX_AUTO) return;                       // enough for this page
      if (!viaScroll && Date.now() - (lastSaid[i] || 0) < COOLDOWN_MS) return;   // this section just spoke
      var l = lineFor(i, next), same = l === current;
      current = l;
      // Show it when it is new (or the bubble was hidden), and only if the visitor is actually here
      if (active() && (!same || bubble.hidden)) {
        if (showBubble(l, false, { blush: blushFor(i) })) { lastSaid[i] = Date.now(); autoCount++; }
      }
    }
    // Whatever he could not say earlier (the top of the page was still on screen), he says now
    function catchUp() {
      if (!inBand.length || heroSeen || muted || menuOpen || away || !active() || autoCount >= MAX_AUTO) return;
      var i = inBand[inBand.length - 1], l = lineFor(i, false);
      current = l;
      if (bubble.hidden || shownText !== l) {
        if (showBubble(l, false, { blush: blushFor(i) })) { lastSaid[i] = Date.now(); autoCount++; }
      }
    }

    // The bubble stays hidden while the top of the page (hero, or the profile picture on the socials page) is on screen.
    // For a hero that counts only while most of the screen is still hero, so a short hero never blocks the first section.
    var hero = document.getElementById("sx-pfpwrap") || document.querySelector("main > section, main > div");
    if (hero) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          heroSeen = en.isIntersecting;
          if (heroSeen) { if (!introUp) hideBubble(); } else catchUp();
        });
      }, hero.id === "sx-pfpwrap" ? {} : { rootMargin: "-55% 0px 0px 0px" }).observe(hero);
    } else heroSeen = false;

    // One comment per section: whichever one crosses the middle of the screen
    var io = new IntersectionObserver(function (es) {
      var entered = -1;
      es.forEach(function (en) {
        var i = -1, at;
        for (var k = 0; k < map.length; k++) if (map[k].el === en.target) { i = k; break; }
        if (i < 0) return;
        at = inBand.indexOf(i);
        if (en.isIntersecting) { if (at > -1) inBand.splice(at, 1); inBand.push(i); entered = i; }   // the one entered last counts as current
        else if (at > -1) inBand.splice(at, 1);
      });
      if (entered > -1) speak(entered, true, false);
    }, { rootMargin: "-45% 0px -50% 0px" });
    lines.forEach(function (pair) {
      var el = document.querySelector(pair[0]);
      if (!el) return;
      map.push({ el: el, line: pair[1], sel: pair[0] });
      io.observe(el);
    });

    // Long sections with several lines (gallery, reviews): keep talking as you scroll through them
    window.addEventListener("scroll", function () {
      if (!inBand.length || heroSeen || muted || menuOpen || away || !active()) return;
      var i = inBand[inBand.length - 1];
      if (!Array.isArray(map[i].line)) return;
      if (Math.abs((window.pageYOffset || 0) - shownY) >= ROTATE_SCREENS * (window.innerHeight || 800)) speak(i, true, true);
    }, { passive: true });
  }
})();