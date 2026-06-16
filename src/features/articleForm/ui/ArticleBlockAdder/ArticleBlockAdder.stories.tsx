import { ArticleBlockAdder } from './ArticleBlockAdder'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm/ArticleBlockAdder',
  component: ArticleBlockAdder,
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
        isLoading: false,
      },
    }),
  ],
} satisfies Meta<typeof ArticleBlockAdder>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
