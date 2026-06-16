import * as React from "react";

export interface AlbumCardProps {
  cover?: string;
  title?: string;
  subtitle?: string;
  /** Cover side length in px. @default 160 */
  size?: number;
  /** Circular cover (artist). @default false */
  circle?: boolean;
  onClick?: () => void;
  onPlay?: () => void;
  style?: React.CSSProperties;
}

/**
 * Album / playlist / artist cover card.
 * @startingPoint section="Media" subtitle="Cover card for grids & rails" viewport="700x260"
 */
export function AlbumCard(props: AlbumCardProps): JSX.Element;
