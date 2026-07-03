import { Flex } from './Flex'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Flex',
  component: Flex,
  args: {
    children: (
      <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>fourth</div>
      </>
    ),
  },
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<typeof meta>

export const Row: Story = {
  args: {
    direction: 'row',
  },
}

export const RowGap4: Story = {
  args: {
    direction: 'row',
    gap: '4',
  },
}

export const RowGap8: Story = {
  args: {
    direction: 'row',
    gap: '8',
  },
}

export const RowGap16: Story = {
  args: {
    direction: 'row',
    gap: '16',
  },
}

export const RowGap32: Story = {
  args: {
    direction: 'row',
    gap: '32',
  },
}

export const Column: Story = {
  args: {
    direction: 'column',
  },
}

export const ColumnGap16: Story = {
  args: {
    direction: 'column',
    gap: '16',
  },
}

export const ColumnAlignEnd: Story = {
  args: {
    direction: 'column',
    align: 'end',
  },
}

export const JustifyBetween: Story = {
  args: {
    direction: 'row',
    justify: 'between',
    max: true,
  },
}
