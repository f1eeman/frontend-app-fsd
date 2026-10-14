import { AvatarDropdown } from './AvatarDropDown'
import { userRole } from '@/entities/user'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { UserRole } from '@/entities/user'

const meta = {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AvatarDropdown>

export default meta
type Story = StoryObj<typeof meta>

const withUser = (role: UserRole) => [
  StoreDecorator({
    user: {
      authData: { id: '1', username: 'John', role, avatar: AvatarImg },
      _inited: true,
    },
  }),
]

export const Playground: Story = {
  decorators: withUser(userRole.USER),
}

export const User: Story = {
  decorators: withUser(userRole.USER),
}

export const Admin: Story = {
  decorators: withUser(userRole.ADMIN),
}
