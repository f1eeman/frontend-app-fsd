import { StarRating } from './StarRating'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    selectedStars: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Уже выбранная оценка; 0 — оценки ещё нет',
      table: { type: { summary: 'number' } },
    },
    size: {
      control: 'number',
      description: 'Размер одной звезды в пикселях',
      table: { type: { summary: 'number' } },
    },
    onSelect: {
      action: 'select',
      description: 'Вызывается с числом звёзд при выборе оценки',
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof StarRating>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {}

export const Selected: Story = {
  args: {
    selectedStars: 4,
  },
}
