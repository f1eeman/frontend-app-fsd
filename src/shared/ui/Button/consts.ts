export const buttonTheme = {
  clear: 'clear',
  invertedClear: 'clear-inverted',
  background: 'background',
  invertedBackground: 'background-inverted',
} as const

export const buttonSize = {
  m: 'size-m',
  l: 'size-l',
  xl: 'size-xl',
} as const

export type ButtonTheme = (typeof buttonTheme)[keyof typeof buttonTheme]
export type ButtonSize = (typeof buttonSize)[keyof typeof buttonSize]
