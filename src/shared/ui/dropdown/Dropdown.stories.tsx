import { fn } from 'storybook/test'
import { Dropdown as DropdownComponent } from './Dropdown'
import { Button } from '@/shared/ui/button/Button'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    trigger: {
      control: false,
      description: 'Элемент, по клику на который раскрывается меню',
      table: { type: { summary: 'ReactNode' } },
    },
    items: {
      control: 'object',
      description:
        'Список пунктов вида { content, onClick, href, disabled }; с href пункт рендерится ссылкой',
      table: { type: { summary: 'DropdownItem[]' } },
    },
    direction: {
      control: 'radio',
      options: ['top left', 'top right', 'bottom left', 'bottom right'],
      description: 'Направление раскрытия меню',
      table: {
        type: {
          summary: "'top left' | 'top right' | 'bottom left' | 'bottom right'",
        },
        defaultValue: { summary: 'bottom right' },
      },
    },
    className: {
      control: 'text',
      description: 'Внешний класс для композиции стилей',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    trigger: <Button>Открыть меню</Button>,
    items: [
      { content: 'Первый пункт', onClick: fn() },
      { content: 'Второй пункт', onClick: fn() },
      { content: 'Третий пункт', onClick: fn(), disabled: true },
    ],
    direction: 'bottom right',
  },
} satisfies Meta<typeof DropdownComponent>

export default meta

type Story = StoryObj<typeof meta>

/** Полностью настраиваемая песочница — крути любой проп в панели Controls */
export const Playground: Story = {}

export const Primary: Story = {}

export const WithLinks: Story = {
  args: {
    items: [
      { content: 'Профиль', href: '/profile' },
      { content: 'Статьи', href: '/articles' },
      { content: 'Выйти', onClick: fn() },
    ],
  },
}

export const DirectionTopRight: Story = {
  args: {
    direction: 'top right',
  },
}
