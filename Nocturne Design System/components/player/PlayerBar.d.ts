import * as React from "react";

export interface PlayerBarProps {
  cover?: string;
  title?: string;
  artist?: string;
  playing?: boolean;
  /** Playback position 0–1 for the top progress line. @default 0.42 */
  progress?: number;
  liked?: boolean;
  /** Toggle play/pause. */
  onToggle?: () => void;
  onLike?: () => void;
  /** Open the full Now Playing screen. */
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Docked mini-player bar.
 * @startingPoint section="Player" subtitle="Docked mini-player bar" viewport="700x110"
 */
export function PlayerBar(props: PlayerBarProps): JSX.Element;
