import { Flex } from './Flex'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Flex',
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: ['row', 'column'],
      description: 'Направление главной оси',
      table: {
        type: { summary: 'FlexDirection' },
        defaultValue: { summary: 'row' },
      },
    },
    justify: {
      control: 'inline-radio',
      options: ['start', 'center', 'end', 'between'],
      description: 'Раскладка по главной оси (justify-content)',
      table: {
        type: { summary: 'FlexJustify' },
        defaultValue: { summary: 'start' },
      },
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      description: 'Раскладка по поперечной оси (align-items)',
      table: {
        type: { summary: 'FlexAlign' },
        defaultValue: { summary: 'center' },
      },
    },
    gap: {
      control: 'inline-radio',
      options: ['4', '8', '16', '32'],
      description: 'Отступ между элементами в px',
      table: { type: { summary: 'FlexGap' } },
    },
    max: {
      control: 'boolean',
      description: 'Растянуть контейнер на всю ширину',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: false,
      description: 'Содержимое контейнера',
      table: { type: { summary: 'ReactNode' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    direction: 'row',
    justify: 'start',
    align: 'center',
    max: false,
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

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

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
