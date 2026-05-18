import { PageLoader } from './PageLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/PageLoader',
  component: PageLoader,
} satisfies Meta<typeof PageLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
