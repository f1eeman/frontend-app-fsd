import { fn } from 'storybook/test'
import { ArticleSortField } from '../../model/types/article'
import { ArticleSortSelector } from './ArticleSortSelector'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/Article/ArticleSortSelector',
  component: ArticleSortSelector,
  args: {
    onChangeOrder: fn(),
    onChangeSort: fn(),
  },
} satisfies Meta<typeof ArticleSortSelector>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    sort: ArticleSortField.CREATED,
    order: 'asc',
  },
}
