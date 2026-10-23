import ArticleRating from './ArticleRating'
import { userRole } from '@/entities/user'
import { MockFetchDecorator } from '@/shared/lib/sb/decorators/MockFetch'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Rating } from '@/entities/rating'
import type { MockFetchRoute } from '@/shared/lib/sb/decorators/MockFetch'

const meta = {
  title: 'features/ArticleRating',
  component: ArticleRating,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    articleId: {
      control: 'text',
      description: 'id статьи, которую оценивают',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    articleId: '1',
  },
} satisfies Meta<typeof ArticleRating>

export default meta

type Story = StoryObj<typeof meta>

const RATINGS_URL = '/article-ratings'
const NEVER_RESOLVES_MS = 1_000_000

const withRatings = (route: MockFetchRoute) => [
  StoreDecorator({
    user: {
      authData: { id: '1', username: 'johndoe', role: userRole.USER },
    },
  }),
  MockFetchDecorator({ [RATINGS_URL]: route }),
]

const rated: Rating[] = [{ rate: 4 }]

export const Normal: Story = {
  decorators: withRatings({ body: [] }),
}

export const Rated: Story = {
  decorators: withRatings({ body: rated }),
}

export const Loading: Story = {
  decorators: withRatings({ body: [], delayMs: NEVER_RESOLVES_MS }),
}
