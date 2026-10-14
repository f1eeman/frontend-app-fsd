import { NotificationButton } from './NotificationButton'
import { MockFetchDecorator } from '@/shared/lib/sb/decorators/MockFetch'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/NotificationButton',
  component: NotificationButton,
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
  },
  decorators: [
    StoreDecorator({}),
    MockFetchDecorator({
      '/notifications': {
        body: [
          {
            id: '1',
            title: 'Новый комментарий',
            description: 'Пользователь оставил комментарий к вашей статье',
          },
          {
            id: '2',
            title: 'Статья опубликована',
            description: 'Перейдите по ссылке, чтобы открыть статью',
            href: 'http://localhost:3000/articles/1',
          },
        ],
      },
    }),
  ],
} satisfies Meta<typeof NotificationButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Normal: Story = {}
