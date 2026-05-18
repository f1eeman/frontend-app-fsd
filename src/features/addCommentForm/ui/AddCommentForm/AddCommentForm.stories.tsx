import AddCommentForm from './AddCommentForm'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  args: {
    onSendComment: () => {},
  },
} satisfies Meta<typeof AddCommentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
