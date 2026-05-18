import AddCommentForm from './AddCommentForm'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  args: {
    onSendComment: () => {},
  },
  decorators: [
    StoreDecorator({
      addCommentForm: { text: '' },
    }),
  ],
} satisfies Meta<typeof AddCommentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}

export const WithText: Story = {
  decorators: [
    StoreDecorator({
      addCommentForm: { text: 'Уже введённый комментарий' },
    }),
  ],
}
