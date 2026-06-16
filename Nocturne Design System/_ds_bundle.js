/* @ds-bundle: {"format":3,"namespace":"NocturneDesignSystem_689054","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"AlbumCard","sourcePath":"components/media/AlbumCard.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"},{"name":"PlayButton","sourcePath":"components/player/PlayButton.jsx"},{"name":"PlayerBar","sourcePath":"components/player/PlayerBar.jsx"},{"name":"ProgressBar","sourcePath":"components/player/ProgressBar.jsx"},{"name":"TrackRow","sourcePath":"components/player/TrackRow.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"97d0e2516c36","components/core/Badge.jsx":"c7c498f17102","components/core/Button.jsx":"0004fe0a8d50","components/core/IconButton.jsx":"fd13f3e23b21","components/core/Tag.jsx":"91ed7f1daf22","components/forms/Input.jsx":"d35fb185cc2f","components/forms/Slider.jsx":"47376f6cb81c","components/forms/Switch.jsx":"67ce55163e4b","components/media/AlbumCard.jsx":"347f501597b8","components/navigation/TabBar.jsx":"d6a8946239a0","components/player/PlayButton.jsx":"b853a142d287","components/player/PlayerBar.jsx":"776661ea2ee2","components/player/ProgressBar.jsx":"6c52203cb20d","components/player/TrackRow.jsx":"e90ad854ef99"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NocturneDesignSystem_689054 = window.NocturneDesignSystem_689054 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Album/artist/user avatar. `shape` circle (artist/user) or rounded
 * (album art). Falls back to initials over a tinted surface.
 */
function Avatar({
  src,
  alt = "",
  name = "",
  size = 44,
  shape = "circle",
  ring = false,
  style = {},
  ...rest
}) {
  const radius = shape === "circle" ? "var(--radius-pill)" : "var(--radius-md)";
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
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
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }) : initials || "♪");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small status/label pill. Tones: accent, neutral, danger, warning.
 * Use `dot` for a leading status dot, `solid` for a filled treatment.
 */
function Badge({
  children,
  tone = "neutral",
  solid = false,
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    accent: {
      fg: "var(--accent)",
      soft: "var(--accent-soft)",
      solidBg: "var(--accent)",
      solidFg: "var(--on-accent)"
    },
    neutral: {
      fg: "var(--text-secondary)",
      soft: "rgba(255,255,255,0.07)",
      solidBg: "var(--surface-3)",
      solidFg: "var(--text-primary)"
    },
    danger: {
      fg: "var(--danger)",
      soft: "var(--danger-soft)",
      solidBg: "var(--danger)",
      solidFg: "#2a0810"
    },
    warning: {
      fg: "var(--warning)",
      soft: "rgba(251,191,36,0.14)",
      solidBg: "var(--warning)",
      solidFg: "#2a1c02"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: solid ? t.solidFg : t.fg,
      flex: "0 0 auto"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Nocturne primary button. Variants: primary (mint fill), secondary
 * (surface), ghost (transparent), outline. Sizes sm/md/lg. Optional
 * leading/trailing icon nodes and full-width + pill shaping.
 */
function Button({
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
    sm: {
      h: 36,
      px: 14,
      fs: "var(--text-label)",
      gap: 8
    },
    md: {
      h: 44,
      px: 18,
      fs: "var(--text-body)",
      gap: 9
    },
    lg: {
      h: 52,
      px: 24,
      fs: "var(--text-title)",
      gap: 10
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--on-accent)",
      border: "1px solid transparent",
      boxShadow: "var(--glow-sm)"
    },
    secondary: {
      background: "var(--surface-2)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-default)",
      boxShadow: "var(--ring-top)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1px solid transparent"
    },
    outline: {
      background: "transparent",
      color: "var(--accent)",
      border: "1px solid var(--border-accent)"
    },
    danger: {
      background: "var(--danger-soft)",
      color: "var(--danger)",
      border: "1px solid transparent"
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.97)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), leadingIcon, children, trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Circular/rounded icon-only button. Used everywhere in the player and
 * navigation. Pass a Lucide icon name via `icon`, or arbitrary children.
 */
function IconButton({
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
  const sizes = {
    sm: 36,
    md: 44,
    lg: 52,
    xl: 64
  };
  const dim = sizes[size] || sizes.md;
  const iconSize = {
    sm: 18,
    md: 20,
    lg: 22,
    xl: 26
  }[size] || 20;
  const variants = {
    ghost: {
      background: active ? "var(--accent-soft)" : "transparent",
      color: active ? "var(--accent)" : "var(--text-secondary)",
      border: "1px solid transparent"
    },
    surface: {
      background: "var(--surface-2)",
      color: active ? "var(--accent)" : "var(--text-primary)",
      border: "1px solid var(--border-default)"
    },
    accent: {
      background: "var(--accent)",
      color: "var(--on-accent)",
      border: "1px solid transparent",
      boxShadow: "var(--glow-md)"
    }
  };
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    "aria-pressed": active,
    disabled: disabled,
    onClick: onClick,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.9)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: iconSize,
      height: iconSize
    }
  }) : children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Filter/genre chip. Selectable (toggle) pill used in search & library.
 */
function Tag({
  children,
  selected = false,
  leadingIcon = null,
  onClick,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = "scale(0.96)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), leadingIcon, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text / search input. Optional leading & trailing icons. The `search`
 * variant rounds to a pill and is the standard search field.
 */
function Input({
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
  const h = {
    md: 44,
    lg: 52
  }[size] || 44;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: h,
      padding: "0 14px",
      background: "var(--surface-2)",
      border: "1px solid var(--border-default)",
      borderRadius: variant === "search" ? "var(--radius-pill)" : "var(--radius-md)",
      transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      ...style
    },
    onFocusCapture: e => {
      e.currentTarget.style.borderColor = "var(--border-accent)";
      e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-soft)";
    },
    onBlurCapture: e => {
      e.currentTarget.style.borderColor = "var(--border-default)";
      e.currentTarget.style.boxShadow = "none";
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--text-tertiary)",
      flex: "0 0 auto"
    }
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    style: {
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
      ...inputStyle
    }
  }, rest)), trailingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--text-tertiary)",
      flex: "0 0 auto"
    }
  }, trailingIcon));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Slider / progress track. Drag or click to seek. Used for the seek bar
 * and volume. `value` is 0–1. Mint fill with a knob that appears on the
 * active/hover state.
 */
