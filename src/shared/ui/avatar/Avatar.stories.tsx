import { Avatar as AvatarComponent } from './Avatar'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Avatar',
  component: AvatarComponent,
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
    size: {
      control: { type: 'range', min: 20, max: 300, step: 10 },
      description: 'Размер аватара в px (ширина и высота)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    alt: {
      control: 'text',
      description: 'Альтернативный текст изображения',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    src: AvatarImg,
    size: 150,
    alt: 'Аватар пользователя',
  },
} satisfies Meta<typeof AvatarComponent>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Primary: Story = {}

export const Small: Story = {
  args: {
    size: 50,
  },
}

export const BrokenImage: Story = {
  args: {
    src: 'broken-link.jpg',
  },
}
