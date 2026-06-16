import * as React from "react";

export interface TabItem {
  key: string;
  /** Lucide icon name. */
  icon: string;
  label: string;
}

export interface TabBarProps {
  items?: TabItem[];
  /** Active item key. */
  active?: string;
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
}

/**
 * Bottom navigation tab bar (mobile).
 * @startingPoint section="Navigation" subtitle="Bottom tab bar" viewport="700x120"
 */
export function TabBar(props: TabBarProps): JSX.Element;
