import { Theme } from '@/app/theme'
import { RouterDecorator } from '@/shared/lib/sb/decorators/Router'
import { StyleDecorator } from '@/shared/lib/sb/decorators/Style'
import { ThemeDecorator } from '@/shared/lib/sb/decorators/Theme'
import type { Preview } from '@storybook/react-webpack5'

const preview: Preview = {
  decorators: [StyleDecorator, ThemeDecorator(Theme.LIGHT), RouterDecorator],
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
