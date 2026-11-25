/* SYNQ Studio - canvas dots: hero field that reacts to the cursor, and product cells whose dots
   gather into a shape. Canvas 2D, DPR aware, ONE shared rAF loop that only runs while something
   visible is animating; paused on hidden tabs; fewer particles on small screens;
   touch = idle drift + tap ripple / shape on scroll; reduced motion = static. */
(function () {
  'use strict';
  var ORANGE = '#FF6B35';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hoverless = window.matchMedia && window.matchMedia('(hover: none)').matches;
  var $ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  /* ---------- shared loop ---------- */
  var tasks = [], raf = 0;
  function frame(t) {
    raf = 0;
    var again = false;
    for (var i = 0; i < tasks.length; i++) if (tasks[i].visible && tasks[i].tick(t)) again = true;
    if (again && !document.hidden) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && !document.hidden) raf = requestAnimationFrame(frame); }
  document.addEventListener('visibilitychange', kick);

  function track(el, task) {
    task.visible = false;
    tasks.push(task);
    if (!('IntersectionObserver' in window)) { task.visible = true; return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { task.visible = e.isIntersecting; if (task.onVisible) task.onVisible(e.isIntersecting, e); });
      kick();
    }, { rootMargin: '10% 0px' }).observe(el);
  }

  function fit(canvas) {
    var r = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: r.width, h: r.height };
  }

  /* ---------- HERO: field of dashes ---------- */
  function hero(canvas) {
    var host = canvas.parentElement, ctx, W, H, P = [], mx = -1e4, my = -1e4, sx = -1e4, sy = -1e4, ripples = [], lastMove = -1e9, cursorStr = 1;
    var small = window.innerWidth < 700;

    function build() {
      var f = fit(canvas); ctx = f.ctx; W = f.w; H = f.h; P = [];
      var cap = small ? 240 : 880, sp = small ? 40 : 34;
      while ((W / sp) * (H / sp) > cap) sp += 2;
      var cx = W * 0.5, cy = H * 0.46;
      for (var y = sp / 2; y < H; y += sp) for (var x = sp / 2; x < W; x += sp) {
        var hx = x + (Math.random() - .5) * sp * .7, hy = y + (Math.random() - .5) * sp * .7;
        P.push({ hx: hx, hy: hy, x: hx, y: hy, vx: 0, vy: 0, a0: Math.atan2(hy - cy, hx - cx), ph: Math.random() * 6.283, a: 0, k: 0 });
      }
      if (reduce) drawStatic();
    }
    function stroke(list, color, alpha, lw) {
      if (!list.length) return;
      ctx.beginPath();
      for (var i = 0; i < list.length; i += 4) { ctx.moveTo(list[i], list[i + 1]); ctx.lineTo(list[i + 2], list[i + 3]); }
      ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.stroke();
    }
    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      var g = [];
      P.forEach(function (p) { g.push(p.hx - Math.cos(p.a0) * 3, p.hy - Math.sin(p.a0) * 3, p.hx + Math.cos(p.a0) * 3, p.hy + Math.sin(p.a0) * 3); });
      stroke(g, '#0e0e10', .28, 1.6);
      canvas.classList.add('on');
    }

    var task = {
      tick: function (t) {
        if (reduce) return false;
        var R = small ? 110 : 170, R2 = R * R;
        var time = t * 0.001, real = mx > -1e3 && (t - lastMove) < 3500, tx0, ty0;
        if (real) { tx0 = mx; ty0 = my; } else {                  // nobody around: a slow ghost cursor keeps the field breathing
          tx0 = W * (.5 + .36 * Math.sin(time * .23)); ty0 = H * (.46 + .28 * Math.sin(time * .31 + 1.2));
        }
        if (sx < -1e3) { sx = tx0; sy = ty0; }
        sx += (tx0 - sx) * (real ? .16 : .05); sy += (ty0 - sy) * (real ? .16 : .05);
        cursorStr += ((real ? 1 : .55) - cursorStr) * .05;
        ctx.clearRect(0, 0, W, H);
        var gray = [], org = [];
        for (var r = ripples.length - 1; r >= 0; r--) { ripples[r].r = (t - ripples[r].t0) * 0.55; if (ripples[r].r > Math.max(W, H)) ripples.splice(r, 1); }
        for (var i = 0; i < P.length; i++) {
          var p = P[i];
          // idle drift (keeps the field alive, also on touch)
          var wave = Math.sin(time * .9 - Math.hypot(p.hx - W * .5, p.hy - H * .46) * .012), tx = p.hx + Math.sin(time * .7 + p.ph) * 6 + wave * 4, ty = p.hy + Math.cos(time * .6 + p.ph * 1.3) * 6 + wave * 4;
          var dx = p.x - sx, dy = p.y - sy, d2 = dx * dx + dy * dy, near = 0;
          if (d2 < R2) {
            var d = Math.sqrt(d2) || 1; near = 1 - d / R;
            var f = near * near * 5.2 * cursorStr;
            p.vx += dx / d * f; p.vy += dy / d * f;
          }
          for (var k = 0; k < ripples.length; k++) {   // tap ripple: a ring that shoves dots outward
            var rp = ripples[k], rx = p.x - rp.x, ry = p.y - rp.y, rd = Math.sqrt(rx * rx + ry * ry) || 1, band = Math.abs(rd - rp.r);
            if (band < 46) { var rf = (1 - band / 46) * 2.4 * (1 - rp.r / Math.max(W, H)); p.vx += rx / rd * rf; p.vy += ry / rd * rf; near = Math.max(near, 1 - band / 46); }
          }
          p.vx += (tx - p.x) * .05; p.vy += (ty - p.y) * .05;
          p.vx *= .84; p.vy *= .84; p.x += p.vx; p.y += p.vy;
          // dash: points radially at rest, bends tangential near the cursor
          var tang = Math.atan2(p.y - sy, p.x - sx) + 1.5708;
          var base = p.a0 + Math.sin(time * .5 + p.ph) * .3 + wave * .22;
          var a = near > 0 ? base + (tang - base) * Math.min(1, near * 1.6) : base;
          var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          var len = 3.4 + wave * 1.1 + near * 5 + Math.min(sp, 6) * .8, c = Math.cos(a) * len, s = Math.sin(a) * len;
          var arr = near > .22 ? org : gray;
          arr.push(p.x - c, p.y - s, p.x + c, p.y + s);
        }
        stroke(gray, '#0e0e10', .3, 1.6);
        stroke(org, ORANGE, .95, 2.2);
        return true;
      },
      onVisible: function () { /* loop restarts via kick() */ }
    };

    build();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { small = window.innerWidth < 700; build(); }, 150); });
    if (!reduce) {
      var rectOf = function (e) { var r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
      window.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var q = rectOf(e); mx = q.x; my = q.y; lastMove = performance.now();
      }, { passive: true });
      document.addEventListener('pointerleave', function () { mx = my = sx = sy = -1e4; });
      host.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'touch' && !hoverless) return;
        var q = rectOf(e); ripples.push({ x: q.x, y: q.y, t0: performance.now(), r: 0 }); kick();
      }, { passive: true });
      track(host, task);
      canvas.classList.add('on');
    }
  }

  /* ---------- CELLS: dots that gather into a shape ---------- */
  function shapePath(name, ctx, S) {
    var u = S / 100;
    ctx.save(); ctx.scale(u, u); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = ctx.fillStyle = '#000';
    if (name === 'pad') {                       // game controller
      ctx.lineWidth = 5; ctx.beginPath();
      ctx.moveTo(24, 36); ctx.bezierCurveTo(24, 31, 29, 29, 35, 29); ctx.lineTo(65, 29); ctx.bezierCurveTo(71, 29, 76, 31, 76, 36);
      ctx.bezierCurveTo(82, 48, 90, 66, 84, 74); ctx.bezierCurveTo(78, 82, 69, 74, 63, 66); ctx.lineTo(37, 66);
      ctx.bezierCurveTo(31, 74, 22, 82, 16, 74); ctx.bezierCurveTo(10, 66, 18, 48, 24, 36); ctx.closePath(); ctx.stroke();
      ctx.lineWidth = 4.5; ctx.beginPath(); ctx.moveTo(36, 41); ctx.lineTo(36, 55); ctx.moveTo(29, 48); ctx.lineTo(43, 48); ctx.stroke();
      ctx.beginPath(); ctx.arc(63, 44, 3.6, 0, 7); ctx.arc(70, 52, 3.6, 0, 7); ctx.fill();
    } else if (name === 'note') {               // music note
      ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(36, 74, 12, 9, -0.35, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(47, 70); ctx.lineTo(47, 18); ctx.bezierCurveTo(52, 30, 72, 32, 72, 52); ctx.stroke();
    } else if (name === 'tag') {                // price tag
      ctx.lineWidth = 5.5; ctx.beginPath();
      ctx.moveTo(18, 30); ctx.lineTo(18, 20); ctx.lineTo(48, 20); ctx.lineTo(86, 58); ctx.lineTo(60, 84); ctx.lineTo(18, 42); ctx.lineTo(18, 30);
      ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(34, 36, 5, 0, 7); ctx.stroke();
    } else {                                    // magnifier
      ctx.lineWidth = 6.5; ctx.beginPath(); ctx.arc(42, 42, 26, 0, 7); ctx.stroke();
      ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(62, 62); ctx.lineTo(86, 86); ctx.stroke();
    }
    ctx.restore();
  }

  function sampleShape(name, S) {
    var c = document.createElement('canvas'); c.width = c.height = S;
    var x = c.getContext('2d', { willReadFrequently: true }); shapePath(name, x, S);
    var d = x.getImageData(0, 0, S, S).data, pts = [], st = Math.max(2, Math.round(S / 110));
    for (var y = 0; y < S; y += st) for (var xx = 0; xx < S; xx += st) if (d[(y * S + xx) * 4 + 3] > 128) pts.push([xx / S, y / S]);
    return pts;
  }

  function cell(el) {
    var canvas = el.querySelector('.cell-fx'), name = el.getAttribute('data-shape');
    var ctx, W, H, D = [], p = 0, goal = 0, dirty = true, inView = false;

    function build() {
      var f = fit(canvas); ctx = f.ctx; W = f.w; H = f.h; D = [];
      var sp = W < 500 ? 15 : 16, rc = el.getBoundingClientRect(), ox = (sp - ((rc.left + window.scrollX) % sp)) % sp, oy = (sp - ((rc.top + window.scrollY) % sp)) % sp;
      for (var y = oy; y < H; y += sp) for (var x = ox; x < W; x += sp)
        D.push({ rx: x + (Math.random() - .5) * 3, ry: y + (Math.random() - .5) * 3, tx: 0, ty: 0, s: 0, dl: 0, cv: 0 });
      // shape box: upper part of the cell, text sits below
      var S = Math.min(W * .66, H * .46, 380), cx = W / 2, cy = Math.min(H * .32, H - 270);
      var tp = sampleShape(name, 260), K = Math.min(tp.length, Math.round(S * 2.1), Math.floor(D.length * .55));
      tp.sort(function () { return Math.random() - .5; }); tp = tp.slice(0, K);
      tp.forEach(function (q) { q[0] = cx - S / 2 + q[0] * S; q[1] = cy - S / 2 + q[1] * S; });
      var near = D.slice().sort(function (a, b) { return Math.hypot(a.rx - cx, a.ry - cy) - Math.hypot(b.rx - cx, b.ry - cy); }).slice(0, K);
      var ang = function (x, y) { return Math.atan2(y - cy, x - cx); };
      near.sort(function (a, b) { return ang(a.rx, a.ry) - ang(b.rx, b.ry); });
      tp.sort(function (a, b) { return ang(a[0], a[1]) - ang(b[0], b[1]); });
      near.forEach(function (d, i) { d.s = 1; d.tx = tp[i][0]; d.ty = tp[i][1]; d.dl = Math.random() * .35; d.cv = (Math.random() - .5) * 60; });
      dirty = true;
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var i, d, e, x, y;
      ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(14,14,16,.26)';
      ctx.beginPath();
      for (i = 0; i < D.length; i++) { d = D[i]; if (!d.s) ctx.rect(d.rx - .9, d.ry - .9, 1.8, 1.8); }
      ctx.fill();
      ctx.beginPath();
      var sh = [], ac = [];
      for (i = 0; i < D.length; i++) {
        d = D[i]; if (!d.s) continue;
        e = clamp((p - d.dl) / (1 - d.dl), 0, 1); e = e * e * (3 - 2 * e);
        x = d.rx + (d.tx - d.rx) * e; y = d.ry + (d.ty - d.ry) * e;
        var dx = d.tx - d.rx, dy = d.ty - d.ry, L = Math.sqrt(dx * dx + dy * dy) || 1, off = Math.sin(e * 3.1416) * d.cv;
        x += -dy / L * off; y += dx / L * off;
        (e > .04 ? ac : sh).push(x, y, e);
      }
      ctx.fillStyle = 'rgba(14,14,16,.26)';
      for (i = 0; i < sh.length; i += 3) ctx.rect(sh[i] - .9, sh[i + 1] - .9, 1.8, 1.8);
      ctx.fill();
      ctx.fillStyle = ORANGE; ctx.globalAlpha = 1; ctx.beginPath();
      for (i = 0; i < ac.length; i += 3) { var r = 1 + ac[i + 2] * .55; ctx.moveTo(ac[i] + r, ac[i + 1]); ctx.arc(ac[i], ac[i + 1], r, 0, 6.2832); }
      ctx.fill();
    }
    var task = {
      tick: function () {
        if (dirty) { draw(); dirty = false; }
        if (p === goal) return false;
        p += (goal - p) * .075; if (Math.abs(goal - p) < .003) p = goal;
        dirty = true; return true;
      }
    };
    function set(g) { goal = g; if (reduce) { p = g; dirty = true; draw(); dirty = false; } else kick(); }
    build();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { build(); if (reduce) { p = goal; draw(); dirty = false; } }, 200); });

    if (reduce) { p = 1; goal = 1; draw(); dirty = false; return; }       // static, shape shown
    track(el, task);
    if (hoverless) {                                                       // touch: shape forms when the cell is in view
      new IntersectionObserver(function (es) { es.forEach(function (e) { set(e.intersectionRatio > .55 ? 1 : 0); }); }, { threshold: [0, .3, .55, .8] }).observe(el);
    } else {
      el.addEventListener('pointerenter', function () { set(1); });
      el.addEventListener('pointerleave', function () { set(0); });
      el.addEventListener('focusin', function () { set(1); });
      el.addEventListener('focusout', function () { set(0); });
    }
  }

  function boot() {
    var h = document.querySelector('.hero-fx'); if (h) hero(h);
    $('.cell[data-shape]').forEach(cell);
  }
  var start = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 60); })(boot, { timeout: 800 }); };
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
