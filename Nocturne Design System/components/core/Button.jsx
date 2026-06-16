import React from "react";

/**
 * Nocturne primary button. Variants: primary (mint fill), secondary
 * (surface), ghost (transparent), outline. Sizes sm/md/lg. Optional
 * leading/trailing icon nodes and full-width + pill shaping.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  shape = "rounded",
  fullWidth = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { h: 36, px: 14, fs: "var(--text-label)", gap: 8 },
    md: { h: 44, px: 18, fs: "var(--text-body)", gap: 9 },
    lg: { h: 52, px: 24, fs: "var(--text-title)", gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--on-accent)",
      border: "1px solid transparent",
      boxShadow: "var(--glow-sm)",
    },
    secondary: {
      background: "var(--surface-2)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-default)",
      boxShadow: "var(--ring-top)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1px solid transparent",
    },
    outline: {
      background: "transparent",
      color: "var(--accent)",
      border: "1px solid var(--border-accent)",
    },
    danger: {
      background: "var(--danger-soft)",
      color: "var(--danger)",
      border: "1px solid transparent",
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.h,
        padding: `0 ${s.px}px`,
        width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-body)",
        fontSize: s.fs,
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-snug)",
        borderRadius: shape === "pill" ? "var(--radius-pill)" : "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "transform var(--dur-fast) var(--ease-out), filter var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
        WebkitTapHighlightColor: "transparent",
        whiteSpace: "nowrap",
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
