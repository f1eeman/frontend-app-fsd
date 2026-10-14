import { NotificationItem } from './NotificationItem'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    item: {
      control: 'object',
      description:
        'Уведомление вида { id, title, description, href }; с href карточка рендерится ссылкой',
      table: { type: { summary: 'Notification' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    item: {
      id: '1',
      title: 'Новый комментарий',
      description: 'Пользователь оставил комментарий к вашей статье',
    },
  },
} satisfies Meta<typeof NotificationItem>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Normal: Story = {}

export const WithLink: Story = {
  args: {
    item: {
      id: '2',
      title: 'Статья опубликована',
      description: 'Перейдите по ссылке, чтобы открыть статью',
      href: 'http://localhost:3000/articles/1',
    },
  },
}
