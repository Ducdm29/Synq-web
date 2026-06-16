import React from "react";
import { Avatar } from "../core/Avatar.jsx";
import { IconButton } from "../core/IconButton.jsx";

/**
 * Track list row: index OR album art, title + artist, optional badge,
 * duration, and a trailing action. Highlights when `active` (now playing).
 */
export function TrackRow({
  index,
  cover,
  title = "Tên bài hát",
  artist = "Nghệ sĩ",
  duration = "3:24",
  active = false,
  liked = false,
  explicit = false,
  onPlay,
  onLike,
  style = {},
  ...rest
}) {
  return (
    <div
      onClick={onPlay}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 8px",
        borderRadius: "var(--radius-md)",
        background: active ? "var(--accent-soft)" : "transparent",
        cursor: "pointer",
        transition: "background var(--dur-base) var(--ease-out)",
        ...style,
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-1)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
      {...rest}
    >
      {cover ? (
        <Avatar src={cover} shape="rounded" size={46} />
      ) : (
        <div
          style={{
            width: 28,
            textAlign: "center",
            flex: "0 0 auto",
            fontFamily: "var(--font-numeric)",
            fontVariantNumeric: "tabular-nums",
            fontSize: "var(--text-body)",
            color: active ? "var(--accent)" : "var(--text-tertiary)",
          }}
        >
          {active ? <i data-lucide="volume-2" style={{ width: 16, height: 16 }}></i> : index}
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className="noc-truncate"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-title)",
            fontWeight: "var(--weight-medium)",
            color: active ? "var(--accent)" : "var(--text-primary)",
            letterSpacing: "var(--tracking-snug)",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          {explicit && (
            <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-tertiary)", border: "1px solid var(--border-strong)", borderRadius: 3, padding: "0 3px", lineHeight: "13px" }}>E</span>
          )}
          <span className="noc-truncate" style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>{artist}</span>
        </div>
      </div>

      <IconButton
        icon={liked ? "heart" : "heart"}
        size="sm"
        active={liked}
        label="Yêu thích"
        onClick={(e) => { e.stopPropagation(); onLike && onLike(); }}
        style={liked ? {} : { color: "var(--text-tertiary)" }}
      />
      <span
        style={{
          fontFamily: "var(--font-numeric)",
          fontVariantNumeric: "tabular-nums",
          fontSize: "var(--text-caption)",
          color: "var(--text-tertiary)",
          minWidth: 36,
          textAlign: "right",
        }}
      >
        {duration}
      </span>
    </div>
  );
}
