#!/usr/bin/env python3
"""Boss art for /kagezan: clean-alpha turnaround sheets (read-only source, convert only).
   -> public/img/boss/<boss>.webp       full sheet (front, side, back), 1240 px wide, alpha
   -> public/img/boss/<boss>-card.webp  portrait crop of the front view, alpha
   Needs Pillow.  Boss 15 (hollow) is never processed: it only gets a locked card.
   Usage: python3 tools/kagezan/make_bosses.py"""
import os
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.expanduser('~/Documents/Reverse Engineer/Shadow blade/marketing/boss_alpha')
OUT = os.path.join(ROOT, 'public', 'img', 'boss')
BOSSES = ['oniwa', 'kagero', 'kurohebi', 'tekki', 'mugen', 'renka', 'shuten', 'shogun', 'shirayuki', 'suigetsu', 'kogane', 'kanayago', 'hagane', 'ikazuchi']

def front_box(im):
    W, H = im.size
    a = im.split()[3].point(lambda v: 255 if v > 40 else 0)
    occ = list(a.resize((W, 1), Image.BOX).getdata())
    runs, start, gap = [], None, 0
    for x, v in enumerate(occ + [0] * 20):
        if v > 0:
            if start is None: start = x
            gap = 0
        elif start is not None:
            gap += 1
            if gap >= 14: runs.append([start, x - gap]); start = None
    # merge slivers (a weapon tip) into the neighbour, then take the first figure
    merged = []
    for r in runs:
        if merged and (r[1] - r[0] < 0.07 * W or merged[-1][1] - merged[-1][0] < 0.07 * W): merged[-1][1] = r[1]
        else: merged.append(r)
    x0, x1 = merged[0]
    if x1 - x0 > 0.45 * W: x1 = int(W * 0.36)          # a weapon bridged two views: cut at the first third
    col = a.crop((x0, 0, x1 + 1, H))
    bb = col.getbbox()
    return (x0 + bb[0], bb[1], x0 + bb[2], bb[3])

for b in BOSSES:
    assert b != 'hollow'
    im = Image.open(os.path.join(SRC, b + '.png')).convert('RGBA')
    sheet = im.resize((1240, round(im.size[1] * 1240 / im.size[0])), Image.LANCZOS)
    sheet.save(os.path.join(OUT, b + '.webp'), 'WEBP', quality=68, method=4)
    x0, y0, x1, y1 = front_box(im); pad = 18
    card = im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.size[0], x1 + pad), min(im.size[1], y1 + pad)))
    card = card.resize((round(card.size[0] * 600 / card.size[1]), 600), Image.LANCZOS)
    card.save(os.path.join(OUT, b + '-card.webp'), 'WEBP', quality=72, method=4)
    print(b, 'sheet %d KB, card %d KB %s' % (os.path.getsize(os.path.join(OUT, b + '.webp')) // 1024, os.path.getsize(os.path.join(OUT, b + '-card.webp')) // 1024, card.size))
