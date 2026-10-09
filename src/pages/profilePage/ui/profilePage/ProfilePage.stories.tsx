import { MemoryRouter, Route, Routes } from 'react-router'
import ProfilePageComponent from './ProfilePage'
import { userRole } from '@/entities/user'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { routesPaths } from '@/shared/config/routes'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5'

const RouteWithIdDecorator: Decorator = (Story) => (
  <MemoryRouter initialEntries={['/profile/1']}>
    <Routes>
      <Route path={routesPaths.profile.path} element={<Story />} />
    </Routes>
  </MemoryRouter>
)

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePageComponent,
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
} satisfies Meta<typeof ProfilePageComponent>

export default meta

type Story = StoryObj<typeof meta>

export const ProfilePage: Story = {
  parameters: { router: 'none' },
  decorators: [
    RouteWithIdDecorator,
    StoreDecorator({
      user: {
        authData: { id: '1', username: 'johndoe', role: userRole.USER },
      },
      profile: {
        data: {
          id: '1',
          first: 'John',
          lastname: 'Doe',
          age: 30,
          city: 'Moscow',
          username: 'johndoe',
          avatar: AvatarImg,
        },
        form: {
          first: 'John',
          lastname: 'Doe',
          age: 30,
          city: 'Moscow',
          username: 'johndoe',
          avatar: AvatarImg,
        },
        isLoading: false,
        readonly: false,
        error: null,
        validateErrors: [],
      },
    }),
  ],
}
