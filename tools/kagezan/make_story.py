#!/usr/bin/env python3
"""/kagezan story images from the game's v3 story slides (read-only source, copy + convert only).
   Only chN_1..chN_4, minus FORBIDDEN (each of those hints at a twist). Never *_intro_*, *_outro_*, *_fg.png, ending_*, opening_*.
   Needs ffmpeg + cwebp.
   -> public/img/story/chN.webp       strip card (the establishing slide, 1000x667)
   -> public/img/story/v/chN_K.webp   viewer slides (1600x1067)"""
import os, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.expanduser('~/Documents/Reverse Engineer/Shadow blade/shadow-blade-godot/assets/ui/story')
OUT = os.path.join(ROOT, 'public', 'img', 'story')
FORBIDDEN = {'ch1_4', 'ch8_4', 'ch10_3', 'ch11_4', 'ch12_4', 'ch13_3', 'ch15_2', 'ch15_4'}
SLIDES = {n: [k for k in (1, 2, 3, 4) if 'ch%d_%d' % (n, k) not in FORBIDDEN] for n in range(1, 16)}

def conv(src, w, h, dst, limit_kb):
    tmp = '/tmp/_story_tmp.png'
    subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '2', '-i', src, '-vf', 'scale=%d:%d' % (w, h), '-y', tmp], check=True)
    for q in ('62', '54', '46', '40'):
        subprocess.run(['cwebp', '-quiet', '-q', q, tmp, '-o', dst], check=True)
        if os.path.getsize(dst) < limit_kb * 1024: break
    os.remove(tmp)

if __name__ == '__main__':
    for n, ks in SLIDES.items():
        for k in ks:
            name = 'ch%d_%d' % (n, k); assert name not in FORBIDDEN
            src = os.path.join(SRC, name + '.jpg')
            conv(src, 1600, 1067, os.path.join(OUT, 'v', name + '.webp'), 150)
            if k == 1: conv(src, 1000, 667, os.path.join(OUT, 'ch%d.webp' % n), 100)
            print(name, os.path.getsize(os.path.join(OUT, 'v', name + '.webp')) // 1024, 'KB')
