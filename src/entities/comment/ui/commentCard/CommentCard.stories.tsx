import { CommentCard } from './CommentCard'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Comment } from '../../model/types/comment'

const comment: Comment = {
  id: '1',
  text: 'hello world',
  user: { id: '1', username: 'Vasya' },
}

const meta = {
  title: 'entities/CommentCard',
  component: CommentCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    comment: {
      control: 'object',
      description: 'Данные комментария: id, text, user',
      table: { type: { summary: 'Comment' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Показать скелетон вместо содержимого',
      table: { type: { summary: 'boolean' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    comment,
    isLoading: false,
  },
} satisfies Meta<typeof CommentCard>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
