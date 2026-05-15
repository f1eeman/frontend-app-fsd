import { Skeleton } from './Skeleton'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    width: '100%',
    height: 200,
  },
}

export const Circle: Story = {
  args: {
    border: '50%',
    width: 100,
    height: 100,
  },
}
