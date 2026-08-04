import { fn } from 'storybook/test'
import { ProfileCard as ProfileCardComponent } from './ProfileCard'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/ProfileCard',
  component: ProfileCardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    profile: {
      control: 'object',
      description: 'Данные профиля для отрисовки полей',
      table: { type: { summary: 'DeepPartial<Profile>' } },
    },
    error: {
      control: 'text',
      description: 'Текст ошибки. Не null — вместо формы рендерится сообщение',
      table: { type: { summary: 'string | null' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Показать лоадер вместо формы',
      table: { type: { summary: 'boolean' } },
    },
    readonly: {
      control: 'boolean',
      description: 'Поля недоступны для редактирования',
      table: { type: { summary: 'boolean' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    currencySelect: {
      control: false,
      description: 'Слот для селекта валюты',
      table: { type: { summary: 'ReactNode' } },
    },
    countrySelect: {
      control: false,
      description: 'Слот для селекта страны',
      table: { type: { summary: 'ReactNode' } },
    },
    onChangeFirstname: { control: false, table: { category: 'Обработчики' } },
    onChangeLastname: { control: false, table: { category: 'Обработчики' } },
    onChangeAge: { control: false, table: { category: 'Обработчики' } },
    onChangeCity: { control: false, table: { category: 'Обработчики' } },
    onChangeUsername: { control: false, table: { category: 'Обработчики' } },
    onChangeAvatar: { control: false, table: { category: 'Обработчики' } },
  },
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
    onChangeFirstname: fn(),
    onChangeLastname: fn(),
    onChangeAge: fn(),
    onChangeCity: fn(),
    onChangeUsername: fn(),
    onChangeAvatar: fn(),
  },
} satisfies Meta<typeof ProfileCardComponent>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const ProfileCard: Story = {
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

export const ProfileCardReadonly: Story = {
  args: {
    readonly: true,
  },
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
