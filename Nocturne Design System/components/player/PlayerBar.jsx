import React from "react";
import { Avatar } from "../core/Avatar.jsx";
import { IconButton } from "../core/IconButton.jsx";

/**
 * Docked mini-player bar. Cover + title/artist, play/pause, and a thin
 * progress line across the top. Sits above the tab bar.
 */
export function PlayerBar({
  cover,
  title = "Tên bài hát",
  artist = "Nghệ sĩ",
  playing = false,
  progress = 0.42,
  liked = false,
  onToggle,
  onLike,
  onClick,
  style = {},
  ...rest
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 10px 8px 8px",
        background: "var(--surface-2)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md), var(--ring-top)",
        overflow: "hidden",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {/* progress line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--surface-3)" }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: "var(--accent)", boxShadow: "var(--glow-sm)" }}></div>
      </div>

      <Avatar src={cover} shape="rounded" size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="noc-truncate" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-label)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>{title}</div>
        <div className="noc-truncate" style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", marginTop: 1 }}>{artist}</div>
      </div>

      <IconButton icon="heart" size="sm" active={liked} label="Yêu thích" onClick={(e) => { e.stopPropagation(); onLike && onLike(); }} style={liked ? {} : { color: "var(--text-tertiary)" }} />
      <IconButton
        icon={playing ? "pause" : "play"}
        size="md"
        variant="accent"
        label={playing ? "Tạm dừng" : "Phát"}
        onClick={(e) => { e.stopPropagation(); onToggle && onToggle(); }}
      />
    </div>
  );
}
