import { ThemeSwitcher as ThemeSwitcherFC } from './ThemeSwitcher'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/ThemeSwitcher',
  component: ThemeSwitcherFC,
} satisfies Meta<typeof ThemeSwitcherFC>

export default meta

type Story = StoryObj<typeof meta>

export const ThemeSwitcher: Story = {}
