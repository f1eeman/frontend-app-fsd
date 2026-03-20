import MainIcon from '@/shared/assets/icons/home.svg'
import AboutIcon from '@/shared/assets/icons/list.svg'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import { routesPaths } from '@/shared/config/routes'
import type React from 'react'

export interface SidebarItemModel {
  path: string
  text: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}

export const sidebarItemList: SidebarItemModel[] = [
  {
    path: routesPaths.root.path,
    Icon: MainIcon,
    text: 'Главная',
  },
  {
    path: routesPaths.about.path,
    Icon: AboutIcon,
    text: 'О сайте',
  },
  {
    path: routesPaths.profile.path,
    Icon: ProfileIcon,
    text: 'Профиль',
    authOnly: true,
  },
]
