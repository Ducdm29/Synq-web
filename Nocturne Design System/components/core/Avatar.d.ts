import * as React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Used for initials fallback when no src. */
  name?: string;
  /** Pixel dimension. @default 44 */
  size?: number;
  /** circle = artist/user, rounded = album art. @default "circle" */
  shape?: "circle" | "rounded";
  /** Mint accent ring. */
  ring?: boolean;
  style?: React.CSSProperties;
}

/** Album / artist / user avatar with initials fallback. */
export function Avatar(props: AvatarProps): JSX.Element;
