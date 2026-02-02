import { useContext, useEffect } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./context";

interface UseThemeResult {
  toggleTheme: () => void;
  theme?: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (): void => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme && setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  useEffect(() => {
    document.body.className = theme ?? Theme.LIGHT;
  }, []);

  return {
    theme,
    toggleTheme,
  };
}
