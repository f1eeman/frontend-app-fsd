import { fn } from 'storybook/test'
import { ArticleView } from '../../model/types/article'
import { ArticleViewSelector } from './ArticleViewSelector'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/Article/ArticleViewSelector',
  component: ArticleViewSelector,
  args: {
    onViewClick: fn(),
  },
} satisfies Meta<typeof ArticleViewSelector>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    view: ArticleView.SMALL,
  },
}

export const Big: Story = {
  args: {
    view: ArticleView.BIG,
  },
}
