import { Theme } from '@/app/theme'
import { RouterDecorator } from '@/shared/lib/sb/decorators/Router'
import { StyleDecorator } from '@/shared/lib/sb/decorators/Style'
import {
  ThemeProviderDecorator,
  ThemeRootClassDecorator,
} from '@/shared/lib/sb/decorators/ThemeGlobals'
import type { Preview } from '@storybook/react-webpack5'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: Theme.LIGHT,
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: Theme.LIGHT, title: 'Light' },
          { value: Theme.DARK, title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    StyleDecorator,
    ThemeProviderDecorator,
    ThemeRootClassDecorator,
    RouterDecorator,
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
