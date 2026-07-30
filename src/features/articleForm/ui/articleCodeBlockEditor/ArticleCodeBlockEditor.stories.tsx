import { fn } from 'storybook/test'
import { ArticleCodeBlockEditor } from './ArticleCodeBlockEditor'
import { ArticleBlockType } from '@/entities/article'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm/ArticleCodeBlockEditor',
  component: ArticleCodeBlockEditor,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    block: {
      control: 'object',
      description: 'Редактируемый блок кода: id, type, code',
      table: { type: { summary: 'ArticleCodeBlock' } },
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
        type: { summary: '(changes: Partial<ArticleCodeBlock>) => void' },
      },
    },
  },
  args: {
    onChange: fn(),
    block: {
      id: '1',
      type: ArticleBlockType.CODE,
      code: 'const greeting = "Hello, world!"\nconsole.log(greeting)',
    },
  },
} satisfies Meta<typeof ArticleCodeBlockEditor>

export default meta
type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const Empty: Story = {
  args: {
    block: { id: '1', type: ArticleBlockType.CODE, code: '' },
  },
}
