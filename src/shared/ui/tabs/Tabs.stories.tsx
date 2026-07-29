import { fn } from 'storybook/test'
import { Tabs } from './Tabs'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Список вкладок вида { value, content }',
      table: { type: { summary: 'TabItem[]' } },
    },
    value: {
      control: 'text',
      description: 'value активной вкладки',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onTabClick: {
      control: false,
      description: 'Обработчик клика по вкладке, получает TabItem',
      table: { type: { summary: '(tab: TabItem) => void' } },
    },
  },
  args: {
    tabs: [
      { value: 'tab 1', content: 'tab 1' },
      { value: 'tab 2', content: 'tab 2' },
      { value: 'tab 3', content: 'tab 3' },
    ],
    value: 'tab 2',
    onTabClick: fn(),
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const FirstSelected: Story = {
  args: {
    value: 'tab 1',
  },
}
