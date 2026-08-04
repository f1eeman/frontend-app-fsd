import { fn } from 'storybook/test'
import { ArticleTextBlockEditor } from './ArticleTextBlockEditor'
import { ArticleBlockType } from '@/entities/article'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm/ArticleTextBlockEditor',
  component: ArticleTextBlockEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    block: {
      control: 'object',
      description: 'Редактируемый текстовый блок: id, type, title, paragraphs',
      table: { type: { summary: 'ArticleTextBlock' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onChange: {
      control: false,
      description: 'Вызывается с изменёнными полями блока',
      table: {
        type: { summary: '(changes: Partial<ArticleTextBlock>) => void' },
      },
    },
  },
  args: {
    onChange: fn(),
    block: {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок блока',
      paragraphs: ['Первый параграф', 'Второй параграф'],
    },
  },
} satisfies Meta<typeof ArticleTextBlockEditor>

export default meta
type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const Empty: Story = {
  args: {
    block: {
      id: '1',
      type: ArticleBlockType.TEXT,
      paragraphs: [],
    },
  },
}
