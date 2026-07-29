import { type FC, useCallback, useState } from 'react'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../sidebar-item/SidebarItem'
import cls from './Sidebar.module.scss'
import { useAppSelector } from '@/app/store'
import { LangSwitcher } from '@/features/langSwitcher'
import { ThemeSwitcher } from '@/features/themeSwitcher'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui'
import { VStack } from '@/shared/ui/stack'

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
    <aside
      data-testid='sidebar'
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <VStack className={cls.content}>
        <VStack role='navigation' gap='16' className={cls.items}>
          {sidebarItemList.map((item) => (
            <SidebarItem item={item} collapsed={collapsed} key={item.path} />
          ))}
        </VStack>
        <div className={cls.switchers}>
          <ThemeSwitcher />
          <LangSwitcher short />
        </div>
      </VStack>
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
    </aside>
  )
}
