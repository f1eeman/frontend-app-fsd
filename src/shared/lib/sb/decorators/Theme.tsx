import { useEffect } from 'react'
import type { Decorator } from '@storybook/react'
import type { Theme } from '@/app/theme'

type ThemeDecoratorType = (theme: Theme) => Decorator

export const ThemeDecorator: ThemeDecoratorType = (theme: Theme) => {
  const DecoratorComponent: Decorator = (Story) => {
    useEffect(() => {
      const storybookRoot = document.querySelector('#storybook-root')
      if (storybookRoot) {
        storybookRoot.className = `app ${theme}`
      }
    }, [])

    return <Story />
  }
  return DecoratorComponent
}
