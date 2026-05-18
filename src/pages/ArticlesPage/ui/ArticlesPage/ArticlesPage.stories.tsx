import ArticlesPage from './ArticlesPage'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
} satisfies Meta<typeof ArticlesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
