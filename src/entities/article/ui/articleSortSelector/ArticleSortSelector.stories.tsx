import { fn } from 'storybook/test'
import { ArticleSortField } from '../../model/types/article'
import { ArticleSortSelector } from './ArticleSortSelector'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/Article/ArticleSortSelector',
  component: ArticleSortSelector,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    sort: {
      control: 'inline-radio',
      options: Object.values(ArticleSortField),
      description: 'Поле, по которому сортируется список',
      table: { type: { summary: 'ArticleSortField' } },
    },
    order: {
      control: 'inline-radio',
      options: ['asc', 'desc'],
      description: 'Направление сортировки',
      table: { type: { summary: 'SortOrder' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onChangeSort: {
      control: false,
      description: 'Вызывается при смене поля сортировки',
      table: { type: { summary: '(sort: ArticleSortField) => void' } },
    },
    onChangeOrder: {
      control: false,
      description: 'Вызывается при смене направления сортировки',
      table: { type: { summary: '(order: SortOrder) => void' } },
    },
  },
  args: {
    sort: ArticleSortField.CREATED,
    order: 'asc',
    onChangeOrder: fn(),
    onChangeSort: fn(),
  },
} satisfies Meta<typeof ArticleSortSelector>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const SortByViewsDesc: Story = {
  args: {
    sort: ArticleSortField.VIEWS,
    order: 'desc',
  },
}
