Draggable seek / volume slider. `value` is 0–1; drag or click to set.

```jsx
const [t, setT] = React.useState(0.35);
<Slider value={t} onChange={setT} />
```

Mint fill, white knob that grows while dragging. Set `showKnob={false}` for a thin read-only progress indicator, `height` to thicken the track.
