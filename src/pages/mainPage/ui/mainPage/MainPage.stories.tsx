import MainPage from './MainPage'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

/** MainPage не принимает пропсов — панель Controls для неё пуста */
const meta = {
  title: 'pages/MainPage',
  component: MainPage,
  tags: ['autodocs'],
  parameters: {
    /* MainPage — это layout приложения целиком, отступы sb-main-padded ему
       только добавляют скролл */
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
        authData: { id: '1', username: 'admin', avatar: AvatarImg },
        _inited: true,
      },
    }),
  ],
}

export const NoAuth: Story = {
  decorators: [StoreDecorator({ user: { _inited: true } })],
}
