#!/usr/bin/env python3
"""Generates the bilingual new-design pages: / , /synq , /synq/guides.
   Edit copy here, then:  python3 tools/build_pages.py && python3 tools/sync_chrome.py"""
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from chrome import header, footer

PUB = os.path.join(os.path.dirname(__file__), '..', 'public')
SITE = 'https://synqstudio.cloud'

def t(vi, en, tag='span', cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<{tag}{c} data-lang-block="vi">{vi}</{tag}><{tag}{c} data-lang-block="en">{en}</{tag}>'

ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
APPSTORE = 'https://apps.apple.com/vn/app/synq-hires-offline-music/id6782488036'
PLAY = 'https://play.google.com/store/apps/details?id=com.synqmusic.app'

def head(title, desc, path, body_class, preload=True, og='/store/shadowblade/feature.jpg', icon='/favicon.svg'):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{desc}" />
  <link rel="canonical" href="{SITE}{path}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{desc}" />
  <meta property="og:image" content="{SITE}{og}" />
  <meta property="og:type" content="website" />
  <meta name="theme-color" content="{'#f5f5f3' if body_class.startswith('studio') else '#0a0a0a'}" />
  <link rel="icon" type="image/svg+xml" href="{icon}" />
  <link rel="preload" href="/fonts/bvp-600-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/chrome.css" />
  <link rel="stylesheet" href="/studio.css" />
  <script>if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: reduce)').matches){{document.documentElement.className+=' anim';}}</script>
  <script src="/chrome.js" defer></script>
  <script src="/site.js" defer></script>
  <script src="/dots.js" defer></script>
