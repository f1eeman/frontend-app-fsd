import { ArticleForm } from './ArticleForm'
import { ArticleBlockType, ArticleType } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm',
  component: ArticleForm,
} satisfies Meta<typeof ArticleForm>

export default meta
type Story = StoryObj<typeof meta>

const emptyForm = {
  articleForm: {
    formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
    isLoading: false,
  },
}

export const Create: Story = {
  decorators: [StoreDecorator(emptyForm)],
}

export const Edit: Story = {
  args: { articleId: '1' },
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: {
          title: 'My Article',
          subtitle: 'Subtitle here',
          img: 'https://example.com/img.jpg',
          type: [ArticleType.IT],
          blocks: [
            {
              id: '1',
              type: ArticleBlockType.TEXT,
              paragraphs: ['Hello world'],
              title: 'Intro',
            },
            { id: '2', type: ArticleBlockType.CODE, code: 'const x = 1' },
          ],
        },
        isLoading: false,
      },
    }),
  ],
}

export const WithValidationError: Story = {
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
        isLoading: false,
        validateError: 'Заголовок обязателен',
      },
    }),
  ],
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: {
          title: 'My Article',
          subtitle: '',
          img: '',
          type: [],
          blocks: [],
        },
        isLoading: true,
      },
    }),
  ],
}
