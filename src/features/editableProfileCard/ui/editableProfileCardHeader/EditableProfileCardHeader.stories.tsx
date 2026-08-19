import { EditableProfileCardHeader } from './EditableProfileCardHeader'
import { Country } from '@/entities/country'
import { Currency } from '@/entities/currency'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Profile, ProfileSchema } from '../../model/types/profile'

/**
 * Кнопки редактирования показываются только владельцу профиля:
 * `canEdit` сравнивает `user.authData.id` с `profile.data.id`, поэтому обе
 * ветки настраиваются через StoreDecorator.
 */
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
    user: { authData: { id: authDataId, username: 'johndoe' }, _inited: true },
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

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {
  decorators: withStore('1', profileState),
}

/** Свой профиль в режиме просмотра — доступна кнопка «Редактировать» */
export const CanEdit: Story = {
  decorators: withStore('1', profileState),
}

/** Свой профиль в режиме правки — «Отменить» и «Сохранить» */
export const Editing: Story = {
  decorators: withStore('1', { ...profileState, readonly: false }),
}

/** Чужой профиль — остаётся только заголовок */
export const CannotEdit: Story = {
  decorators: withStore('2', profileState),
}
