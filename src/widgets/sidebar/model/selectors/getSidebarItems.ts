import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/user'
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg'
import MainIcon from '@/shared/assets/icons/home.svg'
import AboutIcon from '@/shared/assets/icons/list.svg'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import { routesPaths } from '@/shared/config/routes'
import type { SidebarItemType } from '../types/sidebar'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
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
  ]

  if (userData) {
    sidebarItemsList.push(
      {
        path: routesPaths.profile + userData.id,
        Icon: ProfileIcon,
        text: 'Профиль',
        authOnly: true,
      },
      {
        path: routesPaths.articles.path,
        Icon: ArticleIcon,
        text: 'Статьи',
        authOnly: true,
      },
    )
  }

  return sidebarItemsList
})
