import { ThemeSwitcher as ThemeSwitcherFC } from './ThemeSwitcher'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'feature/ThemeSwitcher',
  component: ThemeSwitcherFC,
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
} satisfies Meta<typeof ThemeSwitcherFC>

export default meta

type Story = StoryObj<typeof meta>

export const ThemeSwitcher: Story = {}
