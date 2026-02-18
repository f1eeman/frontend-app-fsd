import { fn } from 'storybook/test'
import { Button } from './Button'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Clear: Story = {
  args: {
    theme: 'clear',
    children: 'Button',
  },
}

export const ClearInverted: Story = {
  args: {
    theme: 'clear-inverted',
    children: 'Button',
  },
}

export const Background = {
  args: {
    theme: 'background',
    children: 'Button',
  },
}

export const BackgroundInverted = {
  args: {
    theme: 'background-inverted',
    children: 'Button',
  },
}

export const SquareSizeMedium = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
    size: 'size-m',
  },
}

export const SquareSizeLarge = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
    size: 'size-l',
  },
}

export const SquareSizeXLarge = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
    size: 'size-xl',
  },
}
