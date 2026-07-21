# APK download + Changelog — cách vận hành

Trang tải APK trực tiếp (sideload) + trang **/changelog** cho synqstudio.cloud.
File nhạc/APK **không** để trong repo — chứa trên **Cloudflare R2** (cùng account
với Worker `synq-sync`). Site chỉ trỏ link tới R2.

## Kiến trúc

- `public/apk.js` — **1 nguồn duy nhất**: URL + version + size của APK. Tự gắn vào
  mọi nút `[data-apk-link]` (index, get, changelog).
- `public/changelog.js` — mảng `RELEASES` (EN/VI) → render timeline + thẻ tải bản mới.
- `public/changelog.html` — trang `/changelog` (đã thêm rewrite trong `vercel.json`).
- Nút "Download APK (Android)" đã thêm ở **home** (khối Download) và **/get**; nav có
  link **What's New** → /changelog.

Link APK: **`https://cdn.synqstudio.cloud/Synq-v<version>.apk`** (tên file kèm version
→ mỗi bản 1 URL mới, khỏi lo cache CDN cũ). `apk.js` tự ghép URL theo `APK_VERSION`.

## Dựng R2 (làm 1 lần)

Dùng lại bucket **`synq-sample-audio`** (đã có sẵn, đã gắn `cdn.synqstudio.cloud`
và đang public — cùng chỗ chứa nhạc trial + `app_version.json` force-update iOS).
Không cần tạo bucket/domain mới.

1. Đổi tên file `~/Downloads/7.apk` → **`Synq-v1.3.0.apk`**.
2. Cloudflare Dashboard → **R2** → bucket `synq-sample-audio` → kéo-thả upload
   `Synq-v1.3.0.apk` vào (để ở root bucket).
3. Xong → mở `https://cdn.synqstudio.cloud/Synq-v1.3.0.apk` phải tải được file.

> Bằng CLI thay cho bước 2 (tùy chọn):
> ```bash
> cd worker
> npx wrangler r2 object put synq-sample-audio/Synq-v1.3.0.apk --file ~/Downloads/7.apk \
>   --content-type application/vnd.android.package-archive
> ```

## Ra bản Android mới (mỗi lần)

1. Tải APK **đã ký (Play, universal)** từ Play Console về, đổi tên `Synq-v<version>.apk`.
2. Upload vào bucket `synq-sample-audio` (tên mới theo version → URL mới, khỏi purge cache).
3. Sửa `public/apk.js`: chỉ cần `APK_VERSION` (URL tự ghép) + `APK_SIZE_MB`.
4. Thêm 1 entry vào **đầu** mảng `RELEASES` trong `public/changelog.js`
   (đặt `latest:true`, bỏ `latest` ở bản cũ), viết notes EN + VI.
5. Commit + push → Vercel tự deploy.

## Preview cục bộ

```bash
cd public && python3 -m http.server 8790   # mở http://localhost:8790/changelog.html
```
