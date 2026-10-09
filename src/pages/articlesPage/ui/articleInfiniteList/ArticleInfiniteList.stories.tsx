import { useState } from 'react'
import ArticleInfiniteList from './ArticleInfiniteList'
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { ComponentProps } from 'react'
import type { ArticlesPageSchema } from '../../model/types/articlesPageSchema'
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

const baseState: ArticlesPageSchema = {
  ids: [],
  entities: {},
  page: 1,
  hasMore: false,
  isLoading: false,
  view: ArticleView.SMALL,
  order: 'asc',
  sort: ArticleSortField.CREATED,
  search: '',
  type: ArticleType.ALL,
  _inited: true,
}

const filledState: ArticlesPageSchema = {
  ...baseState,
  ids: articles.map((a) => a.id),
  entities: Object.fromEntries(articles.map((a) => [a.id, a])),
}

const withArticlesPage = (articlesPage: ArticlesPageSchema) => [
  StoreDecorator({ articlesPage }),
]

const WithScrollParent = (
  props: ComponentProps<typeof ArticleInfiniteList>,
) => {
  const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null)

  return (
    <div ref={setScrollParent} style={{ height: '80vh', overflowY: 'auto' }}>
      <ArticleInfiniteList {...props} scrollParent={scrollParent} />
    </div>
  )
}

const meta = {
  title: 'pages/ArticlesPage/ArticleInfiniteList',
  component: ArticleInfiniteList,
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
    scrollParent: {
      control: false,
      description:
        'Скролл-контейнер страницы. Пока его нет, список не рендерится',
      table: { type: { summary: 'HTMLElement | null' } },
    },
  },
  args: {
    scrollParent: null,
  },
  render: (args) => <WithScrollParent {...args} />,
} satisfies Meta<typeof ArticleInfiniteList>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  decorators: withArticlesPage(filledState),
}

export const Normal: Story = {
  decorators: withArticlesPage(filledState),
}

export const BigView: Story = {
  decorators: withArticlesPage({ ...filledState, view: ArticleView.BIG }),
}

export const Loading: Story = {
  decorators: withArticlesPage({ ...filledState, isLoading: true }),
}

export const Empty: Story = {
  decorators: withArticlesPage(baseState),
}

export const Error: Story = {
  decorators: withArticlesPage({ ...baseState, error: 'Ошибка сети' }),
}
