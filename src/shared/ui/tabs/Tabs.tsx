import { useCallback } from 'react'
import cls from './Tabs.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/card/Card'
import { CardTheme } from '@/shared/ui/card/consts'
import { HStack } from '@/shared/ui/stack'
import type { ReactNode } from 'react'

export interface TabItem<T extends string> {
  value: T
  content: ReactNode
}

interface TabsProps<T extends string> {
  className?: string
  tabs: TabItem<T>[]
  value: T
  onTabClick: (tab: TabItem<T>) => void
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const { className = '', tabs, onTabClick, value } = props

  const clickHandle = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab)
    },
    [onTabClick],
  )

  return (
    <HStack
      gap='8'
      align='stretch'
      className={classNames(cls.Tabs, {}, [className])}
    >
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cls.tab}
          key={tab.value}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </HStack>
  )
}
