# Nocturne Design System

> A premium dark music listening app design system — built for mobile. Teal accent, minimal glassmorphism, geometric type, thin rounded icons.

**Brand concept:** Nocturne (from the musical term for a night composition) — sophisticated, calm, premium. The UI recedes so the music takes focus. Deep blacks with a signature mint/teal glow.

---

## Sources

This design system was built from scratch using the following reference:
- **Visual reference:** `uploads/image.jpg` — a close-up render of a dark music UI with a glowing teal play button (glassmorphism, neon mint accent, dark near-black field)
- No existing codebase or Figma file was provided. All components are original Nocturne work.

---

## Content Fundamentals

**Language:** Vietnamese primary (vi-VN). All UI copy and components default to Vietnamese.

**Tone:** Sophisticated, minimal, warm. Not cold tech — human and musical. Copy is short and direct.
- Prefer: *"Phát tất cả"* over *"Phát toàn bộ danh sách"*
- Prefer: *"Chào buổi tối"* over *"Xin chào người dùng"*

**Casing:** Sentence case throughout. Title case only for navigation labels and section headers. ALL CAPS only for overline/eyebrow meta text (badges, section labels at `--text-micro`).

**I vs you:** Address the user directly as "bạn" when needed; generally prefer 2nd-person omission (imperative). "Phát" not "Bạn hãy phát".

**Numbers:** Tabular numerals everywhere for timecodes, counts, durations. Format: `3:42`, not `3m42s`.

**Emoji:** Not used. The brand communicates via tone, type, and icon — never emoji.

**Vibe:** Night-time focus session. "I put on my headphones and disappear." Premium streaming service energy.

---

## Visual Foundations

