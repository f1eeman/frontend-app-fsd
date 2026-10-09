import { CommentList } from './CommentList'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Comment } from '../../model/types/comment'

const comments: Comment[] = [
  {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya', role: 'user' },
  },
  {
    id: '2',
    text: 'how are you?',
    user: { id: '2', username: 'Petya', role: 'user' },
  },
]

const meta = {
  title: 'entities/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    comments: {
      control: 'object',
      description: 'Список комментариев',
      table: { type: { summary: 'Comment[]' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Показать скелетоны вместо списка',
      table: { type: { summary: 'boolean' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    comments,
    isLoading: false,
  },
} satisfies Meta<typeof CommentList>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Normal: Story = {}

export const Loading: Story = {
  args: {
    comments: [],
    isLoading: true,
  },
}

export const Empty: Story = {
  args: {
    comments: [],
  },
}
