import { CommentList } from './CommentList'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Comment } from '../../model/types/comment'

const meta = {
  title: 'entities/CommentList',
  component: CommentList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommentList>

export default meta
type Story = StoryObj<typeof meta>

const comments: Comment[] = [
  {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya' },
  },
  {
    id: '2',
    text: 'how are you?',
    user: { id: '2', username: 'Petya' },
  },
]

export const Normal: Story = {
  args: {
    comments,
  },
}

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
