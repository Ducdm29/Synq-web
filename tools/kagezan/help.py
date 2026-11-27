from common import *
import urllib.parse as _up

FAQ = [
    ("Làm sao giữ tiến trình khi đổi máy?", "How do I keep my progress on a new phone?",
     "Vào <strong>Cài đặt → Tài khoản</strong> và bấm <strong>Liên kết Google</strong> (hoặc <strong>Liên kết Apple</strong> trên iPhone). Trên máy mới, cài game rồi đăng nhập cùng tài khoản đó, tiến trình sẽ tải về. Nếu cả máy và tài khoản đều có tiến trình, game hỏi bạn giữ bản nào.",
     "Go to <strong>Settings → Account</strong> and tap <strong>Link Google</strong> (or <strong>Link Apple</strong> on iPhone). On the new phone, install the game and sign in with the same account and your progress comes down. If both the phone and the account have progress, the game asks which one to keep."),
    ("Tôi mất tiến trình sau khi cài lại game", "I lost my progress after reinstalling",
     "Nếu trước đó bạn đã liên kết Google hoặc Apple, chỉ cần đăng nhập lại ở <strong>Cài đặt → Tài khoản</strong>. Nếu chưa liên kết, tiến trình chỉ nằm trên máy cũ. Hãy gửi email kèm tên hiển thị “Lãng khách #mã” của bạn, chúng tôi sẽ xem có khôi phục được không.",
     "If you had linked Google or Apple, just sign in again under <strong>Settings → Account</strong>. If you hadn't, the progress lived only on the old device. Email us with your board name (“Wanderer #code”) and we will check whether it can be recovered."),
    ("Gạt đòn thế nào cho chuẩn?", "How do I deflect properly?",
     "Bấm <strong>Đỡ</strong> đúng lúc lưỡi kiếm của địch chạm tới, không bấm giữ từ sớm. Đòn có chữ 危 là đòn hiểm: quét thì <strong>Nhảy</strong>, đâm thì bấm <strong>Chém</strong> ngay trước khi trúng để phản đòn Nhất Thiểm, túm thì <strong>Lướt</strong> né. Muốn được dạy từng loại, vào <strong>Cài đặt → Hướng dẫn</strong> chọn <strong>Chi tiết</strong>: chương đầu sẽ làm chậm và chỉ cách đỡ mỗi đòn mới.",
     "Tap <strong>Guard</strong> right as the enemy blade lands, not held early. Attacks marked 危 are perilous: <strong>Jump</strong> a sweep, tap <strong>Slash</strong> just before a thrust lands for an Issen counter, <strong>Dash</strong> out of a grab. To be taught each one, set <strong>Settings → Tutorial</strong> to <strong>Detailed</strong>: chapter 1 slows each new attack down and shows the answer."),
    ("Thể lực là gì, hồi bao lâu?", "What is stamina and how fast does it refill?",
     "Mỗi lần vào chương hoặc Sinh tồn tốn 4 đến 6 thể lực. Thể lực tối đa 30, hồi 1 điểm mỗi 12 phút. Bạn có thể xem quảng cáo có thưởng để nhận thêm thể lực.",
     "Each chapter or Survival run costs 4 to 6 stamina. You hold up to 30 and regain 1 point every 12 minutes. You can watch a rewarded ad for extra stamina."),
    ("Khi nào nhận thưởng bảng xếp hạng tuần?", "When are weekly leaderboard rewards paid?",
     "Boss tuần và Sinh tồn chốt bảng vào cuối tuần và trả thưởng vào thứ Hai. Các trận lọt nhóm có thưởng được máy chủ chạy lại để kiểm tra trước khi trả. Thưởng về khi bạn mở game có kết nối mạng.",
     "The Weekly Boss and Survival boards close at the end of the week and pay out on Monday. Runs in a rewarded bracket are replayed by our server to verify them first. Rewards arrive the next time you open the game online."),
    ("Game chạy giật trên máy tôi", "The game stutters on my phone",
     "Vào <strong>Cài đặt → Đồ hoạ</strong> và chọn <strong>1080p</strong> hoặc <strong>Tiết kiệm pin</strong>. Game cũng tự hạ đồ hoạ khi máy không theo kịp. Nếu vẫn giật, gửi email cho chúng tôi kèm tên máy để chúng tôi tối ưu thêm.",
     "Go to <strong>Settings → Graphics</strong> and pick <strong>1080p</strong> or <strong>Battery saver</strong>. The game also steps graphics down by itself when the phone can't keep up. If it still stutters, email us your phone model so we can tune it."),
    ("Quảng cáo không tải được", "An ad won't load",
     "Quảng cáo có thưởng cần mạng ổn định. Thử lại sau ít phút. Ở EU/UK, nếu bạn đã từ chối mọi quảng cáo trong biểu mẫu đồng ý, có thể không có quảng cáo nào để xem.",
     "Rewarded ads need a stable connection; try again in a few minutes. In the EU/UK, if you refused all ads in the consent form, there may be none to show."),
    ("Đổi ngôn ngữ ở đâu?", "How do I change the language?",
     "<strong>Cài đặt → Ngôn ngữ</strong>. Game có tiếng Việt, English, Español, Bahasa Indonesia, 日本語, 한국어, Português, Русский, ไทย và 中文.",
     "<strong>Settings → Language</strong>. The game is in English, Tiếng Việt, Español, Bahasa Indonesia, 日本語, 한국어, Português, Русский, ไทย and 中文."),
]


