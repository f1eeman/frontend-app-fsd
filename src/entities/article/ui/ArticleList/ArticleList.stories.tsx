import {
  ArticleBlockType,
  ArticleType,
  ArticleView,
} from '../../model/types/article'
import { ArticleList } from './ArticleList'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Article } from '../../model/types/article'

const meta = {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>

export default meta

type Story = StoryObj<typeof meta>

const article: Article = {
  id: '1',
  title: 'Javascript news asfasjf asfjkask f',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  user: {
    id: '1',
    username: 'Ulbi tv',
    avatar:
      'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
  },
  type: [ArticleType.IT, ArticleType.SCIENCE, ArticleType.ECONOMICS],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js.',
        'Существуют и другие способы запуска JS-кода в браузере.',
      ],
    },
    {
      id: '4',
      type: ArticleBlockType.CODE,
      code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
    },
    {
      id: '5',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста.',
        'Существуют и другие способы запуска JS-кода в браузере.',
      ],
    },
    {
      id: '2',
      type: ArticleBlockType.IMAGE,
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
    },
    {
      id: '3',
      type: ArticleBlockType.CODE,
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
    },
  ],
}

export const LoadingBig: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.BIG,
  },
}

export const LoadingSmall: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.SMALL,
  },
}

export const ListSmall: Story = {
  args: {
    articles: new Array(9).fill(0).map((_, index) => ({
      ...article,
      id: String(index),
    })),
    isLoading: false,
    view: ArticleView.SMALL,
  },
}

export const ListBig: Story = {
  args: {
    articles: new Array(9).fill(0).map((_, index) => ({
      ...article,
      id: String(index),
    })),
    isLoading: false,
    view: ArticleView.BIG,
  },
}
