import { Avatar as AvatarComponent } from './Avatar'
import AvatarImg from '@/shared/assets/tests/avatar.jpg'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'shared/Avatar',
  component: AvatarComponent,
} satisfies Meta<typeof AvatarComponent>

export default meta

export const Primary: StoryObj<typeof meta> = {
  args: {
    size: 150,
    src: AvatarImg,
  },
}

export const Small: StoryObj<typeof meta> = {
  args: {
    size: 50,
    src: AvatarImg,
  },
}
