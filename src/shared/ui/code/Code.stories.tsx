import { Code } from './Code'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Code',
  component: Code,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст кода. Переносы строк сохраняются как есть',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    text:
      'export default {\n' +
      "    title: 'shared/code',\n" +
      '    component: code,\n' +
      '    argTypes: {\n' +
      "        backgroundColor: { control: 'color' },\n" +
      '    },\n' +
      '} as ComponentMeta<typeof code>;\n' +
      '\n' +
      'const Template: ComponentStory<typeof code> = (args) => <code {...args} />;\n' +
      '\n' +
      'export const Normal = Template.bind({});',
  },
} satisfies Meta<typeof Code>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Normal: Story = {}

export const SingleLine: Story = {
  args: {
    text: 'npm install --save-dev @storybook/react-webpack5',
  },
}
