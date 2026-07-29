import { PageLoader } from './PageLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/PageLoader',
  component: PageLoader,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof PageLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
