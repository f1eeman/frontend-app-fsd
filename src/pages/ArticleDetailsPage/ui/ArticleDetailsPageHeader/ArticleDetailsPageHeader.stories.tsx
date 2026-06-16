import { MemoryRouter } from 'react-router'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
} satisfies Meta<typeof ArticleDetailsPageHeader>

export default meta
type Story = StoryObj<typeof meta>

const RouterDecorator: Decorator = (Story) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
)

export const CanEdit: Story = {
  parameters: { router: 'none' },
  decorators: [
    StoreDecorator({
      user: { authData: { id: '1', username: 'admin' }, _inited: true },
      articleDetails: {
        isLoading: false,
        data: {
          id: '1',
          user: { id: '1', username: 'admin' },
          title: '',
          subtitle: '',
          img: '',
          views: 0,
          createdAt: '',
          type: [],
          blocks: [],
        },
      },
    }),
    RouterDecorator,
  ],
}

export const CannotEdit: Story = {
  parameters: { router: 'none' },
  decorators: [
    StoreDecorator({
      user: { authData: { id: '2', username: 'other' }, _inited: true },
      articleDetails: {
        isLoading: false,
        data: {
          id: '1',
          user: { id: '1', username: 'admin' },
          title: '',
          subtitle: '',
          img: '',
          views: 0,
          createdAt: '',
          type: [],
          blocks: [],
        },
      },
    }),
    RouterDecorator,
  ],
}
