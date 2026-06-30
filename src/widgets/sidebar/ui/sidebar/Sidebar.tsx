import { type FC, useCallback, useState } from 'react'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../sidebar-item/SidebarItem'
import cls from './Sidebar.module.scss'
import { useAppSelector } from '@/app/store'
import { LangSwitcher } from '@/features/langSwitcher'
import { ThemeSwitcher } from '@/features/themeSwitcher'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC = ({ className = '' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemList = useAppSelector(getSidebarItems)
  const toggleCollapsed = useCallback(() => {
    setCollapsed((collapsed) => !collapsed)
  }, [])

  return (
    <div
      data-testid='sidebar'
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={cls.content}>
        <div className={cls.items}>
          {sidebarItemList.map((item) => (
            <SidebarItem item={item} collapsed={collapsed} key={item.path} />
          ))}
        </div>
        <div className={cls.switchers}>
          <ThemeSwitcher />
          <LangSwitcher short />
        </div>
      </div>
      <Button
        square
        theme={'background-inverted'}
        onClick={toggleCollapsed}
        data-testid='sidebar-toggle'
        className={cls.collapseBtn}
        size={'size-l'}
      >
        {`${collapsed ? '>' : '<'}`}
      </Button>
    </div>
  )
}
