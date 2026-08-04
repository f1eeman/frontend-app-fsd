import { fn } from 'storybook/test'
import LoginForm from './LoginForm'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onSuccess: {
      control: false,
      description: 'Вызывается после успешного логина',
      table: { type: { summary: '() => void' } },
    },
  },
  args: {
    onSuccess: fn(),
  },
} satisfies Meta<typeof LoginForm>

export default meta

type Story = StoryObj<typeof meta>

export const PrimaryLoginForm: Story = {
  decorators: [
    StoreDecorator({
      login: { username: '123', password: 'asd', isLoading: false },
    }),
  ],
}

export const LoadingLoginForm: Story = {
  decorators: [
    StoreDecorator({
      login: {
        username: '123',
        password: 'asd',
        isLoading: true,
      },
    }),
  ],
}

export const WithErrorLoginForm: Story = {
  decorators: [
    StoreDecorator({
      login: {
        username: '123',
        password: 'asd',
        error: 'Вы ввели неверный логин или пароль',
        isLoading: false,
      },
    }),
  ],
}
