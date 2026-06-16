// templates/mobile-app/ds-base.js
// Loads the Nocturne design system into this template.
// If consuming this from another project, update `base` to point at the
// _ds folder (e.g. '../../_ds/nocturne') — or just replace this file
// with a direct <link> + <script> to wherever styles.css and
// _ds_bundle.js live in your project.
(() => {
  const base = '../..';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = base + '/styles.css';
  document.head.appendChild(link);

  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — check the base path');
  document.head.appendChild(s);
})();
