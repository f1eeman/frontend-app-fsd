import { NotificationList } from './NotificationList'
import { MockFetchDecorator } from '@/shared/lib/sb/decorators/MockFetch'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Notification } from '../../model/types/notification'
import type { MockFetchRoute } from '@/shared/lib/sb/decorators/MockFetch'

const meta = {
  title: 'entities/NotificationList',
  component: NotificationList,
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
} satisfies Meta<typeof NotificationList>

export default meta
type Story = StoryObj<typeof meta>

const NOTIFICATIONS_URL = '/notifications'
const NEVER_RESOLVES_MS = 1_000_000

const notifications: Notification[] = [
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
  {
    id: '3',
    title: 'Новая оценка',
    description: 'Вашу статью оценили на 5 звёзд',
  },
]

const withNotifications = (route: MockFetchRoute) => [
  StoreDecorator({}),
  MockFetchDecorator({ [NOTIFICATIONS_URL]: route }),
]

export const Playground: Story = {
  decorators: withNotifications({ body: notifications }),
}

export const Normal: Story = {
  decorators: withNotifications({ body: notifications }),
}

export const Loading: Story = {
  decorators: withNotifications({
    body: notifications,
    delayMs: NEVER_RESOLVES_MS,
  }),
}

export const Empty: Story = {
  decorators: withNotifications({ body: [] }),
}
