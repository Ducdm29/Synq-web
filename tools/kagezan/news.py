"""Kagezan news: Markdown posts in content/kagezan/news/*.md -> /kagezan/news and /kagezan/news/<slug>.

Post file:  front matter between --- lines (key: value), then "=== vi" and "=== en" body sections.
Keys: title_vi, title_en, date (YYYY-MM-DD), publish_at (ISO, +07:00), summary_vi, summary_en,
      youtube (id, optional), poster (optional, default /img/news/<slug>.webp), hold (optional: any text = keep it out of the build).
Date gate: a post whose publish_at is later than now (or that has `hold`) is NOT built, so nothing goes live before its video is public.
Markdown subset: paragraphs, "## " headings, "- " bullets, **bold**, [text](/path or https://...).
"""
import os, re, html, glob, datetime, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, os.path.join(HERE, '..'))
from chrome import header, footer
from build_pages import head, t, ARROW, TAIL

SRC = os.path.join(ROOT, 'content', 'kagezan', 'news')
OUT = os.path.join(ROOT, 'public', 'kagezan')


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'\[([^\]]+)\]\(((?:/|https://)[^)\s]+)\)', r'<a href="\2">\1</a>', s)
    return s


def md(text):
    out, para, items = [], [], []
    def flush():
        if para: out.append('<p>%s</p>' % inline(' '.join(para))); para.clear()
        if items: out.append('<ul>%s</ul>' % ''.join('<li>%s</li>' % inline(i) for i in items)); items.clear()
    for line in text.strip().split('\n'):
        l = line.rstrip()
        if not l.strip(): flush(); continue
        if l.startswith('## '): flush(); out.append('<h2>%s</h2>' % inline(l[3:])); continue
        if l.startswith('- '):
            if para: flush()
            items.append(l[2:]); continue
        if items: flush()
        para.append(l.strip())
    flush()
    return '\n'.join(out)


def load():
    posts = []
    for path in sorted(glob.glob(os.path.join(SRC, '*.md'))):
        raw = open(path, encoding='utf-8').read()
        m = re.match(r'---\n(.*?)\n---\n(.*)', raw, re.S)
        meta = dict(re.findall(r'^(\w+):\s*(.*)$', m.group(1), re.M))
        body = {}
        for lang, txt in re.findall(r'^=== (vi|en)\n(.*?)(?=^=== |\Z)', m.group(2), re.S | re.M): body[lang] = txt
        slug = os.path.basename(path)[:-3]
        d = datetime.date.fromisoformat(meta['date'])
        posts.append(dict(slug=slug, meta=meta, vi=body['vi'], en=body['en'], date=d,
                          publish_at=datetime.datetime.fromisoformat(meta['publish_at']),
                          date_vi=d.strftime('%d/%m/%Y'), date_en=d.strftime('%d %b %Y').lstrip('0')))
    return posts


def live(now=None):
    now = now or datetime.datetime.now(datetime.timezone.utc)
    ps = [p for p in load() if p['publish_at'] <= now and not p['meta'].get('hold')]
    ps.sort(key=lambda p: (p['publish_at'], p['slug']), reverse=True)
    return ps


def landing_posts(ps):
    return [dict(href='/kagezan/news/' + p['slug'], date_vi=p['date_vi'], date_en=p['date_en'],
                 title_vi=html.escape(p['meta']['title_vi']), title_en=html.escape(p['meta']['title_en']),
                 text_vi=html.escape(p['meta']['summary_vi']), text_en=html.escape(p['meta']['summary_en'])) for p in ps]


def poster_of(p):
    return '/img/news/%s.webp' % p['slug']          # 1200x800, og image


def post_page(p):
    m = p['meta']; yt = m.get('youtube')
    title_vi, title_en = html.escape(m['title_vi']), html.escape(m['title_en'])
    media = ''
    if yt:
        media = """<div class="news-media" data-r>
      <button class="yt-facade" type="button" data-yt="%s" aria-label="Phát video / Play video">
        <img src="%s" width="540" height="960" alt="" loading="eager" decoding="async" />
        <span class="yt-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
      </button>
      <a class="news-yt" href="https://youtu.be/%s" target="_blank" rel="noopener">%s</a>
    </div>""" % (yt, '/img/news/%s-v.webp' % p['slug'], yt, t('Xem trên YouTube', 'Watch on YouTube'))
    body = """%s
<main id="main-content">
  <article class="news-post wrap">
    <p class="news-back"><a href="/kagezan">Kagezan</a> / <a href="/kagezan/news">%s</a></p>
    <div class="news-grid">
      %s
      <div class="news-text">
        <p class="news-date">%s</p>
        <h1 class="display" data-lang-block="vi">%s</h1>
        <h1 class="display" data-lang-block="en">%s</h1>
        <div class="news-body" data-lang-block="vi">%s</div>
        <div class="news-body" data-lang-block="en">%s</div>
        <p class="news-all"><a class="btn ghost" href="/kagezan/news">%s</a> <a class="btn" href="/kagezan">%s%s</a></p>
      </div>
    </div>
  </article>
</main>

%s
""" % (header('light'), t('Tin', 'News'), media, t(p['date_vi'], p['date_en']), title_vi, title_en, md(p['vi']), md(p['en']),
       t('Tất cả tin', 'All news'), t('Về Kagezan', 'Back to Kagezan'), ARROW, footer('light'))
    page = head('%s - Kagezan' % m['title_en'], html.escape(m['summary_en']), '/kagezan/news/' + p['slug'], 'studio news',
                og=poster_of(p), icon='/store/shadowblade/icon.png')
    return page.replace('<script src="/dots.js" defer></script>', '<script src="/news.js" defer></script>') + body + TAIL


def list_page(ps):
    rows = ''.join("""<li data-r><a href="/kagezan/news/%s"><span class="news-date">%s</span><h2>%s</h2>%s%s</a></li>""" % (
        p['slug'], t(p['date_vi'], p['date_en']), t(html.escape(p['meta']['title_vi']), html.escape(p['meta']['title_en'])),
        t(html.escape(p['meta']['summary_vi']), html.escape(p['meta']['summary_en']), 'p'), ARROW) for p in ps)
    body = """%s
<main id="main-content">
  <section class="news-head wrap">
    <p class="news-back"><a href="/kagezan">Kagezan</a> / %s</p>
    <h1 class="display" data-lang-block="vi">Tin Kagezan</h1>
    <h1 class="display" data-lang-block="en">Kagezan news</h1>
    %s
  </section>
  <ol class="news-list wrap">%s</ol>
</main>

%s
""" % (header('light'), t('Tin', 'News'),
       t('Devlog và giới thiệu từng trùm. Có video mới thì bài mới lên.', 'Devlogs and a look at every boss. A new post goes up with each new video.', 'p', 'lede'), rows, footer('light'))
    return head('Kagezan news - devlogs and boss fights', 'Devlogs and boss fights from Kagezan, the samurai parry game.', '/kagezan/news', 'studio news',
                og='/store/shadowblade/feature.jpg', icon='/store/shadowblade/icon.png').replace('<script src="/dots.js" defer></script>', '') + body + TAIL


def build(now=None):
    ps = live(now)
    os.makedirs(os.path.join(OUT, 'news'), exist_ok=True)
    for f in glob.glob(os.path.join(OUT, 'news', '*.html')): os.remove(f)      # a gated post must never linger from an earlier build
    for p in ps:
        open(os.path.join(OUT, 'news', p['slug'] + '.html'), 'w', encoding='utf-8').write(post_page(p))
    open(os.path.join(OUT, 'news.html'), 'w', encoding='utf-8').write(list_page(ps))
    return ps
