import { fn } from 'storybook/test'
import { ArticleView } from '../../model/types/article'
import { ArticleViewSelector } from './ArticleViewSelector'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/Article/ArticleViewSelector',
  component: ArticleViewSelector,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    view: {
      control: 'inline-radio',
      options: Object.values(ArticleView),
      description: 'Активный режим отображения списка',
      table: { type: { summary: 'ArticleView' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onViewClick: {
      control: false,
      description: 'Вызывается при выборе режима отображения',
      table: { type: { summary: '(view: ArticleView) => void' } },
    },
  },
  args: {
    view: ArticleView.SMALL,
    onViewClick: fn(),
  },
} satisfies Meta<typeof ArticleViewSelector>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const Big: Story = {
  args: {
    view: ArticleView.BIG,
  },
}