# (id, group) for each question; group order = account, gameplay, problems
GROUPS = [
    ("account", "Tài khoản và tiến trình", "Account and progress"),
    ("gameplay", "Cách chơi", "Gameplay"),
    ("problems", "Lỗi và hiệu năng", "Problems"),
]
FAQ_IDS = ["keep-progress", "lost-progress", "deflect", "stamina", "weekly-rewards", "stutter", "ad-wont-load", "language"]
FAQ_GROUP = {"keep-progress": "account", "lost-progress": "account", "data-and-account": "account",
             "deflect": "gameplay", "stamina": "gameplay", "weekly-rewards": "gameplay", "language": "gameplay",
             "stutter": "problems", "ad-wont-load": "problems", "report-a-bug": "problems"}
ANCHOR_LABEL = "Liên kết tới câu hỏi này / Link to this question"


def support():
    import re
    items = {}
    for fid, (qv, qe, av, ae) in zip(FAQ_IDS, FAQ):
        items[fid] = (qv, qe, av, ae)
    items["report-a-bug"] = ("Báo lỗi", "Reporting a bug",
        f'Gửi email tới <a href="mailto:{EMAIL}?subject=Kagezan%20bug">{EMAIL}</a> kèm: tên máy và hệ điều hành, phiên bản game (xem ở trang của game trên App Store hoặc Google Play), chương hoặc chế độ đang chơi, và ảnh chụp hay video nếu có.',
        f'Email <a href="mailto:{EMAIL}?subject=Kagezan%20bug">{EMAIL}</a> with: your phone model and OS, the game version (shown on the game&rsquo;s App Store or Google Play page), the chapter or mode you were in, and a screenshot or video if you have one.')
    items["data-and-account"] = ("Dữ liệu và tài khoản", "Data and account",
        '<a href="/kagezan-privacy">Chính sách quyền riêng tư</a> · <a href="/kagezan-terms">Điều khoản sử dụng</a> · <a href="/kagezan-delete-account">Xoá tài khoản</a>',
        '<a href="/kagezan-privacy">Privacy Policy</a> · <a href="/kagezan-terms">Terms of Use</a> · <a href="/kagezan-delete-account">Delete your account</a>')
    return items


