import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './SidebarItem.module.scss'
import { useAppSelector } from '@/app/store'
import { getUserAuthData } from '@/entities/user'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from '@/shared/ui'
import type { SidebarItemModel } from '../../model/items'

interface SidebarItemProps {
  item: SidebarItemModel
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation()
  const isAuth = useAppSelector(getUserAuthData)

  if (item.authOnly && !isAuth) {
    return null
  }

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
    >
      <item.Icon className={cls.icon} />
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  )
})

SidebarItem.displayName = 'SidebarItem'
