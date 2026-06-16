import * as React from "react";

export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Corner shape. @default "rounded" */
  shape?: "rounded" | "pill";
  fullWidth?: boolean;
  disabled?: boolean;
  /** Icon node rendered before the label (e.g. a Lucide <i data-lucide>). */
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/**
 * Primary text button for Nocturne.
 * @startingPoint section="Core" subtitle="Buttons in every variant & size" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
