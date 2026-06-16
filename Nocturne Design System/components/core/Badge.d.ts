import * as React from "react";

export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  tone?: "accent" | "neutral" | "danger" | "warning";
  /** Filled treatment instead of soft tint. */
  solid?: boolean;
  /** Show a leading status dot. */
  dot?: boolean;
  style?: React.CSSProperties;
}

/** Compact status/label pill. */
export function Badge(props: BadgeProps): JSX.Element;
