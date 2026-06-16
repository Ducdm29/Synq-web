import * as React from "react";

export interface ProgressBarProps {
  /** Playback position, 0–1. @default 0.3 */
  progress?: number;
  /** Track length in seconds. @default 212 */
  duration?: number;
  onSeek?: (value: number) => void;
  /** Show remaining (-1:23) instead of total on the right. @default true */
  remaining?: boolean;
  style?: React.CSSProperties;
}

/** Seek bar with tabular timecodes. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
