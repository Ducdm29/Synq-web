/* Kagezan news: the YouTube iframe (youtube-nocookie) loads only when the poster is clicked. */
(function () {
  'use strict';
  var b = document.querySelector('.yt-facade');
  if (!b) return;
  b.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-yt') + '?autoplay=1&rel=0&playsinline=1';
    var hs = Array.prototype.slice.call(document.querySelectorAll('h1')).filter(function (h) { return h.offsetParent !== null; });
    f.title = (hs[0] ? hs[0].textContent : document.title) || 'Video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    f.setAttribute('loading', 'lazy');
    b.replaceWith(f);
    f.focus();
  });
})();
