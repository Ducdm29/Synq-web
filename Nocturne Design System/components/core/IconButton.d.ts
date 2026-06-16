import * as React from "react";

export interface IconButtonProps {
  /** Lucide icon name, e.g. "heart", "shuffle", "more-horizontal". */
  icon?: string;
  children?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg" | "xl";
  /** @default "ghost" */
  variant?: "ghost" | "surface" | "accent";
  /** Toggled/selected state (mint tint). */
  active?: boolean;
  disabled?: boolean;
  /** @default "circle" */
  shape?: "circle" | "rounded";
  /** Accessible label (icon-only). */
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/**
 * Icon-only button — player controls, nav, row actions.
 * @startingPoint section="Core" subtitle="Icon-only controls & toggles" viewport="700x140"
 */
export function IconButton(props: IconButtonProps): JSX.Element;