def support_html():
    from build_pages import t, ARROW
    items = support()
    # keep the exact original texts of the two hand-written answers (read back from the old markup is not needed: they are literals above)
    toc, groups = "", ""
    for gid, gv, ge in GROUPS:
        toc += '<li><a href="#%s" data-toc="%s"><span data-lang-block="vi">%s</span><span data-lang-block="en">%s</span></a></li>' % (gid, gid, gv, ge)
        qs = ""
        for fid in [k for k in list(items) if FAQ_GROUP[k] == gid]:
            qv, qe, av, ae = items[fid]
            qs += ('<details class="fq-item" id="%s"><summary><span class="fq-q"><span data-lang-block="vi">%s</span><span data-lang-block="en">%s</span></span>'
                   '<a class="lg-anchor" href="#%s" aria-label="%s">#</a><i class="fq-chev" aria-hidden="true"></i></summary>'
                   '<div class="fq-a"><div class="fq-a-in"><p data-lang-block="vi">%s</p><p data-lang-block="en">%s</p></div></div></details>\n') % (fid, qv, qe, fid, ANCHOR_LABEL, av, ae)
        groups += '<section class="lg-sec fq-group" id="%s" aria-labelledby="%s-h"><h2 id="%s-h">%s</h2>\n%s</section>\n' % (gid, gid, gid, t(gv, ge), qs)
    main = """<main id="main-content">
  <div class="lg wrap">
    <header class="lg-head">
      <p class="lg-eyebrow">Support · <a href="/kagezan">Kagezan</a></p>
      <h1 class="display" data-lang-block="vi">Hỗ trợ Kagezan</h1>
      <h1 class="display" data-lang-block="en">Kagezan Support</h1>
      <p class="lg-sub" data-lang-block="vi">Câu trả lời cho những câu hỏi hay gặp. Không thấy điều bạn cần? Gửi email cho chúng tôi.</p>
      <p class="lg-sub" data-lang-block="en">Answers to the questions we hear most. Can't find yours? Email us.</p>
      <div class="fq-search">
        <label class="fq-label" for="fq-q">%(faq)s</label>
        <input id="fq-q" class="fq-input" type="search" autocomplete="off" data-ph-vi="Tìm câu hỏi…" data-ph-en="Search questions…" placeholder="Search questions…" />
      </div>
    </header>
    <div class="lg-grid">
      <aside class="lg-toc">
        <details class="lg-toc-d" open>
          <summary>%(toclabel)s</summary>
          <nav aria-label="Mục lục / Contents"><ol>%(toc)s</ol></nav>
        </details>
      </aside>
      <script>if(window.matchMedia&&matchMedia('(max-width:1023px)').matches)document.querySelector('.lg-toc-d').open=false;</script>
      <article class="lg-body">
        <div class="fq-empty" role="status" hidden>%(empty)s</div>
%(groups)s
        <div class="lg-contact">
          <p class="contact-label">%(need)s</p>
          <h2>%(reply)s</h2>
          <a href="mailto:%(email)s?subject=Kagezan%%20support" class="btn">%(email)s</a>
          <p class="fq-hint">%(hint)s</p>
          <ul class="fq-links"><li><a href="/kagezan-privacy">%(l1)s</a></li><li><a href="/kagezan-terms">%(l2)s</a></li><li><a href="/kagezan-delete-account">%(l3)s</a></li></ul>
        </div>
        <p class="lg-top"><a href="/kagezan">%(back)s</a> &nbsp;·&nbsp; <a href="#main-content">%(top)s</a></p>
      </article>
    </div>
  </div>
</main>""" % dict(faq=t("Câu hỏi thường gặp", "Frequently asked questions"), toclabel=t("Mục lục", "Contents"), toc=toc, groups=groups, email=EMAIL,
                  empty=t('Chưa có câu hỏi nào khớp. Gửi email cho chúng tôi: <a href="mailto:%s?subject=Kagezan%%20support">%s</a>' % (EMAIL, EMAIL), 'No question matches yet. Email us: <a href="mailto:%s?subject=Kagezan%%20support">%s</a>' % (EMAIL, EMAIL), 'p'),
                  need=t("Cần giúp?", "Need help?"), reply=t("Chúng tôi trả lời trong 1–2 ngày làm việc", "We reply within 1–2 working days"),
                  hint=t("Khi báo lỗi, gửi kèm: tên máy, phiên bản game, mô tả ngắn.", "When reporting a bug, include: device, game version, a short description.", "span"),
                  l1=t("Quyền riêng tư", "Privacy"), l2=t("Điều khoản", "Terms"), l3=t("Xoá tài khoản", "Delete account"),
                  back=t("← Về trang Kagezan", "← Back to Kagezan"), top=t("Lên đầu trang", "Back to top"))
    return support_page("kagezan-support", "Kagezan — Support", "Help for Kagezan: moving your progress to a new phone, deflecting, stamina, weekly rewards, performance and contacting us.", main)


