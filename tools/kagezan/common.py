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


def _pre(h1):
    """Put the "Kagezan — " prefix on its own small line so the title itself wraps cleanly.
    The text content stays identical (store-linked pages)."""
    return h1.replace('>Kagezan — ', '><span class="lg-pre">Kagezan — </span>', 1)


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


# ---------------------------------------------------------------------------------------------
# Long-text template for the legal pages (privacy, terms, delete-account). Markup and layout only:
# the generated body (legal.py) is re-wrapped, every word of it is kept.
import re as _re, html as _html, urllib.parse as _up

def _slug(s):
    s = _re.sub(r'[^a-z0-9]+', '-', _html.unescape(_re.sub(r'<[^>]+>', '', s)).lower()).strip('-')
    return s or 'section'


def legal_page(slug, title_en, desc_en, body, steps=False, cta=None):
    from build_pages import head, t, TAIL
    hero_m = _re.search(r'<section class="page-hero">\s*<span class="eyebrow">(.*?)</span>\s*(<h1.*?</h1>)\s*(<h1.*?</h1>)\s*(<p class="subtitle".*?</p>)\s*(<p class="subtitle".*?</p>)\s*</section>', body, _re.S)
    upd_m = _re.search(r'<div class="last-updated" role="note">.*?(<span data-lang-block="vi">.*?</span><span data-lang-block="en">.*?</span>)\s*</div>', body, _re.S)
    sections = _re.findall(r'<section class="policy-section reveal">\s*<h2>(.*?)</h2>(.*?)</section>', body, _re.S)
    contact = _re.search(r'<div class="contact-card reveal">(.*?)</div>\s*(?=</div>\s*$)', body, _re.S)
    assert hero_m and upd_m and sections, slug
    eyebrow, h1v, h1e, sv, se = hero_m.groups()
    toc, secs = "", ""
    for i, (h2, inner) in enumerate(sections):
        vi = _re.search(r'data-lang-block="vi">(.*?)</span>', h2).group(1); en = _re.search(r'data-lang-block="en">(.*?)</span>', h2).group(1)
        num = _re.search(r'<span class="num" aria-hidden="true">(.*?)</span>', h2).group(1)
        sid = _slug(en)
        toc += '<li><a href="#%s" data-toc="%s"><span class="lg-n">%s</span><span data-lang-block="vi">%s</span><span data-lang-block="en">%s</span></a></li>' % (sid, sid, num, vi, en)
        inner = inner.strip()
        extra = ""
        if steps and i == 0:
            inner = inner.replace('<ul data-lang-block', '<ol class="lg-steps" data-lang-block').replace('</ul>', '</ol>')
        if cta and i == len(sections) - 1:
            extra = '<p class="lg-cta"><a class="btn accent" href="%s">%s</a></p>' % (cta[0], t(cta[1], cta[2]))
        secs += ('<section class="lg-sec" id="%s" aria-labelledby="%s-h"><h2 id="%s-h">%s<a class="lg-anchor" href="#%s" aria-label="Liên kết tới mục này / Link to this section">#</a></h2>\n%s\n%s</section>\n'
                 % (sid, sid, sid, h2, sid, inner, extra))
    contact_html = ''
    if contact:
        contact_html = '<div class="lg-contact">%s</div>' % contact.group(1).replace('class="btn-primary"', 'class="btn"')
    main = """<main id="main-content">
  <div class="lg wrap">
    <header class="lg-head">
      <p class="lg-eyebrow">%(eyebrow)s</p>
      %(h1v)s
      %(h1e)s
      %(sv)s
      %(se)s
      <p class="lg-updated">%(upd)s</p>
    </header>
    <div class="lg-grid">
      <aside class="lg-toc">
        <details class="lg-toc-d" open>
          <summary>%(toclabel)s</summary>
          <nav aria-label="%(toclabel_plain)s"><ol>%(toc)s</ol></nav>
        </details>
      </aside>
      <script>if(window.matchMedia&&matchMedia('(max-width:1023px)').matches)document.querySelector('.lg-toc-d').open=false;</script>
      <article class="lg-body">
%(secs)s%(contact)s
        <p class="lg-top"><a href="#main-content">%(top)s</a></p>
      </article>
    </div>
  </div>
</main>""" % dict(eyebrow=eyebrow.replace('Kagezan', '<a href="/kagezan">Kagezan</a>'), h1v=_pre(h1v.replace('<h1', '<h1 class="display"')), h1e=_pre(h1e.replace('<h1', '<h1 class="display"')),
                  sv=sv.replace('class="subtitle"', 'class="lg-sub"'), se=se.replace('class="subtitle"', 'class="lg-sub"'), upd=upd_m.group(1),
                  toclabel=t("Mục lục", "Contents"), toclabel_plain="Mục lục / Contents", toc=toc, secs=secs, contact=contact_html, top=t("Lên đầu trang", "Back to top"))
    page = head(title_en, desc_en, '/' + slug, 'studio legal', og='/store/shadowblade/feature.jpg', icon='/store/shadowblade/icon.png')
    page = page.replace('<script src="/dots.js" defer></script>', '<script src="/legal.js" defer></script>').replace('<script src="/site.js" defer></script>\n  ', '')
    return page + header('light') + main + '\n' + footer('light') + TAIL


def support_page(slug, title_en, desc_en, main):
    """Same shell as legal_page, for the support FAQ (adds the FAQ script)."""
    from build_pages import head, TAIL
    page = head(title_en, desc_en, '/' + slug, 'studio legal', og='/store/shadowblade/feature.jpg', icon='/store/shadowblade/icon.png')
    page = page.replace('<script src="/dots.js" defer></script>', '<script src="/legal.js" defer></script>\n  <script src="/faq.js" defer></script>').replace('<script src="/site.js" defer></script>\n  ', '')
    return page + header('light') + main + '\n' + footer('light') + TAIL
