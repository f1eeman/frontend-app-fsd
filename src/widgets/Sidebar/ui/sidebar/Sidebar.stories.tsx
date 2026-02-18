import { fn } from 'storybook/test'
import { Sidebar as SidebarComponent } from './Sidebar'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/Sidebar',
  component: SidebarComponent,
  args: { onClick: fn() },
} satisfies Meta<typeof SidebarComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Sidebar: Story = {}
