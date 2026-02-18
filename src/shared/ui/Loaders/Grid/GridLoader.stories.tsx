import { GridLoader as GridLoaderFC } from './GridLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/GridLoader',
  component: GridLoaderFC,
} satisfies Meta<typeof GridLoaderFC>

export default meta

type Story = StoryObj<typeof meta>

export const GridLoader: Story = {}