### Colors
- **Background:** `--bg-app: #0a0d10` — cool near-black, not pure black.
- **Surfaces:** Three levels of elevation above the background: `--surface-1` (#14181d), `--surface-2` (#1f252c), `--surface-3` (#2a3138).
- **Accent:** `--teal-400: #5eead4` — the signature mint/teal. Used on the play button, progress bar, active states, links. Emits a `--glow-md` box-shadow for hero moments.
- **Text:** Near-white primary (`#f3f6f8`), mid-grey secondary, dim tertiary. Dark text (`--on-accent: #042b25`) on teal fills.
- **Status colors:** Rose (#fb7185) for danger, amber (#fbbf24) for warning.

### Typography
- **Headings/Display:** **Sora** — geometric, slightly humanist. Weights 600–800. Negative letter-spacing at large sizes.
- **Body/UI:** **Space Grotesk** — clean geometric with character. Weights 400–600. Tabular numerals for all timecodes.
- Fonts served from Google Fonts CDN. Self-hosted woff2 files not yet included (see Caveats).
- Minimum body text: 13px (`--text-caption`). No smaller than 11px (`--text-micro`, uppercase only).

### Spacing
4px base grid. `--space-1` (4px) to `--space-12` (96px). Mobile screen gutter: `--gutter: 20px`. Touch targets min 44px (`--touch-min`).

### Radii
Generous rounding. Cards use `--radius-lg: 18px`. Controls use `--radius-md: 14px`. Pills use `--radius-pill`. Never sharp corners (0px) on interactive elements.

### Backgrounds & textures
Flat dark surfaces. No textures, no grain, no repeating patterns. The reference image had a subtle particle/starfield — this is intentional but used only on full-bleed hero moments (e.g. Now Playing backdrop could have a subtle radial glow in the album's dominant color). Not baked into tokens.

### Glassmorphism
Used **sparingly**: only the TabBar (`--surface-glass` + `--blur-nav`) uses frosted glass. Not used on cards or buttons — the dark minimal approach keeps it clean.

### Shadows & Glow
Standard elevation uses `--shadow-*` (RGBA black, soft). The signature effect is `--glow-*` — a mint bloom used only on the play button and active states. One glow per screen max.

### Animation
- **Easing:** `--ease-out` (snap into place), `--ease-spring` (knob/toggle spring).
- **Duration:** `--dur-fast: 120ms` for micro-interactions (button press), `--dur-base: 200ms` for state changes.
- **Hover:** Background tint + slight scale (0.97 for buttons, 0.9 for icon buttons).
- **Press:** `scale(0.92–0.97)` shrink, releases on mouseup/touchend. Feels physical.
- **No infinite loops** on UI elements.

### Cards
Surface-2 background, `--radius-card: 18px`, subtle `--shadow-md`, hairline top highlight `--ring-top`. Cover art fills the card face; text sits below.

### Imagery
Dark and moody. Concert photography, close-ups of instruments, portraits with shallow depth of field. Cool or neutral color grade. No bright stock photos.

---

## Iconography

**Icon system:** [Lucide](https://lucide.dev) — thin stroke (2px), rounded line caps, 24px base grid.

**Loading:** Via CDN `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`. After React renders, call `lucide.createIcons()` (or `lucide.createIcons()` in a `useEffect`).

**Usage pattern:**
```html
<i data-lucide="heart" style="width: 20px; height: 20px;"></i>
```
Then `lucide.createIcons()` replaces the `<i>` with the SVG.

**Key icons used:**
| Function | Lucide name |
|---|---|
| Play | `play` |
| Pause | `pause` |
| Skip forward | `skip-forward` |
| Skip back | `skip-back` |
| Shuffle | `shuffle` |
| Repeat | `repeat` |
| Like / Heart | `heart` |
| Volume | `volume-2` |
| Search | `search` |
| Home | `house` |
| Library | `library` |
| More | `more-horizontal` |
| Share | `share-2` |

**No emoji as icons.** No unicode symbols as icons (e.g. ♪ only in avatar fallbacks as a last resort).

**Brand mark:** A crescent + play-notch symbol. SVG at `assets/logo-mark.svg`. Wordmark with Sora type at `assets/logo-wordmark.svg`.

---

## Components

| Directory | Components |
|---|---|
| `components/core/` | Button, IconButton, Badge, Tag, Avatar |
| `components/forms/` | Input, Slider, Switch |
| `components/player/` | PlayButton, ProgressBar, PlayerBar, TrackRow |
| `components/media/` | AlbumCard |
| `components/navigation/` | TabBar |

All components are self-contained React (JSX). They import only from siblings and reference CSS custom properties. No CSS-in-JS libraries.

**Bundle namespace:** `window.NocturneDesignSystem_689054`

```js
const { Button, PlayButton, AlbumCard } = window.NocturneDesignSystem_689054;
```

---

## UI Kits

| Product | Path | Screens |
|---|---|---|
| Mobile App | `ui_kits/mobile/index.html` | Home, Search, Library, Now Playing, Album detail |

---

## Files

```
styles.css                  ← Global entry point (consumers link this)
tokens/
  fonts.css                 ← Google Fonts import (Sora + Space Grotesk)
  colors.css                ← Full color system
  typography.css            ← Type scale + font vars
  spacing.css               ← Space scale + radii + layout
  effects.css               ← Shadows, glow, blur, motion
  base.css                  ← Reset + global helpers
assets/
  logo-mark.svg             ← Brand symbol
  logo-wordmark.svg         ← Symbol + "Nocturne" type
components/core/            ← Button, IconButton, Badge, Tag, Avatar
components/forms/           ← Input, Slider, Switch
components/player/          ← PlayButton, ProgressBar, PlayerBar, TrackRow
components/media/           ← AlbumCard
components/navigation/      ← TabBar
guidelines/                 ← Foundation specimen cards (DS tab)
ui_kits/mobile/             ← Interactive mobile app prototype
```

---

## Caveats & Iteration Notes

1. **Fonts are CDN-only.** Sora and Space Grotesk are loaded from Google Fonts. Self-hosted `.woff2` files are not yet bundled. For fully offline use, download the font files and update `tokens/fonts.css` with local `@font-face` rules.
2. **No cover art assets.** Cover images in the UI kit use Unsplash placeholder URLs. Replace with real album art.
3. **Logo is a geometric SVG.** A refined brand mark should be reviewed by a type designer.
4. **Missing components:** Volume control, Queue view, Lyrics view, Artist page, Onboarding flow, Settings screen — add as needed.
5. **No dark/light mode.** Nocturne is intentionally dark-only. If a light mode is needed, a `[data-theme="light"]` selector set on `:root` can override tokens.
