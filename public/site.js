/* SYNQ Studio — home/hub motion. Vanilla; transform/opacity only; progressive enhancement. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* 1. reveal on enter (once) */
  var rev = $('[data-r]');
  if (reduce || !('IntersectionObserver' in window)) rev.forEach(function (e) { e.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rev.forEach(function (e) { io.observe(e); });
  }

  /* 2. scroll-scrubbed video stage + 3. word-by-word statement: one rAF loop, only while visible */
  var stages = $('[data-stage]'), statements = $('[data-words]'), rails = $('[data-rail]');
  statements.forEach(function (el) {
    // split each language block's text into words (kept readable if JS never runs)
    $('[data-lang-block]', el).concat(el.hasAttribute('data-lang-block') ? [el] : []).forEach(function (blk) {
      var txt = blk.textContent.trim().split(/\s+/);
      blk.textContent = '';
      txt.forEach(function (w, i) {
        var s = document.createElement('span'); s.className = 'w'; s.textContent = w; blk.appendChild(s);
        if (i < txt.length - 1) blk.appendChild(document.createTextNode(' '));
      });
    });
  });

  /* story strip: pinned horizontal scroll on wide screens (scroll-driven translate), native swipe otherwise */
  function layoutRails() {
    rails.forEach(function (el) {
      var track = el.querySelector('.story-track'), on = !reduce && window.innerWidth > 900;
      el.classList.toggle('rail-pin', on);
      if (on) {
        var pinH = window.innerHeight - 64, max = Math.max(0, track.scrollWidth - window.innerWidth);
        el.style.setProperty('--max', max); el.dataset.max = max; el.style.height = (max * .6 + pinH) + 'px';
      } else { el.style.height = ''; el.dataset.max = 0; }
    });
  }
  if (rails.length) {
    layoutRails();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layoutRails, 150); });
    window.addEventListener('load', layoutRails);
  }

  if (reduce) {
    document.documentElement.classList.add('no-scrub');
    statements.forEach(function (el) { $('.w', el).forEach(function (w) { w.classList.add('on'); }); });
    $('video[data-loop]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  } else if (stages.length || statements.length) {
    var visible = new Set(), ticking = false;
    var watch = stages.concat(statements, rails);
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
      schedule();
    }, { rootMargin: '20% 0px 20% 0px' });
    watch.forEach(function (e) { vio.observe(e); });

    var update = function () {
      ticking = false;
      var vh = window.innerHeight, more = false;
      visible.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (el.hasAttribute('data-rail')) {
          var mx = +el.dataset.max || 0;
          if (mx) el.style.setProperty('--sp', Math.min(1, Math.max(0, (64 - r.top) / (mx * .6))).toFixed(4));
        } else if (el.hasAttribute('data-stage')) {
          var pin = el.firstElementChild, travel = Math.max(0, r.height - pin.offsetHeight);
          var raw = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / (vh * 0.7 + travel * 0.3)));
          var target = raw * raw * (3 - 2 * raw);                       // eased
          var cur = el._p == null ? target : el._p;
          cur += (target - cur) * 0.22;                                   // glide: wheel steps never show as steps
          if (Math.abs(target - cur) < 0.0015) cur = target; else more = true;
          el._p = cur; el.style.setProperty('--p', cur.toFixed(4));
        } else {
          var words = $('.w', el.querySelector('[data-lang-block]:not([style*="none"])') || el);
          var vis = $('[data-lang-block]', el).filter(function (b) { return b.offsetParent !== null; })[0] || el;
          words = $('.w', vis);
          var q = (vh * 0.85 - r.top) / (vh * 0.6 + r.height * 0.5);
          var n = Math.round(Math.min(1, Math.max(0, q)) * words.length);
          words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
        }
      });
      if (more && !ticking) { ticking = true; requestAnimationFrame(update); }
    };
    var schedule = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
  }

  /* 4. looping video: play only while on screen; a user pause is respected */
  var vids = $('video[data-loop]'), userPaused = false;
  var LAB = { pause: { vi: 'Tạm dừng trailer', en: 'Pause trailer' }, play: { vi: 'Phát trailer', en: 'Play trailer' } };
  var btn = document.querySelector('.vid-toggle'), vid = vids[0];
  function label() {
    if (!btn || !vid) return;
    var lang = document.documentElement.lang === 'vi' ? 'vi' : 'en', paused = vid.paused && (userPaused || reduce);
    btn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    btn.setAttribute('aria-label', LAB[paused ? 'play' : 'pause'][lang]);
    btn.classList.toggle('is-paused', paused);
  }
  if (btn && vid) {
    if (reduce) userPaused = true;                       // reduced motion: starts paused, button says play
    btn.addEventListener('click', function () {
      if (vid.paused) { userPaused = false; if (vid.preload === 'none') vid.preload = 'auto'; var q = vid.play(); if (q && q.catch) q.catch(function () {}); }
      else { userPaused = true; vid.pause(); }
      label();
    });
    ['play', 'pause'].forEach(function (ev) { vid.addEventListener(ev, label); });
    new MutationObserver(label).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    label();
  }
  if (vids.length && 'IntersectionObserver' in window && !reduce) {
    var vo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { if (userPaused && v === vid) return; if (v.preload === 'none') { v.preload = 'auto'; } var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.05 });
    vids.forEach(function (v) { vo.observe(v); });
  }
})();
