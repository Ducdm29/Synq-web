import React from "react";

/**
 * Filter/genre chip. Selectable (toggle) pill used in search & library.
 */
export function Tag({ children, selected = false, leadingIcon = null, onClick, style = {}, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        height: 34,
        padding: "0 14px",
        borderRadius: "var(--radius-pill)",
        background: selected ? "var(--accent)" : "var(--surface-2)",
        color: selected ? "var(--on-accent)" : "var(--text-secondary)",
        border: selected ? "1px solid transparent" : "1px solid var(--border-default)",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-medium)",
        letterSpacing: "var(--tracking-snug)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.96)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
