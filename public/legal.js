/* Kagezan legal pages: contents (sticky on desktop, collapsible on mobile) with the current section highlighted. */
(function () {
  'use strict';
  var d = document.querySelector('.lg-toc-d');
  if (!d) return;
  var mq = window.matchMedia('(min-width: 1024px)'), touched = false;
  function sync() { if (mq.matches) d.open = true; else if (!touched) d.open = false; }
  d.querySelector('summary').addEventListener('click', function () { touched = true; });
  if (mq.addEventListener) mq.addEventListener('change', sync); else mq.addListener(sync);
  sync();
  var links = Array.prototype.slice.call(d.querySelectorAll('a[data-toc]'));
  links.forEach(function (a) { a.addEventListener('click', function () { if (!mq.matches) { d.open = false; touched = true; } }); });
  if (!('IntersectionObserver' in window)) return;
  var cur = null;
  function mark(id) {
    if (id === cur) return; cur = id;
    links.forEach(function (a) { var on = a.getAttribute('data-toc') === id; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) mark(e.target.id); });
  }, { rootMargin: '-15% 0px -70% 0px' });
  Array.prototype.forEach.call(document.querySelectorAll('.lg-sec'), function (s) { io.observe(s); });
})();
