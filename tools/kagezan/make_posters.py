#!/usr/bin/env python3
"""News posters from the game's story slides (read-only source; copy + convert only).
   public/img/news/<slug>.webp    1200x800 (og image)
   public/img/news/<slug>-v.webp  540x960 vertical poster for the Shorts-style video facade (slide on a blurred copy of itself)
   Needs ffmpeg + cwebp.  Usage: python3 tools/kagezan/make_posters.py [slug ...]
   NEVER use: ch8_4, ch13_3, ch15_2, ch15_4, ending_*, opening_* (unreviewed), and nothing with blood."""
import os, sys, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.expanduser('~/Documents/Reverse Engineer/Shadow blade/shadow-blade-godot/assets/ui/story')
OUT = os.path.join(ROOT, 'public', 'img', 'news')
FORBIDDEN = {'ch8_4', 'ch13_3', 'ch15_2', 'ch15_4'}
SLIDE = {
    'devlog-1': 'ch1_1', 'devlog-2': 'ch6_1', 'devlog-3': 'ch8_3',
    'boss-09-shirayuki': 'ch9_4', 'boss-10-suigetsu': 'ch10_2', 'boss-11-kogane': 'ch11_1', 'boss-12-kanayago': 'ch12_2',
    'boss-13-hagane': 'ch13_2', 'boss-14-ikazuchi': 'ch14_2', 'boss-15-hollow': 'ch15_1',   # ch15: place only, never the boss art
}
def run(*a): subprocess.run(a, check=True)
for slug in (sys.argv[1:] or SLIDE):
    sl = SLIDE[slug]; assert sl not in FORBIDDEN and not sl.startswith(('ending', 'opening'))
    src = os.path.join(SRC, sl + '.jpg'); tmp = '/tmp/_np_%s' % slug
    run('nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '2', '-i', src, '-vf', 'scale=1200:800', '-y', tmp + '_h.png')
    run('nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '2', '-i', src, '-filter_complex',
        '[0]split[a][b];[a]scale=540:960:force_original_aspect_ratio=increase,crop=540:960,boxblur=22:2,eq=brightness=-0.3[bg];[b]scale=540:-2[fg];[bg][fg]overlay=0:(H-h)/2',
        '-frames:v', '1', '-y', tmp + '_v.png')
    for q in ('66', '58', '50'):
        run('cwebp', '-quiet', '-q', q, tmp + '_h.png', '-o', os.path.join(OUT, slug + '.webp'))
        if os.path.getsize(os.path.join(OUT, slug + '.webp')) < 120 * 1024: break
    run('cwebp', '-quiet', '-q', '70', tmp + '_v.png', '-o', os.path.join(OUT, slug + '-v.webp'))
    os.remove(tmp + '_h.png'); os.remove(tmp + '_v.png')
    print(slug, sl, os.path.getsize(os.path.join(OUT, slug + '.webp')) // 1024, 'KB /', os.path.getsize(os.path.join(OUT, slug + '-v.webp')) // 1024, 'KB')
