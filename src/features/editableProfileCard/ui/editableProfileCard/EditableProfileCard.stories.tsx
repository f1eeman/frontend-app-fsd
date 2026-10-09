import { ValidateProfileError } from '../../model/types/profile'
import { EditableProfileCard } from './EditableProfileCard'
import { Country } from '@/entities/country'
import { Currency } from '@/entities/currency'
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

const baseState: ProfileSchema = {
  data: profile,
  form: profile,
  isLoading: false,
  error: null,
  readonly: true,
  validateErrors: [],
}

const withProfile = (state: ProfileSchema) => [
  StoreDecorator({ profile: state }),
]

const meta = {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Идентификатор профиля, который грузится при монтировании',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    id: '1',
  },
} satisfies Meta<typeof EditableProfileCard>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  decorators: withProfile(baseState),
}

export const Readonly: Story = {
  decorators: withProfile(baseState),
}

export const Editable: Story = {
  decorators: withProfile({ ...baseState, readonly: false }),
}

export const Loading: Story = {
  decorators: withProfile({
    ...baseState,
    data: null,
    form: null,
    isLoading: true,
  }),
}

export const Error: Story = {
  decorators: withProfile({
    ...baseState,
    data: null,
    form: null,
    error: 'Профиль не найден',
  }),
}

export const WithValidateErrors: Story = {
  decorators: withProfile({
    ...baseState,
    readonly: false,
    validateErrors: [
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
      ValidateProfileError.NO_DATA,
      ValidateProfileError.SERVER_ERROR,
    ],
  }),
}
