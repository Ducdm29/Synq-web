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
  <meta name="theme-color" content="{'#f5f5f3' if body_class == 'studio' else '#0a0d10'}" />
  <link rel="icon" type="image/svg+xml" href="{icon}" />
  <link rel="preload" href="/fonts/inter-tight-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/chrome.css" />
  <link rel="stylesheet" href="/studio.css" />
  <script>if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: reduce)').matches){{document.documentElement.className+=' anim';}}</script>
  <script src="/chrome.js" defer></script>
  <script src="/site.js" defer></script>
</head>
<body class="studio {body_class if body_class != 'studio' else ''}">
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
    marq = ''.join(f'<span>{n}<i>/</i></span>' for n in ['Kagezan', '<b class="jp" lang="ja">影斬</b>', 'Synq', 'SynqTag', 'Music Check'])
    mq1 = f'<div class="marquee-track" aria-hidden="true">{marq}{marq}{marq}{marq}</div>'
    def card(n, name, cls, bg, fg, tag, meta, acts, media, mbg=''):
        mb = f' style="--mbg:{mbg}"' if mbg else ''
        return f'''<article class="pcard {cls}" style="--n:{n};--bg:{bg};--fg:{fg}" data-r>
        <div class="pcard-body">
          <div><h3>{name}</h3>{tag}{meta}</div>
          <div class="acts">{acts}</div>
        </div>
        <div class="pcard-media"{mb}>{media}</div>
      </article>'''
    cards = [
      card(0, 'Kagezan', '', '#150f10', '#f4f1ec',
           t('Hành động samurai gạt đòn: gạt, phá thế, kết liễu.', 'Samurai parry action: deflect, break posture, finish.', 'p', 'tag'),
           t('iOS · Android · Sắp ra mắt', 'iOS · Android · Coming soon', 'p', 'meta'),
           f'<a class="btn" href="/kagezan">{t("Tìm hiểu thêm","Learn more")}<span class="sr"> Kagezan</span>{ARROW}</a>',
           '<img class="emblem" src="/img/kagezan-emblem.png" width="420" height="420" alt="Kagezan logo" loading="lazy" decoding="async" />', '#020202'),
      card(1, 'Synq', '', '#0c211f', '#e9fbf7',
           t('Trình nghe nhạc lossless thật sự, chỉnh theo tai nghe của bạn bằng AutoEQ.', 'A music player for true lossless audio, tuned to your headphones with AutoEQ.', 'p', 'tag'),
           t('iOS · Android', 'iOS · Android', 'p', 'meta'),
           f'<a class="btn" href="/synq">{t("Tìm hiểu thêm","Learn more")}<span class="sr"> Synq</span>{ARROW}</a><a class="btn q" href="{APPSTORE}" target="_blank" rel="noopener">App Store</a><a class="btn q" href="{PLAY}" target="_blank" rel="noopener">Google Play</a>',
           '<div class="phones"><img src="/img/synq-phone-1.webp" width="520" height="1128" alt="Synq now playing screen" loading="lazy" decoding="async" /><img src="/img/synq-phone-3.webp" width="520" height="1128" alt="Synq library screen" loading="lazy" decoding="async" /></div>', '#0a1715'),
      card(2, 'SynqTag', 'light', '#dfe9e3', '#0e1a14',
           t('Sửa tên bài, nghệ sĩ, ảnh bìa và lời, ghi thẳng vào file nhạc.', 'Edit titles, artists, covers and lyrics, written straight into the file.', 'p', 'tag'),
           t('iOS · Android', 'iOS · Android', 'p', 'meta'),
           f'<a class="btn" href="/synqtag">{t("Tìm hiểu thêm","Learn more")}<span class="sr"> SynqTag</span>{ARROW}</a><a class="btn q" href="https://apps.apple.com/vn/app/synqtag-edit-songs-metadata/id6816595732" target="_blank" rel="noopener">App Store</a><a class="btn q" href="https://play.google.com/store/apps/details?id=com.synqmusic.tagsmith" target="_blank" rel="noopener">Google Play</a>',
           f'<div class="icon-pair"><img class="icon-big" src="/store/synqtag_icon.png" width="240" height="240" alt="SynqTag app icon" loading="lazy" decoding="async" />{t("<span>Tên bài</span><span>Nghệ sĩ</span><span>Album</span><span>Ảnh bìa</span><span>Lời</span>", "<span>Title</span><span>Artist</span><span>Album</span><span>Cover</span><span>Lyrics</span>", "div", "chips")}</div>', '#cfe0d6'),
      card(3, 'Music Check', 'light', '#e1e6ea', '#101418',
           t('Xem file nhạc là lossless xịn hay MP3 đội lốt FLAC.', 'Find out if a file is real lossless or an MP3 dressed up as FLAC.', 'p', 'tag'),
           t('iOS · Android', 'iOS · Android', 'p', 'meta'),
           f'<a class="btn" href="/music-check">{t("Tìm hiểu thêm","Learn more")}<span class="sr"> Music Check</span>{ARROW}</a><a class="btn q" href="https://apps.apple.com/vn/app/music-check/id6800414074" target="_blank" rel="noopener">App Store</a><a class="btn q" href="https://play.google.com/store/apps/details?id=com.verifymusic.app" target="_blank" rel="noopener">Google Play</a>',
           '<div class="phones"><img src="/img/musiccheck-phone.webp" width="520" height="1130" alt="Music Check analysis screen" loading="lazy" decoding="async" /></div>', '#cdd6dc'),
    ]
    shots = ''.join(f'''<figure data-r style="--d:{i*.08}s">
        <img data-lang-block="vi" src="/store/shadowblade/vi_{f}.jpg" alt="{avi}" width="1280" height="720" loading="lazy" decoding="async" />
        <img data-lang-block="en" src="/store/shadowblade/en_{f}.jpg" alt="{aen}" width="1280" height="720" loading="lazy" decoding="async" />
      </figure>''' for i, (f, avi, aen) in enumerate([('01_kurohebi', 'Đỡ gạt mọi đòn', 'Deflect every blow'), ('02_mugen', 'Đọc đòn hiểm', 'Read the danger'), ('03_renka', 'Phản đòn Nhất Thiểm', 'Issen counter')]))
    body = f'''{header('light')}
<main id="main-content">

  <section class="hero wrap">
    <h1 class="display" data-lang-block="vi"><span class="ln" style="--i:0"><span>Game và ứng dụng,</span></span><span class="ln" style="--i:1"><span>làm cho kỹ.</span></span></h1>
    <h1 class="display" data-lang-block="en"><span class="ln" style="--i:0"><span>Games and apps,</span></span><span class="ln" style="--i:1"><span>made with care.</span></span></h1>
    <div class="hero-row">
      {t('SYNQ Studio là studio độc lập nhỏ. Chúng tôi làm một game samurai lấy đòn gạt làm trọng tâm, một ứng dụng nghe nhạc lossless và các công cụ đi kèm.',
         'SYNQ Studio is a small independent studio. We make a samurai parry game, a lossless music player and the tools around them.', 'p', 'lede')}
      <div class="hero-cta">
        <a class="btn" href="#kagezan">{t('Xem Kagezan', 'Meet Kagezan')}{ARROW}</a>
        <a class="btn ghost" href="#products">{t('Tất cả sản phẩm', 'All products')}</a>
      </div>
    </div>
    <div class="marquee" aria-hidden="true">{mq1}</div>
  </section>

  <section class="feat" id="kagezan" aria-labelledby="kz-h">
    <div class="wrap">
      <div class="feat-head">
        <h2 id="kz-h" class="display" data-r><span style="display:block">Kagezan</span><span style="display:block;font-size:.4em;letter-spacing:-0.04em;color:var(--red);margin-top:.18em">{t('Gạt kiếm. Phá thế. Kết liễu.', 'Deflect. Break. Finish.')}</span></h2>
        <div data-r style="--d:.1s">
          {t('Game hành động samurai lấy đòn gạt làm trọng tâm: đọc nhịp kiếm của đối thủ, gạt đúng khoảnh khắc và kết liễu khi thế địch vỡ. Chơi được offline trên iPhone, iPad và Android.',
             'A samurai action game built around the parry. Read your opponent’s rhythm, deflect at the right instant and finish them when their posture breaks. Plays offline on iPhone, iPad and Android.', 'p')}
          <div class="btns"><a class="btn light" href="/kagezan">{t('Trang Kagezan', 'Kagezan page')}{ARROW}</a></div>
          {t('Sắp ra mắt trên App Store và Google Play', 'Coming soon to the App Store and Google Play', 'p', 'feat-soon')}
        </div>
      </div>
    </div>
    <div class="stage" data-stage>
      <div class="stage-pin">
        <div class="stage-kanji" aria-hidden="true" lang="ja">影斬</div>
        <div class="stage-media">
          <video data-loop muted loop playsinline autoplay preload="none" poster="/img/kagezan-loop-poster.webp" width="1024" height="576" aria-label="Kagezan gameplay"><source src="/img/kagezan-loop.mp4" type="video/mp4" /></video>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="pillars">
        <div class="pillar" data-r><h3>{t('Gạt đúng nhịp', 'Perfect deflects')}</h3>{t('Đỡ đúng khoảnh khắc lưỡi kiếm chạm tới để gạt: không mất máu, dồn thế địch. Vỡ thế là kết liễu.', 'Guard right as the blade lands to deflect: no damage, and the enemy’s posture fills. Break it for a finishing blow.', 'p')}</div>
        <div class="pillar" data-r style="--d:.08s"><h3>{t('Đòn hiểm phải đọc', 'Read the perilous attacks')}</h3>{t('Quét thì nhảy, đâm thì phản đòn Nhất Thiểm, túm thì lướt né. Mỗi trùm có nhịp riêng để học.', 'Jump the sweep, counter the thrust, dash out of the grab. Every boss has its own rhythm to learn.', 'p')}</div>
        <div class="pillar" data-r style="--d:.16s"><h3>{t('Ba lối kiếm', 'Three blade styles')}</h3>{t('Katana nhanh, Odachi nặng hai tay, Song đao liên hoàn. Mỗi loại một tuyệt kỹ riêng.', 'Swift katana, two-handed odachi or twin blades, each with its own signature skill.', 'p')}</div>
      </div>
      <div class="shots">{shots}</div>
      <div class="feat-foot" data-r>
        {t('Miễn phí, có gói Ngọc mua trong app (không bắt buộc). Quảng cáo có thưởng chỉ hiện khi bạn tự chọn xem.', 'Free to play, with optional in-app purchases of Jade. Rewarded ads appear only when you choose to watch one.', 'p')}
        <a class="btn red" href="/kagezan">{t('Khám phá Kagezan', 'Explore Kagezan')}{ARROW}</a>
      </div>
    </div>
  </section>

  <section class="products" id="products" aria-labelledby="pr-h">
    <div class="wrap">
      <div class="products-head">
        <h2 id="pr-h" class="display h2" data-r>{t('Mọi thứ chúng tôi làm', 'Everything we ship')}</h2>
        {t('Một game và ba ứng dụng âm nhạc.', 'One game and three music apps.', 'p', 'lede')}
      </div>
      <div class="stack">
      {''.join(cards)}
      </div>
    </div>
  </section>

  <section class="about wrap" id="about" aria-labelledby="ab-h">
    <h2 id="ab-h" class="sr">{t('Về studio', 'About the studio')}</h2>
    <p class="about-statement" data-words data-lang-block="vi">SYNQ Studio nhỏ có chủ đích. Chúng tôi làm một game samurai gạt đòn, một ứng dụng nghe nhạc lossless và các công cụ đi kèm, rồi tiếp tục cải thiện từng sản phẩm sau khi ra mắt.</p>
    <p class="about-statement" data-words data-lang-block="en">SYNQ Studio is small on purpose. We make a samurai parry game, a lossless music player and the tools around it, and we keep improving each one after it ships.</p>
    <div class="about-cols">
      <div data-r><h3>{t('Liên hệ', 'Contact')}</h3><p><a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a></p></div>
      <div data-r style="--d:.08s"><h3>{t('Hỗ trợ', 'Support')}</h3><p><a href="/support">{t('Hỗ trợ Synq', 'Synq support')}</a><br /><a href="/kagezan-support">{t('Hỗ trợ Kagezan', 'Kagezan support')}</a></p></div>
      <div data-r style="--d:.16s"><h3>{t('Đọc thêm', 'Read more')}</h3><p><a href="/synq/guides">{t('Bài viết về âm thanh lossless', 'Articles on lossless audio')}</a><br /><a href="/changelog">{t('Synq có gì mới', 'What’s new in Synq')}</a></p></div>
    </div>
  </section>
  <div class="giant" aria-hidden="true">SYNQ</div>
</main>

{footer('light')}
'''
    return head('SYNQ Studio — Games and apps, made with care',
                'SYNQ Studio is a small independent studio. Home of Kagezan, a samurai parry game, and Synq, a lossless music player, plus SynqTag and Music Check.',
                '/', 'studio') + body + TAIL

