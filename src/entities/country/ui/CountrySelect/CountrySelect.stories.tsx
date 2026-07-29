import { fn } from 'storybook/test'
import { Country } from '../../model/types/country'
import { CountrySelect as CountrySelectComponent } from './CountrySelect'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/CountrySelect',
  component: CountrySelectComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    value: {
      control: 'select',
      options: [
        Country.Russia,
        Country.Belarus,
        Country.Ukraine,
        Country.Kazakhstan,
        Country.Armenia,
      ],
      description: 'Выбранная страна',
      table: { type: { summary: 'Country' } },
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
      description: 'Вызывается при выборе страны',
      table: { type: { summary: '(value: Country) => void' } },
    },
  },
  args: {
    value: Country.Russia,
    readonly: false,
    onChange: fn(),
  },
} satisfies Meta<typeof CountrySelectComponent>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const CountrySelect: Story = {}

export const Readonly: Story = {
  args: {
    readonly: true,
  },
}
