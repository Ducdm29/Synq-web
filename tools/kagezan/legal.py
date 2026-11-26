from common import *


def privacy():
    b = '    <div class="sb-wrap">\n'
    b += hero("Legal · Kagezan", "Kagezan — Chính sách quyền riêng tư", "Kagezan — Privacy Policy",
              "Kagezan chơi được hoàn toàn offline. Khi có mạng, game lưu tiến trình lên máy chủ của chúng tôi, đưa điểm lên bảng xếp hạng và gửi thống kê lối chơi để cân bằng game. Quảng cáo có thưởng do Google AdMob cung cấp.",
              "Kagezan plays fully offline. When online, it stores your progress on our server, puts your scores on the leaderboards and sends gameplay statistics we use to balance the game. Rewarded ads are served by Google AdMob.")
    b += updated()
    b += '    <article>\n'
    b += sec(0, "Phạm vi", "Which app this covers",
             both("p", "Chính sách này áp dụng cho game <strong>Kagezan</strong> (Android <code>com.dots111.shadowblade</code>, iOS <code>com.dots111.shadowblade</code>) do Synq (tài khoản nhà phát triển 111dots) phát hành. Các ứng dụng khác của Synq có chính sách riêng.",
                  "This policy applies to the game <strong>Kagezan</strong> (Android <code>com.dots111.shadowblade</code>, iOS <code>com.dots111.shadowblade</code>) published by Synq (developer account 111dots). Synq's other apps have their own policies."))
    b += sec(1, "Dữ liệu game gửi về máy chủ của chúng tôi", "What the game sends to our server",
             ul(["<strong>Mã định danh ẩn danh:</strong> một mã ngẫu nhiên do máy tạo ra (không phải số máy, không phải mã quảng cáo) và mã tài khoản khách do máy chủ cấp.",
                 "<strong>Bản lưu game:</strong> tiến trình, trang bị, tiền trong game, cài đặt trong game.",
                 "<strong>Thống kê lối chơi</strong> (gắn với mã tài khoản, gửi khi có mạng): lúc mở và đóng game; kết quả từng trận (chế độ, chương, độ khó, thời gian, số lần gạt hay trúng đòn); tiền trong game nhận và tiêu theo nguồn; số lần xem quảng cáo có thưởng; mẫu máy, hệ điều hành, phiên bản game, tốc độ khung hình; báo lỗi kỹ thuật và báo game bị đóng đột ngột (crash) kèm phiên bản game và hệ điều hành, không kèm nội dung cá nhân.",
                 "<strong>Bảng xếp hạng:</strong> điểm của bạn (sát thương Boss tuần, thời gian Sinh tồn, lực chiến, tiến độ) và bản ghi thao tác của những trận lọt nhóm có thưởng, để máy chủ chạy lại kiểm tra gian lận. Trên bảng bạn hiện dưới tên “Lãng khách #mã”, hoặc tên tự đặt.",
                 "<strong>Nếu bạn liên kết Google hoặc Apple:</strong> mã tài khoản mà Google/Apple cấp cho game, và email nếu nhà cung cấp gửi kèm. Email không bao giờ hiện công khai; với Apple bạn có thể chọn ẩn email.",
                 "<strong>Nếu bạn mua gói trong app:</strong> gói đã mua, mã đơn hàng của Google Play hoặc App Store và dấu vân tay (băm SHA-256) của mã giao dịch, gắn với mã tài khoản, để kiểm tra đơn là thật và chỉ cộng một lần. Thanh toán do Google Play hoặc Apple xử lý; chúng tôi không bao giờ nhận số thẻ hay thông tin thanh toán của bạn."],
                ["<strong>Anonymous identifiers:</strong> a random id made on your device (not a device serial number, not an advertising id) and a guest account id issued by our server.",
                 "<strong>Your game save:</strong> progress, gear, in-game currency, in-game settings.",
                 "<strong>Gameplay statistics</strong> (tied to your account id, sent when online): when the game opens and closes; each fight's result (mode, chapter, difficulty, duration, deflects and hits taken); in-game currency earned and spent by source; rewarded ads watched; device model, OS, game version, frame rate; technical error reports and crash reports (with the game and OS version, no personal content).",
                 "<strong>Leaderboards:</strong> your scores (weekly boss damage, survival time, power, progress) and, for runs in a rewarded bracket, the input record our server replays to check for cheating. On a board you appear as “Wanderer #code”, or under a name you choose.",
                 "<strong>If you link Google or Apple:</strong> the account id Google/Apple gives the game, and your email if the provider sends it. Your email is never shown publicly; with Apple you can hide it.",
                 "<strong>If you buy a pack in the app:</strong> the pack bought, the Google Play or App Store order id and a fingerprint (SHA-256 hash) of the purchase token, tied to your account id, to check the purchase is real and pay it once. Payment is handled by Google Play or Apple; we never receive your card number or payment details."])
             + both("p", "Game không đọc danh bạ, vị trí, ảnh hay micro của bạn.", "The game does not access your contacts, location, photos or microphone.", ' style="margin-top: var(--space-4);"'))
    b += sec(2, "Quảng cáo (Google AdMob)", "Advertising (Google AdMob)",
             both("p", "Kagezan có quảng cáo video có thưởng: chỉ hiện khi bạn tự bấm xem để nhận thêm phần thưởng. Quảng cáo do <strong>Google AdMob</strong> cung cấp. AdMob có thể thu thập mã quảng cáo của thiết bị (AAID trên Android, IDFA trên iOS nếu bạn cho phép), địa chỉ IP và thông tin về thiết bị, cách bạn tương tác với quảng cáo, để hiển thị quảng cáo, đo hiệu quả và chống gian lận.",
                  "Kagezan shows rewarded video ads: they only play when you choose to watch one for a bonus. Ads are served by <strong>Google AdMob</strong>. AdMob may collect your device's advertising id (AAID on Android, IDFA on iOS if you allow it), IP address, device information and how you interact with ads, to show ads, measure them and prevent fraud.")
             + ul(["Ở Khu vực Kinh tế châu Âu, Vương quốc Anh và Thuỵ Sĩ, game hỏi sự đồng ý của bạn trước (biểu mẫu đồng ý của Google). Bạn có thể từ chối quảng cáo cá nhân hoá.",
                   "Trên iOS, game hỏi quyền theo dõi (App Tracking Transparency). Nếu bạn không cho phép, IDFA không được dùng và quảng cáo không cá nhân hoá.",
                   "Bạn có thể đặt lại hoặc tắt mã quảng cáo trong cài đặt của điện thoại.",
                   "Chúng tôi không bán dữ liệu của bạn. Chính sách của Google: <a href=\"https://policies.google.com/technologies/partner-sites\" target=\"_blank\" rel=\"noopener\">policies.google.com/technologies/partner-sites</a>."],
                  ["In the European Economic Area, the UK and Switzerland, the game asks for your consent first (Google's consent form). You can refuse personalised ads.",
                   "On iOS, the game asks for tracking permission (App Tracking Transparency). If you decline, the IDFA is not used and ads are not personalised.",
                   "You can reset or limit your advertising id in your phone's settings.",
                   "We do not sell your data. Google's policy: <a href=\"https://policies.google.com/technologies/partner-sites\" target=\"_blank\" rel=\"noopener\">policies.google.com/technologies/partner-sites</a>."]))
    b += sec(3, "Chúng tôi dùng dữ liệu để làm gì", "How we use it",
             ul(["Lưu và khôi phục tiến trình của bạn trên máy khác.", "Xếp hạng và trả thưởng bảng xếp hạng.",
                 "Phát hiện gian lận trên bảng xếp hạng (máy chủ chạy lại trận để kiểm điểm).",
                 "Cân bằng game (độ khó, phần thưởng, giá trong game) dựa trên số liệu tổng hợp."],
                ["To save your progress and restore it on another device.", "To rank players and pay leaderboard rewards.",
                 "To detect cheating on the leaderboards (the server replays a fight to check its score).",
                 "To balance the game (difficulty, rewards, in-game prices) from aggregated numbers."]))
    b += sec(4, "Đối tác xử lý dữ liệu", "Service providers",
             ul(["<strong>Cloudflare</strong> (Workers, D1): máy chủ và cơ sở dữ liệu của game.", "<strong>Google AdMob</strong>: quảng cáo có thưởng.",
                 "<strong>Google Sign-In</strong> và <strong>Sign in with Apple</strong>: chỉ khi bạn chọn liên kết tài khoản.",
                 "<strong>Google Play Billing</strong> và <strong>Apple App Store</strong>: xử lý thanh toán khi bạn mua gói trong app."],
                ["<strong>Cloudflare</strong> (Workers, D1): the game's server and database.", "<strong>Google AdMob</strong>: rewarded ads.",
                 "<strong>Google Sign-In</strong> and <strong>Sign in with Apple</strong>: only if you choose to link an account.",
                 "<strong>Google Play Billing</strong> and <strong>the Apple App Store</strong>: payment for in-app purchases."]))
    b += sec(5, "Lưu bao lâu", "How long we keep it",
             both("p", "Thống kê lối chơi thô được xoá sau 30 ngày; chỉ còn số tổng hợp theo ngày, không gắn với người chơi nào. Điểm Boss tuần và Sinh tồn được xoá sau 8 tuần; bản ghi trận được xoá sau 14 ngày. Bản lưu và điểm tổng được giữ tới khi bạn xoá tài khoản. Bản ghi đơn mua được giữ để một đơn không thể cộng hai lần; khi bạn xoá tài khoản, đơn mua không còn gắn với bạn.",
                  "Raw gameplay statistics are deleted after 30 days; only daily totals remain, not tied to any player. Weekly boss and survival scores are deleted after 8 weeks; fight records after 14 days. Your save and overall scores are kept until you delete your account. Purchase records are kept so a purchase can never pay twice; when you delete your account they are no longer tied to you."))
    b += sec(6, "Quyền của bạn và xoá tài khoản", "Your rights and deleting your account",
             both("p", "Trong game: <strong>Cài đặt → Tài khoản → Xoá tài khoản</strong> xoá vĩnh viễn trên máy chủ bản lưu, điểm, bản ghi trận và thống kê gắn với tài khoản. Tiến trình trên máy bạn vẫn còn. Bạn cũng có thể yêu cầu xem, sửa hoặc xoá dữ liệu qua email. Xem hướng dẫn tại <a href=\"/kagezan-delete-account\">trang xoá tài khoản</a>.",
                  "In the game: <strong>Settings → Account → Delete account</strong> permanently deletes, on our server, your save, scores, fight records and the statistics tied to your account. Your progress on your device stays. You can also ask us by email to access, correct or delete your data. See the <a href=\"/kagezan-delete-account\">account deletion page</a>."))
    b += sec(7, "Trẻ em", "Children",
             both("p", "Game không nhắm tới trẻ dưới 13 tuổi và không cố ý thu thập dữ liệu của trẻ dưới 13 tuổi. Nếu bạn cho rằng chúng tôi có dữ liệu của một trẻ dưới 13 tuổi, hãy gửi email để chúng tôi xoá.",
                  "The game is not directed at children under 13 and we do not knowingly collect data from children under 13. If you believe we hold data from a child under 13, email us and we will delete it."))
    b += sec(8, "Thay đổi và liên hệ", "Changes and contact",
             both("p", f"Khi chính sách thay đổi, chúng tôi cập nhật trang này và ngày ở đầu trang. Liên hệ: <a href=\"mailto:{EMAIL}\">{EMAIL}</a>.",
                  f"When this policy changes we update this page and the date at its top. Contact: <a href=\"mailto:{EMAIL}\">{EMAIL}</a>."))
    b += '    </article>\n'
    b += contact("Câu hỏi về dữ liệu của bạn", "Questions about your data", "Shadow%20Blade%20privacy")
    b += '    </div>\n'
    return legal_page("kagezan-privacy", "Kagezan — Privacy Policy",
                "Privacy policy for Kagezan: what the game sends to our server, Google AdMob rewarded ads, how long data is kept and how to delete your account.", b)


