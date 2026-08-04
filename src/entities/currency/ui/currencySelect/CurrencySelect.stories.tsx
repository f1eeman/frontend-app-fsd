import { fn } from 'storybook/test'
import { Currency } from '../../model/types/currency'
import { CurrencySelect as CurrencySelectComponent } from './CurrencySelect'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/CurrencySelect',
  component: CurrencySelectComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    value: {
      control: 'inline-radio',
      options: [Currency.RUB, Currency.EUR, Currency.USD],
      description: 'Выбранная валюта',
      table: { type: { summary: 'Currency' } },
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
      description: 'Вызывается при выборе валюты',
      table: { type: { summary: '(value: Currency) => void' } },
    },
  },
  args: {
    value: Currency.RUB,
    readonly: false,
    onChange: fn(),
  },
} satisfies Meta<typeof CurrencySelectComponent>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const CurrencySelect: Story = {}

export const Readonly: Story = {
  args: {
    readonly: true,
  },
}