def delete():
    b = '    <div class="sb-wrap">\n'
    b += hero("Legal · Kagezan", "Xoá tài khoản Kagezan", "Delete your Kagezan account",
              "Trang này dành cho game <strong>Kagezan: Samurai Parry</strong> của nhà phát triển <strong>111dots</strong> (Synq) trên Google Play và App Store. Bạn có thể xoá tài khoản Kagezan và dữ liệu gắn với nó bất cứ lúc nào. Trang này hướng dẫn cách làm và nói rõ những gì bị xoá.",
              "This page is for <strong>Kagezan: Samurai Parry</strong> by developer <strong>111dots</strong> (Synq) on Google Play and the App Store. You can delete your Kagezan account and the data linked to it at any time. This page explains how, and exactly what is removed.")
    b += updated()
    b += '    <article>\n'
    b += sec(1, "Xoá ngay trong game", "Delete from inside the game",
             ul(["Mở <strong>Kagezan</strong>, vào <strong>Cài đặt → Tài khoản</strong>.", "Bấm <strong>Xoá tài khoản</strong>, rồi bấm lần nữa để xác nhận.",
                 "Cần có kết nối mạng. Tài khoản và dữ liệu trên máy chủ bị xoá ngay lập tức."],
                ["Open <strong>Kagezan</strong> and go to <strong>Settings → Account</strong>.", "Tap <strong>Delete account</strong>, then tap it again to confirm.",
                 "You need to be online. The account and its server data are deleted at once."]))
    b += sec(2, "Những gì bị xoá", "What is deleted",
             ul(["Tài khoản khách và liên kết Google/Apple (kèm email nếu có).", "Bản lưu game trên máy chủ.",
                 "Điểm trên mọi bảng xếp hạng và bản ghi trận.", "Thống kê lối chơi gắn với tài khoản."],
                ["Your guest account and its Google/Apple link (with the email, if any).", "Your game save on our server.",
                 "Your scores on every leaderboard and your fight records.", "Gameplay statistics tied to your account."]))
    b += sec(3, "Những gì còn lại", "What is kept",
             ul(["Tiến trình lưu trên chính máy bạn vẫn còn; bạn có thể gỡ game để xoá nó.",
                 "Số liệu tổng hợp theo ngày (ví dụ tổng số trận), không gắn với bất kỳ ai.",
                 "Dữ liệu quảng cáo do Google AdMob tự quản lý theo chính sách của Google; bạn có thể đặt lại mã quảng cáo trong cài đặt điện thoại."],
                ["The progress saved on your own device stays; uninstall the game to remove it.",
                 "Daily aggregate numbers (for example the total number of fights), not tied to anyone.",
                 "Advertising data held by Google AdMob under Google's own policy; you can reset your advertising id in your phone's settings."]))
    b += sec(4, "Không vào được game?", "Can't open the game?",
             both("p", f"Gửi email tới <a href=\"mailto:{EMAIL}?subject=Delete%20my%20Kagezan%20account\">{EMAIL}</a> với tiêu đề “Delete my Kagezan account”, kèm tên hiển thị “Lãng khách #mã” hoặc email Google/Apple đã liên kết. Chúng tôi xoá trong vòng 30 ngày và báo lại cho bạn.",
                  f"Email <a href=\"mailto:{EMAIL}?subject=Delete%20my%20Kagezan%20account\">{EMAIL}</a> with the subject “Delete my Kagezan account”, and include your board name (“Wanderer #code”) or the linked Google/Apple email. We delete it within 30 days and confirm by reply."))
    b += '    </article>\n'
    b += contact("Chúng tôi sẽ xử lý yêu cầu của bạn", "We'll handle your request", "Delete%20my%20Kagezan%20account")
    b += '    </div>\n'
    _q = lambda s: _up.quote(s, safe="")
    cta = ("mailto:%s?subject=%s&body=%s" % (EMAIL, _q("Delete my Kagezan account / Xoá tài khoản Kagezan"),
           _q("Tên hiển thị trên bảng xếp hạng (Lãng khách #mã) hoặc email Google/Apple đã liên kết:\n\nBoard name (Wanderer #code) or the linked Google/Apple email:\n")), "Gửi yêu cầu xoá", "Send deletion request")
    return legal_page("kagezan-delete-account", "Delete Your Account — Kagezan", "How to delete your Kagezan account and the data associated with it, and what is removed.", b, steps=True, cta=cta)
