import { CurrencySelect as CurrencySelectComponent } from './CurrencySelect'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/CurrencySelect',
  component: CurrencySelectComponent,
} satisfies Meta<typeof CurrencySelectComponent>

type Story = StoryObj<typeof meta>

export const CurrencySelect: Story = {}

export default meta
