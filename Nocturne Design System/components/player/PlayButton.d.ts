import * as React from "react";

export interface PlayButtonProps {
  /** Show pause icon when true. */
  playing?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Diameter in px. @default 64 */
  size?: number;
  /** Soft mint halo. @default true */
  glow?: boolean;
  style?: React.CSSProperties;
}

/**
 * Signature glowing play/pause control.
 * @startingPoint section="Player" subtitle="The hero play/pause control" viewport="700x160"
 */
export function PlayButton(props: PlayButtonProps): JSX.Element;
