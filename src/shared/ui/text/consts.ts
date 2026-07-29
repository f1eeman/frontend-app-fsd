export const enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
  INVERTED = 'inverted',
}

export const enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export const enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

export const mapSizeToHtag: Record<TextSize, HTag> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
}

export type HTag = 'h1' | 'h2' | 'h3'
