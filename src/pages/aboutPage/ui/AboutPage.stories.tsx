import AboutPage from './AboutPage'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/AboutPage',
  component: AboutPage,
} satisfies Meta<typeof AboutPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
