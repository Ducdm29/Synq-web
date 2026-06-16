import React from "react";

/**
 * On/off toggle switch. Mint when on. Used in settings (e.g. crossfade,
 * downloads, gapless playback).
 */
export function Switch({ checked = false, onChange, disabled = false, style = {}, ...rest }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        position: "relative",
        width: 46,
        height: 28,
        flex: "0 0 auto",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border-default)",
        background: checked ? "var(--accent)" : "var(--surface-3)",
        boxShadow: checked ? "var(--glow-sm)" : "var(--ring-top)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background var(--dur-base) var(--ease-out)",
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 20 : 2,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: checked ? "var(--on-accent)" : "var(--text-secondary)",
          boxShadow: "var(--shadow-sm)",
          transition: "left var(--dur-base) var(--ease-spring), background var(--dur-base) var(--ease-out)",
        }}
      ></span>
    </button>
  );
}
