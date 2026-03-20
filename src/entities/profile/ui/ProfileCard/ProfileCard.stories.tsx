import { ProfileCard as ProfileCardComponent } from './ProfileCard'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/ProfileCard',
  component: ProfileCardComponent,
} satisfies Meta<typeof ProfileCardComponent>

export default meta

type Story = StoryObj<typeof meta>

export const ProfileCard: Story = {
  args: {
    profile: {
      first: 'John',
      lastname: 'Doe',
      age: 30,
      city: 'Moscow',
      username: 'johndoe',
      avatar: AvatarImg,
    },
    error: null,
    isLoading: false,
    readonly: false,
  },
  decorators: [
    StoreDecorator({
      profile: {
        data: {
          first: 'John',
          lastname: 'Doe',
          age: 30,
          city: 'Moscow',
          username: 'johndoe',
          avatar: 'https://via.placeholder.com/150',
        },
        form: {
          first: 'John',
          lastname: 'Doe',
          age: 30,
          city: 'Moscow',
          username: 'johndoe',
          avatar: 'https://via.placeholder.com/150',
        },
        isLoading: false,
        readonly: false,
        error: null,
      },
    }),
  ],
}

export const ProfileCardWithError: Story = {
  args: {
    error: 'true',
  },
}

export const ProfileCardWithLoading: Story = {
  args: {
    error: null,
    isLoading: true,
  },
}
