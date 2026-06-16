A single row in a track list — album art or index, title, artist, like toggle, and duration.

```jsx
<TrackRow index={1} title="Đường Tôi Chở Em Về" artist="Vũ." duration="4:12"
  active liked onPlay={play} onLike={like} />
```

When `active`, the row tints mint and the index becomes a playing indicator. Pass `cover` to show album art instead of the index. `explicit` adds an E marker.
