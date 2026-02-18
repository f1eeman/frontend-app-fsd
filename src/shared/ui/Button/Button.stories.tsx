import { fn } from 'storybook/test'
import { Button } from './Button'
import { Theme } from '@/app/theme'
import { ThemeDecorator } from '@/shared/lib/sb/decorators/Theme'
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

export const ClearDark = {
  args: Clear.args,
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const ClearInverted: Story = {
  args: {
    theme: 'clear-inverted',
    children: 'Button',
  },
}

export const ClearInvertedDark = {
  args: {
    theme: 'clear-inverted',
    children: 'Button',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Background = {
  args: {
    theme: 'background',
    children: 'Button',
  },
}

export const BackgroundDark = {
  args: {
    theme: 'background',
    children: 'Button',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const BackgroundInverted = {
  args: {
    theme: 'background-inverted',
    children: 'Button',
  },
}

export const BackgroundInvertedDark = {
  args: {
    theme: 'background-inverted',
    children: 'Button',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Square = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
  },
}

export const SquareDark = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const SquareSizeMedium = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
    size: 'size-m',
  },
}

export const SquareSizeMediumDark = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
    size: 'size-m',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const SquareSizeLarge = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
    size: 'size-l',
  },
}

export const SquareSizeLargeDark = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
    size: 'size-l',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const SquareSizeXLarge = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
    size: 'size-xl',
  },
}

export const SquareSizeXLargeDark = {
  args: {
    theme: 'background-inverted',
    children: '>',
    square: true,
    size: 'size-xl',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}
