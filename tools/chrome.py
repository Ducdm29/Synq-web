"""Shared header/footer for synqstudio.cloud. Single source: edit here, then run
   python3 tools/sync_chrome.py   (rewrites the marked regions in every page)."""

def t(vi, en):
    return f'<span data-lang-block="vi">{vi}</span><span data-lang-block="en">{en}</span>'

NAV = [  # href, vi, en, key
    ("/#products", "Sản phẩm", "Products", "products"),
    ("/help", "Hỗ trợ", "Support", "support"),
]

def header(theme="dark", active=""):
    cur = ' aria-current="page"'
    links = "".join(
        f'<a href="{h}"{cur if k == active else ""}>{t(vi, en)}</a>'
        for h, vi, en, k in NAV)
    return f'''<!--sq:header-->
<script>var l=null;try{{l=localStorage.getItem('synq-lang')}}catch(e){{}}if(!l){{var n=(navigator.languages&&navigator.languages[0])||navigator.language||'en';l=/^vi/i.test(n)?'vi':'en'}}document.documentElement.lang=l;</script>
<a class="sq-skip" href="#main-content">{t("Bỏ qua điều hướng", "Skip to content")}</a>
<header class="sq-header" data-theme="{theme}">
  <div class="sq-bar">
    <a class="sq-brand" href="/"><b>SYNQ</b> <span>Studio</span></a>
    <nav class="sq-nav" id="sq-nav" aria-label="Main">{links}</nav>
    <div class="sq-tools">
      <div class="lang-toggle" role="group" aria-label="Language">
        <button type="button" class="lang-btn" data-lang="en" aria-label="EN English" lang="en">EN</button>
        <button type="button" class="lang-btn" data-lang="vi" aria-label="VI Tiếng Việt" lang="vi">VI</button>
      </div>
      <button type="button" class="sq-menu" aria-expanded="false" aria-controls="sq-nav" aria-label="Menu"><i></i><i></i></button>
    </div>
  </div>
</header>
<!--/sq:header-->'''

def footer(theme="dark"):
    def col(title, items):
        li = "".join(f'<li><a href="{h}">{t(vi, en)}</a></li>' for h, vi, en in items)
        return f'<div class="sq-col"><h2>{t(*title)}</h2><ul>{li}</ul></div>'
    return f'''<!--sq:footer-->
<footer class="sq-footer" data-theme="{theme}">
  <div class="sq-foot">
    <div class="sq-col sq-about">
      <a class="sq-brand" href="/"><b>SYNQ</b> <span>Studio</span></a>
      <p>{t("Studio nhỏ làm game và app nghe nhạc.", "A small studio making games and music apps.")}</p>
      <a class="sq-mail" href="mailto:support.synq@gmail.com">support.synq@gmail.com</a>
    </div>
    {col(("Sản phẩm","Products"), [("/kagezan","Kagezan","Kagezan"),("/synq","Synq","Synq"),("/synqtag","SynqTag","SynqTag"),("/music-check","Music Check","Music Check")])}
    {col(("Synq","Synq"), [("/synq/guides","Bài viết &amp; hướng dẫn","Articles &amp; guides"),("/changelog","Có gì mới","What’s new"),("/get","Tải Synq","Get Synq")])}
    {col(("Hỗ trợ","Support"), [("/help","Trung tâm hỗ trợ","Help center"),("/support","Hỗ trợ Synq","Synq support"),("/kagezan-support","Hỗ trợ Kagezan","Kagezan support"),("/privacy","Quyền riêng tư","Privacy"),("/terms","Điều khoản","Terms"),("/delete-account","Xoá tài khoản","Delete account")])}
  </div>
  <p class="sq-legal">© 2026 SYNQ Studio</p>
</footer>
<!--/sq:footer-->'''
