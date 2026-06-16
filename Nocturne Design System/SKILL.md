---
name: nocturne-design
description: Use this skill to generate well-branded interfaces and assets for Nocturne, a premium dark mobile music listening app. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Built for Vietnamese-language mobile UX with a teal/mint accent, Sora + Space Grotesk type, Lucide icons, and a dark minimal aesthetic.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Key reference points:
- Global styles: `styles.css` (link this in any HTML deliverable)
- Component bundle: `_ds_bundle.js` — access via `window.NocturneDesignSystem_689054`
- Icons: Lucide CDN (thin 2px stroke, rounded). Call `lucide.createIcons()` after React renders.
- Fonts: Sora (display/headings) + Space Grotesk (body/UI) from Google Fonts — already in `styles.css`
- Brand colors: deep dark (`--bg-app: #0a0d10`) + mint accent (`--accent: #5eead4` with `--glow-md`)
- Logo: `assets/logo-mark.svg`, `assets/logo-wordmark.svg`
- UI kit reference: `ui_kits/mobile/index.html`

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
