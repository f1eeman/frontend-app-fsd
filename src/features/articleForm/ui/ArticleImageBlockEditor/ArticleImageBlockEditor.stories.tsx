import { ArticleImageBlockEditor } from './ArticleImageBlockEditor'
import { ArticleBlockType } from '@/entities/article'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm/ArticleImageBlockEditor',
  component: ArticleImageBlockEditor,
  args: { onChange: () => {} },
} satisfies Meta<typeof ArticleImageBlockEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    block: {
      id: '1',
      type: ArticleBlockType.IMAGE,
      src: 'https://example.com/image.jpg',
      title: 'Подпись к изображению',
    },
  },
}

export const Empty: Story = {
  args: {
    block: { id: '1', type: ArticleBlockType.IMAGE, src: '', title: '' },
  },
}
