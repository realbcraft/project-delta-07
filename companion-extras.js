/* ==========================================================
   companion-extras.js : the heavier toys. companion.js downloads this file
   only the first time one of them is used.

     confetti()  burst from the picture (season colours)
     game()      "Catch the pixel" (10 seconds, best score saved on this device)
     quiz()      "What should I order?" (questions and results live in companion-data.js)
     sparkle()   a little sparkle that follows the mouse for a few seconds
   ========================================================== */
(function () {
  "use strict";
  var P = window.SXPal;
  if (!P || typeof P.register !== "function") return;

  P.register(function (api) {
    var make = api.make;

    /* ---------- Styles (only added once this file is loaded) ---------- */
    var st = document.createElement("style");
    st.id = "sx-pal-extras-css";
    st.textContent = [
      ".sx-pal-confetti{position:fixed;inset:0;z-index:81;overflow:hidden;pointer-events:none}",
      ".sx-pal-bit{position:absolute;display:block;border-radius:2px;will-change:transform,opacity}",
      ".sx-pal-note{margin:0 0.55rem 0.2rem;color:rgba(255,255,255,0.75);font:600 0.8rem/1.35 var(--font-main,system-ui,sans-serif)}",
      ".sx-pal-game{position:fixed;inset:0;z-index:82;pointer-events:none}",
      ".sx-pal-hud{position:absolute;top:0.8rem;left:50%;transform:translateX(-50%);padding:0.35rem 0.95rem;border:1px solid rgba(var(--rgb-blue,74,163,255),0.55);border-radius:999px;background:rgb(15,24,51);color:#fff;font:700 0.85rem var(--font-display,system-ui,sans-serif);white-space:nowrap}",
      ".sx-pal-px{position:absolute;width:34px;height:34px;padding:0;border:0;border-radius:7px;background:var(--color-accent-bright,#86c5ff);box-shadow:0 0 18px rgba(var(--rgb-blue,74,163,255),0.9);pointer-events:auto;cursor:crosshair;touch-action:manipulation}",
      ".sx-pal-px:focus-visible{outline:3px solid #fff;outline-offset:3px}",
      ".sx-pal-spark{position:fixed;left:0;top:0;z-index:83;font-size:1.1rem;line-height:1;pointer-events:none;transition:opacity .3s ease;will-change:transform}"
    ].join("\n");
    document.head.appendChild(st);

    // The season colour (if any) carries over to things that live outside the companion
    function inheritSeason(el) {
      var v = api.pal.style.getPropertyValue("--rgb-blue"), b = api.pal.style.getPropertyValue("--color-accent-bright");
      if (v) el.style.setProperty("--rgb-blue", v);
      if (b) el.style.setProperty("--color-accent-bright", b);
    }

    /* ---------- Confetti ---------- */
    var confettiLayer = null;
    function confetti() {
      var btn = api.btn;
      if (!btn.animate) return;
      if (!confettiLayer) { confettiLayer = make("div", "sx-pal-confetti"); confettiLayer.setAttribute("aria-hidden", "true"); document.body.appendChild(confettiLayer); }
      if (confettiLayer.childElementCount > 60) return;
      var colors = api.confettiColors();
      var r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      for (var i = 0; i < 28; i++) {
        var bit = make("span", "sx-pal-bit");
        var w = 5 + Math.random() * 5;
        bit.style.cssText = "left:" + x + "px;top:" + y + "px;width:" + w + "px;height:" + (w * (1 + Math.random())) + "px;background:" + colors[i % colors.length];
        confettiLayer.appendChild(bit);
        var angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;       // mostly upwards
        var dist = 90 + Math.random() * 150;
        var dx = Math.cos(angle) * dist, dy = Math.sin(angle) * dist;
        var spin = (Math.random() - 0.5) * 720;
        var a = bit.animate([
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px) rotate(" + (spin * 0.5).toFixed(0) + "deg)", opacity: 1, offset: 0.45 },
          { transform: "translate(" + (dx * 1.25).toFixed(1) + "px," + (dy + 190).toFixed(1) + "px) rotate(" + spin.toFixed(0) + "deg)", opacity: 0 }
        ], { duration: 1100 + Math.random() * 700, easing: "cubic-bezier(0.2,0.7,0.4,1)", fill: "forwards" });
        a.onfinish = (function (n) { return function () { n.remove(); }; })(bit);
      }
    }

    /* ---------- Catch the pixel ---------- */
    var running = false;
    function game() {
      if (running) return;
      running = true;
      var DUR = 10000, score = 0, endAt = Date.now() + DUR, moveT = null, hudT = null;
      var best = parseInt(api.store.get(api.keys.best) || "0", 10) || 0;
      var layer = make("div", "sx-pal-game");
      var hud = make("div", "sx-pal-hud");
      hud.setAttribute("aria-hidden", "true");
      var px = make("button", "sx-pal-px");
      px.type = "button";
      px.setAttribute("aria-label", "Catch the pixel");
      layer.appendChild(hud);
      layer.appendChild(px);
      inheritSeason(layer);
      document.body.appendChild(layer);

      function paint() {
        hud.textContent = "Score " + score + "  \u00B7  " + Math.max(0, Math.ceil((endAt - Date.now()) / 1000)) + "s";
      }
      function place() {
        var w = window.innerWidth || 1000, h = window.innerHeight || 700, s = 34, m = 12, x, y, tries = 0;
        do {
          x = m + Math.random() * Math.max(1, w - s - 2 * m);
          y = 60 + Math.random() * Math.max(1, h - s - 60 - m);
          tries++;
        } while (tries < 10 && x < 340 && y > h - 130);        // keep clear of the companion's corner
        px.style.left = x.toFixed(0) + "px";
        px.style.top = y.toFixed(0) + "px";
      }
      function schedule() {
        clearTimeout(moveT);
        moveT = setTimeout(function () { place(); schedule(); }, Math.max(380, 800 - score * 28));
      }
      function hit(e) {
        if (e) { e.stopPropagation(); }
        score++;
        paint();
        place();
        schedule();
      }
      function finish(cancelled) {
        clearTimeout(moveT);
        clearInterval(hudT);
        document.removeEventListener("keydown", onKey, true);
        layer.remove();
        running = false;
        var msg;
        if (cancelled) { msg = "Game cancelled. The pixel got away."; }
        else if (score > best) {
          api.store.set(api.keys.best, String(score));
          msg = "New best: " + score + "! Pixel hunter, is that you?";
          api.hop();
          api.mood("\u2728", 2500);
        } else if (score === 0) msg = "Zero? The pixel won this round.";
        else msg = "You caught " + score + ". Your best is " + best + ".";
        api.say(msg, { ttl: 8000 });
      }
      function onKey(e) { if (e.key === "Escape") { e.stopPropagation(); finish(true); } }

      px.addEventListener("pointerdown", function (e) { e.preventDefault(); hit(e); });
      px.addEventListener("click", function (e) { if (e.detail === 0) hit(e); else e.stopPropagation(); });   // keyboard: Enter / Space
      document.addEventListener("keydown", onKey, true);
      place();
      paint();
      schedule();
      hudT = setInterval(function () {
        paint();
        if (Date.now() >= endAt) finish(false);
      }, 200);
      api.mood("\uD83C\uDFAE", DUR);
      api.say("Catch the pixel! You have 10 seconds. Esc stops the game.", { ttl: 6000 });
      if (api.kb) px.focus();
    }

    /* ---------- Quiz: "What should I order?" ----------
       It uses the very same look as the hover menu (title, round icons, pill buttons). */
    var panel = null, panelOff = null;
    function closePanel(refocus) {
      if (!panel) return;
      if (panelOff) panelOff();
      panel.remove();
      panel = null;
      panelOff = null;
      api.busy(false);
      if (refocus) api.btn.focus();
    }
    api.onClosePanel(closePanel);
    function openPanel(title, note, entries, kb) {
      closePanel(false);
      api.hideBubble();
      var box = make("div", "sx-pal-menu"), btns = [];
      box.setAttribute("role", "group");
      box.setAttribute("aria-label", title);
      box.appendChild(make("p", "sx-pal-menu-t", title));
      if (note) box.appendChild(make("p", "sx-pal-note", note));
      var list = make("div", "sx-pal-list");
      box.appendChild(list);
      entries.forEach(function (en, n) {
        var el = en.href ? make("a", "") : make("button", "");
        if (en.href) el.href = en.href; else el.type = "button";
        var ico = make("span", "sx-pal-ico", en.icon || "\u2022");
        ico.setAttribute("aria-hidden", "true");
        el.appendChild(ico);
        el.appendChild(make("span", "sx-pal-lbl", en.label));
        el.style.setProperty("--n", String(n));
        el.addEventListener("click", function (e) {
          e.stopPropagation();
          if (en.fn) en.fn(); else closePanel(false);          // a link just opens
        });
        list.appendChild(el);
        btns.push(el);
      });
      box.addEventListener("keydown", function (e) {
        var i = btns.indexOf(document.activeElement);
        if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closePanel(true); }
        else if (e.key === "ArrowDown") { e.preventDefault(); btns[(i + 1) % btns.length].focus(); }
        else if (e.key === "ArrowUp") { e.preventDefault(); btns[(i - 1 + btns.length) % btns.length].focus(); }
        else if (e.key === "Home") { e.preventDefault(); btns[0].focus(); }
        else if (e.key === "End") { e.preventDefault(); btns[btns.length - 1].focus(); }
      });
      function outside(e) { if (!api.pal.contains(e.target)) closePanel(false); }
      document.addEventListener("click", outside);
      panelOff = function () { document.removeEventListener("click", outside); };
      api.pal.appendChild(box);
      if (!api.reduced) { box.classList.remove("is-pop"); void box.offsetWidth; box.classList.add("is-pop"); }
      api.announce(title + (note ? ". " + note : ""));
      panel = box;
      api.busy(true);
      if (kb) btns[0].focus();
    }
    function quiz() {
      var Q = api.data.QUIZ;
      if (!Q || !Q.questions || !Q.questions.length) { api.say("The quiz isn't ready yet. Check back soon!", {}); return; }
      var scores = {}, qi = 0, kb = api.kb;
      function ask() {
        var q = Q.questions[qi];
        openPanel(q.q + " (" + (qi + 1) + "/" + Q.questions.length + ")", "", q.options.map(function (op) {
          return {
            label: op.label,
            icon: op.icon,
            fn: function () {
              var k;
              for (k in op.pts) if (op.pts.hasOwnProperty(k)) scores[k] = (scores[k] || 0) + op.pts[k];
              qi++;
              if (qi < Q.questions.length) ask(); else done();
            }
          };
        }), kb);
      }
      function done() {
        var best = null, bestScore = -1, k;
        for (k in Q.results) if (Q.results.hasOwnProperty(k) && (scores[k] || 0) > bestScore) { best = k; bestScore = scores[k] || 0; }
        var r = Q.results[best] || { title: "Something custom!", text: "Just ask me." };
        openPanel(r.title, r.text, [
          { label: Q.linkLabel || "See the catalogue", icon: "\uD83D\uDED2", href: api.page === "pricing" ? "#catalogue" : (Q.link || "/pricing#catalogue") },
          { label: "Retake", icon: "\uD83D\uDD01", fn: function () { qi = 0; scores = {}; ask(); } }
        ], kb);
      }
      ask();
    }

    /* ---------- Cursor pal ---------- */
    var sparkling = null;
    function sparkle() {
      var DUR = 7000;
      if (sparkling) { sparkling.until = performance.now() + DUR; return; }     // already following: keep going a bit longer
      var el = make("span", "sx-pal-spark", "\u2728");
      el.setAttribute("aria-hidden", "true");
      document.body.appendChild(el);
      var r = api.btn.getBoundingClientRect();
      var s = sparkling = { until: performance.now() + DUR }, x = r.left + r.width / 2, y = r.top + r.height / 2, tx = x, ty = y;
      function move(e) { tx = e.clientX + 14; ty = e.clientY + 14; }
      window.addEventListener("pointermove", move, { passive: true });
      function frame(t) {
        x += (tx - x) * 0.14;
        y += (ty - y) * 0.14;
        el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + ((t / 6) % 360).toFixed(0) + "deg)";
        if (t < s.until) requestAnimationFrame(frame);
        else {
          window.removeEventListener("pointermove", move);
          el.style.opacity = "0";
          setTimeout(function () { el.remove(); sparkling = null; }, 320);
        }
      }
      requestAnimationFrame(frame);
      api.say("I'll tag along for a bit.", { ttl: 3000 });
    }

    return { confetti: confetti, game: game, quiz: quiz, sparkle: sparkle };
  });
})();