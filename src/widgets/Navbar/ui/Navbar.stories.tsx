import { Navbar as NavbarComponent } from './Navbar'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/Navbar',
  component: NavbarComponent,
  argTypes: {
    onClick: () => {},
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
      user: { authData: { username: '123', id: '123' } },
    }),
  ],
}
