import { Navbar as NavbarComponent } from './Navbar'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/Navbar',
  component: NavbarComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof NavbarComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Navbar: Story = {
  decorators: [StoreDecorator({})],
}
export const AuthNavbar: Story = {
  decorators: [
    StoreDecorator({
      user: { authData: { username: '123', id: '123', avatar: AvatarImg } },
    }),
  ],
}
