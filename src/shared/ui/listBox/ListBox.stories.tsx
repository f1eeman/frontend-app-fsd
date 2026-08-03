import { fn } from 'storybook/test'
import { ListBox as ListBoxComponent } from './ListBox'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/ListBox',
  component: ListBoxComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Подпись перед списком',
      table: { type: { summary: 'string' } },
    },
    items: {
      control: 'object',
      description: 'Список пунктов вида { value, content, disabled }',
      table: { type: { summary: 'ListBoxItem[]' } },
    },
    value: {
      control: 'text',
      description: 'Выбранное значение (value пункта)',
      table: { type: { summary: 'string' } },
    },
    defaultValue: {
      control: 'text',
      description: 'Текст на кнопке, когда value не задан',
      table: { type: { summary: 'string' } },
    },
    direction: {
      control: 'radio',
      options: ['top left', 'top right', 'bottom left', 'bottom right'],
      description: 'Направление раскрытия выпадающего списка',
      table: {
        type: {
          summary: "'top left' | 'top right' | 'bottom left' | 'bottom right'",
        },
        defaultValue: { summary: 'bottom right' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения, список блокируется',
      table: { type: { summary: 'boolean' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onChange: {
      control: false,
      description: 'Обработчик выбора, получает value пункта',
      table: { type: { summary: '(value: string) => void' } },
    },
  },
  args: {
    label: 'Укажите значение',
    items: [
      { value: '123', content: 'Первый пункт' },
      { value: '1234', content: 'Второй пункт' },
      { value: '12345', content: 'Третий пункт', disabled: true },
    ],
    value: '123',
    defaultValue: 'Выберите значение',
    direction: 'bottom right',
    readonly: false,
    onChange: fn(),
  },
} satisfies Meta<typeof ListBoxComponent>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Primary: Story = {}

export const WithoutValue: Story = {
  args: {
    value: undefined,
  },
}

export const Readonly: Story = {
  args: {
    readonly: true,
  },
}
