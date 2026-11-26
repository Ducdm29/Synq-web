"""/kagezan landing: the studio's seamless white house style (see tools/build_pages.py), bilingual VI first."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from common import APP_STORE, PLAY, EMAIL
from chrome import header, footer
from build_pages import head, t, ARROW, TAIL

# Public posts for the "latest news" section. Step 3 (/kagezan/news) fills this; the section hides while it is empty.
# each: dict(href, date, title_vi, title_en, text_vi, text_en)
POSTS = []

# (chapter, name, title_vi, title_en, line_vi, line_en)
BOSSES = [
    (1, "Oniwa", "Tướng Quân Bất Tử", "Undying General", "Trùm mở màn. Đánh đều tay, hợp để bạn làm quen với nhịp gạt.", "The opener. He swings at an even pace, so it's a good place to learn the parry."),
    (2, "Kagerō", "Hắc Điệp", "Black Butterfly", "Phi tiêu tới trước, kiếm theo ngay sau. Chậm tay là dính cả chuỗi.", "Throwing stars first, the blade right behind. Fall behind and you eat the whole string."),
    (3, "Kurohebi", "Độc Xà Tăng", "Venom Serpent Monk", "Cây gậy của lão tẩm độc, gạt lệch một chút là trúng độc.", "His staff is poisoned. Deflect a hair late and it gets you."),
    (4, "Tekki", "Thiết Quỷ", "Iron Demon", "Ra đòn chậm, nhưng trúng một phát là thấy đau.", "He's slow to swing, but you feel every hit that lands."),
    (5, "Mugen", "Kiếm Thánh", "Sword Saint", "Tan vào làn khói, chớp mắt đã đứng sau lưng bạn.", "He melts into smoke and in a blink he's behind you."),
    (6, "Renka", "Hắc Liên", "Black Lotus", "Múa giữa bão cánh hoa, mũi kiếm luôn tới nhanh hơn bạn nghĩ.", "She dances in a storm of petals, and her thrusts come quicker than you think."),
    (7, "Shuten", "Đại Quỷ", "Great Oni", "To gấp mấy lần bạn, mỗi cú nhảy bổ là rung cả mặt đất.", "Several times your size, and every leap shakes the ground."),
    (8, "Kuroryū", "Hắc Long Shōgun", "Black Dragon Shōgun", "Mỗi pha một kiểu, toàn đòn lấy từ những trùm bạn đã hạ.", "Every phase is different, built from moves of bosses you've already beaten."),
    (9, "Shirayuki", "Tuyết Nữ", "Snow Maiden", "Bắn băng từng mảnh. Gạt đúng nhịp là băng bay ngược về phía cô.", "She fires ice shard by shard. Deflect on the beat and it flies back at her."),
    (10, "Suigetsu", "Thủy Nguyệt", "Water Moon", "Sợi xích bay xa rồi giật về. Né sang ngang, đừng lao thẳng vào.", "The chain flies out and snaps back. Step aside, don't charge in."),
    (11, "Kogane", "Hồ Thương", "Fox Merchant", "Cây ô giấy giấu một thanh kiếm. Đèn tắt thì bạn chỉ còn nghe tiếng mà đoán.", "His paper umbrella hides a sword. When the lamps go out, all you have is your ears."),
    (12, "Kanayago", "Thợ Rèn Quỷ", "Demon Smith", "Búa lửa, kìm sắt, xỉ nóng rơi khắp sàn. Đừng để bị dồn vào góc.", "Fire hammer, iron tongs, hot slag all over the floor. Don't get cornered."),
    (13, "Hagane", "Kiếm Hồn", "Sword Spirit", "Cả cánh đồng toàn kiếm, và hắn gọi chúng rơi xuống theo nhịp.", "A whole field of swords, and he calls them down on a beat."),
    (14, "Ikazuchi", "Lôi Tướng", "Thunder General", "Vòng sáng hiện dưới chân là sét sắp đánh. Bước ra kịp là thoát.", "A glowing ring under your feet means lightning is coming. Step out in time."),
    (15, "Hư Ảnh", "Trùm cuối phần 2", "Final boss of part 2", "Kéo bạn vào hố đen, rồi lặn vào khe nứt và hiện ra chỗ khác.", "Drags you toward black holes, then slips into the rift and comes out somewhere else."),
]
# The English name of boss 15 as shown in the game's own text.
BOSS15_EN = "The Hollow"


def stores():
    """Store badges once the links exist, otherwise the Coming soon pill."""
    if APP_STORE or PLAY:
        out = ""
        if APP_STORE: out += '<a class="btn" href="%s" target="_blank" rel="noopener">App Store</a>' % APP_STORE
        if PLAY: out += '<a class="btn ghost" href="%s" target="_blank" rel="noopener">Google Play</a>' % PLAY
        return '<div class="kz-stores">%s</div>' % out
    return '<span class="pill">%s</span>' % t("Sắp ra mắt trên iOS &amp; Android", "Coming soon on iOS &amp; Android")


def clip(name, alt):
    return ('<video data-loop muted loop playsinline preload="none" poster="/img/kz-%s.webp" width="800" height="450" aria-label="%s">'
            '<source src="/img/kz-%s.mp4" type="video/mp4" /></video>') % (name, alt, name)


def play_row(flip, name, h_vi, h_en, p_vi, p_en, alt):
    return """<section class="kz-row wrap%s">
      <div data-r><h2>%s</h2>%s</div>
      <div class="kz-clip" data-r style="--d:.1s">%s</div>
    </section>""" % (" flip" if flip else "", t(h_vi, h_en), t(p_vi, p_en, "p"), clip(name, alt))


def build():
    bosses = ""
    for i, (ch, name, tv, te, lv, le) in enumerate(BOSSES):
        name_en = BOSS15_EN if ch == 15 else name
        name_html = name if ch != 15 else t(name, name_en)
        bosses += """<li data-r style="--d:%.2fs"><span class="kz-ch">%s</span><h3>%s</h3><span class="kz-ti">%s</span>%s</li>
        """ % ((i % 3) * .06, t("Chương %d" % ch, "Chapter %d" % ch), name_html, t(tv, te), t(lv, le, "p"))

    news = ""
    if POSTS:
        cards = "".join("""<a class="kz-post" href="%s" data-r><span class="kz-date">%s</span><h3>%s</h3>%s</a>""" % (
            p["href"], p["date"], t(p["title_vi"], p["title_en"]), t(p["text_vi"], p["text_en"], "p")) for p in POSTS[:3])
        news = """<section class="kz-news wrap" aria-labelledby="news-h">
      <h2 id="news-h" class="display h2" data-r>%s</h2>
      <div class="kz-posts">%s</div>
    </section>""" % (t("Tin mới", "Latest news"), cards)

    body = """%(header)s
