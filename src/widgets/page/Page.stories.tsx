import { fn } from 'storybook/test'
import { Page } from './Page'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Page',
  component: Page,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Содержимое страницы',
      table: { type: { summary: 'ReactNode' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Показать индикатор подгрузки',
      table: { type: { summary: 'boolean' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onScrollEnd: {
      control: false,
      description: 'Вызывается при достижении конца страницы',
      table: { type: { summary: '() => void' } },
    },
  },
  args: {
    children: 'Page content',
    isLoading: false,
  },
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const WithScrollCallback: Story = {
  args: {
    onScrollEnd: fn(),
  },
}