# ------------------------------------------------------------ SYNQ HUB
def hub(gs):
    def row(flip, h, p, lis, img, alt):
        li = ''.join(f'<li>{x}</li>' for x in lis)
        return f'''<section class="sh-row wrap{' flip' if flip else ''}">
      <div data-r>{h}{p}<ul>{li}</ul></div>
      <div class="sh-media" data-r style="--d:.1s"><img src="/img/{img}" width="520" height="1128" alt="{alt}" loading="lazy" decoding="async" /></div>
    </section>'''
    rows = ''.join([
      row(False, t('Chỉnh theo tai nghe của bạn', 'Tuned to your headphones', 'h2', 'display'),
          t('AutoEQ phân tích và áp dụng đường cong hiệu chỉnh cho hơn 6.000 mẫu tai nghe và IEM, hoàn toàn tự động.', 'AutoEQ applies the correction curve for 6,000+ headphone and IEM models, automatically. No manual tweaking.', 'p'),
          [t('6.000+ profile tai nghe &amp; IEM', '6,000+ headphone &amp; IEM profiles'), t('EQ tham số với preset tùy chỉnh', 'Parametric EQ with custom presets'), t('Hiển thị tần số thời gian thực', 'Real-time frequency visualization')], 'synq-phone-2.webp', 'Synq AutoEQ screen'),
      row(True, t('Toàn bộ thư viện, lossless', 'Your whole library, in lossless', 'h2', 'display'),
          t('Duyệt theo bài, nghệ sĩ, album hoặc thể loại. Hoạt động hoàn toàn offline: không stream, không đệm, không thỏa hiệp.', 'Browse by song, artist, album or genre. Works entirely offline: no stream, no buffer, no compromise.', 'p'),
          [t('FLAC, ALAC, WAV, MP3, AAC', 'FLAC, ALAC, WAV, MP3, AAC'), t('100% offline, không cần internet', '100% offline, no internet required')], 'synq-phone-3.webp', 'Synq library screen'),
      row(False, t('Làm theo cách bạn nghe', 'Made for the way you listen', 'h2', 'display'),
          t('Mix hàng ngày từ gu của bạn, thống kê nghe nhạc cho thấy thói quen thay đổi, và trang chủ cá nhân thay vì nhiễu thuật toán.', 'Daily mixes built around your taste, listening stats that show how your habits evolve, and a Home feed that feels personal.', 'p'),
          [t('Mix hàng ngày từ thư viện của bạn', 'Daily mixes from your own library'), t('Thời gian nghe, lượt phát &amp; thống kê', 'Listening time, plays &amp; track stats'), t('Ngày · Tuần · Tháng · Năm', 'Day · Week · Month · Year views')], 'synq-phone-4.webp', 'Synq stats screen'),
    ])
    stores = f'<a class="btn" href="{APPSTORE}" target="_blank" rel="noopener">App Store</a><a class="btn ghost" href="{PLAY}" target="_blank" rel="noopener">Google Play</a>'
    body = f'''{header('dark')}
<main id="main-content">
  <section class="sh-hero wrap">
    <div>
      <span class="crumb"><a href="/">SYNQ Studio</a> / Synq</span>
      <h1 class="display" data-lang-block="vi">Synq: nhạc lossless, chỉnh theo tai bạn.</h1>
      <h1 class="display" data-lang-block="en">Synq: lossless music, tuned to you.</h1>
      {t('Trình nghe nhạc với âm thanh lossless thật sự, AutoEQ cho hơn 6.000 tai nghe, lời đồng bộ và thư viện thông minh. Không nén. Không thỏa hiệp.', 'A music player with true lossless audio, AutoEQ for 6,000+ headphones, synced lyrics and a smart library. No compression. No compromise.', 'p', 'lede')}
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
        {t('Nghe nhạc lossless cho đúng: định dạng, DAC, NAS, cách kiểm tra file. Cập nhật dần.', 'Listening to lossless properly: formats, DACs, NAS, how to check a file. Added over time.', 'p', 'sec-sub')}</div>
        <a class="btn ghost" href="/synq/guides">{t('Tất cả bài viết', 'All articles')}{ARROW}</a>
      </div>
      <div class="gcards">{''.join(gcard(x) for x in gs[:6])}</div>
    </div>
  </section>
  <section class="sh-section" aria-labelledby="m-h">
    <div class="wrap">
      <div class="sec-head"><h2 id="m-h" class="display" data-r>{t('Thêm từ Synq', 'More from Synq')}</h2></div>
      <div class="mini">
        <a href="/changelog" data-r><img src="/logo-mark.svg" width="64" height="64" alt="" loading="lazy" /><div><b>{t('Có gì mới', 'What’s new')}</b>{t('Nhật ký cập nhật Synq.', 'Release notes for Synq.', 'span')}</div></a>
        <a href="/synqtag" data-r style="--d:.08s"><img src="/store/synqtag_icon.png" width="64" height="64" alt="" loading="lazy" /><div><b>SynqTag</b>{t('Sửa thẻ nhạc, ghi thẳng vào file.', 'Edit song tags, written into the file.', 'span')}</div></a>
        <a href="/music-check" data-r style="--d:.16s"><img src="/img/musiccheck-icon.png" width="64" height="64" alt="" loading="lazy" /><div><b>Music Check</b>{t('Kiểm tra file lossless thật hay giả.', 'Check whether a file is real lossless.', 'span')}</div></a>
      </div>
    </div>
  </section>
  <section class="sh-cta">
    <div class="wrap">
      <h2 class="display" data-lang-block="vi">Bắt đầu nghe tốt hơn.</h2>
      <h2 class="display" data-lang-block="en">Start listening better.</h2>
      <div><div class="stores">{stores}</div>{t('Tải miễn phí. Không cần đăng ký để phát thư viện nhạc của bạn.', 'Free to download. No subscription required to play your local library.', 'p', 'sec-sub')}
      <p class="sec-sub"><a href="/support" style="color:inherit">{t('Hỗ trợ', 'Support')}</a> · <a href="/privacy" style="color:inherit">{t('Quyền riêng tư', 'Privacy')}</a></p></div>
    </div>
  </section>
</main>

{footer('dark')}
'''
    return head('Synq — Lossless music player, tuned to your headphones',
                'Synq is a premium music player with true lossless audio, AutoEQ for 6,000+ headphones, synced lyrics and a smart library. iOS and Android. Plus articles and guides on lossless audio.',
                '/synq', 'world-synq', og='/store/Synq_play_feature_1024x500.png', icon='/logo-mark.svg') + body + TAIL

