import { GridLoader as GridLoaderFC } from './GridLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/GridLoader',
  component: GridLoaderFC,
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
  },
} satisfies Meta<typeof GridLoaderFC>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const GridLoader: Story = {}
