import { fn } from 'storybook/test'
import { Page } from './Page'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Page',
  component: Page,
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    children: 'Page content',
  },
}

export const WithScrollCallback: Story = {
  args: {
    children: 'Page content',
    onScrollEnd: fn(),
  },
}
