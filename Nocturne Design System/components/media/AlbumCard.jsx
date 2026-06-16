import React from "react";

/**
 * Album / playlist cover card for grids and horizontal rails. Cover art,
 * title, subtitle, and a play button that lifts in on hover.
 */
export function AlbumCard({
  cover,
  title = "Tên album",
  subtitle = "Nghệ sĩ",
  size = 160,
  circle = false,
  onClick,
  onPlay,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: size, flex: "0 0 auto", cursor: "pointer", ...style }}
      {...rest}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: circle ? "var(--radius-pill)" : "var(--radius-md)",
          overflow: "hidden",
          background: "var(--surface-3)",
          boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
          transition: "box-shadow var(--dur-base) var(--ease-out)",
        }}
      >
        {cover ? (
          <img src={cover} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)" }}>
            <i data-lucide="music" style={{ width: 32, height: 32 }}></i>
          </div>
        )}
        <button
          type="button"
          aria-label="Phát"
          onClick={(e) => { e.stopPropagation(); onPlay && onPlay(); }}
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: "var(--accent)",
            color: "var(--on-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--glow-md)",
            cursor: "pointer",
            opacity: hover ? 1 : 0,
            transform: hover ? "translateY(0)" : "translateY(8px)",
            transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
          }}
        >
          <i data-lucide="play" style={{ width: 20, height: 20, fill: "currentColor", marginLeft: 2 }}></i>
        </button>
      </div>
      <div
        className="noc-truncate"
        style={{ marginTop: 10, fontFamily: "var(--font-body)", fontSize: "var(--text-label)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)", textAlign: circle ? "center" : "left" }}
      >
        {title}
      </div>
      <div
        className="noc-truncate"
        style={{ marginTop: 2, fontSize: "var(--text-caption)", color: "var(--text-tertiary)", textAlign: circle ? "center" : "left" }}
      >
        {subtitle}
      </div>
    </div>
  );
}