def terms():
    b = '    <div class="sb-wrap">\n'
    b += hero("Legal · Kagezan", "Kagezan — Điều khoản sử dụng", "Kagezan — Terms of Use",
              "Khi tải và chơi Kagezan, bạn đồng ý với các điều khoản dưới đây.", "By downloading and playing Kagezan you agree to the terms below.")
    b += updated()
    b += '    <article>\n'
    b += sec(1, "Quyền sử dụng", "Licence",
             both("p", "Synq cấp cho bạn quyền cá nhân, không độc quyền, không chuyển nhượng để cài và chơi Kagezan trên thiết bị của bạn, theo điều khoản của App Store hoặc Google Play nơi bạn tải game. Game, hình ảnh, âm thanh và mã nguồn thuộc về Synq và các bên cấp phép.",
                  "Synq grants you a personal, non-exclusive, non-transferable licence to install and play Kagezan on your devices, subject to the terms of the App Store or Google Play you downloaded it from. The game, its art, sound and code belong to Synq and its licensors."))
    b += sec(2, "Vật phẩm trong game", "In-game items",
             both("p", "Vàng, đá, ngọc, trang bị và mọi vật phẩm trong game chỉ có giá trị trong game, không quy đổi ra tiền thật và không thuộc sở hữu của bạn. Chúng tôi có thể điều chỉnh giá trị, tỉ lệ rơi và phần thưởng để cân bằng game.",
                  "Gold, stones, gems, gear and every other in-game item have value only inside the game, cannot be exchanged for real money and are not your property. We may adjust values, drop rates and rewards to balance the game."))
    b += sec(3, "Mua trong app", "In-app purchases",
             both("p", "Gói Ngọc được bán qua App Store hoặc Google Play và thanh toán do Apple hoặc Google xử lý. Ngọc là vật phẩm trong game như mục 2, được cộng vào tài khoản đã mua sau khi máy chủ kiểm tra đơn. Hoàn tiền theo chính sách của cửa hàng nơi bạn mua; Ngọc của đơn đã hoàn hoặc đơn gian lận có thể bị thu lại. Nếu đã trả tiền mà chưa nhận Ngọc, hãy liên hệ chúng tôi kèm mã đơn hàng.",
                  "Jade packs are sold through the App Store or Google Play, and payment is handled by Apple or Google. Jade is an in-game item as in section 2, added to the account that bought it once our server has checked the purchase. Refunds follow the policy of the store you bought from; Jade from a refunded or fraudulent purchase may be removed. If you paid and did not receive your Jade, contact us with your order id."))
    b += sec(4, "Chơi công bằng", "Fair play",
             ul(["Không sửa game, sửa bộ nhớ, dùng công cụ tự động hay khai thác lỗi để lấy điểm hoặc phần thưởng.",
                 "Không đặt tên xúc phạm, mạo danh hay vi phạm pháp luật trên bảng xếp hạng.",
                 "Trận lọt nhóm có thưởng được máy chủ chạy lại để kiểm tra. Vi phạm có thể bị xoá điểm, mất thưởng, hoặc khoá tài khoản."],
                ["Do not modify the game or its memory, use automation or exploit bugs to gain scores or rewards.",
                 "Do not use offensive, impersonating or unlawful names on the leaderboards.",
                 "Runs in a rewarded bracket are replayed by our server to verify them. Violations may lead to removed scores, lost rewards or a suspended account."]))
    b += sec(5, "Tài khoản và dữ liệu", "Account and data",
             both("p", "Bạn có thể chơi không cần đăng nhập. Tài khoản khách gắn với thiết bị; liên kết Google hoặc Apple để giữ tiến trình khi đổi máy. Dữ liệu được xử lý theo <a href=\"/kagezan-privacy\">Chính sách quyền riêng tư</a>. Bạn có thể <a href=\"/kagezan-delete-account\">xoá tài khoản</a> bất cứ lúc nào.",
                  "You can play without signing in. A guest account is tied to your device; link Google or Apple to keep your progress on a new device. Data is handled under the <a href=\"/kagezan-privacy\">Privacy Policy</a>. You can <a href=\"/kagezan-delete-account\">delete your account</a> at any time."))
    b += sec(6, "Dịch vụ và trách nhiệm", "Service and liability",
             both("p", "Game được cung cấp “nguyên trạng”. Chúng tôi cố gắng giữ máy chủ, bảng xếp hạng và phần thưởng tuần hoạt động ổn định nhưng không bảo đảm chúng luôn sẵn sàng hoặc không lỗi, và có thể thay đổi hoặc ngừng tính năng. Trong phạm vi pháp luật cho phép, Synq không chịu trách nhiệm cho thiệt hại gián tiếp phát sinh từ việc dùng game.",
                  "The game is provided “as is”. We work to keep the server, leaderboards and weekly rewards running but do not guarantee they are always available or error-free, and we may change or end features. To the extent the law allows, Synq is not liable for indirect damages arising from use of the game."))
    b += sec(7, "Thay đổi và liên hệ", "Changes and contact",
             both("p", f"Chúng tôi có thể cập nhật điều khoản này; ngày cập nhật ở đầu trang. Tiếp tục chơi sau khi cập nhật nghĩa là bạn đồng ý. Liên hệ: <a href=\"mailto:{EMAIL}\">{EMAIL}</a>.",
                  f"We may update these terms; the date is at the top of this page. Playing after an update means you accept it. Contact: <a href=\"mailto:{EMAIL}\">{EMAIL}</a>."))
    b += '    </article>\n    </div>\n'
    return legal_page("kagezan-terms", "Kagezan — Terms of Use", "Terms of use for Kagezan: licence, in-game items, fair play on the leaderboards, accounts and liability.", b)
