/* ============================================================
   SYNQ — Changelog (EN / VI)
   ------------------------------------------------------------
   THÊM BẢN MỚI: chèn 1 object vào ĐẦU mảng RELEASES bên dưới,
   đặt latest:true cho nó và bỏ latest ở bản cũ. Cập nhật version
   trong apk.js. Xong — trang tự render.
   ============================================================ */
(function () {
  'use strict';

  /* ---- Dữ liệu phát hành (mới nhất lên đầu) ---- */
  var RELEASES = [
    {
      version: '1.3.0',
      date: { en: 'July 14, 2026', vi: '14 tháng 7, 2026' },
      platforms: ['iOS', 'Android'],
      latest: true,
      notes: {
        en: [
          'USB bit-perfect playback for external DACs — native sample rate, up to 32-bit.',
          'New Bit-Perfect subscription ($0.99/mo) for pure lossless USB output.',
          'Cloud cover art now loads reliably on OneDrive, Dropbox & Google Drive.',
          'Home now blends your cloud and local tracks into one smart queue.',
          'Live EQ — hear tuning changes instantly, no "apply" step.',
          'Albums sort correctly by disc & track number.',
          'Honest lossless badges and assorted fixes.'
        ],
        vi: [
          'Phát bit-perfect qua DAC USB rời — đúng sample rate gốc, tới 32-bit.',
          'Gói Bit-Perfect mới ($0.99/tháng) cho ngõ ra USB lossless thuần.',
          'Ảnh bìa nhạc cloud tải ổn định trên OneDrive, Dropbox & Google Drive.',
          'Trang chủ trộn nhạc cloud và nhạc máy vào chung một hàng đợi thông minh.',
          'EQ trực tiếp — nghe thay đổi ngay, không cần bấm "áp dụng".',
          'Album sắp xếp đúng theo số đĩa & số track.',
          'Nhãn lossless trung thực và nhiều sửa lỗi khác.'
        ]
      }
    },
    {
      version: '1.2.0',
      date: { en: 'July 5, 2026', vi: '5 tháng 7, 2026' },
      platforms: ['iOS', 'Android'],
      notes: {
        en: [
          'Purist Mode — a focused, distraction-free listening experience.',
          'Fixed lock-screen playback controls on iOS.',
          'Performance, stability and battery improvements.'
        ],
        vi: [
          'Chế độ Purist — trải nghiệm nghe tập trung, không xao nhãng.',
          'Sửa điều khiển phát nhạc trên màn hình khoá iOS.',
          'Cải thiện hiệu năng, độ ổn định và pin.'
        ]
      }
    },
    {
      version: '1.0.0',
      date: { en: 'June 21, 2026', vi: '21 tháng 6, 2026' },
      platforms: ['iOS', 'Android'],
      notes: {
        en: [
          'First public release on iOS & Android.',
          'True lossless playback — FLAC, ALAC, WAV, MP3, AAC.',
          'AutoEQ for 6,000+ headphones & IEMs.',
          'WiFi transfer, Android Auto & CarPlay.',
          'Synced, line-by-line lyrics.'
        ],
        vi: [
          'Bản phát hành công khai đầu tiên trên iOS & Android.',
          'Phát lossless đúng chuẩn — FLAC, ALAC, WAV, MP3, AAC.',
          'AutoEQ cho hơn 6.000 mẫu tai nghe & IEM.',
          'Truyền qua WiFi, Android Auto & CarPlay.',
          'Lời bài hát đồng bộ từng dòng.'
        ]
      }
    }
  ];

  /* ---- Chuỗi giao diện (EN/VI) ---- */
  var STR = {
    latestBadge: { en: 'Latest', vi: 'Mới nhất' },
    dlTitle: { en: 'Synq for Android', vi: 'Synq cho Android' },
    dlMeta: { en: 'Direct APK · Android 8+', vi: 'APK cài trực tiếp · Android 8+' },
    dlBtn: { en: 'Download APK', vi: 'Tải APK' },
    dlHint: {
      en: 'Prefer the store? Get it on <a href="https://play.google.com/store/apps/details?id=com.synqmusic.app" target="_blank" rel="noopener">Google Play</a> or the <a href="https://apps.apple.com/vn/app/synq-hires-offline-music/id6782488036" target="_blank" rel="noopener">App Store</a>.',
      vi: 'Muốn qua store? Tải trên <a href="https://play.google.com/store/apps/details?id=com.synqmusic.app" target="_blank" rel="noopener">Google Play</a> hoặc <a href="https://apps.apple.com/vn/app/synq-hires-offline-music/id6782488036" target="_blank" rel="noopener">App Store</a>.'
    },
    sideloadNote: {
      en: 'The APK is the same build published on Google Play, signed by Google. On first install Android may ask you to allow installs from your browser.',
      vi: 'File APK chính là bản đã phát hành trên Google Play, do Google ký. Lần đầu cài, Android có thể hỏi cho phép cài từ trình duyệt.'
    }
  };

  function currentLang() {
    try {
      if (window.SynqI18n && window.SynqI18n.getLang) return window.SynqI18n.getLang();
      return localStorage.getItem('synq-lang') || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function t(entry, lang) {
    return (entry && (entry[lang] || entry.en)) || '';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderLatest(lang) {
    var host = document.getElementById('latest-download');
    if (!host) return;
    var apk = window.SYNQ_APK || { url: '#', version: '', sizeMB: '' };
    var size = apk.sizeMB ? ' · ~' + apk.sizeMB + ' MB' : '';
    host.innerHTML =
      '<div class="dl-latest-info">' +
        '<span class="dl-latest-badge">' + esc(t(STR.latestBadge, lang)) + '</span>' +
        '<h2>' + esc(t(STR.dlTitle, lang)) + ' <span class="dl-latest-ver">v' + esc(apk.version) + '</span></h2>' +
        '<p class="dl-latest-meta">' + esc(t(STR.dlMeta, lang)) + size + '</p>' +
      '</div>' +
      '<a class="btn-primary dl-latest-btn" href="' + esc(apk.url) + '" download>' +
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 12 5 5 5-5"/><path d="M5 21h14"/></svg>' +
        '<span>' + esc(t(STR.dlBtn, lang)) + '</span>' +
      '</a>';
  }

  function renderNote(lang) {
    var el = document.getElementById('sideload-note');
    if (el) el.textContent = t(STR.sideloadNote, lang);
    var hint = document.getElementById('latest-hint');
    if (hint) hint.innerHTML = t(STR.dlHint, lang);
  }

  function renderTimeline(lang) {
    var host = document.getElementById('changelog-list');
    if (!host) return;
    host.innerHTML = RELEASES.map(function (rel) {
      var notes = (rel.notes[lang] || rel.notes.en).map(function (n) {
        return '<li>' + esc(n) + '</li>';
      }).join('');
      var badge = rel.latest
        ? '<span class="rel-latest">' + esc(t(STR.latestBadge, lang)) + '</span>'
        : '';
      var plats = (rel.platforms || []).map(esc).join(' · ');
      return (
        '<article class="rel-card">' +
          '<div class="rel-head">' +
            '<span class="rel-version">v' + esc(rel.version) + '</span>' +
            badge +
            '<span class="rel-date">' + esc(t(rel.date, lang)) + '</span>' +
            '<span class="rel-platforms">' + plats + '</span>' +
          '</div>' +
          '<ul class="rel-notes">' + notes + '</ul>' +
        '</article>'
      );
    }).join('');
  }

  function renderAll() {
    var lang = currentLang();
    renderLatest(lang);
    renderNote(lang);
    renderTimeline(lang);
  }

  function init() {
    renderAll();
    // Re-render khi đổi ngôn ngữ (i18n.js đã lo storage + trạng thái active).
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        // đợi i18n.js lưu lang xong (cùng vòng event) rồi render lại.
        setTimeout(renderAll, 0);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