function Slider({
  value = 0.4,
  onChange,
  showKnob = true,
  height = 6,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const setFromEvent = clientX => {
    const el = ref.current;
    if (!el || !onChange) return;
    const rect = el.getBoundingClientRect();
    onChange(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
  };
  React.useEffect(() => {
    if (!dragging) return;
    const move = e => setFromEvent((e.touches ? e.touches[0] : e).clientX);
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [dragging]);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    onMouseDown: e => {
      setDragging(true);
      setFromEvent(e.clientX);
    },
    onTouchStart: e => {
      setDragging(true);
      setFromEvent(e.touches[0].clientX);
    },
    style: {
      position: "relative",
      height: Math.max(height, 16),
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      touchAction: "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      height,
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-3)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      width: `${pct}%`,
      height,
      borderRadius: "var(--radius-pill)",
      background: "var(--accent)",
      boxShadow: dragging ? "var(--glow-sm)" : "none",
      transition: dragging ? "none" : "width var(--dur-fast) linear"
    }
  }), showKnob && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: `${pct}%`,
      width: dragging ? 16 : 13,
      height: dragging ? 16 : 13,
      transform: "translateX(-50%)",
      borderRadius: "50%",
      background: "var(--white)",
      boxShadow: "var(--glow-sm), var(--shadow-sm)",
      transition: "width var(--dur-fast), height var(--dur-fast)"
    }
  }));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * On/off toggle switch. Mint when on. Used in settings (e.g. crossfade,
 * downloads, gapless playback).
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: checked ? 20 : 2,
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: checked ? "var(--on-accent)" : "var(--text-secondary)",
      boxShadow: "var(--shadow-sm)",
      transition: "left var(--dur-base) var(--ease-spring), background var(--dur-base) var(--ease-out)"
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/media/AlbumCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Album / playlist cover card for grids and horizontal rails. Cover art,
 * title, subtitle, and a play button that lifts in on hover.
 */
