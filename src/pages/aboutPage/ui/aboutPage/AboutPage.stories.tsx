import AboutPage from './AboutPage'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

/** AboutPage не принимает пропсов — панель Controls для неё пуста */
const meta = {
  title: 'pages/AboutPage',
  component: AboutPage,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
} satisfies Meta<typeof AboutPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
