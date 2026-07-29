import { AppLinkTheme } from './consts'
import { AppLink as AppLinkFC } from './Link'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Link',
  component: AppLinkFC,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Содержимое ссылки',
      table: { type: { summary: 'ReactNode' } },
    },
    to: {
      control: 'text',
      description: 'Путь роутинга (react-router)',
      table: { type: { summary: 'string' } },
    },
    theme: {
      control: 'inline-radio',
      options: Object.values(AppLinkTheme),
      description: 'Визуальная тема ссылки',
      table: {
        type: { summary: 'AppLinkTheme' },
        defaultValue: { summary: AppLinkTheme.PRIMARY },
      },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    children: 'Link',
    to: '/',
    theme: AppLinkTheme.PRIMARY,
  },
} satisfies Meta<typeof AppLinkFC>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const AppLink: Story = {}

export const Secondary: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
  },
}
