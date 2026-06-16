import React from "react";

/**
 * Small status/label pill. Tones: accent, neutral, danger, warning.
 * Use `dot` for a leading status dot, `solid` for a filled treatment.
 */
export function Badge({ children, tone = "neutral", solid = false, dot = false, style = {}, ...rest }) {
  const tones = {
    accent: { fg: "var(--accent)", soft: "var(--accent-soft)", solidBg: "var(--accent)", solidFg: "var(--on-accent)" },
    neutral: { fg: "var(--text-secondary)", soft: "rgba(255,255,255,0.07)", solidBg: "var(--surface-3)", solidFg: "var(--text-primary)" },
    danger: { fg: "var(--danger)", soft: "var(--danger-soft)", solidBg: "var(--danger)", solidFg: "#2a0810" },
    warning: { fg: "var(--warning)", soft: "rgba(251,191,36,0.14)", solidBg: "var(--warning)", solidFg: "#2a1c02" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 22,
        padding: "0 10px",
        borderRadius: "var(--radius-pill)",
        background: solid ? t.solidBg : t.soft,
        color: solid ? t.solidFg : t.fg,
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-micro)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: solid ? t.solidFg : t.fg, flex: "0 0 auto" }}></span>
      )}
      {children}
    </span>
  );
}
