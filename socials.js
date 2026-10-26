/* ==========================================================
   socials.js : everything the socials page does. No other site script is
   loaded here (script.js is for the main site), so the two can't interfere.
   Settings are in the block below.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- SETTINGS ---------- */
  var PAGE_URL = "https://bcraftdesigns.com/socials";       // used by Copy link, Share and the QR code
  // Images in images/ are found without an extension (the .webp file is used)
  var IMG_PFP = "/images/socials-pfp";
  var IMG_BANNER = "/images/socials-banner";
  var IMG_ROBLOX_AVATAR = "/images/socials-roblox-avatar";   // optional; falls back to the profile picture
  var IMG_YT_BANNER = "/images/socials-yt-banner";            // YouTube card banner only (2560 x 423). Falls back to the page banner until this file exists
  var IMG_RBX_ART = "/images/social-gfx-01";                 // picture on the Roblox card (same file as the homepage Roblox card)
  var IMG_COMM_DESIGNS_BANNER = "/images/socials-comm-designs-banner";   // Bcraft Designs community card: banner (3:1) and icon (square). Cards stay empty until the files exist
  var IMG_COMM_DESIGNS_ICON = "/images/socials-comm-designs-icon";
  var IMG_COMM_COMMUNITY_BANNER = "/images/socials-comm-community-banner"; // Bcraft's Community card
  var IMG_COMM_COMMUNITY_ICON = "/images/socials-comm-community-icon";
  var IMG_REVIEW_AVATAR = "/images/avatars/HobPlayzRoblox";            // picture of the client in the review under the Bcraft Designs card (same file the reviews page uses)
  var X_AVATAR = "/images/homepage-twitter-pfp-01.webp";       // same X picture the main site uses
  var QR_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js";
  var X_HANDLE_FALLBACK = "realbcraft";
  var YT_CHANNEL_ID = "UCPNySTRqrKEo8vA8EzB_sTA";                                   // your channel (@realbcraft). The "Watch latest video" card finds your newest upload by itself (through the free rss2json service) and remembers it for 30 minutes
  var YT_API_KEY = "";                                      // optional but the most reliable: a free YouTube Data API v3 key (restrict it to your domain in Google Cloud). Empty = use the free feed services
  var YT_LATEST_ID = "";                                    // or pin a video yourself: the part after watch?v= in its link (11 characters). When set, nothing is looked up
  var YT_LATEST_TITLE = "";                                 // optional title shown on the card for YT_LATEST_ID
  var TIMEZONE = "Europe/Berlin";                           // your timezone (IANA name, e.g. "America/New_York") for the "My time" chip under your handle. "" hides it
  var ROLES = ["GFX wizard", "UI/UX designer", "thumbnail nerd", "YouTuber", "Roblox dev"];   // the words that rotate after "Your friendly ..."
  var ROLE_MS = 2800;                                       // how long each word stays (milliseconds)
  var HERO_ROLE = "handle";                                 // where the rotating role sits: "handle" (same line as @realbcraft) or "under" (own line below it)
  var HERO_CLOCK = "bio";                                   // where "My time" sits: "bio" (footer of the bio bubble) or "under" (below the handle)
  var SECRET_REWARD = "";                                   // shown when someone finds the secret (7 quick clicks on the pfp, or typing "gfx"), e.g. "Code SECRET10 for 10% off". Empty = just confetti.

  var $ = function (s) { return document.querySelector(s); };
  function make(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  /* ---------- Images without a known extension ---------- */
  function probe(bases, done, extList) {
    var exts = extList || ["webp"], list = [];
    bases.forEach(function (b) { exts.forEach(function (e) { list.push(b + "." + e); }); });
    var i = 0;
    (function next() {
      if (i >= list.length) return done(null);
      var src = list[i++], im = new Image();
      im.onload = function () { done(src); };
      im.onerror = next;
      im.src = src;
    })();
  }
  function fill(sel, bases) {
    var img = $(sel);
    if (!img) return;
    probe(bases, function (src) { if (src) { img.src = src; img.hidden = false; } });
  }
  fill("#sx-pfp", [IMG_PFP]);
  fill("#sx-order-bg", [IMG_BANNER]);
  fill("#sx-banner", [IMG_BANNER]);
  fill("#sx-rbx-avatar", [IMG_ROBLOX_AVATAR, IMG_PFP]);
  fill("#sx-yt-avatar", [IMG_PFP]);
  fill("#sx-yt-banner", [IMG_YT_BANNER, IMG_BANNER]);
  fill("#sx-rbx-art", [IMG_RBX_ART]);
  fill("#sx-cd-banner", [IMG_COMM_DESIGNS_BANNER]);
  fill("#sx-cd-icon", [IMG_COMM_DESIGNS_ICON]);
  fill("#sx-cc-banner", [IMG_COMM_COMMUNITY_BANNER]);
  fill("#sx-cc-icon", [IMG_COMM_COMMUNITY_ICON]);
  fill("#sx-say-avatar", [IMG_PFP]);
  fill("#sx-rev-avatar", [IMG_REVIEW_AVATAR]);
  fill("#sx-dc-avatar", [IMG_PFP]);
  fill("#sx-tt-avatar", [IMG_PFP]);

  document.querySelectorAll("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  /* ---------- Where the role and the time sit (settings: HERO_ROLE, HERO_CLOCK). The page ships with "handle" and "bio". ---------- */
  var heroHandle = $(".sx-handle"), roleNode = $("#sx-tagline"), clockNode = $("#sx-clock");
  if (heroHandle && roleNode && clockNode) {
    var heroMeta = null;
    if (HERO_ROLE === "under" || HERO_CLOCK === "under") {
      heroMeta = make("div", "sx-meta");
      heroHandle.parentNode.insertBefore(heroMeta, heroHandle.nextSibling);
    }
    if (HERO_ROLE === "under") { heroMeta.appendChild(roleNode); roleNode.dataset.pos = "under"; }
    if (HERO_CLOCK === "under") { heroMeta.appendChild(clockNode); clockNode.dataset.pos = "under"; }
  }

  /* ---------- "Watch latest video" card ---------- */
  var lvCard = $("#sx-lv"), lvImg = $("#sx-lv-img"), lvTitle = $("#sx-lv-title");
  var lvShown = false;
  function showLatest(id, title) {
    if (!lvCard || !lvImg || !/^[\w-]{11}$/.test(id || "")) return;
    lvShown = true;
    lvCard.href = "https://www.youtube.com/watch?v=" + id;
    lvCard.setAttribute("aria-label", "Watch the latest video" + (title ? ": " + title : " on YouTube"));
    if (title && lvTitle) lvTitle.textContent = title;
    var stage = 0, sizes = ["maxresdefault", "hqdefault", "mqdefault"];     // maxres is sharpest; not every video has one
    function load() { lvImg.src = "https://i.ytimg.com/vi/" + id + "/" + sizes[stage] + ".jpg"; }
    function next() { if (stage < sizes.length - 1) { stage++; load(); return true; } return false; }
    lvImg.onload = function () {
      if (lvImg.naturalWidth <= 120 && next()) return;                      // YouTube answers a missing size with a tiny grey picture
      lvImg.hidden = false;
    };
    lvImg.onerror = function () { next(); };
    load();
  }

  /* Last resort when no feed answers: swap the card's picture for YouTube's own player, loaded with the channel's uploads
     (newest first). It needs no lookup at all, so it works even when every feed service is down. */
  function showLatestEmbed() {
    if (!lvCard || lvShown || !/^UC[\w-]{20,}$/.test(YT_CHANNEL_ID)) return;
    var box = document.createElement("div");                               // a div, because a player can't live inside a link
    box.className = lvCard.className + " is-embed";
    box.id = lvCard.id;
    box.innerHTML = lvCard.innerHTML;
    var art = box.querySelector(".fm-art");
    if (art) {
      art.removeAttribute("aria-hidden");
      art.innerHTML = "";
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/videoseries?list=UU" + YT_CHANNEL_ID.slice(2);
      f.title = "Latest videos from Bcraft";
      f.loading = "lazy";
      f.allow = "accelerometer; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      art.appendChild(f);
    }
    var t = box.querySelector(".fm-lv-title");
    if (t) t.textContent = "Latest from my channel";
    var btn = box.querySelector(".fm-lv-btn");
    if (btn) {
      var a = document.createElement("a");
      a.className = btn.className;
      a.href = "https://www.youtube.com/@realbcraft/videos";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = btn.innerHTML.replace("Watch now", "All videos");
      btn.parentNode.replaceChild(a, btn);
    }
    box.removeAttribute("aria-label");
    lvCard.parentNode.replaceChild(box, lvCard);
  }

  if (YT_LATEST_ID) {
    showLatest(YT_LATEST_ID, YT_LATEST_TITLE);                              // a video you picked yourself always wins; no lookup
  } else {
    var LV_KEY = "sx-latest-video", lvCached = null;
    try { lvCached = JSON.parse(localStorage.getItem(LV_KEY) || "null"); } catch (e) {}
    var lvSame = lvCached && lvCached.ch === YT_CHANNEL_ID && lvCached.id;
    if (lvSame) showLatest(lvCached.id, lvCached.title);                    // instant, from the last visit
    if (lvSame && Date.now() - lvCached.at < 30 * 60 * 1000) { /* fresh enough: no request */ }
    else if (/^UC[\w-]{20,}$/.test(YT_CHANNEL_ID) && window.fetch) {
      var LV_FEED = "https://www.youtube.com/feeds/videos.xml?channel_id=" + YT_CHANNEL_ID;
      var LV_FEED_UP = "https://www.youtube.com/feeds/videos.xml?playlist_id=UU" + YT_CHANNEL_ID.slice(2);   // same videos, asked as the uploads playlist (answers when the channel URL doesn't)
      var lvGet = function (url) {                                          // every request gives up after 7 seconds
        var ctl = window.AbortController ? new AbortController() : null;
        if (ctl) setTimeout(function () { ctl.abort(); }, 7000);
        return fetch(url, ctl ? { signal: ctl.signal } : undefined).then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r; });
      };
      var lvUnescape = function (s) { return String(s).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, "&"); };
      var lvFromXml = function (url) {                                      // reads a public feed (newest video first)
        return lvGet(url).then(function (r) { return r.text(); }).then(function (t) {
          var idm = /<yt:videoId>([\w-]{11})<\/yt:videoId>/.exec(t), tm = /<entry>[\s\S]*?<title>([^<]*)<\/title>/.exec(t);
          if (!idm) throw new Error("no video in feed");
          return { id: idm[1], title: tm ? lvUnescape(tm[1]) : "" };
        });
      };
      var lvFromJson = function (feed) {
        return lvGet("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(feed)).then(function (r) { return r.json(); }).then(function (d) {
          var it = d && d.items && d.items[0], m = it && /[?&]v=([\w-]{11})/.exec(String(it.link || ""));
          if (!m) throw new Error("no video in answer");
          return { id: m[1], title: it.title || "" };
        });
      };
      var lvSources = [];                                                   // all tried, a little staggered; the first good answer wins
      if (YT_API_KEY) lvSources.push(function () {
        return lvGet("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=UU" + YT_CHANNEL_ID.slice(2) + "&key=" + encodeURIComponent(YT_API_KEY)).then(function (r) { return r.json(); }).then(function (d) {
          var s = d && d.items && d.items[0] && d.items[0].snippet, vid = s && s.resourceId && s.resourceId.videoId;
          if (!vid) throw new Error("no video in answer");
          return { id: vid, title: s.title || "" };
        });
      });
      lvSources.push(
        function () { return lvFromJson(LV_FEED); },
        function () { return lvFromXml("https://api.allorigins.win/raw?url=" + encodeURIComponent(LV_FEED)); },
        function () { return lvFromXml("https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(LV_FEED)); },
        function () { return lvFromJson(LV_FEED_UP); },
        function () { return lvFromXml("https://api.allorigins.win/raw?url=" + encodeURIComponent(LV_FEED_UP)); },
        function () { return lvFromXml("https://corsproxy.io/?url=" + encodeURIComponent(LV_FEED)); }
      );
      new Promise(function (resolve, reject) {
        var left = lvSources.length, done = false;
        lvSources.forEach(function (src, n) {
          setTimeout(function () {
            if (done) return;
            var p; try { p = src(); } catch (e) { p = Promise.reject(e); }
            p.then(function (v) { if (!done) { done = true; resolve(v); } }, function () { if (--left === 0 && !done) reject(new Error("all sources failed")); });
          }, n * 350);
        });
      }).then(function (v) {
        showLatest(v.id, v.title);
        try { localStorage.setItem(LV_KEY, JSON.stringify({ ch: YT_CHANNEL_ID, id: v.id, title: v.title || "", at: Date.now() })); } catch (e) {}
      }).catch(function () { showLatestEmbed(); });                         // nothing answered and nothing cached: show YouTube's own player instead
    }
  }

  /* ---------- "My time" chip: your local time, updating every minute ---------- */
  var clockEl = $("#sx-clock"), clockTime = $("#sx-clock-time");
  if (clockEl && clockTime && TIMEZONE) {
    try {
      var fmtTime = new Intl.DateTimeFormat("en-GB", { timeZone: TIMEZONE, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
      var fmtZone = new Intl.DateTimeFormat("en-GB", { timeZone: TIMEZONE, timeZoneName: "short" });
      var tickClock = function () {
        var d = new Date(), zp = fmtZone.formatToParts(d).filter(function (p) { return p.type === "timeZoneName"; })[0];
        clockTime.textContent = fmtTime.format(d) + (zp ? " " + zp.value : "");
      };
      tickClock();
      clockEl.hidden = false;
      (function schedule() { setTimeout(function () { tickClock(); schedule(); }, 60000 - (Date.now() % 60000) + 50); })();   // lands right after each new minute
    } catch (err) { /* unknown timezone name: the chip just stays hidden */ }
  }

  /* ---------- Rotating role under the name (slides up; stays still if the visitor prefers reduced motion) ---------- */
  var rotEl = $("#sx-rot"), rotBox = $("#sx-rot-box");
  if (rotEl && rotBox && ROLES.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    ROLES.forEach(function (r) {                              // invisible copies reserve the width of the longest word, so nothing next to it jumps
      var g = make("span", "sx-rot-ghost", r);
      g.setAttribute("aria-hidden", "true");
      rotBox.appendChild(g);
    });
    rotEl.textContent = ROLES[0];
    var roleAt = 0, rotBusy = false;
    setInterval(function () {
      if (document.hidden || rotBusy) return;
      roleAt = (roleAt + 1) % ROLES.length;
      var next = ROLES[roleAt];
      if (!rotEl.animate) { rotEl.textContent = next; return; }
      rotBusy = true;
      var out = rotEl.animate([{ transform: "none" }, { transform: "translateY(-110%)" }], { duration: 200, easing: "ease-in" });
      var finish = function () { rotEl.textContent = next; rotBusy = false; };
      out.oncancel = finish;
      out.onfinish = function () {
        rotEl.textContent = next;
        var inn = rotEl.animate([{ transform: "translateY(110%)" }, { transform: "none" }], { duration: 240, easing: "ease-out" });
        inn.onfinish = inn.oncancel = function () { rotBusy = false; };
      };
    }, ROLE_MS);
  }

  // Every link opens in a new tab (in-page # links and mailto: stay as they are)
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^mailto:/i.test(href)) return;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }, true);

  /* ---------- Thinking bubble: types a thought, holds it, erases it, thinks the next one ---------- */
  var thinkEl = $("#sx-think-text");
  var thoughts = [
    "Hmm... which thumbnail next?",
    "One more layer. Just one.",
    "Is that 1px off, or is it me?",
    "More glow. Okay, a bit more.",
    "Ctrl+Z is my best friend.",
    "Wait, what is he doing on that laptop?"
  ];
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var think = function (t) { if (thinkEl) thinkEl.textContent = t; };   // replaced below when the typing loop runs
  if (thinkEl && !reduced) {
    var ti = 0, cur = thoughts[0], ci = cur.length, erasing = true, pending = null, tickTimer;
    var later = function (ms) { clearTimeout(tickTimer); tickTimer = setTimeout(tick, ms); };
    var tick = function () {
      if (document.hidden) return later(800);
      if (!erasing) {
        ci++;
        thinkEl.textContent = cur.slice(0, ci);
        if (ci >= cur.length) { erasing = true; return later(2400); }
        return later(42 + Math.random() * 40);
      }
      ci = Math.max(0, ci - 2);
      thinkEl.textContent = cur.slice(0, ci);
      if (ci === 0) {
        erasing = false;
        cur = pending || thoughts[(ti = (ti + 1) % thoughts.length)];
        pending = null;
        return later(350);
      }
      later(22);
    };
    think = function (t) { pending = t; erasing = true; later(0); };   // drop the current thought, think this one next
    tick();
  }

  /* ---------- Playable pfp: click = sparkles, hold = pick a decoration (remembered on this device) ----------
     Decorations are images YOU save in images/decorations/ (transparent, square, .webp or animated .gif), named
       images/decorations/socials-deco-<id>.webp      e.g. images/decorations/socials-deco-halloween-ghosts.webp
     Only the ones that exist show up in the picker (grouped by category). "None" is always there.
     TO ADD ONE: add a line to a category's "items" below and save the matching file. A whole new
     category works the same way: copy a { id, label, burst, items } block. */
  var CATEGORIES = [
    { id: "halloween", label: "Halloween", burst: ["#ff8a3d", "#8a6bff", "#7dff6b", "#fff"], items: [
      { id: "halloween-ghosts",     label: "Ghosts",     say: "Boo!" },
      { id: "halloween-witch-brew", label: "Witch brew", say: "Double, double, toil and trouble." },
      { id: "halloween-pumpkin",    label: "Pumpkin",    say: "Pumpkin spice and everything nice." },
      { id: "halloween-hat",        label: "Hat",        say: "Is this hat pointy enough?" }
    ] },
    { id: "christmas", label: "Christmas", burst: ["#ff4d4d", "#3ddc84", "#ffd93b", "#fff"], items: [
      { id: "christmas-aurora",        label: "Aurora",        say: "Northern lights, who dis?" },
      { id: "christmas-string-lights", label: "String lights", say: "Plug in the lights!" },
      { id: "christmas-cat-ears",      label: "Cat ears",      say: "Meowy Christmas!" },
      { id: "christmas-snowfall",      label: "Snowfall",      say: "Let it snow!" }
    ] },
    { id: "other", label: "Other", burst: ["#fff", "#4aa3ff", "#8a6bff"], items: [
       { id: "other-patrick", label: "Patrick", say: "Am i dumb?" },
       { id: "other-shield", label: "Shield", say: "I'm a shield!" },
       { id: "other-mooncaps", label: "Mooncaps", say: "I'm a mooncap!" }
    ] }
  ];
  var NONE_BURST = ["#fff", "#4aa3ff"];
  var ITEMS = [];
  CATEGORIES.forEach(function (c) { c.items.forEach(function (it) { it.cat = c; ITEMS.push(it); }); });
  var avail = {};                       // item id -> image address, for the files that exist
  var theme = "none";
  var pfpWrap = $("#sx-pfpwrap"), hit = $("#sx-pfp-hit"), picker = $("#sx-picker"), pickerGrid = $("#sx-picker-g");
  var CLICKS = ["Hey! Careful with the pixels.", "Sparkles? Say less.", "Okay okay, that tickles.", "You found the secret button...", "Was that a commission?!"];
  function item(id) { return ITEMS.filter(function (it) { return it.id === id; })[0] || null; }

  function applyTheme(t) {
    var src = avail[t] || null;
    theme = src ? t : "none";
    pfpWrap.classList.toggle("has-deco", !!src);
    document.querySelectorAll("img[data-deco]").forEach(function (d) {
      if (src) d.src = src;
      d.hidden = !src;
    });
    pickerGrid.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-checked", String(b.dataset.theme === theme)); });
    // tell the companion bubble (companion.js) which decoration is active now
    window.dispatchEvent(new CustomEvent("sx-deco-change", { detail: { id: theme, src: src } }));
  }

  function option(id, label, src) {
    var b = make("button", "");
    b.type = "button";
    b.setAttribute("role", "menuitemradio");
    b.setAttribute("aria-checked", "false");
    b.dataset.theme = id;
    if (src) { var im = make("img", "sw"); im.src = src; im.alt = ""; b.appendChild(im); }
    else b.appendChild(make("i", "sw sw-none"));
    b.appendChild(document.createTextNode(label));
    return b;
  }
  function buildPicker() {
    CATEGORIES.forEach(function (c) {
      var have = c.items.filter(function (it) { return avail[it.id]; });
      if (!have.length) return;
      var sec = make("div", "sx-picker-sec"), grid = make("div", "sx-picker-g");
      sec.appendChild(make("p", "sx-picker-c", c.label));
      have.forEach(function (it) { grid.appendChild(option(it.id, it.label, avail[it.id])); });
      sec.appendChild(grid);
      pickerGrid.appendChild(sec);
    });
    var sec = make("div", "sx-picker-sec"), grid = make("div", "sx-picker-g");
    grid.appendChild(option("none", "None", null));
    sec.appendChild(grid);
    pickerGrid.appendChild(sec);
  }

  function decoReady() {
    buildPicker();
    var saved = null;
    try { saved = localStorage.getItem("sx-deco"); } catch (e) { /* storage blocked */ }
    var month = new Date().getMonth();                                  // first visit: Halloween in October, Christmas in December
    var season = month === 9 ? "halloween" : month === 11 ? "christmas" : "";
    var inSeason = ITEMS.filter(function (it) { return avail[it.id] && it.cat.id === season; })[0];
    var any = ITEMS.filter(function (it) { return avail[it.id]; })[0];
    applyTheme(saved === "none" || avail[saved] ? saved : (inSeason || any || { id: "none" }).id);
  }

  var left = ITEMS.length;
  if (!left) decoReady();
  ITEMS.forEach(function (it) {
    probe(["/images/decorations/socials-deco-" + it.id], function (src) {
      if (src) avail[it.id] = src;
      if (--left === 0) decoReady();
    }, ["webp", "gif"]);
  });

  function burst() {
    if (reduced || !pfpWrap.animate) return;
    var cur = item(theme);
    var cols = cur ? cur.cat.burst : NONE_BURST, n = 16;
    for (var i = 0; i < n; i++) {
      (function (i) {
        var el = make("i", "sx-burst"), size = 10 + Math.random() * 12;
        el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-spark"/></svg>';
        el.style.color = cols[i % cols.length];
        el.style.width = el.style.height = size + "px";
        pfpWrap.appendChild(el);
        var ang = (i / n) * Math.PI * 2 + Math.random() * 0.4, dist = pfpWrap.offsetWidth * (0.65 + Math.random() * 0.5);
        var to = "translate(calc(-50% + " + Math.cos(ang) * dist + "px), calc(-50% + " + Math.sin(ang) * dist + "px))";
        el.animate([
          { transform: "translate(-50%, -50%) scale(0.2) rotate(0deg)", opacity: 1 },
          { transform: to + " scale(1) rotate(90deg)", opacity: 1, offset: 0.6 },
          { transform: to + " scale(0) rotate(180deg)", opacity: 0 }
        ], { duration: 800 + Math.random() * 400, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" }).onfinish = function () { el.remove(); };
      })(i);
    }
    pfpWrap.animate([{ transform: "scale(1)" }, { transform: "scale(1.09)" }, { transform: "scale(1)" }], { duration: 380, easing: "ease-out" });
  }

  function openPicker() {
    picker.hidden = false;
    (pickerGrid.querySelector('[aria-checked="true"]') || pickerGrid.querySelector("button")).focus();
  }
  function closePicker(refocus) {
    picker.hidden = true;
    if (refocus) hit.focus();
  }
  picker.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-theme]");
    if (!b) return;
    applyTheme(b.dataset.theme);
    try { localStorage.setItem("sx-deco", theme); } catch (err) { /* storage blocked */ }
    closePicker(true);
    burst();
    var it = item(theme);
    think(it ? it.say : "Naked pfp. Bold.");
  });
  // Horizontal menu: the mouse wheel scrolls it sideways, and the left / right arrows move between decorations
  pickerGrid.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && pickerGrid.scrollWidth > pickerGrid.clientWidth) { pickerGrid.scrollLeft += e.deltaY; e.preventDefault(); }
  }, { passive: false });
  picker.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var all = Array.prototype.slice.call(pickerGrid.querySelectorAll("button")), i = all.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    all[(i + (e.key === "ArrowRight" ? 1 : all.length - 1)) % all.length].focus();
  });
  document.addEventListener("click", function (e) { if (!picker.hidden && !picker.contains(e.target) && e.target !== hit) closePicker(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !picker.hidden) closePicker(true); });

  var holdTimer, held = false, taps = [];
  hit.addEventListener("pointerdown", function (e) {
    if (e.button > 0) return;
    held = false;
    pfpWrap.classList.add("is-holding");
    holdTimer = setTimeout(function () { held = true; pfpWrap.classList.remove("is-holding"); openPicker(); }, 450);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
    hit.addEventListener(ev, function () { clearTimeout(holdTimer); pfpWrap.classList.remove("is-holding"); });
  });
  hit.addEventListener("click", function () {
    if (held) { held = false; return; }
    var nowT = Date.now();
    taps = taps.filter(function (t) { return nowT - t < 4000; });
    taps.push(nowT);
    if (taps.length >= 7) { taps = []; return secret(); }     // 7 quick clicks = the secret
    burst();
    think(CLICKS[Math.floor(Math.random() * CLICKS.length)]);
  });
  hit.addEventListener("contextmenu", function (e) { e.preventDefault(); clearTimeout(holdTimer); openPicker(); });
  hit.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key.toLowerCase() === "d") { e.preventDefault(); openPicker(); }
  });

  function rnd(a, b) { return a + Math.random() * (b - a); }

  /* ---------- Secret: 7 quick clicks on the pfp, or type "gfx" ---------- */
  function confetti() {
    if (reduced || !document.body.animate) return;
    var box = make("div", "sx-confetti"), cols = ["#ff8a3d", "#8a6bff", "#4aa3ff", "#3ddc84", "#ffd93b", "#ff4d6d", "#fff"];
    document.body.appendChild(box);
    for (var i = 0; i < 90; i++) {
      var el = make("i"), size = 6 + Math.floor(Math.random() * 3) * 2, drift = rnd(-90, 90);
      el.style.left = rnd(0, 100) + "%";
      el.style.width = el.style.height = size + "px";
      el.style.background = cols[i % cols.length];
      box.appendChild(el);
      el.animate([
        { transform: "translate(0, -20px) rotate(0deg)", opacity: 1 },
        { transform: "translate(" + drift + "px, " + (window.innerHeight * 0.85) + "px) rotate(" + Math.round(rnd(180, 720)) + "deg)", opacity: 1, offset: 0.8 },
        { transform: "translate(" + drift + "px, " + (window.innerHeight + 30) + "px) rotate(900deg)", opacity: 0 }
      ], { duration: rnd(1800, 3400), delay: rnd(0, 500), easing: "cubic-bezier(0.3, 0.1, 0.5, 1)", fill: "both" });
    }
    setTimeout(function () { box.remove(); }, 4300);
  }
  var secretBusy = false;
  function secret() {
    if (secretBusy) return;
    secretBusy = true;
    setTimeout(function () { secretBusy = false; }, 4000);
    confetti();
    burst();
    think(SECRET_REWARD ? "Secret found! " + SECRET_REWARD : "Secret found. You're officially a pixel detective.");
    say(SECRET_REWARD ? "Secret unlocked: " + SECRET_REWARD : "Secret unlocked!");
  }
  var typed = "";
  document.addEventListener("keydown", function (e) {
    var tag = (e.target && e.target.tagName) || "";
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-3);
    if (typed === "gfx") { typed = ""; secret(); }
  });

  /* ---------- Soft cursor light (same as the main site) ---------- */
  var light = $("#cursor-light");
  if (light && window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("pointermove", function (e) {
      light.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      light.classList.add("is-active");
    }, { passive: true });
    document.addEventListener("pointerleave", function () { light.classList.remove("is-active"); });
  }

  /* ---------- Copy link / Share (hover menu) / QR ---------- */
  var status = $("#sx-status");
  var timer;
  function say(text) {
    status.textContent = text;
    status.classList.add("is-on");
    clearTimeout(timer);
    timer = setTimeout(function () { status.classList.remove("is-on"); }, 2400);
  }
  function legacyCopy() {
    var t = make("textarea");
    t.value = PAGE_URL;
    t.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(t);
    t.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { /* ignore */ }
    t.remove();
    say(ok ? "Link copied" : "Couldn't copy. Link: " + PAGE_URL);
  }
  function copy() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PAGE_URL).then(function () { say("Link copied"); }, legacyCopy);
    } else legacyCopy();
  }
  $("#sx-copy").addEventListener("click", copy);

  // Share: the menu opens on hover (and on focus / tap). The native share sheet is
  // only used on touch devices, because on desktop it can freeze the browser.
  var wrap = $(".sx-share-wrap"), menu = $("#sx-menu"), shareBtn = $("#sx-share"), closeTimer;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  var u = encodeURIComponent(PAGE_URL), t = encodeURIComponent("Bcraft: GFX Wizard and UI/UX Designer");
  $("#sx-m-x").href = "https://x.com/intent/post?text=" + t + "&url=" + u;
  $("#sx-m-mail").href = "mailto:?subject=" + t + "&body=" + u;
  $("#sx-m-copy").addEventListener("click", function () { closeMenu(true); copy(); });
  function openMenu() {
    clearTimeout(closeTimer);
    menu.hidden = false;
    shareBtn.setAttribute("aria-expanded", "true");
    menu.classList.remove("is-up");                                   // open downwards, flip up if there's no room
    menu.style.transform = "";
    var r = menu.getBoundingClientRect();
    if (r.bottom > window.innerHeight - 8) menu.classList.add("is-up");
    var shift = r.right > window.innerWidth - 8 ? (window.innerWidth - 8) - r.right : (r.left < 8 ? 8 - r.left : 0);
    if (shift) menu.style.transform = "translateX(calc(-50% + " + shift + "px))";   // keep it on screen, centred as far as possible
  }
  function closeMenu(now) {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      menu.hidden = true;
      shareBtn.setAttribute("aria-expanded", "false");
    }, now ? 0 : 200);
  }
  wrap.addEventListener("mouseenter", function () { if (fine.matches) openMenu(); });
  wrap.addEventListener("mouseleave", function () { closeMenu(); });
  wrap.addEventListener("focusin", openMenu);
  wrap.addEventListener("focusout", function (e) { if (!wrap.contains(e.relatedTarget)) closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(true); });
  shareBtn.addEventListener("click", function () {
    if (!fine.matches && navigator.share) {
      navigator.share({ title: "Bcraft | Socials", url: PAGE_URL }).catch(function () {});
    } else if (menu.hidden) openMenu(); else if (!fine.matches) closeMenu(true);
  });

  var dialog = $("#sx-qr"), box = $("#sx-qr-box"), qrDone = false, qrSvg = "";
  /* Branded QR: rounded dots in your blue, finder corners in a darker blue, your hero profile picture in the middle (the code uses the highest error correction so it still scans) */
  function pfpData() {                                          // the hero picture as a small square PNG, embedded in the SVG so it also survives "Save QR"
    var im = $("#sx-pfp");
    if (!im || im.hidden || !im.complete || !im.naturalWidth) return "";
    try {
      var s = 256, cv = document.createElement("canvas"), g, w = im.naturalWidth, h = im.naturalHeight, m = Math.min(w, h);
      cv.width = cv.height = s;
      g = cv.getContext("2d");
      g.drawImage(im, (w - m) / 2, (h - m) / 2, m, m, 0, 0, s, s);      // centred square crop, like the round picture in the hero
      return cv.toDataURL("image/png");
    } catch (e) { return ""; }                                  // picture not readable (another domain without CORS): the "B" tile is used instead
  }
  function drawQr() {
    if (qrDone) return;
    try {
      var qr = window.qrcode(0, "H");
      qr.addData(PAGE_URL);
      qr.make();
      var n = qr.getModuleCount(), q = 2, size = n + q * 2, cx = size / 2, hole = Math.round(n * 0.22), dots = "", eyes = "";
      function inEye(r, c) { return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7); }
      for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
        if (!qr.isDark(r, c) || inEye(r, c)) continue;
        if (Math.abs(r + 0.5 - n / 2) < hole / 2 + 0.6 && Math.abs(c + 0.5 - n / 2) < hole / 2 + 0.6) continue;   // room for the logo
        dots += '<circle cx="' + (c + q + 0.5) + '" cy="' + (r + q + 0.5) + '" r="0.46"/>';
      }
      [[0, 0], [0, n - 7], [n - 7, 0]].forEach(function (p) {
        var x = p[1] + q, y = p[0] + q;
        eyes += '<rect x="' + (x + 0.5) + '" y="' + (y + 0.5) + '" width="6" height="6" rx="1.8" fill="none" stroke="#0d3f9f" stroke-width="1"/>' +
                '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3" rx="0.9" fill="#1c64dc"/>';
      });
      var lg = hole + 1.6, lx = cx - lg / 2, pfp = pfpData(), rr = lg / 2, logo;
      if (pfp) {                                                 // round picture, white margin, thin blue ring
        logo = '<circle cx="' + cx + '" cy="' + cx + '" r="' + (rr + 0.6) + '" fill="#fff"/>' +
          '<circle cx="' + cx + '" cy="' + cx + '" r="' + (rr + 0.4) + '" fill="none" stroke="url(#qrg)" stroke-width="0.4"/>' +
          '<clipPath id="qrc"><circle cx="' + cx + '" cy="' + cx + '" r="' + rr + '"/></clipPath>' +
          '<image href="' + pfp + '" xlink:href="' + pfp + '" x="' + lx + '" y="' + lx + '" width="' + lg + '" height="' + lg + '" clip-path="url(#qrc)" preserveAspectRatio="xMidYMid slice"/>';
      } else {                                                   // no picture available: the old "B" tile
        logo = '<rect x="' + lx + '" y="' + lx + '" width="' + lg + '" height="' + lg + '" rx="' + (lg * 0.28) + '" fill="url(#qrg)"/>' +
          '<text x="' + cx + '" y="' + (cx + lg * 0.2) + '" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="' + (lg * 0.62) + '" fill="#fff">B</text>';
      }
      qrSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="QR code for ' + PAGE_URL + '">' +
        '<defs><linearGradient id="qrg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b6fe0"/><stop offset="1" stop-color="#0d3f9f"/></linearGradient></defs>' +
        '<rect width="' + size + '" height="' + size + '" fill="#fff"/><g fill="url(#qrg)">' + dots + '</g>' + eyes +
        logo + '</svg>';
      box.innerHTML = qrSvg;
      qrDone = !!pfp;                                            // without the picture it is drawn again next time (it may have loaded by then)
    } catch (e) { box.innerHTML = "<p>Couldn't build the QR code.</p>"; }
  }
  $("#sx-qr-open").addEventListener("click", function () {
    $("#sx-qr-url").textContent = PAGE_URL.replace(/^https?:\/\//, "");
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "");
    if (window.qrcode) return drawQr();
    box.innerHTML = "<p>Loading…</p>";
    var s = document.createElement("script");
    s.src = QR_SCRIPT;
    s.onload = drawQr;
    s.onerror = function () { box.innerHTML = "<p>Couldn't load the QR code. Check your connection or an ad blocker.</p>"; };
    document.head.appendChild(s);
  });
  function closeQr() { if (dialog.close) dialog.close(); else dialog.removeAttribute("open"); }
  $("#sx-qr-close").addEventListener("click", closeQr);
  dialog.addEventListener("click", function (e) { if (e.target === dialog) closeQr(); });
  function saveBlob(blob, name) {
    var a = document.createElement("a"), u = URL.createObjectURL(blob);
    a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
  }
  $("#sx-qr-png").addEventListener("click", function () {      // the QR as a 1024px picture
    if (!qrSvg) return;
    var img = new Image();
    img.onload = function () {
      var cv = document.createElement("canvas"); cv.width = cv.height = 1024;
      var cx2 = cv.getContext("2d"); cx2.fillStyle = "#fff"; cx2.fillRect(0, 0, 1024, 1024); cx2.drawImage(img, 0, 0, 1024, 1024);
      cv.toBlob(function (b) { if (b) { saveBlob(b, "bcraft-qr.png"); say("QR saved"); } }, "image/png");
    };
    img.onerror = function () { say("Couldn't save the QR"); };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(qrSvg);
  });
  $("#sx-qr-vcf").addEventListener("click", function () {      // a contact card: name, role and all your links
    var lines = ["BEGIN:VCARD", "VERSION:3.0", "FN:Bcraft", "N:;Bcraft;;;", "NICKNAME:realbcraft", "TITLE:GFX Wizard & UI/UX Designer", "URL:" + PAGE_URL];
    document.querySelectorAll(".sx-icons a[href^='http']").forEach(function (a) { lines.push("URL:" + a.href); });
    lines.push("NOTE:GFX Wizard and UI/UX Designer for Roblox", "END:VCARD");
    saveBlob(new Blob([lines.join("\r\n")], { type: "text/vcard" }), "bcraft.vcf");
    say("Contact saved");
  });

  /* ---------- Most recent X posts (read from X_POSTS in news-data.js; nothing is loaded from X) ---------- */
  var xHost = $("#sx-x");
  var handle = typeof X_HANDLE === "string" && X_HANDLE ? X_HANDLE : X_HANDLE_FALLBACK;
  var siteName = typeof X_NAME === "string" && X_NAME ? X_NAME : "@" + handle;
  var VERIFIED = '<svg class="x-post-verified" viewBox="0 0 24 24" role="img" aria-label="Verified account" focusable="false"><path fill="currentColor" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/></svg>';

  function link(parent, href, text, cls) {
    var a = make("a", cls || "", text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    parent.appendChild(a);
    return a;
  }
  function linked(p, text) {
    String(text).split(/(https?:\/\/[^\s]+)/g).forEach(function (part) {
      if (/^https?:\/\//.test(part)) link(p, part, part.replace(/^https?:\/\//, "").replace(/\/$/, ""));
      else if (part) p.appendChild(document.createTextNode(part));
    });
  }

  function xCard(item) {
    var card = make("article", "x-post x-post--custom");
    var head = make("div", "x-post-head");
    var av = make("span", "mock-avatar mock-avatar--pfp", "B");
    av.setAttribute("aria-hidden", "true");
    var pic = document.createElement("img");
    pic.src = X_AVATAR;
    pic.alt = "";
    pic.loading = "lazy";
    pic.addEventListener("error", function () { pic.remove(); });
    av.appendChild(pic);
    head.appendChild(av);

    var who = make("span", "x-post-who");
    var row = make("span", "x-post-name");
    row.appendChild(make("span", "", item.name || siteName));
    if (item.verified !== false) row.insertAdjacentHTML("beforeend", VERIFIED);
    who.appendChild(row);
    who.appendChild(make("span", "x-post-meta", "@" + handle));
    head.appendChild(who);

    var xl = link(head, item.url, "", "x-post-xlink");
    xl.setAttribute("aria-label", "Open this post on X");
    xl.style.cssText = "margin-left:auto;display:inline-flex";
    xl.innerHTML = '<svg class="mock-x" style="margin-left:0" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#i-x"/></svg>';
    card.appendChild(head);

    (Array.isArray(item.text) ? item.text : [item.text]).forEach(function (line) {
      if (!line) return;
      var p = make("p", "x-post-text");
      linked(p, line);
      card.appendChild(p);
    });

    if (Array.isArray(item.tags) && item.tags.length) {
      var tags = make("p", "x-post-text x-post-tags");
      item.tags.forEach(function (t) {
        var c = String(t).replace(/^#/, "").replace(/[^A-Za-z0-9_]/g, "");
        if (c) link(tags, "https://x.com/hashtag/" + c + "?src=hashtag_click", "#" + c, "x-post-tag");
      });
      card.appendChild(tags);
    }

    if (item.image) {
      var media = link(card, item.url, "", "x-post-media");
      media.style.setProperty("--img", 'url("' + String(item.image).replace(/"/g, "%22") + '")');   // the same picture, blurred, fills the space around it
      var img = document.createElement("img");
      img.src = item.image;
      img.alt = item.imageAlt || "";
      img.width = 1280;
      img.height = 720;
      img.loading = "lazy";
      img.addEventListener("error", function () { media.remove(); });
      media.appendChild(img);
    }

    var actions = make("div", "x-post-actions");
    var d = typeof parseNewsDate === "function" ? parseNewsDate(item.date) : null;
    if (d) {
      var time = make("time", "x-post-date", d.label);
      time.dateTime = d.iso;
      actions.appendChild(time);
    }
    link(actions, item.url, "View original on X \u2197", "x-post-open");
    card.appendChild(actions);
    return card;
  }

  var posts = (typeof X_POSTS !== "undefined" && Array.isArray(X_POSTS) ? X_POSTS : []).filter(function (p) {
    return p && p.text && /^https:\/\/(x|twitter)\.com\/\w+\/status\/\d+/.test(String(p.url));
  });
  posts = posts.slice(0, 1);   // only the newest post (first in X_POSTS)
  if (posts.length) posts.forEach(function (p) { xHost.appendChild(xCard(p)); });
  else xHost.appendChild(make("p", "sx-note", "The newest posts and sneak peeks live on X."));
  /* ---------- Colour themes: accent colours only, remembered on this device (no animation, no heavy effects) ---------- */
  var THEMES = [["", "Ice"], ["mint", "Mint"], ["sunset", "Sunset"], ["violet", "Violet"]];
  var themeBtn = $("#sx-theme"), themeAt = 0;
  try { var savedTheme = localStorage.getItem("sx-theme") || ""; THEMES.forEach(function (th, i) { if (th[0] === savedTheme) themeAt = i; }); } catch (e) {}
  function applyAccent(i, announce) {
    themeAt = i;
    var th = THEMES[i];
    if (th[0]) document.documentElement.setAttribute("data-sx-theme", th[0]); else document.documentElement.removeAttribute("data-sx-theme");
    try { localStorage.setItem("sx-theme", th[0]); } catch (e) {}
    if (themeBtn) themeBtn.title = "Colour: " + th[1];
    if (announce) say("Colour: " + th[1]);
  }
  applyAccent(themeAt, false);

  if (themeBtn) themeBtn.addEventListener("click", function () { applyAccent((themeAt + 1) % THEMES.length, true); });

  /* ---------- "Hey from YouTube": ?from=youtube shows a small hello and a shortcut. Nothing is moved or reordered. ---------- */
  (function () {
    var greet = $("#sx-greet"), gText = $("#sx-greet-text"), gGo = $("#sx-greet-go"), gX = $("#sx-greet-x"), raw = "";
    try { raw = new URLSearchParams(location.search).get("from") || ""; } catch (e) {}
    raw = raw.toLowerCase().replace(/[^a-z0-9 _-]/g, "").trim().slice(0, 24);
    if (!greet || !raw) return;
    var MAP = { youtube: ["YouTube", "#h-yt"], yt: ["YouTube", "#h-yt"], roblox: ["Roblox", "#h-rbx"], x: ["X", "#h-x"], twitter: ["X", "#h-x"], discord: ["Discord", "#h-more"] };
    var hit = MAP[raw], name = hit ? hit[0] : raw.charAt(0).toUpperCase() + raw.slice(1), hideT;
    gText.textContent = "Hey " + name + " friend, welcome!";
    var target = hit && $(hit[1]), box = target && target.closest("section");
    if (box) { gGo.hidden = false; gGo.textContent = "Show me " + name; gGo.href = hit[1]; }
    function close() { greet.classList.remove("is-on"); clearTimeout(hideT); setTimeout(function () { greet.hidden = true; }, 350); }
    gX.addEventListener("click", close);
    gGo.addEventListener("click", function (e) {
      e.preventDefault();
      if (box) { box.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); box.classList.add("sx-spot"); setTimeout(function () { box.classList.remove("sx-spot"); }, 4800); }
      close();
    });
    setTimeout(function () {
      greet.hidden = false;
      requestAnimationFrame(function () { greet.classList.add("is-on"); });
      hideT = setTimeout(close, 9000);
    }, 700);
  })();

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