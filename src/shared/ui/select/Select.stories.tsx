import { Select as SelectComponent } from './Select'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Select',
  component: SelectComponent,
} satisfies Meta<typeof SelectComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Укажите значение',
    options: [
      { value: '123', content: 'Первый пункт' },
      { value: '1234', content: 'Второй пункт' },
    ],
  },
}
