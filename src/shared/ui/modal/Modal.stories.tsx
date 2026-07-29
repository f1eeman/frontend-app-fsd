import { fn } from 'storybook/test'
import { Modal as ModalComponent } from './Modal'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Открыта ли модалка',
      table: { type: { summary: 'boolean' } },
    },
    children: {
      control: 'text',
      description: 'Содержимое модалки',
      table: { type: { summary: 'ReactNode' } },
    },
    lazy: {
      control: 'boolean',
      description: 'Не монтировать содержимое до первого открытия',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    elementId: {
      control: 'text',
      description: 'id DOM-узла, в который рендерится портал',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
    onClose: {
      control: false,
      description: 'Вызывается после анимации закрытия',
      table: { type: { summary: '() => void' } },
    },
    element: {
      control: false,
      description: 'DOM-узел для портала, приоритетнее elementId',
      table: { type: { summary: 'HTMLElement' } },
    },
  },
  args: {
    elementId: 'storybook-root',
    isOpen: true,
    lazy: false,
    children:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    onClose: fn(),
  },
} satisfies Meta<typeof ModalComponent>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Modal: Story = {}

export const Closed: Story = {
  args: {
    isOpen: false,
  },
}
