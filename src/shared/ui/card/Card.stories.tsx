import { Card } from './Card'
import { Text } from '@/shared/ui/text/Text'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/card',
  component: Card,
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    children: <Text title='test' text='text text' />,
  },
}
