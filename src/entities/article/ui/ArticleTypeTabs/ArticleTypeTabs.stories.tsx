import { fn } from 'storybook/test'
import { ArticleType } from '../../model/types/article'
import { ArticleTypeTabs } from './ArticleTypeTabs'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'entities/Article/ArticleTypeTabs',
  component: ArticleTypeTabs,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    value: {
      control: 'inline-radio',
      options: Object.values(ArticleType),
      description: 'Активный тип статей',
      table: { type: { summary: 'ArticleType' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onChangeType: {
      control: false,
      description: 'Вызывается при выборе типа',
      table: { type: { summary: '(type: ArticleType) => void' } },
    },
  },
  args: {
    value: ArticleType.ALL,
    onChangeType: fn(),
  },
} satisfies Meta<typeof ArticleTypeTabs>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const ItSelected: Story = {
  args: {
    value: ArticleType.IT,
  },
}
