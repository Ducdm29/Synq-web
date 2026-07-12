/* ============================================================
   SYNQ — Motion & interaction enhancements (shared, all pages)
   Progressive enhancement only: if this fails or is disabled,
   the page remains fully usable and content stays visible.
   ============================================================ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Nav: elevate on scroll -------------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- 2. Scroll reveal ----------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!prefersReduced && 'IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // No IO / reduced motion → show everything immediately.
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---- 3. Stats count-up ---------------------------------- */
  function animateCount(el) {
    var raw = el.getAttribute('data-count-raw');
    if (raw === null) { raw = el.textContent; el.setAttribute('data-count-raw', raw); }

    // Match a leading number (allow thousands separators + decimals).
    var m = raw.match(/([\d.,]+)/);
    if (!m) return; // Non-numeric (e.g. "Hi-Res") — leave as-is.

    var numStr = m[1];
    var target = parseFloat(numStr.replace(/,/g, ''));
    if (!isFinite(target)) return;

    var decimals = (numStr.split('.')[1] || '').length;
    var useGrouping = numStr.indexOf(',') !== -1;
    var prefix = raw.slice(0, m.index);
    var suffix = raw.slice(m.index + numStr.length);

    function fmt(v) {
      var s = v.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: useGrouping
      });
      return prefix + s + suffix;
    }

    if (prefersReduced) { el.textContent = fmt(target); return; }

    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }

  var statNums = Array.prototype.slice.call(document.querySelectorAll('.stat-num'));
  if (statNums.length) {
    if ('IntersectionObserver' in window) {
      var statIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      statNums.forEach(function (el) { statIO.observe(el); });
    } else {
      statNums.forEach(animateCount);
    }
  }

  /* ---- 4. Feature phone: pointer tilt (fine pointers only) - */
  if (!prefersReduced && window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var tiltEls = document.querySelectorAll('.feature-phone-wrap, .hero-phone-wrap');
    tiltEls.forEach(function (wrap) {
      var img = wrap.querySelector('img');
      if (!img) return;
      wrap.addEventListener('pointermove', function (e) {
        var r = wrap.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        img.style.transform =
          'perspective(900px) rotateY(' + (px * 9).toFixed(2) + 'deg) rotateX(' +
          (-py * 9).toFixed(2) + 'deg) translateZ(0)';
      });
      wrap.addEventListener('pointerleave', function () {
        img.style.transform = '';
      });
    });
  }
})();
