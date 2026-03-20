import ProfilePageComponent from './ProfilePage'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePageComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ProfilePageComponent>

export default meta

type Story = StoryObj<typeof meta>

export const ProfilePage: Story = {
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
        validateErrors: [],
      },
    }),
  ],
}
