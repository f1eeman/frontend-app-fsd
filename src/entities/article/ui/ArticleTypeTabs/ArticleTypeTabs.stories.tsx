import { fn } from 'storybook/test'
import { ArticleType } from '../../model/types/article'
import { ArticleTypeTabs } from './ArticleTypeTabs'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/Article/ArticleTypeTabs',
  component: ArticleTypeTabs,
  args: {
    onChangeType: fn(),
  },
} satisfies Meta<typeof ArticleTypeTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    value: ArticleType.ALL,
  },
}
