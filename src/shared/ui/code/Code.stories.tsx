import { Code } from './Code'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Code',
  component: Code,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Code>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
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
}
