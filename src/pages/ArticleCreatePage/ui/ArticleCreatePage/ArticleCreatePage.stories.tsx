import ArticleCreatePage from './ArticleCreatePage'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/ArticleCreatePage',
  component: ArticleCreatePage,
} satisfies Meta<typeof ArticleCreatePage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
        isLoading: false,
      },
    }),
  ],
}