<main id="main-content">

  <section class="hero kz-hero" aria-label="Kagezan">
    <canvas class="hero-fx" data-shape="pad" aria-hidden="true"></canvas>
    <div class="wrap hero-in">
      <h1 class="display" data-lang-block="vi"><span class="ln" style="--i:0"><span>Kagezan</span></span><span class="ln sub" style="--i:1"><span>Gạt kiếm. Phá thế. Kết liễu.</span></span></h1>
      <h1 class="display" data-lang-block="en"><span class="ln" style="--i:0"><span>Kagezan</span></span><span class="ln sub" style="--i:1"><span>Deflect. Break. Finish.</span></span></h1>
      <div class="hero-row">
        %(lede)s
        <div class="hero-cta">
          %(stores)s
          <a class="btn accent" href="#trailer">%(trailer_btn)s%(arrow)s</a>
        </div>
      </div>
    </div>
  </section>

  <section id="trailer" class="kz-trailer" aria-label="Trailer">
    <div class="stage" data-stage>
      <div class="stage-pin">
        <div class="stage-media">
          <button class="vid-toggle" type="button" aria-pressed="false" aria-label="Pause trailer"><svg class="i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg><svg class="i-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
          <video data-loop muted loop playsinline autoplay preload="none" poster="/img/kagezan-loop-poster.webp" width="1024" height="576" aria-label="Kagezan gameplay"><source src="/img/kagezan-loop.mp4" type="video/mp4" /></video>
        </div>
      </div>
    </div>
  </section>

  <div id="play" class="kz-play">
    <div class="wrap kz-intro"><h2 class="display h2" data-r>%(play_h)s</h2></div>
    %(rows)s
  </div>

  <section class="kz-bosses wrap" id="bosses" aria-labelledby="boss-h">
    <h2 id="boss-h" class="display h2" data-r>%(boss_h)s</h2>
    %(boss_lede)s
    <ol class="kz-boss-list">
        %(bosses)s</ol>
  </section>

  %(news)s

  <section class="kz-free wrap" aria-labelledby="free-h">
    <h2 id="free-h" class="about-statement" data-r>%(free)s</h2>
    <div class="kz-cta" data-r>%(stores)s</div>
    <ul class="kz-links" data-r>
      <li><a href="/kagezan-support">%(l_support)s</a></li>
      <li><a href="/kagezan-privacy">%(l_privacy)s</a></li>
      <li><a href="/kagezan-terms">%(l_terms)s</a></li>
      <li><a href="/kagezan-delete-account">%(l_delete)s</a></li>
      <li><a href="mailto:%(email)s">%(email)s</a></li>
    </ul>
  </section>
