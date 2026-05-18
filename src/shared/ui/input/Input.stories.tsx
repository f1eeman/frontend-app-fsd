import { Input as InputFC } from './Input'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Input',
  component: InputFC,
} satisfies Meta<typeof InputFC>

export default meta

type Story = StoryObj<typeof meta>

export const InputStory: Story = {
  args: {
    placeholder: 'Type text',
    value: '123123',
  },
}
