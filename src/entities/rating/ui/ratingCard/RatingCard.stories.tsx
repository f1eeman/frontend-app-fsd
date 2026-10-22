import { fn } from 'storybook/test'
import { RatingCard } from './RatingCard'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/RatingCard',
  component: RatingCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок над звёздами',
      table: { type: { summary: 'string' } },
    },
    hasFeedback: {
      control: 'boolean',
      description: 'После выбора звёзд открыть окно с полем для отзыва',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rate: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Уже поставленная оценка; 0 — оценки ещё нет',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    feedbackTitle: {
      control: 'text',
      description: 'Заголовок окна с отзывом',
      table: { type: { summary: 'string' } },
    },
    onAccept: {
      control: false,
      description:
        'Вызывается с оценкой после выбора звёзд; feedback есть, только если пользователь отправил отзыв',
      table: {
        type: { summary: '(starsCount: number, feedback?: string) => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    title: 'Как вам статья?',
    hasFeedback: false,
    onAccept: fn(),
  },
} satisfies Meta<typeof RatingCard>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {}

export const WithFeedback: Story = {
  args: {
    hasFeedback: true,
    feedbackTitle: 'Оставьте отзыв о статье',
  },
}

export const Rated: Story = {
  args: {
    rate: 4,
  },
}
