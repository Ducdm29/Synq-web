/* SYNQ Studio - canvas dots.
   1) hero: a field of dashes that bends away from the cursor (a slow ghost cursor when nobody is around);
   2) products: ONE continuous dot field behind the four product links; hovering a product gathers
      its dots into a shape (orange), leaving releases them.
   Performance: one shared rAF loop that only runs while a canvas is on screen, typed arrays (no per-frame
   allocation), batched paths per colour, DPR capped (and the backing store capped by area), particle count
   scaled to viewport / CPU cores / memory, adaptive quality (halve, then 30 fps) when frames get slow,
   paused on hidden tabs, passive rAF-coalesced pointer handling, rects cached (no layout reads in the loop).
   Reduced motion: static dots, shapes shown formed. */
(function () {
  'use strict';
  var TAU = 6.2831853, ORANGE = '#FF6B35', INK = '14,14,16';
  var mq = function (q) { return window.matchMedia && window.matchMedia(q).matches; };
  var reduce = mq('(prefers-reduced-motion: reduce)'), hoverless = mq('(hover: none)');
  var small = Math.min(window.innerWidth, window.innerHeight * 1.2) < 700;
  var cores = navigator.hardwareConcurrency || 4, mem = navigator.deviceMemory || 4;
  var Q = Math.max(.45, Math.min(1, cores / 8, mem / 4)) * (small ? .7 : 1);   // particle budget factor
  var DPR_CAP = small ? 1.5 : 2;
  var $ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var LUT = new Float32Array(1024); for (var li = 0; li < 1024; li++) LUT[li] = Math.sin(li / 1024 * TAU);
  var sinL = function (a) { return LUT[((a * 162.9747) | 0) & 1023]; };

  /* ---------- shared loop + adaptive quality ---------- */
  var tasks = [], raf = 0, last = 0, level = 0, ema = 16.7, nf = 0, cool = 0, flip = false;
  var stats = /[?&]perf\b/.test(location.search) ? (window.__dots = { work: [], dt: [], level: 0, tasks: tasks }) : null;
  function frame(t) {
    raf = 0;
    var any = false, i;
    if (level >= 2) { flip = !flip; if (flip) { for (i = 0; i < tasks.length; i++) if (tasks[i].visible) any = true; if (any && !document.hidden) raf = requestAnimationFrame(frame); return; } }
    var w0 = performance.now();
    for (i = 0; i < tasks.length; i++) if (tasks[i].visible && tasks[i].tick(t, level)) any = true;
    var work = performance.now() - w0;
    if (last) {
      var dt = t - last;
      if (dt < 120) {
        ema += (dt - ema) * .07; nf++;
        if (stats) { stats.work.push(work); stats.dt.push(dt); stats.level = level; }
        if (cool > 0) cool--; else if (nf > 50 && ema > 21 && level < 2) { level++; cool = 90; ema = 16.7; }
      }
    }
    last = any ? t : 0;
    if (any && !document.hidden) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && !document.hidden) raf = requestAnimationFrame(frame); }
  document.addEventListener('visibilitychange', function () { last = 0; kick(); });

  function track(el, task) {
    task.visible = false; tasks.push(task);
    if (!('IntersectionObserver' in window)) { task.visible = true; return; }
    new IntersectionObserver(function (es) { es.forEach(function (e) { task.visible = e.isIntersecting; }); kick(); }, { rootMargin: '0px' }).observe(el);
  }
  function setupCanvas(canvas, w, h) {
    var dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, DPR_CAP, Math.sqrt(5e6 / Math.max(1, w * h))));
    canvas.width = Math.max(1, Math.round(w * dpr)); canvas.height = Math.max(1, Math.round(h * dpr));
    var ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); return ctx;
  }
  function onResize(el, fn) {
    var t, go = function () { clearTimeout(t); t = setTimeout(fn, 160); };
    if ('ResizeObserver' in window) { var first = true; new ResizeObserver(function () { if (first) { first = false; return; } go(); }).observe(el); }
    else window.addEventListener('resize', go);
  }

  /* ---------- HERO: round dots, mostly black with orange sprinkled in ---------- */
  var HB = 8, HCOLS = [], HSIZE = [1.9, 2.8], HAL = [.34, .52, .72];
  for (var hb = 0; hb < HB; hb++) HCOLS.push(hb < 6 ? 'rgba(' + INK + ',' + HAL[hb >> 1] + ')' : 'rgba(255,107,53,.92)');
  function hero(canvas) {
    var host = canvas.parentElement, ctx, W = 0, H = 0, N = 0, docTop = 0, hbs = new Int32Array(HB + 1);
    var hx, hy, X, Y, VX, VY, PH, AMP, SPD, NR, RX0, RY0, TXs, TYs, DLs, OWNF, OWNED = new Int32Array(0), shapeName = canvas.getAttribute('data-shape'), shapeP = 0, shapeT0 = 0;
    var px = -1e4, py = -1e4, lastMove = -1e9, sx = -1e4, sy = -1e4, str = 1, ripples = [];

    function build() {
      small = Math.min(window.innerWidth, window.innerHeight * 1.2) < 700;
      var r = canvas.getBoundingClientRect(); W = r.width; H = r.height; docTop = r.top + window.scrollY;
      ctx = setupCanvas(canvas, W, H);
      var cap = Math.round((small ? 700 : 2400) * Q), sp = Math.max(small ? 20 : 19, Math.sqrt(W * H / cap));
      var cols = Math.ceil(W / sp), rows = Math.ceil(H / sp), tmp = [], i, j;
      for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
        var x = (i + .5) * sp + (Math.random() - .5) * sp * .7, y = (j + .5) * sp + (Math.random() - .5) * sp * .7;
        // soft fade at every edge
        var f = Math.min(clamp(y / (H * .1), 0, 1), clamp((H - y) / (H * .3), 0, 1), clamp(x / (W * .06), 0, 1), clamp((W - x) / (W * .06), 0, 1));
        f = f * f * (3 - 2 * f);
        if (Math.random() > Math.min(1, f * 1.6)) continue;
        var size = Math.random() < .4 ? 1 : 0, bk;
        if (f > .5 && Math.random() < .16) bk = 6 + size;                      // orange sprinkle (about 1 in 8)
        else { var rr = Math.random(), lvl = rr < .3 ? 0 : rr < .72 ? 1 : 2; lvl = Math.max(0, lvl - Math.floor((1 - f) * 2.6)); bk = (lvl << 1) | size; }
        tmp.push([bk, x, y]);
      }
      tmp.sort(function (a, b) { return a[0] - b[0]; });
      N = tmp.length; hbs.fill(0);
      hx = new Float32Array(N); hy = new Float32Array(N); X = new Float32Array(N); Y = new Float32Array(N); VX = new Float32Array(N); VY = new Float32Array(N);
      PH = new Float32Array(N); AMP = new Float32Array(N); SPD = new Float32Array(N); NR = new Float32Array(N);
      for (i = 0; i < N; i++) { hx[i] = X[i] = tmp[i][1]; hy[i] = Y[i] = tmp[i][2]; PH[i] = Math.random() * TAU; AMP[i] = .4 + Math.random() * 1.1; SPD[i] = .4 + Math.random() * .9; hbs[tmp[i][0] + 1]++; }
      for (i = 0; i < HB; i++) hbs[i + 1] += hbs[i];
      OWNF = new Uint8Array(N); OWNED = new Int32Array(0);
      if (shapeName) {                                                   // a shape forms out of the field (Kagezan page)
        RX0 = Float32Array.from(hx); RY0 = Float32Array.from(hy); TXs = new Float32Array(N); TYs = new Float32Array(N); DLs = new Float32Array(N);
        var wide = W >= 700, cx = wide ? W * .74 : W * .5, cy = wide ? H * .4 : H * .8, S = wide ? Math.min(W * .3, H * .55) : Math.min(W * .6, H * .26);
        var pts = sampleShape(shapeName), K = Math.min(pts.length / 2, Math.round(S * (wide ? 1.6 : 2.4)), Math.floor(N * .3)), order = [];
        for (i = 0; i < pts.length / 2; i++) order.push(i);
        order.sort(function () { return Math.random() - .5; }); order = order.slice(0, K);
        var tg = order.map(function (q) { return [cx + pts[q * 2] * S, cy + pts[q * 2 + 1] * S]; }), cand = [];
        for (i = 0; i < N; i++) cand.push(i);
        cand.sort(function (a, b) { return Math.hypot(hx[a] - cx, hy[a] - cy) - Math.hypot(hx[b] - cx, hy[b] - cy); });
        cand = cand.slice(0, K);
        var ang = function (x, y) { return Math.atan2(y - cy, x - cx); };
        cand.sort(function (a, b) { return ang(hx[a], hy[a]) - ang(hx[b], hy[b]); });
        tg.sort(function (a, b) { return ang(a[0], a[1]) - ang(b[0], b[1]); });
        var maxD = 1; cand.forEach(function (d) { maxD = Math.max(maxD, Math.hypot(hx[d] - cx, hy[d] - cy)); });
        cand.forEach(function (d, n) { OWNF[d] = 1; TXs[d] = tg[n][0]; TYs[d] = tg[n][1]; DLs[d] = Math.hypot(hx[d] - cx, hy[d] - cy) / maxD * .3 + Math.random() * .1; });
        OWNED = Int32Array.from(cand);
        shapeP = reduce ? 1 : 0; shapeT0 = 0;
        if (reduce) cand.forEach(function (j) { X[j] = TXs[j]; Y[j] = TYs[j]; });
      }
      if (reduce) { paint(0, 1, true); canvas.classList.add('on'); }
    }
    function paint(time, step, still) {
      ctx.clearRect(0, 0, W, H);
      for (var b = 0; b < HB; b++) {
        var s0 = hbs[b], s1 = hbs[b + 1]; if (s0 === s1) continue;
        var rad = HSIZE[b & 1] / 2;
        ctx.fillStyle = HCOLS[b]; ctx.beginPath();
        for (var i = s0; i < s1; i += step) {
          if (OWNF[i]) continue;
          var a = time * SPD[i] + PH[i], am = still ? 0 : AMP[i];
          var x = X[i] + am * sinL(a), y = Y[i] + am * sinL(a * .83 + 1.9), r = rad * (1 + NR[i] * 1.2);
          ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, TAU);
        }
        ctx.fill();
      }
      if (OWNED.length) {                                                // the shape's dots: black while loose, orange once they have arrived
        for (var pass = 0; pass < 2; pass++) {
          ctx.fillStyle = pass ? 'rgba(255,107,53,.95)' : 'rgba(' + INK + ',.55)'; ctx.beginPath();
          for (var n = 0; n < OWNED.length; n++) {
            var j = OWNED[n], e = shapeE(j), a2 = time * SPD[j] + PH[j], am2 = still ? 0 : AMP[j];
            if ((e > .35) !== !!pass) continue;
            var x2 = X[j] + am2 * sinL(a2), y2 = Y[j] + am2 * sinL(a2 * .83 + 1.9), r2 = (pass ? 1.5 : 1.1) * (1 + NR[j] * 1.2);
            ctx.moveTo(x2 + r2, y2); ctx.arc(x2, y2, r2, 0, TAU);
          }
          ctx.fill();
        }
      }
    }
    function shapeE(j) { var pk = (shapeP - DLs[j]) / (1 - DLs[j]); return pk <= 0 ? 0 : pk >= 1 ? 1 : pk * pk * (3 - 2 * pk); }
    var task = {
      tick: function (t, lvl) {
        var time = t * .001, R = small ? 110 : 170, R2 = R * R, i, k;
        if (OWNED.length) {
          if (!shapeT0) shapeT0 = t + 500;
          shapeP = clamp((t - shapeT0) / 1700, 0, 1);
          for (k = 0; k < OWNED.length; k++) { i = OWNED[k]; var e = shapeE(i); hx[i] = RX0[i] + (TXs[i] - RX0[i]) * e; hy[i] = RY0[i] + (TYs[i] - RY0[i]) * e; }
        }
        var real = px > -1e3 && (t - lastMove) < 3500, tx0, ty0;
        if (real) { tx0 = px; ty0 = py + window.scrollY - docTop; }
        else { tx0 = W * (.5 + .36 * sinL(time * .23)); ty0 = H * (.46 + .28 * sinL(time * .31 + 1.2)); }   // idle virtual pointer
        if (sx < -1e3) { sx = tx0; sy = ty0; }
        var kf = real ? .16 : .05; sx += (tx0 - sx) * kf; sy += (ty0 - sy) * kf;
        str += ((real ? 1 : .6) - str) * .05;
        for (k = ripples.length - 1; k >= 0; k--) { ripples[k].r = (t - ripples[k].t0) * .55; if (ripples[k].r > Math.max(W, H)) ripples.splice(k, 1); }
        var step = lvl >= 1 ? 2 : 1, nR = ripples.length;
        for (i = 0; i < N; i++) {
          if (step === 2 && (i & 1) && !OWNF[i]) continue;
          var x = X[i], y = Y[i], vx = VX[i], vy = VY[i], dx = x - sx, dy = y - sy, d2 = dx * dx + dy * dy, near = 0;
          if (d2 < R2) {
            var d = Math.sqrt(d2) || 1; near = 1 - d / R; var f = near * near * 4.6 * str, g = near * 1.1 * str;
            vx += dx / d * f - dy / d * g; vy += dy / d * f + dx / d * g;      // push away + swirl around the pointer
          }
          for (k = 0; k < nR; k++) {
            var rp = ripples[k], rx = x - rp.x, ry = y - rp.y, rd = Math.sqrt(rx * rx + ry * ry) || 1, band = Math.abs(rd - rp.r);
            if (band < 46) { var rf = (1 - band / 46) * 2.6 * (1 - rp.r / Math.max(W, H)); vx += rx / rd * rf; vy += ry / rd * rf; if (1 - band / 46 > near) near = 1 - band / 46; }
          }
          vx += (hx[i] - x) * .05; vy += (hy[i] - y) * .05; vx *= .84; vy *= .84;
          X[i] = x + vx; Y[i] = y + vy; VX[i] = vx; VY[i] = vy; NR[i] = near;
        }
        paint(time, step, false);
        return true;
      }
    };

    build();
    onResize(host, build);
    if (reduce) return;
    var pend = false, ex = 0, ey = 0;
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      ex = e.clientX; ey = e.clientY;
      if (!pend) { pend = true; requestAnimationFrame(function () { pend = false; px = ex; py = ey; lastMove = performance.now(); }); }
    }, { passive: true });
    document.addEventListener('pointerleave', function () { px = py = sx = sy = -1e4; });
    host.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch' && !hoverless) return;
      ripples.push({ x: e.clientX, y: e.clientY + window.scrollY - docTop, t0: performance.now(), r: 0 }); kick();
    }, { passive: true });
    track(host, task); canvas.classList.add('on');
  }

  /* ---------- shapes ---------- */
  function shapePath(name, ctx, S) {
    var u = S / 100;
    ctx.save(); ctx.scale(u, u); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = ctx.fillStyle = '#000';
    if (name === 'pad') {
      ctx.lineWidth = 5; ctx.beginPath();
      ctx.moveTo(24, 36); ctx.bezierCurveTo(24, 31, 29, 29, 35, 29); ctx.lineTo(65, 29); ctx.bezierCurveTo(71, 29, 76, 31, 76, 36);
      ctx.bezierCurveTo(82, 48, 90, 66, 84, 74); ctx.bezierCurveTo(78, 82, 69, 74, 63, 66); ctx.lineTo(37, 66);
      ctx.bezierCurveTo(31, 74, 22, 82, 16, 74); ctx.bezierCurveTo(10, 66, 18, 48, 24, 36); ctx.closePath(); ctx.stroke();
      ctx.lineWidth = 4.5; ctx.beginPath(); ctx.moveTo(36, 41); ctx.lineTo(36, 55); ctx.moveTo(29, 48); ctx.lineTo(43, 48); ctx.stroke();
      ctx.beginPath(); ctx.arc(63, 44, 3.6, 0, 7); ctx.arc(70, 52, 3.6, 0, 7); ctx.fill();
    } else if (name === 'note') {
      ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(36, 74, 12, 9, -0.35, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(47, 70); ctx.lineTo(47, 18); ctx.bezierCurveTo(52, 30, 72, 32, 72, 52); ctx.stroke();
    } else if (name === 'tag') {
      ctx.lineWidth = 5.5; ctx.beginPath();
      ctx.moveTo(18, 30); ctx.lineTo(18, 20); ctx.lineTo(48, 20); ctx.lineTo(86, 58); ctx.lineTo(60, 84); ctx.lineTo(18, 42); ctx.lineTo(18, 30);
      ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(34, 36, 5, 0, 7); ctx.stroke();
    } else {
      ctx.lineWidth = 6.5; ctx.beginPath(); ctx.arc(40, 40, 26, 0, 7); ctx.stroke();
      ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(59, 59); ctx.lineTo(82, 82); ctx.stroke();
    }
    ctx.restore();
  }
  // points normalised to the shape's own bounding box: centred, longest side = 1, so every shape fits its bounds
  function sampleShape(name) {
    var S = 260, c = document.createElement('canvas'); c.width = c.height = S;
    var x = c.getContext('2d', { willReadFrequently: true }); shapePath(name, x, S);
    var d = x.getImageData(0, 0, S, S).data, pts = [], st = 3, i, j, minx = 1e9, maxx = -1, miny = 1e9, maxy = -1;
    for (j = 0; j < S; j += st) for (i = 0; i < S; i += st) if (d[(j * S + i) * 4 + 3] > 128) { pts.push(i, j); if (i < minx) minx = i; if (i > maxx) maxx = i; if (j < miny) miny = j; if (j > maxy) maxy = j; }
    var ext = Math.max(maxx - minx, maxy - miny) || 1, mx = (minx + maxx) / 2, my = (miny + maxy) / 2, out = [];
    for (i = 0; i < pts.length; i += 2) out.push((pts[i] - mx) / ext, (pts[i + 1] - my) / ext);
    return out;
  }

  /* ---------- PRODUCTS: one continuous field ---------- */
  var NB = 8, ALPHA = [.2, .34, .5, .68], SIZE = [1.4, 2.0], COLS = [];
  for (var cb = 0; cb < NB; cb++) COLS.push('rgba(' + INK + ',' + ALPHA[cb >> 1] + ')');

  function field(canvas) {
    var section = canvas.parentElement, cellsEl = section.querySelector('.cells'), cells = $('.cell[data-shape]', cellsEl);
    var ctx, W = 0, H = 0, docTop = 0, N = 0, bs = new Int32Array(NB + 1);
    var RX, RY, PHs, AMP, SPD, OWN, TX, TY, DL, CV, E, X, Y, VIS, OWNED = new Int32Array(0);
    var P = new Float32Array(cells.length), G = new Float32Array(cells.length), scat = new Uint8Array(cells.length), lastT = 0;

    function build() {
      small = Math.min(window.innerWidth, window.innerHeight * 1.2) < 700;
      var top = cellsEl.offsetTop - 150, h = cellsEl.offsetHeight + 300;
      canvas.style.top = top + 'px'; canvas.style.height = h + 'px';
      var r = canvas.getBoundingClientRect(); W = r.width; H = r.height; docTop = r.top + window.scrollY;
      ctx = setupCanvas(canvas, W, H);
      var cap = Math.round((small ? 5200 : 8600) * Q), sp = Math.max(small ? 14 : 13.5, Math.sqrt(W * H / cap));
      var cols = Math.ceil(W / sp), rows = Math.ceil(H / sp), tmp = [], i, j;
      for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
        var x = (i + .5) * sp + (Math.random() - .5) * sp * .8, y = (j + .5) * sp + (Math.random() - .5) * sp * .6;
        // one soft vignette for the whole field: it simply fades away, there is no edge
        var fx = clamp(Math.min(x, W - x) / (W * .16), 0, 1), fy = clamp(Math.min(y, H - y) / 150, 0, 1);
        var f = Math.min(fx, fy); f = f * f * (3 - 2 * f);
        if (Math.random() > Math.min(1, f * 1.5)) continue;
        var rr = Math.random(), lvl = rr < .22 ? 0 : rr < .56 ? 1 : rr < .86 ? 2 : 3;
        lvl = Math.max(0, lvl - Math.floor((1 - f) * 3.2));
        tmp.push([(lvl << 1) | (Math.random() < .35 ? 1 : 0), x, y]);
      }
      tmp.sort(function (a, b) { return a[0] - b[0]; });
      N = tmp.length;
      RX = new Float32Array(N); RY = new Float32Array(N); PHs = new Float32Array(N); AMP = new Float32Array(N); SPD = new Float32Array(N);
      OWN = new Int8Array(N).fill(-1); TX = new Float32Array(N); TY = new Float32Array(N); DL = new Float32Array(N); CV = new Float32Array(N);
      E = new Float32Array(N); X = new Float32Array(N); Y = new Float32Array(N); VIS = new Uint8Array(N);
      bs.fill(0);
      for (i = 0; i < N; i++) {
        RX[i] = tmp[i][1]; RY[i] = tmp[i][2]; PHs[i] = Math.random() * TAU; AMP[i] = .35 + Math.random() * .75; SPD[i] = .35 + Math.random() * .8; bs[tmp[i][0] + 1]++;
      }
      for (i = 0; i < NB; i++) bs[i + 1] += bs[i];
      var owned = [], idx = [];
      for (i = 0; i < N; i++) idx.push(i);
      cells.forEach(function (el, k) {
        var rc = el.getBoundingClientRect(), cx = rc.left + rc.width / 2, cy = rc.top + window.scrollY - docTop + Math.min(rc.height * .28, rc.height - 300 - Math.min(rc.width * .6, rc.height * .4, 340) / 2);
        var S = Math.min(rc.width * .6, rc.height * .4, 340), pts = sampleShape(el.getAttribute('data-shape'));
        var K = Math.min(pts.length / 2, Math.round(S * 2.0), Math.floor(N * .12));
        var order = []; for (i = 0; i < pts.length / 2; i++) order.push(i);
        order.sort(function () { return Math.random() - .5; }); order = order.slice(0, K);
        var tg = order.map(function (q) { return [cx + pts[q * 2] * S, cy + pts[q * 2 + 1] * S]; });
        var cand = idx.filter(function (d) { return OWN[d] < 0; });
        cand.sort(function (a, b) { return Math.hypot(RX[a] - cx, RY[a] - cy) - Math.hypot(RX[b] - cx, RY[b] - cy); });
        cand = cand.slice(0, K);
        var ang = function (x, y) { return Math.atan2(y - cy, x - cx); };
        cand.sort(function (a, b) { return ang(RX[a], RY[a]) - ang(RX[b], RY[b]); });
        tg.sort(function (a, b) { return ang(a[0], a[1]) - ang(b[0], b[1]); });
        var maxD = 1; cand.forEach(function (d) { maxD = Math.max(maxD, Math.hypot(RX[d] - cx, RY[d] - cy)); });
        cand.forEach(function (d, n) {
          OWN[d] = k; TX[d] = tg[n][0]; TY[d] = tg[n][1];
          DL[d] = Math.hypot(RX[d] - cx, RY[d] - cy) / maxD * .3 + Math.random() * .1;   // wave: dots near the centre leave first
          CV[d] = (Math.random() - .5) * 50; owned.push(d);
        });
      });
      OWNED = Int32Array.from(owned);
      if (reduce) { for (i = 0; i < P.length; i++) P[i] = G[i] = 1; draw(0, 0, true); }
    }

    function draw(t, lvl, still) {
      var time = t * .001, vTop = window.scrollY - docTop - 12, vBot = vTop + window.innerHeight + 24, i, b;
      if (still) { vTop = -1e9; vBot = 1e9; }
      var y0 = Math.max(0, vTop), y1 = Math.min(H, vBot); if (y1 <= y0) return false;
      ctx.clearRect(0, y0, W, y1 - y0);
      var stride2 = lvl >= 1;
      for (i = 0; i < N; i++) {
        var o = OWN[i], e = 0;
        if (o < 0) { if (RY[i] < vTop || RY[i] > vBot || (stride2 && (i & 1))) { VIS[i] = 0; continue; } }
        else if (P[o] > 0) { var pk = (P[o] - DL[i]) / (1 - DL[i]); e = pk <= 0 ? 0 : pk >= 1 ? 1 : pk * pk * (3 - 2 * pk); }
        var a = still ? 0 : time * SPD[i] + PHs[i], am = still ? 0 : AMP[i];
        var x = RX[i] + am * sinL(a), y = RY[i] + am * sinL(a * .83 + 1.9);
        if (e > 0) {
          var dx = TX[i] - RX[i], dy = TY[i] - RY[i], L = Math.sqrt(dx * dx + dy * dy) || 1, off = sinL(e * 3.1416) * CV[i];
          x += dx * e - dy / L * off; y += dy * e + dx / L * off;
        }
        X[i] = x; Y[i] = y; E[i] = e; VIS[i] = e > .04 ? 2 : 1;
      }
      for (b = 0; b < NB; b++) {
        var s0 = bs[b], s1 = bs[b + 1], sz = SIZE[b & 1], hs = sz / 2;
        if (s0 === s1) continue;
        ctx.fillStyle = COLS[b]; ctx.beginPath();
        for (i = s0; i < s1; i++) if (VIS[i] === 1) ctx.rect(X[i] - hs, Y[i] - hs, sz, sz);
        ctx.fill();
      }
      ctx.fillStyle = ORANGE; ctx.beginPath();
      for (var n = 0; n < OWNED.length; n++) { i = OWNED[n]; if (VIS[i] === 2) { var r = 1.05 + E[i] * .55; ctx.rect(X[i] - r, Y[i] - r, r * 2, r * 2); } }
      ctx.fill();
      return true;
    }

    var task = {
      tick: function (t, lvl) {
        var dt = lastT ? Math.min(50, t - lastT) / 1000 : .016; lastT = t;
        for (var k = 0; k < P.length; k++) if (scat[k] && P[k] <= G[k] + 0.002) { scat[k] = 0; G[k] = 1; }   // scattered: now gather again
        for (k = 0; k < P.length; k++) if (P[k] !== G[k]) {          // linear progress in time; the per-dot easing makes it smooth
          var step = dt / (G[k] > P[k] ? 1.1 : .7);                      // forms in ~1.1 s, releases in ~0.7 s
          P[k] = G[k] > P[k] ? Math.min(G[k], P[k] + step) : Math.max(G[k], P[k] - step);
        }
        return draw(t, lvl, false);
      }
    };
    build();
    onResize(section, build);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!reduce) build(); });
    if (reduce) return;
    track(canvas, task);
    document.addEventListener('visibilitychange', function () { lastT = 0; });
    window.addEventListener('scroll', kick, { passive: true });
    if (hoverless) {
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) { es.forEach(function (e) { var k = cells.indexOf(e.target); if (k >= 0) { G[k] = e.intersectionRatio > .55 ? 1 : 0; kick(); } }); }, { threshold: [0, .3, .55, .8] });
        cells.forEach(function (c) { io.observe(c); });
      }
    } else {
      // desktop: every product forms its shape as it scrolls into view and stays formed;
      // hovering scatters the dots a little and they gather again (same forming animation, once more)
      if ('IntersectionObserver' in window) {
        var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { var k = cells.indexOf(e.target); if (k >= 0 && e.intersectionRatio > .3 && !G[k]) { G[k] = 1; kick(); } }); }, { threshold: [0, .3, .6] });
        cells.forEach(function (c) { io2.observe(c); });
      } else { for (var q = 0; q < G.length; q++) G[q] = 1; }
      cells.forEach(function (el, k) {
        var again = function () { if (P[k] > .9 && !scat[k]) { scat[k] = 1; G[k] = .4; kick(); } };
        el.addEventListener('pointerenter', again);
        el.addEventListener('focusin', again);
      });
    }
  }

  // small static dot shapes (help page): drawn once, no loop
  function helpShapes() {
    $('.help-shape').forEach(function (cv) {
      var w = cv.clientWidth || 140, ctx = setupCanvas(cv, w, w), pts = sampleShape(cv.getAttribute('data-shape')), n = pts.length / 2, step = Math.max(1, Math.floor(n / 190));
      ctx.fillStyle = ORANGE; ctx.beginPath();
      for (var i = 0; i < n; i += step) { var x = w / 2 + pts[i * 2] * w * .84 + (Math.random() - .5) * 1.6, y = w / 2 + pts[i * 2 + 1] * w * .84 + (Math.random() - .5) * 1.6; ctx.moveTo(x + 1.7, y); ctx.arc(x, y, 1.7, 0, TAU); }
      ctx.fill();
    });
  }
  function boot() {
    helpShapes();
    var h = document.querySelector('.hero-fx'); if (h) hero(h);
    var f = document.querySelector('.field-fx'); if (f) field(f);
  }
  var start = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 60); })(boot, { timeout: 800 }); };
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
