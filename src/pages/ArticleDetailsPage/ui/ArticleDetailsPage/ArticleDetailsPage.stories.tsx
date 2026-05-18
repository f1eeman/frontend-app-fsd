import { MemoryRouter, Route, Routes } from 'react-router'
import ArticleDetailsPage from './ArticleDetailsPage'
import {
  ArticleBlockType,
  ArticleType,
} from '@/entities/article/model/types/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5'
import type { Article } from '@/entities/article'
import type { Comment } from '@/entities/comment'

const ARTICLE_ROUTE_PATTERN = '/articles/:id'
const ARTICLE_ROUTE_ENTRY = '/articles/1'

const meta = {
  title: 'pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
} satisfies Meta<typeof ArticleDetailsPage>

export default meta
type Story = StoryObj<typeof meta>

const article: Article = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2026',
  type: [ArticleType.IT],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок',
      paragraphs: ['Текст параграфа.'],
    },
  ],
}

const comments: Comment[] = [
  {
    id: '1',
    text: 'Первый комментарий',
    user: { id: '1', username: 'admin' },
  },
  {
    id: '2',
    text: 'Второй комментарий',
    user: { id: '2', username: 'anton' },
  },
]

const RouteWithIdDecorator: Decorator = (Story) => (
  <MemoryRouter initialEntries={[ARTICLE_ROUTE_ENTRY]}>
    <Routes>
      <Route path={ARTICLE_ROUTE_PATTERN} element={<Story />} />
    </Routes>
  </MemoryRouter>
)

export const Normal: Story = {
  decorators: [
    RouteWithIdDecorator,
    StoreDecorator({
      user: { authData: { id: '42', username: 'admin' }, _inited: true },
      articleDetails: { isLoading: false, data: article },
      articleDetailsComments: {
        isLoading: false,
        ids: ['1', '2'],
        entities: { 1: comments[0], 2: comments[1] },
      },
    }),
  ],
}

export const NoArticle: Story = {
  decorators: [
    StoreDecorator({
      user: { authData: { id: '42', username: 'admin' }, _inited: true },
    }),
  ],
}
