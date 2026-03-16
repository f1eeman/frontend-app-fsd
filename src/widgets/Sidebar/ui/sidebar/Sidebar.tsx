import { type FC, useCallback, useState } from 'react'
import { sidebarItemList } from '../../model/items'
import { SidebarItem } from '../sidebar-item/SidebarItem'
import cls from './Sidebar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui'
import { LangSwitcher } from '@/widgets/langSwticher'
import { ThemeSwitcher } from '@/widgets/themeSwitcher'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC = ({ className = '' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
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
  )
}
