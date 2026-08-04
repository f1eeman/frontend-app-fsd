import { fn } from 'storybook/test'
import AddCommentForm from './AddCommentForm'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onSendComment: {
      control: false,
      description: 'Вызывается при отправке комментария',
      table: { type: { summary: '(text: string) => void' } },
    },
  },
  args: {
    onSendComment: fn(),
  },
  decorators: [
    StoreDecorator({
      addCommentForm: { text: '' },
    }),
  ],
} satisfies Meta<typeof AddCommentForm>

export default meta
type Story = StoryObj<typeof meta>

/** Текст поля живёт в сторе — меняется через StoreDecorator, не через Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const WithText: Story = {
  decorators: [
    StoreDecorator({
      addCommentForm: { text: 'Уже введённый комментарий' },
    }),
  ],
}
