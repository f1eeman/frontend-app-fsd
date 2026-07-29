import { fn } from 'storybook/test'
import { Input as InputFC } from './Input'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Input',
  component: InputFC,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Значение поля',
      table: { type: { summary: 'string | number' } },
    },
    placeholder: {
      control: 'text',
      description: 'Подпись перед полем ввода',
      table: { type: { summary: 'string' } },
    },
    type: {
      control: 'inline-radio',
      options: ['text', 'password', 'number', 'email'],
      description: 'HTML-тип input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения, каретка скрывается',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autofocus: {
      control: 'boolean',
      description: 'Автофокус при монтировании',
      table: { type: { summary: 'boolean' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onChange: {
      control: false,
      description: 'Обработчик изменения, получает строку',
      table: { type: { summary: '(value: string) => void' } },
    },
  },
  args: {
    placeholder: 'Type text',
    value: '123123',
    type: 'text',
    readonly: false,
    autofocus: false,
    onChange: fn(),
  },
} satisfies Meta<typeof InputFC>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const InputStory: Story = {}

export const Readonly: Story = {
  args: {
    readonly: true,
  },
}

export const Empty: Story = {
  args: {
    value: '',
  },
}
