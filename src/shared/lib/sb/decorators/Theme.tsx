import type { Decorator } from '@storybook/react'
import type { Theme } from '@/app/theme'

type ThemeDecoratorType = (theme: Theme) => Decorator

export const ThemeDecorator: ThemeDecoratorType = (theme: Theme) => {
  const DecoratorComponent: Decorator = (Story) => {
    return (
      <div className={`app-sb ${theme}`}>
        <Story />
      </div>
    )
  }

  return DecoratorComponent
}
