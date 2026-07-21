/* ============================================================
   SYNQ — APK download config (SINGLE SOURCE OF TRUTH)
   ------------------------------------------------------------
   Mỗi khi ra bản Android mới:
     1. Upload APK (bản Play đã ký) lên R2, giữ tên file synq-latest.apk
        → URL công khai KHÔNG đổi, khỏi sửa web.
     2. Chỉ cập nhật VERSION + SIZE_MB + (nếu cần) URL bên dưới.
     3. Thêm 1 entry mới vào đầu mảng RELEASES trong changelog.js.
   ============================================================ */
(function () {
  'use strict';

  var APK_VERSION = '1.3.0';   // ⬅ mỗi bản mới chỉ cần sửa dòng này (versionCode 7)
  var APK_SIZE_MB = 78;        // dung lượng ~ (MB) để hiện cho người tải

  // URL công khai trên Cloudflare R2 (bucket synq-sample-audio, gắn
  // cdn.synqstudio.cloud). Tên file kèm version → mỗi bản 1 URL mới → khỏi lo
  // cache CDN cũ. Upload file tên đúng "Synq-v<version>.apk".
  var APK_URL = 'https://cdn.synqstudio.cloud/Synq-v' + APK_VERSION + '.apk';

  // Expose cho changelog.js / các trang khác dùng chung.
  window.SYNQ_APK = { url: APK_URL, version: APK_VERSION, sizeMB: APK_SIZE_MB };

  function wire() {
    // Mọi anchor có [data-apk-link] → trỏ href tới APK.
    document.querySelectorAll('[data-apk-link]').forEach(function (a) {
      a.setAttribute('href', APK_URL);
      a.setAttribute('download', '');
    });
    // Mọi phần tử [data-apk-version] → điền "v<version>".
    document.querySelectorAll('[data-apk-version]').forEach(function (el) {
      el.textContent = 'v' + APK_VERSION;
    });
    // Mọi phần tử [data-apk-size] → điền "~<size> MB".
    document.querySelectorAll('[data-apk-size]').forEach(function (el) {
      el.textContent = '~' + APK_SIZE_MB + ' MB';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
