import { AppImage } from './AppImage'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import { Skeleton } from '@/shared/ui/skeleton/Skeleton'
import { Text } from '@/shared/ui/text/Text'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/AppImage',
  component: AppImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Ссылка на изображение',
      table: { type: { summary: 'string' } },
    },
    alt: {
      control: 'text',
      description: 'Альтернативный текст изображения',
      table: { type: { summary: 'string' } },
    },
    fallback: {
      control: false,
      description: 'Что показать, пока изображение загружается',
      table: { type: { summary: 'ReactElement' } },
    },
    errorFallback: {
      control: false,
      description:
        'Что показать, если изображение не загрузилось или src не задан',
      table: { type: { summary: 'ReactElement' } },
    },
  },
  args: {
    src: AvatarImg,
    alt: 'Изображение',
    width: 200,
    height: 200,
  },
} satisfies Meta<typeof AppImage>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const WithFallbacks: Story = {
  args: {
    fallback: <Skeleton width={200} height={200} />,
    errorFallback: <Text text='Не удалось загрузить изображение' />,
  },
}

export const BrokenWithFallback: Story = {
  args: {
    src: 'broken-link.jpg',
    fallback: <Skeleton width={200} height={200} />,
    errorFallback: <Text text='Не удалось загрузить изображение' />,
  },
}

export const BrokenWithoutFallback: Story = {
  args: {
    src: 'broken-link.jpg',
  },
}
