import { EditableProfileCardHeader } from './EditableProfileCardHeader'
import { Country } from '@/entities/country'
import { Currency } from '@/entities/currency'
import { userRole } from '@/entities/user'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Profile, ProfileSchema } from '../../model/types/profile'

const profile: Profile = {
  id: '1',
  first: 'John',
  lastname: 'Doe',
  age: 30,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: 'Almaty',
  username: 'johndoe',
  avatar: AvatarImg,
}

const profileState: ProfileSchema = {
  data: profile,
  form: profile,
  isLoading: false,
  error: null,
  readonly: true,
  validateErrors: [],
}

const withStore = (authDataId: string, state: ProfileSchema) => [
  StoreDecorator({
    user: {
      authData: { id: authDataId, username: 'johndoe', role: userRole.USER },
      _inited: true,
    },
    profile: state,
  }),
]

const meta = {
  title: 'features/EditableProfileCard/EditableProfileCardHeader',
  component: EditableProfileCardHeader,
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
} satisfies Meta<typeof EditableProfileCardHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  decorators: withStore('1', profileState),
}

export const CanEdit: Story = {
  decorators: withStore('1', profileState),
}

export const Editing: Story = {
  decorators: withStore('1', { ...profileState, readonly: false }),
}

export const CannotEdit: Story = {
  decorators: withStore('2', profileState),
}
