import { Modal as ModalComponent } from './Modal'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Modal',
  component: ModalComponent,
  args: {
    elementId: 'storybook-root',
    isOpen: true,
    children:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    onClose: () => {},
  },
} satisfies Meta<typeof ModalComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Modal: Story = {}
