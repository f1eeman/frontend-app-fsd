import AdminPanelPage from './AdminPanelPage'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/AdminPanelPage',
  component: AdminPanelPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof AdminPanelPage>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Normal: Story = {}
