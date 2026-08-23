/* ============================================================
   SYNQ — Internationalization (EN / VI)
   ============================================================ */
(function () {
  'use strict';

  var translations = {
    // ─── HOME PAGE ───
    'nav.support': { en: 'Support', vi: 'Hỗ trợ' },
    'nav.privacy': { en: 'Privacy', vi: 'Quyền riêng tư' },
    'nav.privacyPolicy': { en: 'Privacy Policy', vi: 'Chính sách bảo mật' },
    'nav.privacyShort': { en: 'Privacy', vi: 'Bảo mật' },
    'nav.download': { en: 'Download', vi: 'Tải xuống' },
    'nav.changelog': { en: "What's New", vi: 'Có gì mới' },
    'nav.guides': { en: 'Threads', vi: 'Thảo luận' },

    // Changelog page
    'cl.eyebrow': { en: 'Release Notes', vi: 'Nhật ký cập nhật' },
    'cl.heading': { en: "What's new in Synq", vi: 'Có gì mới trong Synq' },
    'cl.subtitle': { en: 'Every improvement, fix and new feature — and the latest build to download.', vi: 'Mọi cải tiến, sửa lỗi và tính năng mới — cùng bản mới nhất để tải.' },
    'cl.history': { en: 'Version history', vi: 'Lịch sử phiên bản' },

    // Direct APK (home + get page)
    'dl.apk': { en: 'Download APK (Android)', vi: 'Tải APK (Android)' },
    'dl.apkMeta': { en: 'Direct install · Android 8+', vi: 'Cài trực tiếp · Android 8+' },
    'dl.whatsnew': { en: "See what's new →", vi: 'Xem có gì mới →' },
    'get.or2': { en: 'or install directly', vi: 'hoặc cài trực tiếp' },

    // Hero
    'hero.eyebrow': { en: '✦ Now available on iOS & Android', vi: '✦ Đã có trên iOS & Android' },
    'hero.h1': { en: 'Hear music the way<br>it was <em>meant to be</em>', vi: 'Nghe nhạc đúng cách<br>như nó <em>phải là</em>' },
    'hero.sub': { en: 'Lossless audio, perfectly tuned to your headphones.<br>No compression. No compromise.', vi: 'Âm thanh lossless, tinh chỉnh hoàn hảo cho tai nghe của bạn.<br>Không nén. Không thỏa hiệp.' },
    'hero.badge1': { en: 'True Lossless', vi: 'Chuẩn Lossless' },
    'hero.badge2': { en: 'AutoEQ 6,000+', vi: 'AutoEQ 6.000+' },
    'hero.badge3': { en: 'Offline & Cloud', vi: 'Offline & Cloud' },
    'hero.appstore.small': { en: 'Download on the', vi: 'Tải xuống trên' },
    'hero.appstore.label': { en: 'App Store', vi: 'App Store' },
    'hero.playstore.small': { en: 'Get it on', vi: 'Tải trên' },
    'hero.playstore.label': { en: 'Google Play', vi: 'Google Play' },

    // Feature 1 — AutoEQ
    'feat1.eyebrow': { en: 'AutoEQ', vi: 'AutoEQ' },
    'feat1.heading': { en: 'Tuned to your <em>headphones</em>', vi: 'Tinh chỉnh cho <em>tai nghe của bạn</em>' },
    'feat1.desc': { en: 'AutoEQ analyzes and applies the perfect correction curve for 6,000+ headphone and IEM models — automatically. No manual tweaking needed.', vi: 'AutoEQ phân tích và áp dụng đường cong hiệu chỉnh hoàn hảo cho hơn 6.000 mẫu tai nghe và IEM — hoàn toàn tự động.' },
    'feat1.li1': { en: '6,000+ headphone & IEM profiles', vi: '6.000+ profile tai nghe & IEM' },
    'feat1.li2': { en: 'Parametric EQ with custom presets', vi: 'EQ tham số với preset tùy chỉnh' },
    'feat1.li3': { en: 'Real-time frequency visualization', vi: 'Hiển thị tần số thời gian thực' },

    // Feature 2 — Library
    'feat2.eyebrow': { en: 'Library', vi: 'Thư viện' },
    'feat2.heading': { en: 'Your whole library, <em>in lossless</em>', vi: 'Toàn bộ thư viện, <em>chất lượng lossless</em>' },
    'feat2.desc': { en: 'Every track in FLAC. Browse by song, artist, album, or genre. Works entirely offline — no stream, no buffer, no compromise.', vi: 'Mọi bài hát ở định dạng FLAC. Duyệt theo bài, nghệ sĩ, album hoặc thể loại. Hoạt động hoàn toàn offline — không stream, không buffer.' },
    'feat2.li1': { en: 'FLAC, ALAC, WAV, MP3, AAC', vi: 'FLAC, ALAC, WAV, MP3, AAC' },
    'feat2.li2': { en: '100% offline — no internet required', vi: '100% offline — không cần internet' },

    // Feature 3 — For You
    'feat3.eyebrow': { en: 'For You', vi: 'Dành cho bạn' },
    'feat3.heading': { en: 'Made for the way <em>you listen</em>', vi: 'Được tạo theo cách <em>bạn nghe</em>' },
    'feat3.desc': { en: 'Daily mixes built around your taste, listening stats that show how your habits evolve, and a Home feed that feels personal — not algorithmic noise.', vi: 'Mix hàng ngày dựa trên sở thích của bạn, thống kê nghe nhạc cho thấy thói quen thay đổi, và trang chủ cá nhân hóa — không phải thuật toán ồn ào.' },
    'feat3.li1': { en: 'Daily mixes from your own library', vi: 'Mix hàng ngày từ thư viện của bạn' },
    'feat3.li2': { en: 'Listening time, plays & track stats', vi: 'Thời gian nghe, lượt phát & thống kê' },
    'feat3.li3': { en: 'Day · Week · Month · Year views', vi: 'Ngày · Tuần · Tháng · Năm' },

    // Feature 4 — Lyrics
    'feat4.eyebrow': { en: 'Lyrics', vi: 'Lời bài hát' },
    'feat4.heading': { en: 'Feel <em>every word</em>', vi: 'Cảm nhận <em>từng lời</em>' },
    'feat4.desc': { en: 'Synced lyrics light up line by line as the song plays. Karaoke mode, live lyrics, and offset controls so the words always land on beat.', vi: 'Lời bài hát đồng bộ sáng lên từng dòng khi bài hát phát. Chế độ karaoke, lời trực tiếp, và điều chỉnh offset để luôn đúng nhịp.' },
    'feat4.li1': { en: 'Synced line-by-line lyrics', vi: 'Lời bài hát đồng bộ từng dòng' },
    'feat4.li2': { en: 'Karaoke & live lyrics support', vi: 'Hỗ trợ karaoke & lời trực tiếp' },
    'feat4.li3': { en: 'Fine-tune offset for perfect sync', vi: 'Tinh chỉnh offset cho đồng bộ hoàn hảo' },

    // Stats strip
    'stat.headphones': { en: 'Headphone profiles', vi: 'Mẫu tai nghe' },
    'stat.hires': { en: 'Up to 32-bit / 384kHz', vi: 'Lên đến 32-bit / 384kHz' },
    'stat.offline': { en: 'Offline capable', vi: 'Hoạt động offline' },

    // Download CTA
    'dl.eyebrow': { en: 'Download free', vi: 'Tải miễn phí' },
    'dl.heading': { en: 'Start listening better, today.', vi: 'Bắt đầu nghe tốt hơn, ngay hôm nay.' },
    'dl.sub': { en: 'Free to download. No subscription required to play your local library.', vi: 'Tải miễn phí. Không cần đăng ký để phát thư viện nhạc của bạn.' },
    'dl.appstore.small': { en: 'Download on the', vi: 'Tải xuống trên' },
    'dl.appstore.label': { en: 'App Store', vi: 'App Store' },
    'dl.playstore.small': { en: 'Get it on', vi: 'Tải trên' },
    'dl.playstore.label': { en: 'Google Play', vi: 'Google Play' },
    'dl.fineprint': {
      en: 'Questions? <a href="/support">Visit Support</a> · <a href="/privacy">Privacy Policy</a> · <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>',
      vi: 'Câu hỏi? <a href="/support">Hỗ trợ</a> · <a href="/privacy">Chính sách bảo mật</a> · <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>'
    },

    // Companion app — Music Check
    'mc.eyebrow': { en: 'Companion app', vi: 'App chị em' },
    'mc.heading': { en: 'Not sure your FLAC is <em>really</em> lossless?', vi: 'Không chắc file FLAC của bạn có <em>thật</em> là lossless?' },
    'mc.sub': {
      en: 'Music Check is our companion app. It analyses any music file — codec, sample rate, spectrum and cutoff — and tells you honestly whether it’s genuine lossless or a lossy upscale (an MP3 dressed up as FLAC). Plus a simple local player.',
      vi: 'Music Check là app chị em của Synq. Nó phân tích file nhạc — codec, tần số lấy mẫu, phổ tần và tần số cắt — rồi nói thật cho bạn biết đó là lossless xịn hay đồ up-scale (MP3 đội lốt FLAC). Kèm một player nghe nhạc local đơn giản.'
    },
    'mc.cta': { en: 'Get Music Check', vi: 'Tải Music Check' },
    'mc.learn': { en: 'Learn more →', vi: 'Tìm hiểu thêm →' },

    // Two-app showcase (top of homepage)
    'apps.eyebrow': { en: 'Two apps for your music', vi: 'Hai app cho người nghe nhạc' },
    'apps.heading': { en: 'Listen properly — and know it\'s real.', vi: 'Nghe nhạc tử tế — và biết chắc nó là thật.' },
    'apps.synq.tag': { en: 'Lossless player: FLAC/DSD, AutoEQ for 6,000+ headphones, bit-perfect via USB DAC, fully offline.', vi: 'Player lossless: FLAC/DSD, AutoEQ 6.000+ tai nghe, bit-perfect qua DAC, hoàn toàn offline.' },
    'apps.mc.tag': { en: 'Is that FLAC real lossless or a fake MP3? Analyse the spectrum right on your phone.', vi: 'File FLAC là lossless thật hay MP3 đội lốt? Phân tích phổ tần ngay trên máy.' },

    // Footer
    'footer.copy': { en: '© 2025 Synq. All rights reserved.', vi: '© 2025 Synq. Mọi quyền được bảo lưu.' },
    'footer.support': { en: 'Support', vi: 'Hỗ trợ' },
    'footer.privacy': { en: 'Privacy Policy', vi: 'Chính sách bảo mật' },
    'footer.contact': { en: 'Contact', vi: 'Liên hệ' },
    'footer.delete': { en: 'Delete Account', vi: 'Xóa tài khoản' },

    // ─── DELETE ACCOUNT PAGE ───
    'del.eyebrow': { en: 'Legal', vi: 'Pháp lý' },
    'del.heading': { en: 'Delete Your Account', vi: 'Xóa tài khoản' },
    'del.subtitle': {
      en: 'You can delete your Synq account and the data linked to it at any time. This page explains how, and exactly what is removed.',
      vi: 'Bạn có thể xóa tài khoản Synq và dữ liệu liên kết bất cứ lúc nào. Trang này hướng dẫn cách làm và nêu rõ những gì sẽ bị xóa.'
    },
    'del.updated': { en: 'Last updated: July 14, 2026', vi: 'Cập nhật lần cuối: 14 tháng 7, 2026' },

    'del.s1.h': { en: 'Delete from inside the app', vi: 'Xóa ngay trong ứng dụng' },
    'del.s1.p': {
      en: 'Signing in is optional in Synq — the app works fully offline. If you did sign in to sync across devices, you can delete your account directly in the app:',
      vi: 'Đăng nhập là tùy chọn trong Synq — ứng dụng chạy hoàn toàn offline. Nếu bạn đã đăng nhập để đồng bộ đa thiết bị, bạn có thể xóa tài khoản ngay trong ứng dụng:'
    },
    'del.s1.li1': { en: 'Open <strong>Synq</strong> and go to the <strong>Account</strong> screen (Settings → Account).', vi: 'Mở <strong>Synq</strong> và vào màn hình <strong>Tài khoản</strong> (Cài đặt → Tài khoản).' },
    'del.s1.li2': { en: 'Tap <strong>Delete account</strong>.', vi: 'Chạm <strong>Xóa tài khoản</strong>.' },
    'del.s1.li3': { en: 'Confirm. Your account and its synced data are permanently removed from our servers.', vi: 'Xác nhận. Tài khoản và dữ liệu đã đồng bộ sẽ bị xóa vĩnh viễn khỏi máy chủ của chúng tôi.' },

    'del.s2.h': { en: 'What is deleted', vi: 'Những gì bị xóa' },
    'del.s2.p': { en: 'Deleting your account permanently removes the data we hold for that account:', vi: 'Xóa tài khoản sẽ xóa vĩnh viễn dữ liệu chúng tôi lưu cho tài khoản đó:' },
    'del.s2.li1': { en: 'Your account profile — email address, display name, and account ID.', vi: 'Hồ sơ tài khoản — địa chỉ email, tên hiển thị và ID tài khoản.' },
    'del.s2.li2': { en: 'Synced listening history (track title, artist, album, and play time).', vi: 'Lịch sử nghe đã đồng bộ (tên bài, nghệ sĩ, album và thời lượng nghe).' },
    'del.s2.li3': { en: 'Synced equalizer (EQ) profiles.', vi: 'Các hồ sơ EQ đã đồng bộ.' },
    'del.s2.retention': { en: 'This data is deleted within <strong>30 days</strong>, except where we must retain limited records for legal or financial compliance.', vi: 'Dữ liệu này bị xóa trong vòng <strong>30 ngày</strong>, trừ khi chúng tôi buộc phải giữ một số hồ sơ hạn chế để tuân thủ pháp lý hoặc tài chính.' },

    'del.s3.h': { en: 'What is not affected', vi: 'Những gì KHÔNG bị ảnh hưởng' },
    'del.s3.li1': { en: 'Your <strong>music files</strong> and any data stored only on your device — Synq never uploads your audio files.', vi: '<strong>Tệp nhạc</strong> và dữ liệu chỉ lưu trên thiết bị của bạn — Synq không bao giờ tải tệp âm thanh của bạn lên.' },
    'del.s3.li2': { en: 'The app keeps working offline after deletion; you can sign in again anytime to start a fresh account.', vi: 'Ứng dụng vẫn chạy offline sau khi xóa; bạn có thể đăng nhập lại bất cứ lúc nào để tạo tài khoản mới.' },

    'del.s4.h': { en: "Can't access the app?", vi: 'Không vào được ứng dụng?' },
    'del.s4.p': { en: "If you can't sign in to delete your account yourself, email us from the address linked to your account and we'll delete it for you within 30 days:", vi: 'Nếu bạn không thể đăng nhập để tự xóa, hãy gửi email từ địa chỉ liên kết với tài khoản của bạn, chúng tôi sẽ xóa giúp trong vòng 30 ngày:' },

    'del.contact.label': { en: 'Need help?', vi: 'Cần hỗ trợ?' },
    'del.contact.heading': { en: "We'll handle your request", vi: 'Chúng tôi sẽ xử lý yêu cầu của bạn' },
    'del.contact.desc': { en: 'Questions about account deletion or your data? Reach out and we\'ll help.', vi: 'Có thắc mắc về việc xóa tài khoản hoặc dữ liệu? Hãy liên hệ, chúng tôi sẽ giúp.' },

    // ─── SUPPORT PAGE ───
    'support.eyebrow': { en: 'Help Center', vi: 'Trung tâm hỗ trợ' },
    'support.heading': { en: 'How can we help you?', vi: 'Chúng tôi có thể giúp gì?' },
    'support.subtitle': {
      en: "Find answers to common questions about Synq, or contact our support team directly. We're here to make your listening experience seamless.",
      vi: 'Tìm câu trả lời cho các câu hỏi thường gặp về Synq, hoặc liên hệ trực tiếp với đội ngũ hỗ trợ. Chúng tôi luôn sẵn sàng giúp bạn có trải nghiệm nghe nhạc tốt nhất.'
    },
    'support.started.title': { en: 'Getting Started', vi: 'Bắt đầu' },
    'support.started.p1': {
      en: '<strong>Welcome to Synq</strong> — a premium music player built for listeners who care about sound quality. Here\'s everything you need to get started.',
      vi: '<strong>Chào mừng đến với Synq</strong> — ứng dụng nghe nhạc cao cấp dành cho những người yêu chất lượng âm thanh. Dưới đây là mọi thứ bạn cần để bắt đầu.'
    },
    'support.started.p2': {
      en: 'Download Synq from the App Store or Google Play, create a free account, and import your music library. Synq supports all major audio formats including FLAC, AAC, MP3, and Hi-Res LPCM. Your library syncs seamlessly across all your devices.',
      vi: 'Tải Synq từ App Store hoặc Google Play, tạo tài khoản miễn phí, và import thư viện nhạc của bạn. Synq hỗ trợ tất cả các định dạng âm thanh phổ biến bao gồm FLAC, AAC, MP3 và Hi-Res LPCM.'
    },
    'support.started.p3': {
      en: 'Once your library is set up, explore personalized playlists, smart queues, and our precision EQ — all designed around your listening habits.',
      vi: 'Sau khi thiết lập thư viện, khám phá playlist cá nhân hóa, hàng đợi thông minh, và EQ chính xác — tất cả được thiết kế xoay quanh thói quen nghe của bạn.'
    },
    'support.faq.title': { en: 'Frequently Asked Questions', vi: 'Câu hỏi thường gặp' },
    'support.faq1.q': { en: 'What audio formats does Synq support?', vi: 'Synq hỗ trợ những định dạng âm thanh nào?' },
    'support.faq1.a': {
      en: 'Synq supports a wide range of audio formats: <strong>FLAC, ALAC, WAV, AIFF</strong> (lossless), <strong>MP3, AAC, OGG Vorbis, Opus</strong> (lossy), and Hi-Res formats up to 32-bit / 384kHz. MQA and DSD playback is available on supported hardware.',
      vi: 'Synq hỗ trợ nhiều định dạng âm thanh: <strong>FLAC, ALAC, WAV, AIFF</strong> (lossless), <strong>MP3, AAC, OGG Vorbis, Opus</strong> (lossy), và định dạng Hi-Res lên đến 32-bit / 384kHz. Phát MQA và DSD có sẵn trên phần cứng hỗ trợ.'
    },
    'support.faq2.q': { en: 'Can I use Synq offline?', vi: 'Tôi có thể dùng Synq offline không?' },
    'support.faq2.a': {
      en: "Yes. Synq is a local-first music player. All music stored on your device is always available offline. If you've synced tracks from the cloud, you can also mark playlists or albums for offline listening before going offline.",
      vi: 'Có. Synq là ứng dụng nghe nhạc ưu tiên local. Tất cả nhạc trên thiết bị luôn có sẵn offline. Nếu bạn đã đồng bộ từ cloud, bạn cũng có thể đánh dấu playlist hoặc album để nghe offline.'
    },
    'support.faq3.q': { en: 'How do I import music into Synq?', vi: 'Làm thế nào để import nhạc vào Synq?' },
    'support.faq3.a': {
      en: 'On iOS: use the Files app to place your audio files in the Synq folder, or use the Share Sheet from any supported app. On Android: Synq automatically scans your device storage for music files. You can also import from cloud storage (Google Drive, Dropbox) via Settings → Cloud Sources.',
      vi: 'Trên iOS: dùng ứng dụng Files để đặt file nhạc vào thư mục Synq, hoặc dùng Share Sheet từ bất kỳ ứng dụng nào. Trên Android: Synq tự động quét bộ nhớ thiết bị. Bạn cũng có thể import từ cloud (Google Drive, Dropbox) qua Cài đặt → Cloud Sources.'
    },
    'support.faq4.q': { en: 'How does the EQ and audio enhancement work?', vi: 'EQ và cải thiện âm thanh hoạt động thế nào?' },
    'support.faq4.a': {
      en: "Synq features a <strong>10-band parametric EQ</strong> with presets for popular headphone models. The AI-powered Auto EQ automatically analyzes your headphone's frequency response and applies the optimal correction curve. You can also create and save your own presets.",
      vi: 'Synq có <strong>EQ tham số 10 dải</strong> với preset cho các mẫu tai nghe phổ biến. Auto EQ hỗ trợ AI tự động phân tích đáp ứng tần số tai nghe và áp dụng đường cong hiệu chỉnh tối ưu. Bạn cũng có thể tạo và lưu preset riêng.'
    },
    'support.faq5.q': { en: 'How do I sync my library across devices?', vi: 'Làm thế nào để đồng bộ thư viện giữa các thiết bị?' },
    'support.faq5.a': {
      en: 'Sign in with your Synq account on all your devices. Your playlists, queue history, EQ presets, and listening stats will sync automatically. Music files themselves can be synced via iCloud (iOS/macOS), Google Drive, or a custom NAS connection.',
      vi: 'Đăng nhập tài khoản Synq trên tất cả thiết bị. Playlist, lịch sử hàng đợi, preset EQ và thống kê nghe nhạc sẽ tự động đồng bộ. File nhạc có thể đồng bộ qua iCloud (iOS/macOS), Google Drive, hoặc NAS.'
    },
    'support.faq6.q': { en: 'How do I cancel or manage my subscription?', vi: 'Làm thế nào để hủy hoặc quản lý đăng ký?' },
    'support.faq6.a': {
      en: 'Subscriptions are managed through the App Store (iOS) or Google Play (Android). Go to your device\'s account settings → Subscriptions → Synq to modify or cancel. Your access continues until the end of the current billing period. For refund requests, please contact <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>.',
      vi: 'Đăng ký được quản lý qua App Store (iOS) hoặc Google Play (Android). Vào cài đặt tài khoản → Subscriptions → Synq để sửa hoặc hủy. Bạn vẫn có quyền truy cập đến hết kỳ thanh toán. Để yêu cầu hoàn tiền, liên hệ <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>.'
    },
    'support.faq7.q': { en: 'Why is my audio cutting out or stuttering?', vi: 'Tại sao âm thanh bị ngắt quãng hoặc giật?' },
    'support.faq7.a': {
      en: 'Audio stuttering is usually caused by insufficient buffer size or background app limitations. Go to <strong>Settings → Playback → Buffer Size</strong> and increase it to "Large" or "Max." On iOS, ensure Synq has background app refresh enabled. If problems persist, please contact us with your device model and OS version.',
      vi: 'Giật âm thanh thường do buffer không đủ hoặc giới hạn ứng dụng nền. Vào <strong>Cài đặt → Playback → Buffer Size</strong> và tăng lên "Large" hoặc "Max." Trên iOS, đảm bảo Synq có quyền làm mới nền. Nếu vẫn gặp vấn đề, liên hệ chúng tôi kèm thông tin thiết bị.'
    },
    'support.faq8.q': { en: 'How do I delete my Synq account?', vi: 'Làm thế nào để xóa tài khoản Synq?' },
    'support.faq8.a': {
      en: 'You can delete your account from the app: <strong>Settings → Account → Delete Account</strong>. This permanently removes all your data, playlists, and preferences from our servers. Local files on your device are not affected. Alternatively, email us at <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a> and we\'ll process the deletion within 30 days.',
      vi: 'Bạn có thể xóa tài khoản từ ứng dụng: <strong>Cài đặt → Tài khoản → Xóa tài khoản</strong>. Điều này xóa vĩnh viễn tất cả dữ liệu từ máy chủ. File trên thiết bị không bị ảnh hưởng. Hoặc email <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a> và chúng tôi sẽ xử lý trong 30 ngày.'
    },
    'support.contact.label': { en: 'Still need help?', vi: 'Vẫn cần hỗ trợ?' },
    'support.contact.heading': { en: 'Contact Support', vi: 'Liên hệ hỗ trợ' },
    'support.contact.desc': {
      en: "Can't find what you're looking for? Our team typically responds within 24 hours, Monday through Friday.",
      vi: 'Không tìm được câu trả lời? Đội ngũ của chúng tôi thường phản hồi trong 24 giờ, từ thứ Hai đến thứ Sáu.'
    },

    // ─── PRIVACY PAGE ───
    'privacy.eyebrow': { en: 'Legal', vi: 'Pháp lý' },
    'privacy.heading': { en: 'Privacy Policy', vi: 'Chính sách bảo mật' },
    'privacy.subtitle': {
      en: 'Your privacy matters. This policy explains what data Synq collects, why we collect it, and how we protect it.',
      vi: 'Quyền riêng tư của bạn rất quan trọng. Chính sách này giải thích dữ liệu Synq thu thập, lý do và cách bảo vệ.'
    },
    'privacy.updated': { en: 'Last updated: June 17, 2025', vi: 'Cập nhật lần cuối: 17 tháng 6, 2025' },
    'privacy.contact.label': { en: 'Questions about your data?', vi: 'Câu hỏi về dữ liệu của bạn?' },
    'privacy.contact.heading': { en: "We're here to help", vi: 'Chúng tôi luôn sẵn sàng giúp đỡ' },
    'privacy.contact.desc': {
      en: 'Have a question about how we handle your data or want to exercise your privacy rights? Contact our team.',
      vi: 'Có câu hỏi về cách chúng tôi xử lý dữ liệu hoặc muốn thực hiện quyền riêng tư? Liên hệ đội ngũ của chúng tôi.'
    },

    // ─── MUSIC CHECK PRIVACY PAGE ───
    // A separate app with a separate policy. Do not fold these into the Synq
    // keys above: the Synq policy states it does not use data for targeted
    // advertising, which is true of Synq and false of Music Check.
    'mcp.eyebrow': { en: 'Legal · Music Check', vi: 'Pháp lý · Music Check' },
    'mcp.heading': { en: 'Music Check — Privacy Policy', vi: 'Music Check — Chính sách bảo mật' },
    'mcp.subtitle': {
      en: 'Music Check analyses music files already on your device and tells you whether they are genuinely lossless. It has no accounts, no cloud storage, and no server of its own.',
      vi: 'Music Check phân tích các file nhạc đã có sẵn trong máy bạn để cho biết chúng có thật sự là lossless hay không. App không có tài khoản, không lưu trữ đám mây, và không có máy chủ riêng.'
    },
    'mcp.updated': { en: 'Effective: 12 August 2026', vi: 'Hiệu lực từ: 12 tháng 8, 2026' },

    'mcp.s0.h': { en: 'Which app this covers', vi: 'Chính sách này áp dụng cho app nào' },
    'mcp.s0.p': {
      en: 'This policy applies to <strong>Music Check</strong> only (package <code>com.verifymusic.app</code>). Synq is a different app with a different policy, which you can read <a href="/privacy">here</a>.',
      vi: 'Chính sách này chỉ áp dụng cho <strong>Music Check</strong> (tên gói <code>com.verifymusic.app</code>). Synq là một app khác với chính sách riêng, đọc <a href="/privacy">tại đây</a>.'
    },

    'mcp.s1.h': { en: 'What Music Check itself collects: nothing', vi: 'Bản thân Music Check thu thập gì: không gì cả' },
    'mcp.s1.p': {
      en: 'Your music files, the analysis results, your library index, favourites and playlists <strong>never leave your device</strong>. We do not operate a server, we cannot see your files, and we have no way to identify you. There is no account to create and no sign-in.',
      vi: 'File nhạc, kết quả thẩm định, danh mục thư viện, mục yêu thích và playlist của bạn <strong>không bao giờ rời khỏi máy</strong>. Chúng tôi không vận hành máy chủ nào, không nhìn thấy file của bạn, và không có cách nào nhận ra bạn là ai. Không có tài khoản để đăng ký, không có đăng nhập.'
    },

    'mcp.s2.h': { en: 'Advertising — Google AdMob', vi: 'Quảng cáo — Google AdMob' },
    'mcp.s2.p1': {
      en: 'The free version shows adverts supplied by Google AdMob. Google may collect:',
      vi: 'Bản miễn phí có quảng cáo do Google AdMob cung cấp. Google có thể thu thập:'
    },
    'mcp.s2.l1': { en: 'Advertising and device identifiers', vi: 'Mã nhận dạng quảng cáo và mã nhận dạng thiết bị' },
    'mcp.s2.l2': { en: 'IP address, and approximate location derived from it (country or region level)', vi: 'Địa chỉ IP và vị trí gần đúng suy ra từ đó (mức quốc gia hoặc khu vực)' },
    'mcp.s2.l3': { en: 'Device and operating-system information, and diagnostic data such as crash logs', vi: 'Thông tin thiết bị, hệ điều hành, và dữ liệu chẩn đoán như nhật ký sự cố' },
    'mcp.s2.l4': { en: 'Your interactions with adverts', vi: 'Thao tác của bạn với quảng cáo' },
    'mcp.s2.p2': {
      en: 'Google uses this to select and measure adverts and to detect fraud. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google\'s Privacy Policy</a> and <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">how Google uses information from apps that use its services</a>.',
      vi: 'Google dùng những dữ liệu này để chọn và đo lường quảng cáo, và để phát hiện gian lận. Xem <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Chính sách bảo mật của Google</a> và <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">cách Google sử dụng thông tin từ ứng dụng dùng dịch vụ của Google</a>.'
    },
    'mcp.s2.p3': {
      en: '<strong>Your choices.</strong> In the European Economic Area, the United Kingdom and Switzerland, Music Check shows Google\'s consent dialog before personalised adverts are used. On iOS, Music Check <strong>does not</strong> ask for App Tracking Transparency permission and therefore does not use the cross-app tracking identifier. On Android you can reset or delete your advertising ID in Settings → Privacy → Ads.',
      vi: '<strong>Quyền lựa chọn của bạn.</strong> Ở Khu vực Kinh tế châu Âu, Vương quốc Anh và Thuỵ Sĩ, Music Check hiện hộp thoại xin đồng ý của Google trước khi dùng quảng cáo cá nhân hoá. Trên iOS, Music Check <strong>không</strong> xin quyền App Tracking Transparency, nên không sử dụng mã theo dõi xuyên ứng dụng. Trên Android bạn có thể đặt lại hoặc xoá mã quảng cáo trong Cài đặt → Quyền riêng tư → Quảng cáo.'
    },
    'mcp.s2.p4': {
      en: '<strong>Buying the one-time unlock removes all adverts permanently</strong>, and with them this entire category of data collection.',
      vi: '<strong>Mua gói mở khoá một lần là gỡ sạch quảng cáo vĩnh viễn</strong>, và cùng với đó là toàn bộ nhóm dữ liệu nói trên.'
    },

    'mcp.s3.h': { en: 'Payments — Apple and Google', vi: 'Thanh toán — Apple và Google' },
    'mcp.s3.p': {
      en: 'The one-time unlock is sold through the App Store and Google Play. Those stores handle the payment and their own privacy policies apply. Music Check receives only a confirmation that the unlock was purchased. <strong>No card or bank details ever reach the app or us.</strong>',
      vi: 'Gói mở khoá một lần được bán qua App Store và Google Play. Hai cửa hàng đó xử lý việc thanh toán và áp dụng chính sách bảo mật của chính họ. Music Check chỉ nhận được tín hiệu xác nhận rằng gói đã được mua. <strong>Không có thông tin thẻ hay ngân hàng nào đi tới app hay tới chúng tôi.</strong>'
    },

    'mcp.s4.h': { en: 'What is stored on your device only', vi: 'Những gì chỉ được lưu dưới máy bạn' },
    'mcp.s4.l1': { en: 'An index of the music files you added, and cached analysis results', vi: 'Danh mục các file nhạc bạn đã thêm, và kết quả thẩm định đã lưu tạm' },
    'mcp.s4.l2': { en: 'Your favourites and playlists', vi: 'Mục yêu thích và playlist của bạn' },
    'mcp.s4.l3': { en: 'How many free deep scans you have used, and whether you bought the unlock', vi: 'Số lần quét chuyên sâu miễn phí đã dùng, và bạn đã mua gói mở khoá hay chưa' },
    'mcp.s4.l4': { en: 'A counter used to space out adverts', vi: 'Một bộ đếm để giãn cách quảng cáo' },
    'mcp.s4.p': {
      en: 'None of this is transmitted anywhere. <strong>Uninstalling Music Check deletes all of it.</strong>',
      vi: 'Không thứ nào trong số này được gửi đi đâu cả. <strong>Gỡ Music Check là xoá sạch tất cả.</strong>'
    },

    'mcp.s5.h': { en: 'Permissions', vi: 'Quyền truy cập' },
    'mcp.s5.l1': {
      en: '<strong>Music and audio access (Android)</strong> — to find and read the music files you ask it to analyse',
      vi: '<strong>Truy cập nhạc và âm thanh (Android)</strong> — tìm và đọc file nhạc bạn yêu cầu thẩm định'
    },
    'mcp.s5.l2': {
      en: '<strong>Foreground service / media playback</strong> — to keep playing while the app is in the background',
      vi: '<strong>Dịch vụ nền / phát nhạc</strong> — phát tiếp khi app chạy nền'
    },
    'mcp.s5.l3': {
      en: '<strong>Prevent sleeping</strong> — to keep a long deep scan running to the end',
      vi: '<strong>Chống ngủ màn hình</strong> — giữ cho một lượt quét chuyên sâu dài chạy tới cùng'
    },
    'mcp.s5.p': {
      en: 'Music Check does not request location, contacts, camera, microphone, or storage beyond your audio files.',
      vi: 'Music Check không xin quyền vị trí, danh bạ, camera, micro, hay bộ nhớ ngoài phạm vi file âm thanh của bạn.'
    },

    'mcp.s6.h': { en: 'Children', vi: 'Trẻ em' },
    'mcp.s6.p': {
      en: 'Music Check is not directed at children under 13, and we do not knowingly collect information from them.',
      vi: 'Music Check không nhắm tới trẻ em dưới 13 tuổi và chúng tôi không cố ý thu thập thông tin từ các em.'
    },

    'mcp.s7.h': { en: 'Changes and contact', vi: 'Thay đổi và liên hệ' },
    'mcp.s7.p1': {
      en: 'If this policy changes, we will update the effective date at the top of this page.',
      vi: 'Nếu chính sách này thay đổi, chúng tôi sẽ cập nhật ngày hiệu lực ở đầu trang.'
    },
    'mcp.s7.p2': {
      en: 'Questions about your data? Write to <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>.',
      vi: 'Có câu hỏi về dữ liệu của bạn? Gửi thư tới <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>.'
    }
  };

  var STORAGE_KEY = 'synq-lang';

  function getLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* noop */ }
  }

  function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var entry = translations[key];
      if (!entry) return;
      var text = entry[lang] || entry['en'];
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    // Update toggle buttons
    document.querySelectorAll('.lang-toggle').forEach(function (toggle) {
      var btns = toggle.querySelectorAll('.lang-btn');
      btns.forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
      });
    });
  }

  function initI18n() {
    var lang = getLang();
    applyTranslations(lang);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newLang = this.getAttribute('data-lang');
        if (newLang === getLang()) return;
        setLang(newLang);
        applyTranslations(newLang);
      });
    });
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }

  // Expose for external use
  window.SynqI18n = {
    setLang: function (lang) {
      setLang(lang);
      applyTranslations(lang);
    },
    getLang: getLang
  };
})();
