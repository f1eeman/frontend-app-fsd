import { AppLink as AppLinkFC } from './Link'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Link',
  component: AppLinkFC,
  args: {
    children: 'Link',
    to: '/',
  },
} satisfies Meta<typeof AppLinkFC>

export default meta

type Story = StoryObj<typeof meta>

export const AppLink: Story = {}
