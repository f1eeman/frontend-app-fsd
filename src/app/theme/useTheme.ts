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
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(newTheme)
    document.body.classList.remove(Theme.DARK, Theme.LIGHT)
    document.body.classList.add(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  useEffect(() => {
    document.body.classList.remove(Theme.DARK, Theme.LIGHT)
    document.body.classList.add(theme)
  }, [theme])

  return {
    theme,
    toggleTheme,
  }
}
