import { ArticleForm } from './ArticleForm'
import { ArticleBlockType, ArticleType } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm',
  component: ArticleForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    articleId: {
      control: 'text',
      description:
        'id редактируемой статьи. Без него форма работает в режиме создания',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof ArticleForm>

export default meta
type Story = StoryObj<typeof meta>

const emptyForm = {
  articleForm: {
    formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
    isLoading: false,
  },
}

export const Create: Story = {
  decorators: [StoreDecorator(emptyForm)],
}

export const Edit: Story = {
  args: { articleId: '1' },
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: {
          title: 'My Article',
          subtitle: 'Subtitle here',
          img: 'https://example.com/img.jpg',
          type: [ArticleType.IT],
          blocks: [
            {
              id: '1',
              type: ArticleBlockType.TEXT,
              paragraphs: ['Hello world'],
              title: 'Intro',
            },
            { id: '2', type: ArticleBlockType.CODE, code: 'const x = 1' },
          ],
        },
        isLoading: false,
      },
    }),
  ],
}
