Seek bar with elapsed / remaining timecodes in tabular numerals.

```jsx
const [p, setP] = React.useState(0.3);
<ProgressBar progress={p} duration={212} onSeek={setP} />
```

Composes `Slider`. `remaining` toggles the right label between remaining (`-1:23`) and total duration.