</main>

%(footer)s
""" % dict(
        header=header('light'), footer=footer('light'), arrow=ARROW, email=EMAIL, stores=stores(), news=news, bosses=bosses,
        lede=t("Game samurai xoay quanh đòn gạt. Đọc nhịp kiếm của đối thủ, gạt đúng lúc, kết liễu khi thế địch vỡ. Chơi offline trên iPhone, iPad và Android.",
               "A samurai game built around the parry. Read the other swordsman's rhythm, deflect on time, finish them when their posture breaks. Plays offline on iPhone, iPad and Android.", "p", "lede"),
        trailer_btn=t("Xem trailer", "Watch the trailer"),
        play_h=t("Cách chơi", "How it plays"),
        rows=play_row(False, "parry", "Gạt đúng nhịp", "Perfect deflects",
                      "Đỡ đúng lúc lưỡi kiếm chạm tới thì bạn không bị trúng đòn, thế của địch đầy dần. Vỡ thế là kết liễu.",
                      "Guard right as the blade lands and you take no hit while their posture fills. Break it and you finish them.", "Gạt đòn / Parrying")
             + play_row(True, "read", "Đòn hiểm phải đọc", "Read the big attacks",
                        "Quét thì nhảy, đâm thì phản đòn, túm thì lướt ra. Trùm nào cũng có nhịp riêng.",
                        "Jump the sweep, counter the thrust, dash out of the grab. Every boss has its own rhythm.", "Đòn hiểm / Perilous attacks")
             + play_row(False, "weapons", "Đa dạng vũ khí", "Many weapons",
                        "Katana, odachi, song đao và còn nhiều nữa. Mỗi loại đánh một kiểu.",
                        "Katana, odachi, twin blades and more. Each one plays differently.", "Vũ khí / Weapons"),
        boss_h=t("15+ chương", "15+ chapters"),
        boss_lede=t("Mỗi chương một trùm, mỗi trùm một nhịp riêng.", "One boss per chapter, each with its own rhythm.", "p", "lede"),
        free=t("Chơi miễn phí, không cần xem quảng cáo.", "Free to play, no ads required."),
        l_support=t("Hỗ trợ", "Support"), l_privacy=t("Quyền riêng tư", "Privacy"), l_terms=t("Điều khoản", "Terms"), l_delete=t("Xoá tài khoản", "Delete account"))
    return head("Kagezan - Deflect. Break. Finish.",
                "Kagezan is a samurai action game built around the parry: deflect at the right instant, break posture, finish. 15+ chapters, each with its own boss. Free to play.",
                "/kagezan", "studio kz", og="/store/shadowblade/feature.jpg", icon="/store/shadowblade/icon.png") + body + TAIL
