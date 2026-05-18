import { LangSwitcher } from './LangSwitcher'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/LangSwitcher',
  component: LangSwitcher,
} satisfies Meta<typeof LangSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}

export const Short: Story = {
  args: { short: true },
}
