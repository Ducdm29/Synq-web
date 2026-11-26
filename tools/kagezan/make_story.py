#!/usr/bin/env python3
"""/kagezan story strip images: one v3 slide per chapter (read-only source, copy + convert only).
   Only chN_1..chN_4. Never ch8_4, ch13_3, ch15_2, ch15_4, *_intro_*, *_outro_*, *_fg.png, ending_*, opening_*.
   Needs ffmpeg + cwebp. -> public/img/story/chN.webp (1000x667, aim < 100 KB)"""
import os, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.expanduser('~/Documents/Reverse Engineer/Shadow blade/shadow-blade-godot/assets/ui/story')
OUT = os.path.join(ROOT, 'public', 'img', 'story')
SLIDE = {n: 'ch%d_1' % n for n in range(1, 16)}   # the establishing slide of each chapter (the place)
FORBIDDEN = {'ch8_4', 'ch13_3', 'ch15_2', 'ch15_4'}
for n, sl in SLIDE.items():
    assert sl not in FORBIDDEN
    tmp = '/tmp/_story_%d.png' % n
    subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '2', '-i', os.path.join(SRC, sl + '.jpg'), '-vf', 'scale=1000:667', '-y', tmp], check=True)
    dst = os.path.join(OUT, 'ch%d.webp' % n)
    for q in ('62', '54', '46'):
        subprocess.run(['cwebp', '-quiet', '-q', q, tmp, '-o', dst], check=True)
        if os.path.getsize(dst) < 100 * 1024: break
    os.remove(tmp); print(n, sl, os.path.getsize(dst) // 1024, 'KB')
