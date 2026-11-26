#!/usr/bin/env python3
"""Insert/refresh the shared header+footer and head links on pages (see tools/chrome.py)."""
import re, glob, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from chrome import header, footer

PUB = os.path.join(os.path.dirname(__file__), '..', 'public')
SKIP = {'s.html'}  # redirect stub
ACTIVE = {'help.html': 'support', 'support.html': 'support', 'privacy.html': 'support', 'terms.html': 'support', 'delete-account.html': 'support',
          'synqtag-privacy.html': 'products', 'music-check-privacy.html': 'products', 'synqtag.html': 'products',
          'music-check.html': 'products'}
HEAD_LINKS = '<link rel="stylesheet" href="/chrome.css" />\n  <script src="/chrome.js" defer></script>\n'

def process(path, rel):
    s = open(path, encoding='utf-8').read()
    o = s
    active = ACTIVE.get(rel, 'synq' if rel.startswith('synq/') or rel in ('changelog.html', 'get.html') else '')
    m = re.search(r'class="sq-header" data-theme="(\w+)"', s)
    theme = m.group(1) if m else 'dark'
    h, f = header(theme, active), footer(theme)
    s = re.sub(r'<!--sq:header-->.*?<!--/sq:header-->', lambda m: h, s, flags=re.S)
    s = re.sub(r'<!--sq:footer-->.*?<!--/sq:footer-->', lambda m: f, s, flags=re.S)
    if '<!--sq:header-->' not in s:
        s = re.sub(r'<header class="site-header".*?</header>', lambda m: h, s, count=1, flags=re.S)
    if '<!--sq:footer-->' not in s:
        s = re.sub(r'<footer class="site-footer".*?</footer>', lambda m: f, s, count=1, flags=re.S)
    if '/chrome.css' not in s:
        s = s.replace('</head>', '  ' + HEAD_LINKS + '</head>', 1)
    if s != o:
        open(path, 'w', encoding='utf-8').write(s); print('updated', rel)

for p in sorted(glob.glob(PUB + '/*.html') + glob.glob(PUB + '/synq/**/*.html', recursive=True) + glob.glob(PUB + '/kagezan/**/*.html', recursive=True)):
    rel = os.path.relpath(p, PUB)
    if rel in SKIP: continue
    process(p, rel)
