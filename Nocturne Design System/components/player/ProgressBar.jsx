import React from "react";
import { Slider } from "../forms/Slider.jsx";

function fmt(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Seek bar with elapsed / remaining timecodes. `progress` 0–1, `duration`
 * in seconds. Calls onSeek(0–1).
 */
export function ProgressBar({ progress = 0.3, duration = 212, onSeek, remaining = true, style = {}, ...rest }) {
  const elapsed = progress * duration;
  return (
    <div style={{ width: "100%", ...style }} {...rest}>
      <Slider value={progress} onChange={onSeek} height={6} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          fontFamily: "var(--font-numeric)",
          fontSize: "var(--text-caption)",
          fontVariantNumeric: "tabular-nums",
          color: "var(--text-tertiary)",
          letterSpacing: "var(--tracking-snug)",
        }}
      >
        <span>{fmt(elapsed)}</span>
        <span>{remaining ? `-${fmt(duration - elapsed)}` : fmt(duration)}</span>
      </div>
    </div>
  );
}
