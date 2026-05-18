import { fn } from 'storybook/test'
import { Sidebar as SidebarComponent } from './Sidebar'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/Sidebar',
  component: SidebarComponent,
  args: { onClick: fn() },
} satisfies Meta<typeof SidebarComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Sidebar: Story = {
  decorators: [
    StoreDecorator({
      user: {
        authData: {
          id: '1',
          username: 'test',
        },
      },
    }),
  ],
}
export const SidebarNoAuth: Story = {
  decorators: [
    StoreDecorator({
      user: {},
    }),
  ],
}
