import { RollerLoader as RollerLoaderFC } from './RollerLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/RollerLoader',
  component: RollerLoaderFC,
} satisfies Meta<typeof RollerLoaderFC>

export default meta

type Story = StoryObj<typeof meta>

export const RollerLoader: Story = {}
