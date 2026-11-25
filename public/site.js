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
  var stages = $('[data-stage]'), statements = $('[data-words]');
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

  if (reduce) {
    document.documentElement.classList.add('no-scrub');
    statements.forEach(function (el) { $('.w', el).forEach(function (w) { w.classList.add('on'); }); });
    $('video[data-loop]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  } else if (stages.length || statements.length) {
    var visible = new Set(), ticking = false;
    var watch = stages.concat(statements);
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
      schedule();
    }, { rootMargin: '20% 0px 20% 0px' });
    watch.forEach(function (e) { vio.observe(e); });

    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      visible.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (el.hasAttribute('data-stage')) {
          var pin = el.firstElementChild, travel = Math.max(0, r.height - pin.offsetHeight);
          var p = (vh * 0.6 - r.top) / (vh * 0.6 + travel * 0.5);
          el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4));
        } else {
          var words = $('.w', el.querySelector('[data-lang-block]:not([style*="none"])') || el);
          var vis = $('[data-lang-block]', el).filter(function (b) { return b.offsetParent !== null; })[0] || el;
          words = $('.w', vis);
          var q = (vh * 0.85 - r.top) / (vh * 0.6 + r.height * 0.5);
          var n = Math.round(Math.min(1, Math.max(0, q)) * words.length);
          words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
        }
      });
    };
    var schedule = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
  }

  /* 4. looping video: play only while on screen */
  var vids = $('video[data-loop]');
  if (vids.length && 'IntersectionObserver' in window && !reduce) {
    var vo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { if (v.preload === 'none') { v.preload = 'auto'; } var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.05 });
    vids.forEach(function (v) { vo.observe(v); });
  }
})();
