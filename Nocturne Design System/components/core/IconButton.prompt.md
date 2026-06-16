Icon-only button for player controls, navigation, and row actions. Uses Lucide icons by name.

```jsx
<IconButton icon="heart" active label="Yêu thích" />
<IconButton icon="shuffle" variant="ghost" />
<IconButton icon="play" variant="accent" size="xl" label="Phát" />
```

`variant`: `ghost` (default), `surface`, `accent` (mint fill + glow). `active` applies the mint tint for toggles (like/shuffle/repeat). `shape="rounded"` for squircle instead of circle. Requires Lucide to be loaded and `lucide.createIcons()` called after render.
