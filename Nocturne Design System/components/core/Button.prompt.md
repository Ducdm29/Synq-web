Primary text button — use for the main call-to-action on any screen; reach for `secondary`/`ghost` for lower-emphasis actions.

```jsx
<Button variant="primary" size="lg" leadingIcon={<i data-lucide="play"></i>}>
  Phát tất cả
</Button>
```

Variants: `primary` (mint fill, faint glow), `secondary` (surface + hairline), `ghost`, `outline` (mint hairline), `danger`. Sizes `sm | md | lg`. Set `shape="pill"` for fully rounded, `fullWidth` to stretch. Pass Lucide `<i data-lucide="…">` nodes to `leadingIcon`/`trailingIcon`.
