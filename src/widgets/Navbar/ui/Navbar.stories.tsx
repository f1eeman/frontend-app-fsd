import { Navbar as NavbarComponent } from './Navbar'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/Navbar',
  component: NavbarComponent,
  argTypes: {
    onClick: () => {},
  },
} satisfies Meta<typeof NavbarComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Navbar: Story = {}
