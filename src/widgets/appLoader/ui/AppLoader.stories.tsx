import { AppLoader } from './AppLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

/** AppLoader не принимает пропсов — панель Controls для него пуста */
const meta = {
  title: 'widget/AppLoader',
  component: AppLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
} satisfies Meta<typeof AppLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
