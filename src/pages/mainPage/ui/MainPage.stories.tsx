import MainPage from './MainPage'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

/** MainPage не принимает пропсов — панель Controls для неё пуста */
const meta = {
  title: 'pages/MainPage',
  component: MainPage,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
} satisfies Meta<typeof MainPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  decorators: [
    StoreDecorator({
      user: { authData: { id: '1', username: 'admin' }, _inited: true },
    }),
  ],
}

export const NoAuth: Story = {
  decorators: [StoreDecorator({ user: { _inited: true } })],
}
