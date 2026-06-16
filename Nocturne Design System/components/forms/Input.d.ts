import * as React from "react";

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** "search" rounds to a pill. @default "default" */
  variant?: "default" | "search";
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** @default "md" */
  size?: "md" | "lg";
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

/** Text & search input field. */
export function Input(props: InputProps): JSX.Element;
