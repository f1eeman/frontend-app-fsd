import { CommentCard } from './CommentCard'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Comment } from '../../model/types/comment'

const meta = {
  title: 'entities/CommentCard',
  component: CommentCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommentCard>

export default meta
type Story = StoryObj<typeof meta>

const comment: Comment = {
  id: '1',
  text: 'hello world',
  user: { id: '1', username: 'Vasya' },
}

export const Normal: Story = {
  args: {
    comment,
  },
}

export const Loading: Story = {
  args: {
    comment,
    isLoading: true,
  },
}
