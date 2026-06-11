import { ArticlesPageFilters } from './ArticlesPageFilters'
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/Article/ArticlesPageFilters',
  component: ArticlesPageFilters,
  decorators: [
    StoreDecorator({
      articlesPage: {
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
        view: ArticleView.SMALL,
        order: 'asc',
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
        _inited: true,
      },
    }),
  ],
} satisfies Meta<typeof ArticlesPageFilters>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {}
