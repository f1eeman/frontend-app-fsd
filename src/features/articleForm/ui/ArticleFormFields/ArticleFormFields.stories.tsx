import { ArticleFormFields } from './ArticleFormFields'
import { ArticleType } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm/ArticleFormFields',
  component: ArticleFormFields,
} satisfies Meta<typeof ArticleFormFields>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: {
          title: 'Заголовок',
          subtitle: 'Подзаголовок',
          img: 'https://example.com/cover.jpg',
          type: [ArticleType.IT],
          blocks: [],
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
