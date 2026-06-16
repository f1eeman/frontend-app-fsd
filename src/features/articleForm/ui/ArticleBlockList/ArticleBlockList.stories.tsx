import { ArticleBlockList } from './ArticleBlockList'
import { ArticleBlockType } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm/ArticleBlockList',
  component: ArticleBlockList,
} satisfies Meta<typeof ArticleBlockList>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: {
          title: '',
          subtitle: '',
          img: '',
          type: [],
          blocks: [
            {
              id: '1',
              type: ArticleBlockType.TEXT,
              title: 'Заголовок',
              paragraphs: ['Параграф'],
            },
            { id: '2', type: ArticleBlockType.CODE, code: 'const x = 1' },
            {
              id: '3',
              type: ArticleBlockType.IMAGE,
              src: 'https://example.com/image.jpg',
              title: 'Подпись',
            },
          ],
        },
        isLoading: false,
      },
    }),
  ],
}

export const Empty: Story = {
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
        isLoading: false,
      },
    }),
  ],
}
