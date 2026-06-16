import React from "react";

/**
 * Album/artist/user avatar. `shape` circle (artist/user) or rounded
 * (album art). Falls back to initials over a tinted surface.
 */
export function Avatar({ src, alt = "", name = "", size = 44, shape = "circle", ring = false, style = {}, ...rest }) {
  const radius = shape === "circle" ? "var(--radius-pill)" : "var(--radius-md)";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: "0 0 auto",
        borderRadius: radius,
        overflow: "hidden",
        background: "var(--surface-3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-secondary)",
        fontFamily: "var(--font-display)",
        fontWeight: "var(--weight-semibold)",
        fontSize: size * 0.36,
        border: ring ? "2px solid var(--border-accent)" : "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-sm)",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        initials || "♪"
      )}
    </div>
  );
}
