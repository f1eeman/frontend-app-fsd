import { LangSwitcher } from './LangSwitcher'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'feature/LangSwitcher',
  component: LangSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    short: {
      control: 'boolean',
      description: 'Короткая подпись языка вместо полной',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    short: false,
  },
} satisfies Meta<typeof LangSwitcher>

export default meta
type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const Short: Story = {
  args: { short: true },
}
