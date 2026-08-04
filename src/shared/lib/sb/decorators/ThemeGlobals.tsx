import { Theme, ThemeProvider } from '@/app/theme'
import type { Decorator } from '@storybook/react'

export const ThemeProviderDecorator: Decorator = (Story, context) => {
  const theme = context.globals.theme as Theme
  return (
    <ThemeProvider initialTheme={theme}>
      <Story />
    </ThemeProvider>
  )
}

export const ThemeRootClassDecorator: Decorator = (Story, context) => {
  const theme = context.globals.theme as Theme
  const storybookRoot = document.querySelector('#storybook-root')

  if (storybookRoot) {
    storybookRoot.className = `app-sb ${theme}`
  }

  /**
   * Так же, как это делает useTheme в приложении: без класса на body
   * переменные темы недоступны за пределами #storybook-root, и фон стори
   * остаётся прозрачным.
   */
  document.body.classList.remove(Theme.LIGHT, Theme.DARK, Theme.ORANGE)
  document.body.classList.add(theme)

  return <Story />
}