function AlbumCard({
  cover,
  title = "Tên album",
  subtitle = "Nghệ sĩ",
  size = 160,
  circle = false,
  onClick,
  onPlay,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      flex: "0 0 auto",
      cursor: "pointer",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size,
      borderRadius: circle ? "var(--radius-pill)" : "var(--radius-md)",
      overflow: "hidden",
      background: "var(--surface-3)",
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
      transition: "box-shadow var(--dur-base) var(--ease-out)"
    }
  }, cover ? /*#__PURE__*/React.createElement("img", {
    src: cover,
    alt: title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-tertiary)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "music",
    style: {
      width: 32,
      height: 32
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Ph\xE1t",
    onClick: e => {
      e.stopPropagation();
      onPlay && onPlay();
    },
    style: {
      position: "absolute",
      right: 10,
      bottom: 10,
      width: 44,
      height: 44,
      borderRadius: "50%",
      border: "none",
      background: "var(--accent)",
      color: "var(--on-accent)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "var(--glow-md)",
      cursor: "pointer",
      opacity: hover ? 1 : 0,
      transform: hover ? "translateY(0)" : "translateY(8px)",
      transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "play",
    style: {
      width: 20,
      height: 20,
      fill: "currentColor",
      marginLeft: 2
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "noc-truncate",
    style: {
      marginTop: 10,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)",
      textAlign: circle ? "center" : "left"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "noc-truncate",
    style: {
      marginTop: 2,
      fontSize: "var(--text-caption)",
      color: "var(--text-tertiary)",
      textAlign: circle ? "center" : "left"
    }
  }, subtitle));
}
Object.assign(__ds_scope, { AlbumCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/AlbumCard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Bottom tab bar (mobile). Items: {icon, label, key}. Active item gets
 * the mint tint. Sits at the very bottom of the app shell.
 */
function TabBar({
  items = [],
  active,
  onChange,
  style = {},
  ...rest
}) {
  const fallback = [{
    key: "home",
    icon: "house",
    label: "Trang chủ"
  }, {
    key: "search",
    icon: "search",
    label: "Tìm kiếm"
  }, {
    key: "library",
    icon: "library",
    label: "Thư viện"
  }];
  const tabs = items.length ? items : fallback;
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      alignItems: "stretch",
      justifyContent: "space-around",
      height: "var(--tabbar-height)",
      background: "var(--surface-glass)",
      backdropFilter: "var(--blur-nav)",
      WebkitBackdropFilter: "var(--blur-nav)",
      borderTop: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), tabs.map(t => {
    const on = t.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      type: "button",
      onClick: () => onChange && onChange(t.key),
      style: {
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
        WebkitTapHighlightColor: "transparent"
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": t.icon,
      style: {
        width: 22,
        height: 22
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 10,
        fontWeight: on ? "var(--weight-semibold)" : "var(--weight-medium)",
        letterSpacing: "var(--tracking-snug)"
      }
    }, t.label));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/player/PlayButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The signature glowing play/pause button. Mint fill with a soft halo —
 * the hero control of the player. Toggles between play & pause icons.
 */
function PlayButton({
  playing = false,
  onClick,
  size = 64,
  glow = true,
  style = {},
  ...rest
}) {
  const iconSize = Math.round(size * 0.42);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": playing ? "Tạm dừng" : "Phát",
    onClick: onClick,
    style: {
      position: "relative",
      width: size,
      height: size,
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      border: "none",
      background: "var(--accent)",
      color: "var(--on-accent)",
      boxShadow: glow ? "var(--glow-lg), inset 0 1px 0 rgba(255,255,255,0.4)" : "var(--shadow-md)",
      cursor: "pointer",
      transition: "transform var(--dur-fast) var(--ease-spring), box-shadow var(--dur-base) var(--ease-out)",
      WebkitTapHighlightColor: "transparent",
      ...style
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = "scale(0.92)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    "data-lucide": playing ? "pause" : "play",
    style: {
      width: iconSize,
      height: iconSize,
      marginLeft: playing ? 0 : size * 0.03,
      fill: "currentColor"
    }
  }));
}
Object.assign(__ds_scope, { PlayButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/player/PlayButton.jsx", error: String((e && e.message) || e) }); }

// components/player/PlayerBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Docked mini-player bar. Cover + title/artist, play/pause, and a thin
 * progress line across the top. Sits above the tab bar.
 */
function PlayerBar({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: "var(--surface-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${progress * 100}%`,
      background: "var(--accent)",
      boxShadow: "var(--glow-sm)"
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: cover,
    shape: "rounded",
    size: 44
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "noc-truncate",
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "noc-truncate",
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--text-tertiary)",
      marginTop: 1
    }
  }, artist)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "heart",
    size: "sm",
    active: liked,
    label: "Y\xEAu th\xEDch",
    onClick: e => {
      e.stopPropagation();
      onLike && onLike();
    },
    style: liked ? {} : {
      color: "var(--text-tertiary)"
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: playing ? "pause" : "play",
    size: "md",
    variant: "accent",
    label: playing ? "Tạm dừng" : "Phát",
    onClick: e => {
      e.stopPropagation();
      onToggle && onToggle();
    }
  }));
}
Object.assign(__ds_scope, { PlayerBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/player/PlayerBar.jsx", error: String((e && e.message) || e) }); }

// components/player/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function fmt(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Seek bar with elapsed / remaining timecodes. `progress` 0–1, `duration`
 * in seconds. Calls onSeek(0–1).
 */
function ProgressBar({
  progress = 0.3,
  duration = 212,
  onSeek,
  remaining = true,
  style = {},
  ...rest
}) {
  const elapsed = progress * duration;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: "100%",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Slider, {
    value: progress,
    onChange: onSeek,
    height: 6
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 8,
      fontFamily: "var(--font-numeric)",
      fontSize: "var(--text-caption)",
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-tertiary)",
      letterSpacing: "var(--tracking-snug)"
    }
  }, /*#__PURE__*/React.createElement("span", null, fmt(elapsed)), /*#__PURE__*/React.createElement("span", null, remaining ? `-${fmt(duration - elapsed)}` : fmt(duration))));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/player/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/player/TrackRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Track list row: index OR album art, title + artist, optional badge,
 * duration, and a trailing action. Highlights when `active` (now playing).
 */
