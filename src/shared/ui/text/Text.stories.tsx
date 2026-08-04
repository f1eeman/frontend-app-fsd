import { TextAlign, TextSize, TextTheme } from './consts'
import { Text } from './Text'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок. Рендерится в h1/h2/h3 в зависимости от size',
      table: { type: { summary: 'string' } },
    },
    text: {
      control: 'text',
      description: 'Основной текст, рендерится в p',
      table: { type: { summary: 'string' } },
    },
    theme: {
      control: 'inline-radio',
      options: [TextTheme.PRIMARY, TextTheme.ERROR, TextTheme.INVERTED],
      description: 'Цветовая тема текста',
      table: {
        type: { summary: 'TextTheme' },
        defaultValue: { summary: TextTheme.PRIMARY },
      },
    },
    align: {
      control: 'inline-radio',
      options: [TextAlign.LEFT, TextAlign.CENTER, TextAlign.RIGHT],
      description: 'Выравнивание текста',
      table: {
        type: { summary: 'TextAlign' },
        defaultValue: { summary: TextAlign.LEFT },
      },
    },
    size: {
      control: 'inline-radio',
      options: [TextSize.S, TextSize.M, TextSize.L],
      labels: {
        [TextSize.S]: 'S (h3)',
        [TextSize.M]: 'M (h2)',
        [TextSize.L]: 'L (h1)',
      },
      description: 'Размер текста, он же определяет уровень заголовка',
      table: {
        type: { summary: 'TextSize' },
        defaultValue: { summary: TextSize.M },
      },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    title: 'Title lorem ipsum',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata',
    theme: TextTheme.PRIMARY,
    align: TextAlign.LEFT,
    size: TextSize.M,
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Primary: Story = {}

export const Error: Story = {
  args: {
    theme: TextTheme.ERROR,
  },
}

export const Inverted: Story = {
  args: {
    theme: TextTheme.INVERTED,
  },
}

export const OnlyTitle: Story = {
  args: {
    text: undefined,
  },
}

export const OnlyText: Story = {
  args: {
    title: undefined,
  },
}

export const SizeL: Story = {
  args: {
    size: TextSize.L,
  },
}

export const SizeS: Story = {
  args: {
    size: TextSize.S,
  },
}

export const Centered: Story = {
  args: {
    align: TextAlign.CENTER,
  },
}
