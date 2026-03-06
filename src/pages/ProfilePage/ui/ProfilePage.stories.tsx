import ProfilePageComponent from './ProfilePage'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePageComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ProfilePageComponent>

export default meta

type Story = StoryObj<typeof meta>

export const ProfilePage: Story = {}
