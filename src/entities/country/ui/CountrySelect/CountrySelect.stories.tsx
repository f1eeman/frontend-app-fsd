import { CountrySelect as CountrySelectComponent } from './CountrySelect'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/CountrySelect',
  component: CountrySelectComponent,
} satisfies Meta<typeof CountrySelectComponent>

type Story = StoryObj<typeof meta>

export const CountrySelect: Story = {}

export default meta
