#!/usr/bin/env python3
"""Check every internal href/src in public/*.html resolves through vercel.json rules,
   and that the hard-constraint URLs still resolve."""
import glob, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from preview import resolve, PUB
HARD = ['/privacy','/terms','/support','/delete-account','/kagezan','/kagezan-privacy','/kagezan-terms','/kagezan-support',
 '/kagezan-delete-account','/shadowblade','/shadowblade-privacy','/shadowblade-terms','/shadowblade-support','/shadowblade-delete-account',
 '/synqtag-privacy','/music-check-privacy','/get','/changelog','/s/abc123','/admin/share','/.well-known/apple-app-site-association',
 '/ads.txt','/app-ads.txt','/','/synq','/synq/guides','/help','/synqtag','/music-check']
bad = 0
for u in HARD:
    r = resolve(u); ok = r[0] != '404'
    print(('OK  ' if ok else 'FAIL'), u, r[0], r[-1] if r[0]=='redirect' else '')
    bad += not ok
old = [os.path.relpath(p, os.path.join(PUB,'synq')) for p in glob.glob(PUB+'/synq/guides/*.html')]
for f in old:
    slug = f.replace('guides/','')[:-5]
    r = resolve('/guides/'+slug); ok = r[0]=='redirect' and r[2]=='/synq/guides/'+slug
    r2 = resolve('/synq/guides/'+slug); ok = ok and r2[0]=='file'
    if not ok: print('FAIL guide', slug); bad += 1
print('guides checked', len(old))
pat = re.compile(r'(?:href|src|poster)="([^"#?][^"]*|#[^"]*|/#[^"]*)"')
seen = set()
for p in glob.glob(PUB+'/**/*.html', recursive=True):
    s = open(p, encoding='utf-8').read()
    rel = os.path.relpath(p, PUB)
    for m in re.finditer(r'(?:href|src|poster)="([^"]+)"', s):
        u = m.group(1)
        if re.match(r'(https?:|mailto:|tel:|data:|javascript:|#)', u) or u.startswith('//'): continue
        path = u.split('#')[0].split('?')[0]
        if not path: continue
        if not path.startswith('/'): path = '/' + os.path.dirname(rel) + '/' + path
        key = (rel, path)
        if key in seen: continue
        seen.add(key)
        if resolve(path)[0] == '404' and not path.startswith('/_vercel'):
            print('BROKEN', rel, '->', u); bad += 1
print('FAILURES:', bad)
