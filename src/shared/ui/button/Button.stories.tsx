import { fn } from 'storybook/test'
import { Button } from './Button'
import { buttonSize, buttonTheme } from './consts'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Содержимое кнопки',
      table: { type: { summary: 'ReactNode' } },
    },
    theme: {
      control: 'select',
      options: Object.values(buttonTheme),
      description: 'Визуальная тема кнопки',
      table: {
        type: { summary: 'ButtonTheme' },
        defaultValue: { summary: buttonTheme.clear },
      },
    },
    size: {
      control: 'inline-radio',
      options: Object.values(buttonSize),
      labels: {
        [buttonSize.m]: 'M',
        [buttonSize.l]: 'L',
        [buttonSize.xl]: 'XL',
      },
      description: 'Размер кнопки',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: buttonSize.m },
      },
    },
    square: {
      control: 'boolean',
      description: 'Квадратная кнопка с равными сторонами',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Заблокированное состояние',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onClick: {
      control: false,
      description: 'Обработчик клика',
      table: { type: { summary: '(e: MouseEvent) => void' } },
    },
  },
  args: {
    children: 'Button',
    theme: buttonTheme.clear,
    size: buttonSize.m,
    square: false,
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Clear: Story = {
  args: {
    theme: buttonTheme.clear,
  },
}

export const ClearInverted: Story = {
  args: {
    theme: buttonTheme.invertedClear,
  },
}

export const Background: Story = {
  args: {
    theme: buttonTheme.background,
  },
}

export const BackgroundInverted: Story = {
  args: {
    theme: buttonTheme.invertedBackground,
  },
}

export const Outline: Story = {
  args: {
    theme: buttonTheme.outline,
  },
}

export const OutlineInverted: Story = {
  args: {
    theme: buttonTheme.outlineInverted,
  },
}

export const OutlineRed: Story = {
  args: {
    theme: buttonTheme.outlineRed,
    children: 'Delete',
  },
}

export const BackgroundRed: Story = {
  args: {
    theme: buttonTheme.backgroundRed,
    children: 'Delete',
  },
}

export const Disabled: Story = {
  args: {
    theme: buttonTheme.outline,
    disabled: true,
  },
}

export const SquareSizeMedium: Story = {
  args: {
    theme: buttonTheme.invertedBackground,
    children: '>',
    square: true,
    size: buttonSize.m,
  },
}

export const SquareSizeLarge: Story = {
  args: {
    theme: buttonTheme.invertedBackground,
    children: '>',
    square: true,
    size: buttonSize.l,
  },
}

export const SquareSizeXLarge: Story = {
  args: {
    theme: buttonTheme.invertedBackground,
    children: '>',
    square: true,
    size: buttonSize.xl,
  },
}
