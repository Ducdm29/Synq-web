import React from "react";

/**
 * Bottom tab bar (mobile). Items: {icon, label, key}. Active item gets
 * the mint tint. Sits at the very bottom of the app shell.
 */
export function TabBar({ items = [], active, onChange, style = {}, ...rest }) {
  const fallback = [
    { key: "home", icon: "house", label: "Trang chủ" },
    { key: "search", icon: "search", label: "Tìm kiếm" },
    { key: "library", icon: "library", label: "Thư viện" },
  ];
  const tabs = items.length ? items : fallback;
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-around",
        height: "var(--tabbar-height)",
        background: "var(--surface-glass)",
        backdropFilter: "var(--blur-nav)",
        WebkitBackdropFilter: "var(--blur-nav)",
        borderTop: "1px solid var(--border-subtle)",
        ...style,
      }}
      {...rest}
    >
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange && onChange(t.key)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: on ? "var(--accent)" : "var(--text-tertiary)",
              transition: "color var(--dur-base) var(--ease-out)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <i data-lucide={t.icon} style={{ width: 22, height: 22 }}></i>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: on ? "var(--weight-semibold)" : "var(--weight-medium)", letterSpacing: "var(--tracking-snug)" }}>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
