import ArticlesPage from './ArticlesPage'
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Article } from '@/entities/article'

const article: Article = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: '',
  views: 1022,
  createdAt: '26.02.2022',
  type: [ArticleType.IT],
  user: { id: '1', username: 'admin' },
  blocks: [],
}

const articles = new Array(9).fill(0).map((_, index) => ({
  ...article,
  id: String(index + 1),
}))

const meta = {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  decorators: [
    StoreDecorator({
      articlesPage: {
        ids: articles.map((a) => a.id),
        entities: Object.fromEntries(articles.map((a) => [a.id, a])),
        page: 1,
        // hasMore: false — иначе IntersectionObserver на короткой странице
        // зациклит fetchNextArticlesPage и стори будет мерцать
        hasMore: false,
        isLoading: false,
        view: ArticleView.SMALL,
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
        _inited: true,
      },
    }),
  ],
} satisfies Meta<typeof ArticlesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
