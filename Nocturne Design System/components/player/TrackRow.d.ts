import * as React from "react";

export interface TrackRowProps {
  /** Track number (shown when no cover). */
  index?: number | string;
  /** Album art URL — replaces the index. */
  cover?: string;
  title?: string;
  artist?: string;
  /** Duration label, e.g. "3:24". */
  duration?: string;
  /** Now-playing highlight. */
  active?: boolean;
  liked?: boolean;
  /** Show an "E" explicit marker. */
  explicit?: boolean;
  onPlay?: () => void;
  onLike?: () => void;
  style?: React.CSSProperties;
}

/**
 * Track list row — index/art, title, artist, like, duration.
 * @startingPoint section="Player" subtitle="Track list row with now-playing state" viewport="700x80"
 */
export function TrackRow(props: TrackRowProps): JSX.Element;
