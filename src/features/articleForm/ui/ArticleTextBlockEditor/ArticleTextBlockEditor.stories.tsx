import { ArticleTextBlockEditor } from './ArticleTextBlockEditor'
import { ArticleBlockType } from '@/entities/article'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm/ArticleTextBlockEditor',
  component: ArticleTextBlockEditor,
  args: { onChange: () => {} },
} satisfies Meta<typeof ArticleTextBlockEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    block: {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок блока',
      paragraphs: ['Первый параграф', 'Второй параграф'],
    },
  },
}

export const Empty: Story = {
  args: {
    block: {
      id: '1',
      type: ArticleBlockType.TEXT,
      paragraphs: [],
    },
  },
}
