import * as React from "react";

export interface SliderProps {
  /** Current value, 0–1. @default 0.4 */
  value?: number;
  onChange?: (value: number) => void;
  /** Show the draggable knob. @default true */
  showKnob?: boolean;
  /** Track thickness in px. @default 6 */
  height?: number;
  style?: React.CSSProperties;
}

/** Seek / volume slider, value 0–1. */
export function Slider(props: SliderProps): JSX.Element;
