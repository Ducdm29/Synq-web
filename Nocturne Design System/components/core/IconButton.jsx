import React from "react";

/**
 * Circular/rounded icon-only button. Used everywhere in the player and
 * navigation. Pass a Lucide icon name via `icon`, or arbitrary children.
 */
export function IconButton({
  icon = null,
  children,
  size = "md",
  variant = "ghost",
  active = false,
  disabled = false,
  shape = "circle",
  label,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = { sm: 36, md: 44, lg: 52, xl: 64 };
  const dim = sizes[size] || sizes.md;
  const iconSize = { sm: 18, md: 20, lg: 22, xl: 26 }[size] || 20;

  const variants = {
    ghost: {
      background: active ? "var(--accent-soft)" : "transparent",
      color: active ? "var(--accent)" : "var(--text-secondary)",
      border: "1px solid transparent",
    },
    surface: {
      background: "var(--surface-2)",
      color: active ? "var(--accent)" : "var(--text-primary)",
      border: "1px solid var(--border-default)",
    },
    accent: {
      background: "var(--accent)",
      color: "var(--on-accent)",
      border: "1px solid transparent",
      boxShadow: "var(--glow-md)",
    },
  };
  const v = variants[variant] || variants.ghost;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        flex: "0 0 auto",
        borderRadius: shape === "circle" ? "var(--radius-pill)" : "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)",
        WebkitTapHighlightColor: "transparent",
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.9)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {icon ? <i data-lucide={icon} style={{ width: iconSize, height: iconSize }}></i> : children}
    </button>
  );
}
