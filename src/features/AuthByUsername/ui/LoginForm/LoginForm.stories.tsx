import LoginForm from './LoginForm'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/LoginForm',
  component: LoginForm,
} satisfies Meta<typeof LoginForm>

export default meta

type Story = StoryObj<typeof meta>

export const PrimaryLoginForm: Story = {
  args: {
    onSuccess: () => {},
  },
  decorators: [
    StoreDecorator({
      login: { username: '123', password: 'asd', isLoading: false },
    }),
  ],
}

export const LoadingLoginForm: Story = {
  args: PrimaryLoginForm.args,
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
  args: PrimaryLoginForm.args,
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
