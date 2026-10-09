import MainPage from './MainPage'
import { userRole } from '@/entities/user'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/MainPage',
  component: MainPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
} satisfies Meta<typeof MainPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  decorators: [
    StoreDecorator({
      user: {
        authData: {
          id: '1',
          username: 'admin',
          avatar: AvatarImg,
          role: userRole.ADMIN,
        },
        _inited: true,
      },
    }),
  ],
}

export const NoAuth: Story = {
  decorators: [StoreDecorator({ user: { _inited: true } })],
}