function TrackRow({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onPlay,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "8px 8px",
      borderRadius: "var(--radius-md)",
      background: active ? "var(--accent-soft)" : "transparent",
      cursor: "pointer",
      transition: "background var(--dur-base) var(--ease-out)",
      ...style
    },
    onMouseEnter: e => {
      if (!active) e.currentTarget.style.background = "var(--surface-1)";
    },
    onMouseLeave: e => {
      if (!active) e.currentTarget.style.background = "transparent";
    }
  }, rest), cover ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: cover,
    shape: "rounded",
    size: 46
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      textAlign: "center",
      flex: "0 0 auto",
      fontFamily: "var(--font-numeric)",
      fontVariantNumeric: "tabular-nums",
      fontSize: "var(--text-body)",
      color: active ? "var(--accent)" : "var(--text-tertiary)"
    }
  }, active ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": "volume-2",
    style: {
      width: 16,
      height: 16
    }
  }) : index), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "noc-truncate",
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-title)",
      fontWeight: "var(--weight-medium)",
      color: active ? "var(--accent)" : "var(--text-primary)",
      letterSpacing: "var(--tracking-snug)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 2
    }
  }, explicit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: "var(--text-tertiary)",
      border: "1px solid var(--border-strong)",
      borderRadius: 3,
      padding: "0 3px",
      lineHeight: "13px"
    }
  }, "E"), /*#__PURE__*/React.createElement("span", {
    className: "noc-truncate",
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--text-tertiary)"
    }
  }, artist))), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: liked ? "heart" : "heart",
    size: "sm",
    active: liked,
    label: "Y\xEAu th\xEDch",
    onClick: e => {
      e.stopPropagation();
      onLike && onLike();
    },
    style: liked ? {} : {
      color: "var(--text-tertiary)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-numeric)",
      fontVariantNumeric: "tabular-nums",
      fontSize: "var(--text-caption)",
      color: "var(--text-tertiary)",
      minWidth: 36,
      textAlign: "right"
    }
  }, duration));
}
Object.assign(__ds_scope, { TrackRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/player/TrackRow.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.AlbumCard = __ds_scope.AlbumCard;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.PlayButton = __ds_scope.PlayButton;

__ds_ns.PlayerBar = __ds_scope.PlayerBar;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.TrackRow = __ds_scope.TrackRow;

})();
