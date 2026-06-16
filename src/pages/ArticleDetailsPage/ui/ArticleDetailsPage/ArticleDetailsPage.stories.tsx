import { MemoryRouter, Route, Routes } from 'react-router'
import ArticleDetailsPage from './ArticleDetailsPage'
import {
  ArticleBlockType,
  ArticleType,
} from '@/entities/article/model/types/article'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5'
import type { Article } from '@/entities/article'
import type { Comment } from '@/entities/comment'

const ARTICLE_ROUTE_PATTERN = '/articles/:id/'
const ARTICLE_ROUTE_ENTRY = '/articles/1/'

const meta = {
  title: 'pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
} satisfies Meta<typeof ArticleDetailsPage>

export default meta
type Story = StoryObj<typeof meta>

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
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
      ],
    },
    {
      id: '4',
      type: ArticleBlockType.CODE,
      code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
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
  parameters: { router: 'none' },
  decorators: [
    StoreDecorator({
      user: { authData: { id: '1', username: 'John' }, _inited: true },
      articleDetails: { isLoading: false, data: article },
      articleDetailsComments: {
        isLoading: false,
        ids: ['1', '2'],
        entities: { '1': comments[0], '2': comments[1] },
      },
      articleDetailsPageRecommendations: {
        isLoading: false,
        ids: [],
        entities: {},
      },
      addCommentForm: { text: '' },
    }),
    RouteWithIdDecorator,
  ],
}

export const NoArticle: Story = {
  parameters: { router: 'none' },
  decorators: [
    StoreDecorator({
      user: { authData: { id: '42', username: 'admin' }, _inited: true },
      articleDetails: { isLoading: false },
      articleDetailsPageRecommendations: {
        isLoading: false,
        ids: [],
        entities: {},
      },
      addCommentForm: { text: '' },
    }),
    RouteWithIdDecorator,
  ],
}
