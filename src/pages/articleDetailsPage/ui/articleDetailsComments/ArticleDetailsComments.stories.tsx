import ArticleDetailsComments from './ArticleDetailsComments'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { RootState } from '@/app/store'
import type { Comment } from '@/entities/comment'
import type { DeepPartial } from '@/shared/types'

/**
 * Загрузка комментариев в компоненте отключена гардом `__PROJECT__ === 'sb'`,
 * поэтому данные приходят только из StoreDecorator. Роутер берём дефолтный из
 * preview.ts — CommentCard ведёт ссылкой на профиль автора.
 */
const meta = {
  title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
  component: ArticleDetailsComments,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Идентификатор статьи, для которой грузятся комментарии',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    id: '1',
  },
} satisfies Meta<typeof ArticleDetailsComments>

export default meta
type Story = StoryObj<typeof meta>

const comments: Comment[] = [
  {
    id: '1',
    text: 'Первый комментарий',
    user: { id: '1', username: 'admin', avatar: AvatarImg },
  },
  {
    id: '2',
    text: 'Второй комментарий',
    user: { id: '2', username: 'anton', avatar: AvatarImg },
  },
]

const authData = { id: '1', username: 'admin' }

const filledComments = {
  isLoading: false,
  ids: ['1', '2'],
  entities: { '1': comments[0], '2': comments[1] },
}

const withComments = (
  articleDetailsComments: DeepPartial<RootState>['articleDetailsComments'],
) => [
  StoreDecorator({
    user: { authData, _inited: true },
    articleDetailsComments,
    addCommentForm: { text: '' },
  }),
]

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {
  decorators: withComments(filledComments),
}

export const Normal: Story = {
  decorators: withComments(filledComments),
}

export const Loading: Story = {
  decorators: withComments({ isLoading: true, ids: [], entities: {} }),
}

export const Empty: Story = {
  decorators: withComments({ isLoading: false, ids: [], entities: {} }),
}
