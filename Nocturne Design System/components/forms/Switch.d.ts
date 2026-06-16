import * as React from "react";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** On/off toggle switch (mint when on). */
export function Switch(props: SwitchProps): JSX.Element;
