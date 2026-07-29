import { fn } from 'storybook/test'
import { ArticleImageBlockEditor } from './ArticleImageBlockEditor'
import { ArticleBlockType } from '@/entities/article'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm/ArticleImageBlockEditor',
  component: ArticleImageBlockEditor,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    block: {
      control: 'object',
      description: 'Редактируемый блок изображения: id, type, src, title',
      table: { type: { summary: 'ArticleImageBlock' } },
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
        type: { summary: '(changes: Partial<ArticleImageBlock>) => void' },
      },
    },
  },
  args: {
    onChange: fn(),
    block: {
      id: '1',
      type: ArticleBlockType.IMAGE,
      src: 'https://example.com/image.jpg',
      title: 'Подпись к изображению',
    },
  },
} satisfies Meta<typeof ArticleImageBlockEditor>

export default meta
type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const Empty: Story = {
  args: {
    block: { id: '1', type: ArticleBlockType.IMAGE, src: '', title: '' },
  },
}
