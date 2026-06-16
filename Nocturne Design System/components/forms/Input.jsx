import React from "react";

/**
 * Text / search input. Optional leading & trailing icons. The `search`
 * variant rounds to a pill and is the standard search field.
 */
export function Input({
  value,
  onChange,
  placeholder = "",
  variant = "default",
  leadingIcon = null,
  trailingIcon = null,
  size = "md",
  style = {},
  inputStyle = {},
  ...rest
}) {
  const h = { md: 44, lg: 52 }[size] || 44;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: h,
        padding: "0 14px",
        background: "var(--surface-2)",
        border: "1px solid var(--border-default)",
        borderRadius: variant === "search" ? "var(--radius-pill)" : "var(--radius-md)",
        transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        ...style,
      }}
      onFocusCapture={(e) => {
        e.currentTarget.style.borderColor = "var(--border-accent)";
        e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-soft)";
      }}
      onBlurCapture={(e) => {
        e.currentTarget.style.borderColor = "var(--border-default)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {leadingIcon && (
        <span style={{ display: "flex", color: "var(--text-tertiary)", flex: "0 0 auto" }}>{leadingIcon}</span>
      )}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-body)",
          letterSpacing: "var(--tracking-snug)",
          ...inputStyle,
        }}
        {...rest}
      />
      {trailingIcon && (
        <span style={{ display: "flex", color: "var(--text-tertiary)", flex: "0 0 auto" }}>{trailingIcon}</span>
      )}
    </div>
  );
}
