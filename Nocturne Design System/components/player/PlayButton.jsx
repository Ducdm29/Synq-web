import React from "react";

/**
 * The signature glowing play/pause button. Mint fill with a soft halo —
 * the hero control of the player. Toggles between play & pause icons.
 */
export function PlayButton({ playing = false, onClick, size = 64, glow = true, style = {}, ...rest }) {
  const iconSize = Math.round(size * 0.42);
  return (
    <button
      type="button"
      aria-label={playing ? "Tạm dừng" : "Phát"}
      onClick={onClick}
      style={{
        position: "relative",
        width: size,
        height: size,
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: "none",
        background: "var(--accent)",
        color: "var(--on-accent)",
        boxShadow: glow ? "var(--glow-lg), inset 0 1px 0 rgba(255,255,255,0.4)" : "var(--shadow-md)",
        cursor: "pointer",
        transition: "transform var(--dur-fast) var(--ease-spring), box-shadow var(--dur-base) var(--ease-out)",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.92)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      <i
        data-lucide={playing ? "pause" : "play"}
        style={{ width: iconSize, height: iconSize, marginLeft: playing ? 0 : size * 0.03, fill: "currentColor" }}
      ></i>
    </button>
  );
}
