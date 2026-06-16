import React from "react";

/**
 * Slider / progress track. Drag or click to seek. Used for the seek bar
 * and volume. `value` is 0–1. Mint fill with a knob that appears on the
 * active/hover state.
 */
export function Slider({ value = 0.4, onChange, showKnob = true, height = 6, style = {}, ...rest }) {
  const ref = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const pct = Math.max(0, Math.min(1, value)) * 100;

  const setFromEvent = (clientX) => {
    const el = ref.current;
    if (!el || !onChange) return;
    const rect = el.getBoundingClientRect();
    onChange(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
  };

  React.useEffect(() => {
    if (!dragging) return;
    const move = (e) => setFromEvent((e.touches ? e.touches[0] : e).clientX);
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [dragging]);

  return (
    <div
      ref={ref}
      onMouseDown={(e) => { setDragging(true); setFromEvent(e.clientX); }}
      onTouchStart={(e) => { setDragging(true); setFromEvent(e.touches[0].clientX); }}
      style={{
        position: "relative",
        height: Math.max(height, 16),
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        touchAction: "none",
        ...style,
      }}
      {...rest}
    >
      <div style={{ position: "absolute", left: 0, right: 0, height, borderRadius: "var(--radius-pill)", background: "var(--surface-3)" }}></div>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: `${pct}%`,
          height,
          borderRadius: "var(--radius-pill)",
          background: "var(--accent)",
          boxShadow: dragging ? "var(--glow-sm)" : "none",
          transition: dragging ? "none" : "width var(--dur-fast) linear",
        }}
      ></div>
      {showKnob && (
        <div
          style={{
            position: "absolute",
            left: `${pct}%`,
            width: dragging ? 16 : 13,
            height: dragging ? 16 : 13,
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: "var(--white)",
            boxShadow: "var(--glow-sm), var(--shadow-sm)",
            transition: "width var(--dur-fast), height var(--dur-fast)",
          }}
        ></div>
      )}
    </div>
  );
}
