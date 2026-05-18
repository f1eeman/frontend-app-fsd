import { SpinnerLoader as SpinnerLoaderFC } from './SpinnerLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/SpinnerLoader',
  component: SpinnerLoaderFC,
} satisfies Meta<typeof SpinnerLoaderFC>

export default meta

type Story = StoryObj<typeof meta>

export const SpinnerLoader: Story = {}
