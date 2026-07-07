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

    // Hero
    'hero.eyebrow': { en: '✦ Now available on iOS & Android', vi: '✦ Đã có trên iOS & Android' },
    'hero.h1': { en: 'Hear music the way<br>it was <em>meant to be</em>', vi: 'Nghe nhạc đúng cách<br>như nó <em>phải là</em>' },
    'hero.sub': { en: 'Lossless audio, perfectly tuned to your headphones.<br>No compression. No compromise.', vi: 'Âm thanh lossless, tinh chỉnh hoàn hảo cho tai nghe của bạn.<br>Không nén. Không thỏa hiệp.' },
    'hero.badge1': { en: 'True Lossless', vi: 'Chuẩn Lossless' },
    'hero.badge2': { en: 'AutoEQ 6,000+', vi: 'AutoEQ 6.000+' },
    'hero.badge3': { en: 'Offline & Cloud', vi: 'Offline & Cloud' },
    'hero.appstore.small': { en: 'Download on the', vi: 'Tải xuống trên' },
    'hero.appstore.label': { en: 'App Store', vi: 'App Store' },
    'hero.playstore.small': { en: 'Coming soon on', vi: 'Sắp có trên' },
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
    'dl.playstore.small': { en: 'Coming soon on', vi: 'Sắp có trên' },
    'dl.playstore.label': { en: 'Google Play', vi: 'Google Play' },
    'dl.fineprint': {
      en: 'Questions? <a href="/support">Visit Support</a> · <a href="/privacy">Privacy Policy</a> · <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>',
      vi: 'Câu hỏi? <a href="/support">Hỗ trợ</a> · <a href="/privacy">Chính sách bảo mật</a> · <a href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>'
    },

    // Footer
    'footer.copy': { en: '© 2025 Synq. All rights reserved.', vi: '© 2025 Synq. Mọi quyền được bảo lưu.' },
    'footer.support': { en: 'Support', vi: 'Hỗ trợ' },
    'footer.privacy': { en: 'Privacy Policy', vi: 'Chính sách bảo mật' },
    'footer.contact': { en: 'Contact', vi: 'Liên hệ' },

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
