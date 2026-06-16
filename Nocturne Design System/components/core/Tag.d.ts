import * as React from "react";

export interface TagProps {
  children?: React.ReactNode;
  /** Selected/active state (mint fill). */
  selected?: boolean;
  leadingIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/** Selectable genre/filter chip. */
export function Tag(props: TagProps): JSX.Element;
