import { ProfileCard as ProfileCardComponent } from './ProfileCard'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/ProfileCard',
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
      avatar: 'https://via.placeholder.com/150',
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
