import { useContext, useEffect } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './context'

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

export function useTheme(): UseThemeResult {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  const { theme, setTheme } = themeContext

  const toggleTheme = (): void => {
    let newTheme: Theme
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT
        break
      case Theme.LIGHT:
        newTheme = Theme.ORANGE
        break
      case Theme.ORANGE:
        newTheme = Theme.DARK
        break
      default:
        newTheme = Theme.LIGHT
    }
    setTheme(newTheme)
    document.body.classList.remove(Theme.DARK, Theme.LIGHT, Theme.ORANGE)
    document.body.classList.add(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  useEffect(() => {
    document.body.classList.remove(Theme.DARK, Theme.LIGHT, Theme.ORANGE)
    document.body.classList.add(theme)
  }, [theme])

  return {
    theme,
    toggleTheme,
  }
}
