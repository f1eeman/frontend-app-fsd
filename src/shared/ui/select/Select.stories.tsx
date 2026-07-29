import { fn } from 'storybook/test'
import { Select as SelectComponent } from './Select'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Подпись перед селектом',
      table: { type: { summary: 'string' } },
    },
    options: {
      control: 'object',
      description: 'Список пунктов вида { value, content }',
      table: { type: { summary: 'SelectOption[]' } },
    },
    value: {
      control: 'text',
      description: 'Выбранное значение (value пункта)',
      table: { type: { summary: 'string' } },
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения, селект блокируется',
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
    options: [
      { value: '123', content: 'Первый пункт' },
      { value: '1234', content: 'Второй пункт' },
    ],
    value: '123',
    readonly: false,
    onChange: fn(),
  },
} satisfies Meta<typeof SelectComponent>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Primary: Story = {}

export const Readonly: Story = {
  args: {
    readonly: true,
  },
}
