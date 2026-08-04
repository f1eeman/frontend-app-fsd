import { Card } from './Card'
import { CardTheme } from './consts'
import { Text } from '@/shared/ui/text/Text'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Содержимое карточки',
      table: { type: { summary: 'ReactNode' } },
    },
    theme: {
      control: 'inline-radio',
      options: [CardTheme.NORMAL, CardTheme.OUTLINED],
      description: 'Визуальная тема карточки',
      table: {
        type: { summary: 'CardTheme' },
        defaultValue: { summary: CardTheme.NORMAL },
      },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    children: 'Содержимое карточки',
    theme: CardTheme.NORMAL,
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {
  args: {
    children: <Text title='test' text='text text' />,
  },
}

export const Outlined: Story = {
  args: {
    theme: CardTheme.OUTLINED,
    children: <Text title='test' text='text text' />,
  },
}
