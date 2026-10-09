import { ArticleRecommendationList } from './ArticleRecommendationList'
import { ArticleBlockType, ArticleType } from '@/entities/article'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { MockFetchDecorator } from '@/shared/lib/sb/decorators/MockFetch'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Article } from '@/entities/article'
import type { MockFetchRoute } from '@/shared/lib/sb/decorators/MockFetch'

const meta = {
  title: 'features/ArticleRecommendationList',
  component: ArticleRecommendationList,
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
} satisfies Meta<typeof ArticleRecommendationList>

export default meta
type Story = StoryObj<typeof meta>

const ARTICLES_URL = '/articles'
const NEVER_RESOLVES_MS = 1_000_000

const article: Article = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: AvatarImg,
  views: 1022,
  user: {
    id: '1',
    username: 'John',
    avatar: AvatarImg,
  },
  createdAt: '26.02.2022',
  type: [ArticleType.IT],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: ['Программа, которую по традиции называют «Hello, world!».'],
    },
  ],
}

const articles: Article[] = [
  article,
  { ...article, id: '2', title: 'Python news', views: 512 },
  { ...article, id: '3', title: 'Go news', views: 77 },
]

const withArticles = (route: MockFetchRoute) => [
  StoreDecorator({}),
  MockFetchDecorator({ [ARTICLES_URL]: route }),
]

export const Playground: Story = {
  decorators: withArticles({ body: articles }),
}

export const Normal: Story = {
  decorators: withArticles({ body: articles }),
}

export const Loading: Story = {
  decorators: withArticles({ body: articles, delayMs: NEVER_RESOLVES_MS }),
}

export const Empty: Story = {
  decorators: withArticles({ body: [] }),
}