def guides_index(gs):
    body = f'''{header('dark', )}
<main id="main-content">
  <section class="sh-pagehead wrap">
    <span class="crumb"><a href="/">SYNQ Studio</a> / <a href="/synq">Synq</a> / {t('Bài viết', 'Guides')}</span>
    <h1 class="display" data-lang-block="vi">Bài viết &amp; hướng dẫn Synq</h1>
    <h1 class="display" data-lang-block="en">Synq articles &amp; guides</h1>
    {t('Hướng dẫn từng bước và mẹo nghe nhạc lossless: kết nối NAS, chọn DAC, đọc phổ, hiểu định dạng. Cập nhật dần.', 'Step-by-step guides and tips for listening to lossless: connect a NAS, choose a DAC, read a spectrum, understand formats. Added over time.', 'p', 'lede')}
  </section>
  <div class="wrap"><div class="gcards all">{''.join(gcard(x) for x in gs)}</div></div>
</main>

{footer('dark')}
'''
    return head('Synq articles & guides — lossless audio, DACs, NAS',
                'Articles and step-by-step guides for listening to lossless music: formats, DACs, NAS setup, reading a spectrum and more.',
                '/synq/guides', 'world-synq', og='/store/Synq_play_feature_1024x500.png', icon='/logo-mark.svg') + body + TAIL

if __name__ == '__main__':
    gs = read_guides()
    assert len(gs) >= 19, len(gs)
    open(os.path.join(PUB, 'index.html'), 'w', encoding='utf-8').write(home())
    os.makedirs(os.path.join(PUB, 'synq'), exist_ok=True)
    open(os.path.join(PUB, 'synq/index.html'), 'w', encoding='utf-8').write(hub(gs))
    open(os.path.join(PUB, 'synq/guides.html'), 'w', encoding='utf-8').write(guides_index(gs))
    print('built', len(gs), 'guides')
