import { PageError as PageErrorFC } from './PageError'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/PageError',
  component: PageErrorFC,
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
} satisfies Meta<typeof PageErrorFC>

export default meta

type Story = StoryObj<typeof meta>

export const PageError: Story = {}
