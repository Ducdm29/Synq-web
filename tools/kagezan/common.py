# Shared shell for the Kagezan pages on synqstudio.cloud. Moved into the site repo (tools/kagezan/); this is now the source of truth.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from chrome import header, footer
EMAIL = "support.synq@gmail.com"
UPDATED_VI = "13/11/2026"
UPDATED_EN = "13 November 2026"
# Store links: paste the approved URLs here to switch the badges on (empty = "Coming soon" everywhere).
APP_STORE = ""
PLAY = ""

BASE_CSS = '''
    html[lang="en"] [data-lang-block="vi"] { display: none; }
    html[lang="vi"] [data-lang-block="en"] { display: none; }
    .sb-wrap { max-width: 760px; margin: 0 auto; }
    .sb-back { display:inline-flex; gap:6px; font-size: var(--text-caption); color: var(--text-tertiary); text-decoration:none; margin-bottom: var(--space-5); }
    .sb-back:hover { color: var(--accent); }
    .sb-sec { text-align: left; margin-top: var(--space-7); }
    .sb-sec > h2 { font-family: var(--font-display); font-size: var(--text-h3); color: var(--text-primary); font-weight: var(--weight-semibold); margin-bottom: var(--space-4); }
    .sb-faq { border-top: 1px solid var(--border-subtle); padding: var(--space-4) 0; }
    .sb-faq h3 { font-family: var(--font-body); font-size: var(--text-body); color: var(--text-primary); font-weight: var(--weight-semibold); margin-bottom: 6px; }
    .sb-faq p, .sb-faq li { font-size: var(--text-caption); color: var(--text-tertiary); line-height: var(--leading-relaxed); }
    .sb-faq ul { margin: 6px 0 0 18px; }
    .sb-faq a, .policy-section a { color: var(--accent); }
    .sb-shot { width: 100%; height: auto; border-radius: var(--radius-card); border: 1px solid var(--border-subtle); display:block; margin: var(--space-4) 0; }
'''


def page(slug, title_en, desc_en, body, extra_css=""):
    """Legal / support pages: the legacy content styles (styles.css) wrapped in the shared site chrome."""
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title_en}</title>
  <meta name="description" content="{desc_en}" />
  <link rel="canonical" href="https://synqstudio.cloud/{slug}" />
  <meta property="og:title" content="{title_en}" />
  <meta property="og:description" content="{desc_en}" />
  <meta property="og:image" content="https://synqstudio.cloud/store/shadowblade/feature.jpg" />
  <link rel="icon" type="image/png" href="/store/shadowblade/icon.png" />
  <link rel="stylesheet" href="/styles.css" />
  <link rel="stylesheet" href="/chrome.css" />
  <script>if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: reduce)').matches){{document.documentElement.className+=' anim';}}</script>
  <script src="/chrome.js" defer></script>
  <style>{BASE_CSS}{extra_css}  </style>
</head>
<body>

<div class="site-wrapper">

{header('dark')}

  <main class="page-main" id="main-content">
{body}
  </main>

{footer('dark')}

</div>

<script src="/i18n.js"></script>
<script src="/enhance.js" defer></script>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
'''


def updated():
    return f'''    <div class="last-updated" role="note">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
      <span data-lang-block="vi">Cập nhật: {UPDATED_VI}</span><span data-lang-block="en">Last updated: {UPDATED_EN}</span>
    </div>
'''


def sec(n, h_vi, h_en, inner):
    return f'''      <section class="policy-section reveal">
        <h2><span class="num" aria-hidden="true">{n}</span><span data-lang-block="vi">{h_vi}</span><span data-lang-block="en">{h_en}</span></h2>
{inner}
      </section>
      <hr class="divider" />
'''


def both(tag, vi, en, attrs=""):
    return f'        <{tag}{attrs} data-lang-block="vi">{vi}</{tag}>\n        <{tag}{attrs} data-lang-block="en">{en}</{tag}>\n'


def ul(items_vi, items_en):
    # One span per item: the site's list items are flex rows (bullet + text), a bare <strong> became its own column.
    a = "".join(f"<li><span>{x}</span></li>" for x in items_vi)
    b = "".join(f"<li><span>{x}</span></li>" for x in items_en)
    return f'        <ul data-lang-block="vi">{a}</ul>\n        <ul data-lang-block="en">{b}</ul>\n'


def hero(eyebrow, h_vi, h_en, sub_vi, sub_en):
    return f'''    <section class="page-hero">
      <span class="eyebrow">{eyebrow}</span>
      <h1 data-lang-block="vi">{h_vi}</h1>
      <h1 data-lang-block="en">{h_en}</h1>
      <p class="subtitle" data-lang-block="vi">{sub_vi}</p>
      <p class="subtitle" data-lang-block="en">{sub_en}</p>
    </section>
'''


def contact(vi_h, en_h, subject):
    return f'''    <div class="contact-card reveal">
      <p class="contact-label"><span data-lang-block="vi">Cần giúp?</span><span data-lang-block="en">Need help?</span></p>
      <h2><span data-lang-block="vi">{vi_h}</span><span data-lang-block="en">{en_h}</span></h2>
      <a href="mailto:{EMAIL}?subject={subject}" class="btn-primary">{EMAIL}</a>
    </div>
'''
