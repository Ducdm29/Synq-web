/* Support FAQ: accordion with a smooth height animation, deep links (#id opens the item), search (accent-insensitive). */
(function () {
  'use strict';
  var items = Array.prototype.slice.call(document.querySelectorAll('.fq-item'));
  if (!items.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function norm(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\u0111/g, 'd').replace(/\u0110/g, 'd').toLowerCase(); }

  /* accordion */
  items.forEach(function (d) {
    var sum = d.querySelector('summary'), box = d.querySelector('.fq-a'), run = null;
    d._t = norm(d.textContent);
    sum.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;                       // the copy-link "#" is a normal link
      e.preventDefault();
      if (reduce || !box.animate) { d.open = !d.open; return; }
      if (run) run.cancel();
      if (d.open) {
        var h = box.offsetHeight;
        run = box.animate([{ height: h + 'px' }, { height: '0px' }], { duration: 260, easing: 'cubic-bezier(.2,.7,.2,1)' });
        run.onfinish = function () { d.open = false; run = null; };
      } else {
        d.open = true;
        var h2 = box.offsetHeight;
        run = box.animate([{ height: '0px' }, { height: h2 + 'px' }], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' });
        run.onfinish = function () { run = null; };
      }
    });
  });

  /* deep links */
  function openHash() {
    var id = decodeURIComponent(location.hash.slice(1)), d = id && document.getElementById(id);
    if (d && d.classList.contains('fq-item')) { d.open = true; setTimeout(function () { d.scrollIntoView({ block: 'start' }); }, 30); }
  }
  window.addEventListener('hashchange', openHash); openHash();

  /* search */
  var input = document.getElementById('fq-q'), empty = document.querySelector('.fq-empty'), groups = Array.prototype.slice.call(document.querySelectorAll('.fq-group'));
  function placeholder() { input.placeholder = document.documentElement.lang === 'vi' ? input.getAttribute('data-ph-vi') : input.getAttribute('data-ph-en'); }
  placeholder(); new MutationObserver(placeholder).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  function filter() {
    var q = norm(input.value.trim()), words = q ? q.split(/\s+/) : [], any = false;
    items.forEach(function (d) { var ok = words.every(function (w) { return d._t.indexOf(w) > -1; }); d.hidden = !ok; if (ok) any = true; });
    groups.forEach(function (g) { g.hidden = !g.querySelector('.fq-item:not([hidden])'); });
    empty.hidden = any || !q;
  }
  input.addEventListener('input', filter);
})();
