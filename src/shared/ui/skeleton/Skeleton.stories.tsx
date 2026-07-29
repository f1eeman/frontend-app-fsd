import { Skeleton } from './Skeleton'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    width: {
      control: 'text',
      description: 'Ширина. Число трактуется как px, строка — как CSS-значение',
      table: { type: { summary: 'string | number' } },
    },
    height: {
      control: 'text',
      description: 'Высота. Число трактуется как px, строка — как CSS-значение',
      table: { type: { summary: 'string | number' } },
    },
    border: {
      control: 'text',
      description: 'CSS border-radius, например 50% для круга',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    width: '100%',
    height: 200,
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const Circle: Story = {
  args: {
    border: '50%',
    width: 100,
    height: 100,
  },
}
