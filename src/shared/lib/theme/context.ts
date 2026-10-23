import { createContext } from 'react'

export interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
)

export const LOCAL_STORAGE_THEME_KEY = 'app_theme'

export const enum Theme {
  LIGHT = 'app_theme_light',
  DARK = 'app_theme_dark',
  ORANGE = 'app_theme_orange',
}
