import { AppLoader } from './AppLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/AppLoader',
  component: AppLoader,
} satisfies Meta<typeof AppLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
