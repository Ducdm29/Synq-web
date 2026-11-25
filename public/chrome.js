/* SYNQ Studio — shared chrome behaviour: mobile menu + language toggle fallback */
(function () {
  'use strict';
  function init() {
    var btn = document.querySelector('.sq-menu'), nav = document.getElementById('sq-nav');
    if (btn && nav) {
      var set = function (open) { btn.setAttribute('aria-expanded', open ? 'true' : 'false'); nav.classList.toggle('is-open', open); };
      btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
      nav.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    }
    if (!window.SynqI18n) { // pages without i18n.js still get a working toggle
      document.querySelectorAll('.sq-header .lang-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          var l = b.getAttribute('data-lang');
          try { localStorage.setItem('synq-lang', l); } catch (e) {}
          document.documentElement.lang = l;
        });
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
