/* /kagezan: chapter viewer (story strip) and boss detail. Both open out of the clicked card (FLIP), full screen,
   aria-modal, focus trapped and returned, Esc / arrows / swipe, background inert and scroll locked. Vanilla; transform, clip-path, opacity. */
(function () {
  'use strict';
  var node = document.getElementById('kz-data');
  if (!node) return;
  var data = JSON.parse(node.textContent);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.2,.7,.2,1)';
  var lang = function () { return document.documentElement.lang === 'vi' ? 'vi' : 'en'; };
  var L = function (vi, en) { return lang() === 'vi' ? vi : en; };
  var X_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var PREV_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var NEXT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  var current = null;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  /* shared shell: root, close button, focus trap, inert, scroll lock */
  function shell(trigger, cls, label, onKey) {
    var root = el('div', 'kz-modal ' + cls); root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', label);
    var x = el('button', 'kz-x', X_ICON); x.type = 'button'; x.setAttribute('aria-label', L('Đóng', 'Close'));
    root.appendChild(x);
    document.body.appendChild(root);
    var blocked = [];
    Array.prototype.forEach.call(document.body.children, function (c) { if (c !== root && c.tagName !== 'SCRIPT') { blocked.push(c); c.setAttribute('inert', ''); } });
    var sbw = window.innerWidth - document.documentElement.clientWidth;          // keep the page from shifting when the scrollbar goes away
    document.documentElement.style.setProperty('--sbw', sbw + 'px');
    document.documentElement.classList.add('kz-lock');
    var api = { root: root, x: x, trigger: trigger, closing: false };
    function keydown(e) {
      if (e.key === 'Escape') { e.preventDefault(); api.close(); return; }
      if (onKey && onKey(e)) return;
      if (e.key === 'Tab') {
        var f = Array.prototype.filter.call(root.querySelectorAll('button, a[href]'), function (n) { return !n.hidden && n.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', keydown);
    x.addEventListener('click', function () { api.close(); });
    api.finish = function () {
      document.removeEventListener('keydown', keydown);
      root.remove(); blocked.forEach(function (c) { c.removeAttribute('inert'); });
      document.documentElement.classList.remove('kz-lock'); document.documentElement.style.removeProperty('--sbw'); current = null;
      if (trigger && document.body.contains(trigger)) trigger.focus({ preventScroll: true });
    };
    return api;
  }

  /* ---------- chapter viewer ---------- */
  function openChapter(btn) {
    var ch = btn.getAttribute('data-ch'), c = data.story[ch], slides = c.slides, i = 0;
    var title = L('Chương ', 'Chapter ') + ch + ': ' + L(c.vi, c.en);
    var m = shell(btn, 'kz-viewer', title, function (e) {
      if (e.key === 'ArrowLeft') { go(-1); return true; }
      if (e.key === 'ArrowRight') { go(1); return true; }
      return false;
    });
    var scrim = el('div', 'kz-scrim'), inner = el('div', 'kz-view-in'), stage = el('div', 'kz-stage'), fig = el('div', 'kz-fig'), img = el('img');
    img.alt = ''; img.decoding = 'async'; fig.appendChild(img); stage.appendChild(fig); inner.appendChild(stage);
    var cap = el('div', 'kz-cap'); cap.setAttribute('aria-live', 'polite');
    var chn = el('div', 'kz-chn', L('Chương ', 'Chapter ') + ch), h = el('h2', '', L(c.vi, c.en)), p = el('p'), dots = el('div', 'kz-dots');
    slides.forEach(function () { dots.appendChild(el('i')); });
    cap.appendChild(chn); cap.appendChild(h); cap.appendChild(p); cap.appendChild(dots); inner.appendChild(cap);
    var prev = el('button', 'kz-nav prev', PREV_ICON), next = el('button', 'kz-nav next', NEXT_ICON);
    prev.type = next.type = 'button'; prev.setAttribute('aria-label', L('Slide trước', 'Previous slide')); next.setAttribute('aria-label', L('Slide sau', 'Next slide'));
    if (slides.length < 2) { prev.hidden = next.hidden = true; dots.hidden = true; }
    m.root.insertBefore(scrim, m.x); m.root.insertBefore(inner, m.x); m.root.appendChild(prev); m.root.appendChild(next);

    function show(n, animate) {
      i = (n + slides.length) % slides.length;
      var s = slides[i];
      function apply() {
        img.src = s.src; p.textContent = L(s.vi, s.en);
        Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle('on', k === i); });
        img.classList.remove('out'); p.classList.remove('out');
        var nx = slides[(i + 1) % slides.length]; if (nx && slides.length > 1) { var pre = new Image(); pre.src = nx.src; }   // preload the next slide only
      }
      if (!animate || reduce) { apply(); return; }
      img.classList.add('out'); p.classList.add('out');
      setTimeout(apply, 200);
    }
    function go(d) { if (slides.length > 1 && !m.closing) show(i + d, true); }
    prev.addEventListener('click', function () { go(-1); }); next.addEventListener('click', function () { go(1); });
    var sx = null;
    fig.addEventListener('pointerdown', function (e) { sx = e.clientX; });
    fig.addEventListener('pointerup', function (e) { if (sx == null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); });
    fig.addEventListener('pointercancel', function () { sx = null; });
    show(0, false);

    var from = btn.querySelector('img').getBoundingClientRect();
    function flip(reverse, done) {
      if (reduce) { done(); return; }
      var to = fig.getBoundingClientRect(), dx = from.left - to.left, dy = from.top - to.top, k = from.width / to.width;
      var a = [{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + k + ')' }, { transform: 'none' }];
      if (reverse) { from = btn.querySelector('img').getBoundingClientRect(); dx = from.left - to.left; dy = from.top - to.top; k = from.width / to.width; a = [{ transform: 'none' }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + k + ')' }]; }
      var an = fig.animate(a, { duration: reverse ? 380 : 520, easing: EASE, fill: 'both' });
      [scrim, cap, m.x, prev, next].forEach(function (n) { n.animate(reverse ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 0 }, { opacity: 1 }], { duration: reverse ? 300 : 420, delay: reverse ? 0 : 120, easing: 'ease', fill: 'both' }); });
      an.onfinish = done;
    }
    m.close = function () { if (m.closing) return; m.closing = true; flip(true, m.finish); };
    flip(false, function () {});
    m.x.focus({ preventScroll: true });
    current = m;
  }

  /* ---------- boss detail ---------- */
  function openBoss(btn) {
    var id = btn.getAttribute('data-boss'), b = data.bosses[id];
    var name = b.name;
    var m = shell(btn, 'kz-boss', name + ', ' + L('chương ', 'chapter ') + b.ch, null);
    var scrim = el('div', 'kz-scrim'), inner = el('div', 'kz-boss-in');
    var img = el('img'); img.src = b.img; img.alt = L('Ba góc nhìn của ', 'Front, side and back views of ') + name; img.width = 1240; img.height = 620;
    var txt = el('div', 'kz-boss-text');
    var post = b.post ? '<a class="btn accent" href="' + b.post + '">' + L('Xem video và mẹo', 'Watch the video and tips') + ' &rarr;</a>' : '';
    txt.innerHTML = '<div class="kz-chn">' + L('Chương ', 'Chapter ') + b.ch + '</div><h2></h2><span class="kz-ti"></span><p class="kz-bio"></p><p class="kz-tip"><b></b><span></span></p>' + post;
    txt.querySelector('h2').textContent = name; txt.querySelector('.kz-ti').textContent = L(b.tvi, b.ten);
    txt.querySelector('.kz-bio').textContent = L(b.bvi, b.ben);
    txt.querySelector('.kz-tip b').textContent = L('Mẹo', 'Tip'); txt.querySelector('.kz-tip span').textContent = L(b.tipvi, b.tipen);
    inner.appendChild(img); inner.appendChild(txt);
    m.root.insertBefore(scrim, m.x); m.root.insertBefore(inner, m.x);
    var r = btn.getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight;
    function clip(rect) { return 'inset(' + rect.top + 'px ' + (vw - rect.right) + 'px ' + (vh - rect.bottom) + 'px ' + rect.left + 'px round 28px)'; }
    function run(reverse, done) {
      if (reduce) { done(); return; }
      var rr = reverse ? btn.getBoundingClientRect() : r, full = 'inset(0px 0px 0px 0px round 0px)';
      var an = scrim.animate(reverse ? [{ clipPath: full }, { clipPath: clip(rr) }] : [{ clipPath: clip(rr) }, { clipPath: full }], { duration: reverse ? 360 : 520, easing: EASE, fill: 'both' });
      [inner, m.x].forEach(function (n) { n.animate(reverse ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: reverse ? 200 : 420, delay: reverse ? 0 : 240, easing: 'ease', fill: 'both' }); });
      an.onfinish = done;
    }
    m.close = function () { if (m.closing) return; m.closing = true; run(true, m.finish); };
    run(false, function () {});
    m.x.focus({ preventScroll: true });
    current = m;
  }

  document.addEventListener('click', function (e) {
    var s = e.target.closest && e.target.closest('.story-open'), b = e.target.closest && e.target.closest('.boss-card[data-boss]');
    if (current) return;
    if (s) openChapter(s); else if (b) openBoss(b);
  });
})();
