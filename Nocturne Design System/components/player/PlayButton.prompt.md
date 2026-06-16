The hero play/pause control — mint fill with a soft halo. Brand-defining element of Nocturne.

```jsx
const [playing, setPlaying] = React.useState(false);
<PlayButton playing={playing} onClick={() => setPlaying(p => !p)} size={72} />
```

`size` scales the whole control; `glow={false}` drops the halo for dense lists. Requires Lucide loaded.
