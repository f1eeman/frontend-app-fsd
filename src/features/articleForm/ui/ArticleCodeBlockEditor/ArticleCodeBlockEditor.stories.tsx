import { ArticleCodeBlockEditor } from './ArticleCodeBlockEditor'
import { ArticleBlockType } from '@/entities/article'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm/ArticleCodeBlockEditor',
  component: ArticleCodeBlockEditor,
  args: { onChange: () => {} },
} satisfies Meta<typeof ArticleCodeBlockEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    block: {
      id: '1',
      type: ArticleBlockType.CODE,
      code: 'const greeting = "Hello, world!"\nconsole.log(greeting)',
    },
  },
}

export const Empty: Story = {
  args: {
    block: { id: '1', type: ArticleBlockType.CODE, code: '' },
  },
}
