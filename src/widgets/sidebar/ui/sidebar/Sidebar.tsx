import { useCallback, useState } from 'react'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../sidebarItem/SidebarItem'
import cls from './Sidebar.module.scss'
import { LangSwitcher } from '@/features/langSwitcher'
import { ThemeSwitcher } from '@/features/themeSwitcher'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppSelector } from '@/shared/lib/store'
import { Button } from '@/shared/ui/button/Button'
import { HStack, VStack } from '@/shared/ui/stack'
import type { FC } from 'react'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC = ({ className = '' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemList = useAppSelector(getSidebarItems)
  const toggleCollapsed = useCallback(() => {
    setCollapsed((collapsed) => !collapsed)
  }, [])
  const Switchers = collapsed ? VStack : HStack

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
        <Switchers
          justify='center'
          align={collapsed ? 'center' : 'stretch'}
          max
          className={cls.switchers}
        >
          <ThemeSwitcher />
          <LangSwitcher short />
        </Switchers>
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
