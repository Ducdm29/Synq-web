#!/usr/bin/env python3
"""Builds the Kagezan pages into public/ (kagezan.html + the four legal/help pages).
   Run from the repo root:  python3 tools/kagezan/build.py && python3 tools/sync_chrome.py
   (Moved here from the game repo's store-assets/web_src. The game session no longer runs a generator.)"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(HERE, '..'))
import landing, legal, help as hp, news
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, '..', '..', 'public')
live = news.build()
print('news live:', ', '.join(p['slug'] for p in live) or '-')
for name, html in [("kagezan.html", landing.build()), ("kagezan-privacy.html", legal.privacy()), ("kagezan-terms.html", legal.terms()),
                   ("kagezan-support.html", hp.support_html()), ("kagezan-delete-account.html", hp.delete())]:
    open(os.path.join(OUT, name), "w", encoding="utf-8").write(html)
    print(name, len(html))
