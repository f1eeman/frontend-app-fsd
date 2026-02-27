import { TextTheme } from './consts'
import { Text } from '@/shared/ui/Text/Text'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Text',
  component: Text,
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
}

export const Error: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.ERROR,
  },
}

export const OnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
}

export const OnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
}
