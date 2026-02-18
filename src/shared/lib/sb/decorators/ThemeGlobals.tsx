import { ThemeProvider } from '@/app/theme'
import type { Decorator } from '@storybook/react'
import type { Theme } from '@/app/theme'

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

  return <Story />
}