</head>
<body class="{body_class if body_class.startswith('studio') else 'studio ' + body_class}">
'''

TAIL = '''
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
'''

# ------------------------------------------------------------ guides data
def read_guides():
    s = open(os.path.join(os.path.dirname(__file__), 'guides.src.html'), encoding='utf-8').read()
    out = []
    for m in re.finditer(r'<a class="guide-card" href="([^"]+)">(.*?)</a>', s, re.S):
        b = m.group(2)
        def g(tag, lang, cls=None):
            pat = rf'<{tag}[^>]*data-lang-block="{lang}"[^>]*>(.*?)</{tag}>'
            if cls: pat = rf'<{tag} class="{cls}"[^>]*data-lang-block="{lang}"[^>]*>(.*?)</{tag}>'
            mm = re.search(pat, b, re.S); return mm.group(1).strip() if mm else ''
        out.append(dict(href=m.group(1), tag_vi=g('span', 'vi', 'guide-tag'), tag_en=g('span', 'en', 'guide-tag'),
                        h_vi=g('h2', 'vi'), h_en=g('h2', 'en'), p_vi=g('p', 'vi'), p_en=g('p', 'en')))
    return out

def gcard(x):
    return f'''<a class="gcard" href="{x['href']}" data-r>
        {t(x['tag_vi'], x['tag_en'], 'span', 'tg')}
        {t(x['h_vi'], x['h_en'], 'h3')}
        {t(x['p_vi'], x['p_en'], 'p')}
        <span class="go">{t('Đọc bài →', 'Read article →')}</span>
      </a>'''

# ------------------------------------------------------------ HOME
def home():
    def cell(shape, tag, name, line, href, btn, extra=''):
        return f"""<a class="cell" href="{href}" data-shape="{shape}" data-r aria-label="{name}">
        <div class="cell-in">
          {t(*tag, 'span', 'cell-tag')}
          <h3>{name}</h3>
          {t(*line, 'p')}
          <span class="go" aria-hidden="true">{ARROW}</span>
        </div>
      </a>"""
    cells = ''.join([
        cell('pad', ('Game', 'Game'), 'Kagezan', ('Game samurai gạt đòn. Sắp ra mắt.', 'A samurai parry game. Coming soon.'), '/kagezan', ('Xem game', 'See the game')),
        cell('note', ('Nghe nhạc', 'Music player'), 'Synq', ('Nghe nhạc lossless, tự chỉnh theo tai nghe của bạn.', 'Lossless music, tuned to your headphones.'), '/synq', ('Xem Synq', 'See Synq')),
        cell('tag', ('Công cụ', 'Tool'), 'SynqTag', ('Sửa tên bài, ảnh bìa và lời ngay trong file nhạc.', 'Fix song titles, covers and lyrics right inside the file.'), '/synqtag', ('Xem SynqTag', 'See SynqTag')),
        cell('lens', ('Công cụ', 'Tool'), 'Music Check', ('Xem file nhạc là lossless thật hay MP3 đội lốt.', 'Check if a file is real lossless or a disguised MP3.'), '/music-check', ('Xem Music Check', 'See Music Check')),
    ])
    shots = ''.join(f"""<figure data-r style="--d:{i*.08}s">
        <img data-lang-block="vi" src="/store/shadowblade/vi_{f}.jpg" alt="{avi}" width="1280" height="720" loading="lazy" decoding="async" />
        <img data-lang-block="en" src="/store/shadowblade/en_{f}.jpg" alt="{aen}" width="1280" height="720" loading="lazy" decoding="async" />
      </figure>""" for i, (f, avi, aen) in enumerate([('01_kurohebi', 'Đỡ gạt mọi đòn', 'Deflect every blow'), ('03_renka', 'Phản đòn Nhất Thiểm', 'Issen counter'), ('07_gear', 'Rèn trang bị', 'Forge your gear')]))
    body = f"""{header('light')}
<main id="main-content">

  <section class="hero" aria-label="SYNQ Studio">
    <canvas class="hero-fx" aria-hidden="true"></canvas>
    <div class="wrap hero-in">
      <h1 class="display" data-lang-block="vi"><span class="ln" style="--i:0"><span>Thêm vui</span></span><span class="ln" style="--i:1"><span>mỗi ngày.</span></span></h1>
      <h1 class="display" data-lang-block="en"><span class="ln" style="--i:0"><span>Make Every Day</span></span><span class="ln" style="--i:1"><span>More Playful</span></span></h1>
      <div class="hero-row">
        {t('Bọn mình là SYNQ Studio, một studio nhỏ làm app và game.',
           'We are SYNQ Studio, a small studio making apps and games.', 'p', 'lede')}
        <div class="hero-cta">
          <a class="btn accent" href="#kagezan">{t('Xem Kagezan', 'See Kagezan')}{ARROW}</a>
          <a class="btn ghost" href="#products">{t('Tất cả sản phẩm', 'All products')}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="feat" id="kagezan" aria-labelledby="kz-h">
    <div class="wrap">
      <div class="feat-head">
        <h2 id="kz-h" class="display" data-r>Kagezan<small>{t('Gạt kiếm. Phá thế. Kết liễu.', 'Deflect. Break. Finish.')}</small></h2>
        <div data-r style="--d:.1s">
          {t('Game samurai xoay quanh đòn gạt. Đọc nhịp kiếm của đối thủ, gạt đúng lúc, rồi kết liễu khi thế địch vỡ. Chơi offline trên iPhone, iPad và Android. 15+ chương, mỗi chương một trùm.',
             'A samurai game built around the parry. Read the other swordsman’s rhythm, deflect on time, finish them when their posture breaks. Plays offline on iPhone, iPad and Android. 15+ chapters, each with its own boss.', 'p')}
          <div class="btns"><a class="btn accent" href="/kagezan">{t('Trang Kagezan', 'Kagezan page')}{ARROW}</a></div>
          {t('Sắp ra mắt trên App Store và Google Play', 'Coming soon to the App Store and Google Play', 'p', 'feat-soon')}
        </div>
      </div>
    </div>
    <div class="stage" data-stage>
      <div class="stage-pin">
        <div class="stage-media">
          <button class="vid-toggle" type="button" aria-pressed="false" aria-label="Pause trailer"><svg class="i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg><svg class="i-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
          <video data-loop muted loop playsinline autoplay preload="none" poster="/img/kagezan-loop-poster.webp" width="1024" height="576" aria-label="Kagezan gameplay"><source src="/img/kagezan-loop.mp4" type="video/mp4" /></video>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="pillars">
        <div class="pillar" data-r><h3>{t('Gạt đúng nhịp', 'Perfect deflects')}</h3>{t('Đỡ đúng lúc lưỡi kiếm chạm tới thì bạn không bị trúng đòn, thế của địch đầy dần. Vỡ thế là kết liễu.', 'Guard right as the blade lands and you take no hit while their posture fills. Break it and you finish them.', 'p')}</div>
        <div class="pillar" data-r style="--d:.08s"><h3>{t('Đòn hiểm phải đọc', 'Read the big attacks')}</h3>{t('Quét thì nhảy, đâm thì phản đòn, túm thì lướt ra. Trùm nào cũng có nhịp riêng.', 'Jump the sweep, counter the thrust, dash out of the grab. Every boss has its own rhythm.', 'p')}</div>
        <div class="pillar" data-r style="--d:.16s"><h3>{t('Đa dạng vũ khí', 'Many weapons')}</h3>{t('Katana, odachi, song đao và còn nhiều nữa. Mỗi loại đánh một kiểu.', 'Katana, odachi, twin blades and more. Each one plays differently.', 'p')}</div>
      </div>
      <div class="shots">{shots}</div>
      <div class="feat-foot" data-r>
        {t('Chơi miễn phí, không cần xem quảng cáo.', 'Free to play, no ads required.', 'p')}
        <a class="btn accent" href="/kagezan">{t('Khám phá Kagezan', 'Explore Kagezan')}{ARROW}</a>
      </div>
    </div>
  </section>

  <section class="products" id="products" aria-labelledby="pr-h">
    <canvas class="field-fx" aria-hidden="true"></canvas>
    <div class="wrap">
      <div class="products-head">
        <h2 id="pr-h" class="display h2" data-r>{t('Đồ bọn mình làm', 'What we make')}</h2>
      </div>
      <div class="cells">{cells}</div>
    </div>
  </section>

  <section class="about wrap" id="about" aria-labelledby="ab-h">
    <h2 id="ab-h" class="sr">{t('Về studio', 'About the studio')}</h2>
    <p class="about-statement" data-words data-lang-block="vi">Bọn mình là studio nhỏ, làm game, làm app, chưa ưng thì sửa, chủ yếu là vui.</p>
    <p class="about-statement" data-words data-lang-block="en">We are a small studio. We make games and apps, fix what we do not like yet, and mostly have fun.</p>
    <div class="about-cols">
      <div data-r><h3>{t('Liên hệ', 'Contact')}</h3><p><a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a></p></div>
      <div data-r style="--d:.08s"><h3>{t('Hỗ trợ', 'Support')}</h3><p><a href="/support">{t('Hỗ trợ Synq', 'Synq support')}</a><br /><a href="/kagezan-support">{t('Hỗ trợ Kagezan', 'Kagezan support')}</a></p></div>
      <div data-r style="--d:.16s"><h3>{t('Đọc thêm', 'Read more')}</h3><p><a href="/synq/guides">{t('Bài viết về nhạc lossless', 'Articles on lossless music')}</a><br /><a href="/changelog">{t('Synq có gì mới', 'What is new in Synq')}</a></p></div>
    </div>
  </section>
  <div class="giant" aria-hidden="true">SYNQ</div>
</main>

{footer('light')}
"""
    return head('SYNQ Studio - Make Every Day More Playful',
                'SYNQ Studio is a small team. Home of Kagezan, a samurai parry game, and Synq, a lossless music player, plus SynqTag and Music Check.',
                '/', 'studio') + body + TAIL


# ------------------------------------------------------------ HELP
def help_page():
    def block(shape, name, line, links):
        li = ''.join(f'<li><a href="{h}">{t(vi, en)}{ARROW}</a></li>' for h, vi, en in links)
        return f"""<section class="help-block wrap" data-r>
      <canvas class="help-shape" data-shape="{shape}" aria-hidden="true"></canvas>
      <div><h2>{name}</h2>{t(*line, 'p')}</div>
      <ul class="help-links">{li}</ul>
    </section>"""
    blocks = ''.join([
        block('pad', 'Kagezan', ('Game samurai gạt đòn.', 'The samurai parry game.'), [
            ('/kagezan-support', 'Hỗ trợ và câu hỏi', 'Support and FAQ'), ('/kagezan-privacy', 'Quyền riêng tư', 'Privacy'),
            ('/kagezan-terms', 'Điều khoản', 'Terms'), ('/kagezan-delete-account', 'Xoá tài khoản', 'Delete account')]),
        block('note', 'Synq', ('App nghe nhạc lossless.', 'The lossless music player.'), [
            ('/support', 'Hỗ trợ và câu hỏi', 'Support and FAQ'), ('/synq/guides', 'Bài viết và hướng dẫn', 'Articles and guides'),
            ('/changelog', 'Có gì mới', 'What is new'), ('/privacy', 'Quyền riêng tư', 'Privacy'),
            ('/terms', 'Điều khoản', 'Terms'), ('/delete-account', 'Xoá tài khoản', 'Delete account')]),
        block('tag', 'SynqTag', ('Sửa thẻ nhạc ngay trong file.', 'Edit song tags inside the file.'), [
            ('/synqtag', 'Hỗ trợ và câu hỏi', 'Support and FAQ'), ('/synqtag-privacy', 'Quyền riêng tư', 'Privacy')]),
        block('lens', 'Music Check', ('Xem file nhạc có phải lossless thật.', 'Check if a file is real lossless.'), [
            ('/music-check', 'Hỗ trợ và thông tin', 'Support and info'), ('/music-check-privacy', 'Quyền riêng tư', 'Privacy')]),
    ])
    body = f"""{header('light', 'support')}
<main id="main-content">
  <section class="help-head wrap">
    <h1 class="display" data-lang-block="vi">Cần giúp gì không?</h1>
    <h1 class="display" data-lang-block="en">Need a hand?</h1>
    {t('Mỗi app có một góc riêng ở dưới. Không thấy câu trả lời thì gửi mail, bọn mình sẽ trả lời.', 'Each app has its own corner below. If you cannot find an answer, send us an email and we will reply.', 'p', 'lede')}
  </section>
  {blocks}
  <section class="help-contact wrap" data-r>
    {t('Vẫn chưa ổn? Viết cho bọn mình:', 'Still stuck? Write to us:', 'p')}
    <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>
  </section>
</main>

{footer('light')}
"""
    return head('Help - SYNQ Studio', 'Support, privacy, terms and account deletion for Kagezan, Synq, SynqTag and Music Check, plus how to reach SYNQ Studio.', '/help', 'studio') + body + TAIL

# ------------------------------------------------------------ SYNQ HUB
def hub(gs):
    def row(flip, h, p, lis, img, alt):
        li = ''.join(f'<li>{x}</li>' for x in lis)
        return f"""<section class="sh-row wrap{' flip' if flip else ''}">
      <div data-r>{h}{p}<ul>{li}</ul></div>
      <div class="sh-media" data-r style="--d:.1s"><img src="/img/{img}" width="520" height="1128" alt="{alt}" loading="lazy" decoding="async" /></div>
    </section>"""
    rows = ''.join([
      row(False, t('Chỉnh theo tai nghe của bạn', 'Tuned to your headphones', 'h2', 'display'),
          t('AutoEQ có sẵn đường chỉnh cho hơn 6.000 mẫu tai nghe và IEM. Chọn đúng mẫu của bạn là xong.', 'AutoEQ ships with correction curves for 6,000+ headphones and IEMs. Pick yours and you are done.', 'p'),
          [t('6.000+ profile tai nghe &amp; IEM', '6,000+ headphone &amp; IEM profiles'), t('EQ tham số, có preset tự lưu', 'Parametric EQ with your own presets'), t('Xem tần số theo thời gian thực', 'Live frequency view')], 'synq-phone-2.webp', 'Synq AutoEQ screen'),
      row(True, t('Cả thư viện, lossless', 'Your whole library, lossless', 'h2', 'display'),
          t('Duyệt theo bài, nghệ sĩ, album hay thể loại. Mọi thứ chạy offline.', 'Browse by song, artist, album or genre. It all works offline.', 'p'),
          [t('FLAC, ALAC, WAV, MP3, AAC', 'FLAC, ALAC, WAV, MP3, AAC'), t('Offline 100%, không cần mạng', 'Fully offline, no internet needed')], 'synq-phone-3.webp', 'Synq library screen'),
      row(False, t('Hợp với cách bạn nghe', 'Fits how you listen', 'h2', 'display'),
          t('Mix mỗi ngày từ chính nhạc của bạn, kèm thống kê xem bạn hay nghe gì.', 'Daily mixes from your own music, plus stats on what you play most.', 'p'),
          [t('Mix hằng ngày từ thư viện của bạn', 'Daily mixes from your own library'), t('Thời gian nghe, lượt phát, thống kê bài', 'Listening time, plays and track stats'), t('Xem theo ngày, tuần, tháng, năm', 'Day, week, month and year views')], 'synq-phone-4.webp', 'Synq stats screen'),
    ])
    stores = f'<a class="btn" href="{APPSTORE}" target="_blank" rel="noopener">App Store</a><a class="btn ghost" href="{PLAY}" target="_blank" rel="noopener">Google Play</a>'
    body = f"""{header('dark')}
<main id="main-content">
  <section class="sh-hero wrap" aria-label="Synq">
    <div>
      <span class="crumb"><a href="/">SYNQ Studio</a> / Synq</span>
      <h1 class="display" data-lang-block="vi">Synq: nhạc lossless, chỉnh theo tai bạn.</h1>
      <h1 class="display" data-lang-block="en">Synq: lossless music, tuned to you.</h1>
      {t('Synq là app nghe nhạc phát lossless đúng như file gốc. Có AutoEQ cho hơn 6.000 tai nghe, lời đồng bộ theo bài và thư viện gọn gàng.', 'Synq is a music player that plays lossless exactly as the file is. It has AutoEQ for 6,000+ headphones, synced lyrics and a tidy library.', 'p', 'lede')}
      <div class="hero-cta">{stores}</div>
    </div>
    <div class="sh-phones" aria-hidden="true">
      <img src="/img/synq-phone-1.webp" width="520" height="1128" alt="" decoding="async" fetchpriority="high" />
      <img src="/img/synq-phone-3.webp" width="520" height="1128" alt="" decoding="async" />
    </div>
  </section>
  {rows}
  <section class="sh-section" id="guides" aria-labelledby="g-h">
    <div class="wrap">
      <div class="sec-head">
        <div><h2 id="g-h" class="display" data-r>{t('Bài viết &amp; hướng dẫn', 'Articles &amp; guides')}</h2>
        {t('Chuyện nghe nhạc lossless: định dạng, DAC, NAS, cách kiểm tra file. Có bài mới thì thêm vào.', 'Notes on listening to lossless: formats, DACs, NAS, how to check a file. New ones get added.', 'p', 'sec-sub')}</div>
        <a class="btn ghost" href="/synq/guides">{t('Tất cả bài viết', 'All articles')}{ARROW}</a>
      </div>
      <div class="gcards">{''.join(gcard(x) for x in gs[:6])}</div>
    </div>
  </section>
  <section class="sh-section" aria-labelledby="m-h">
    <div class="wrap">
      <div class="sec-head"><h2 id="m-h" class="display" data-r>{t('Thêm từ Synq', 'More from Synq')}</h2></div>
      <div class="mini">
        <a href="/changelog" data-r><img src="/logo-mark.svg" width="64" height="64" alt="" loading="lazy" /><div><b>{t('Có gì mới', 'What is new')}</b>{t('Nhật ký cập nhật của Synq.', 'Release notes for Synq.', 'span')}</div></a>
        <a href="/synqtag" data-r style="--d:.08s"><img src="/store/synqtag_icon.png" width="64" height="64" alt="" loading="lazy" /><div><b>SynqTag</b>{t('Sửa thẻ nhạc ngay trong file.', 'Edit song tags inside the file.', 'span')}</div></a>
        <a href="/music-check" data-r style="--d:.16s"><img src="/img/icon-musiccheck.webp" width="64" height="64" alt="" loading="lazy" /><div><b>Music Check</b>{t('Xem file có phải lossless thật.', 'Check if a file is real lossless.', 'span')}</div></a>
      </div>
    </div>
  </section>
  <section class="sh-cta" aria-labelledby="c-h">
    <div class="wrap">
      <h2 class="display" data-lang-block="vi">Thử nghe xem.</h2>
      <h2 class="display" data-lang-block="en">Give it a listen.</h2>
      <div><div class="stores">{stores}</div>{t('Tải miễn phí. Nghe nhạc có sẵn trong máy thì không cần tài khoản.', 'Free to download. Playing your own files needs no account.', 'p', 'sec-sub')}
      <p class="sec-sub"><a href="/support" style="color:inherit">{t('Hỗ trợ', 'Support')}</a> · <a href="/privacy" style="color:inherit">{t('Quyền riêng tư', 'Privacy')}</a></p></div>
    </div>
  </section>
</main>

{footer('dark')}
"""
    return head('Synq - Lossless music player, tuned to your headphones',
                'Synq is a music player with true lossless audio, AutoEQ for 6,000+ headphones, synced lyrics and a tidy library. iOS and Android. Plus articles and guides on lossless music.',
                '/synq', 'world-synq', og='/store/Synq_play_feature_1024x500.png', icon='/logo-mark.svg') + body + TAIL

def guides_index(gs):
    body = f"""{header('dark', )}
<main id="main-content">
  <section class="sh-pagehead wrap">
    <span class="crumb"><a href="/">SYNQ Studio</a> / <a href="/synq">Synq</a> / {t('Bài viết', 'Guides')}</span>
    <h1 class="display" data-lang-block="vi">Bài viết &amp; hướng dẫn Synq</h1>
    <h1 class="display" data-lang-block="en">Synq articles &amp; guides</h1>
    {t('Hướng dẫn từng bước và mẹo nghe nhạc lossless: nối NAS, chọn DAC, đọc phổ, hiểu các định dạng. Có bài mới thì thêm vào.', 'Step-by-step guides and tips for listening to lossless: connecting a NAS, choosing a DAC, reading a spectrum, understanding formats. New ones get added.', 'p', 'lede')}
  </section>
  <div class="wrap"><div class="gcards all">{''.join(gcard(x) for x in gs)}</div></div>
</main>

{footer('dark')}
"""
    return head('Synq articles & guides - lossless audio, DACs, NAS',
                'Articles and step-by-step guides for listening to lossless music: formats, DACs, NAS setup, reading a spectrum and more.',
                '/synq/guides', 'world-synq', og='/store/Synq_play_feature_1024x500.png', icon='/logo-mark.svg') + body + TAIL

if __name__ == '__main__':
    gs = read_guides()
    assert len(gs) >= 19, len(gs)
    open(os.path.join(PUB, 'index.html'), 'w', encoding='utf-8').write(home())
    open(os.path.join(PUB, 'help.html'), 'w', encoding='utf-8').write(help_page())
    os.makedirs(os.path.join(PUB, 'synq'), exist_ok=True)
    open(os.path.join(PUB, 'synq/index.html'), 'w', encoding='utf-8').write(hub(gs))
    open(os.path.join(PUB, 'synq/guides.html'), 'w', encoding='utf-8').write(guides_index(gs))
    print('built', len(gs), 'guides')
