import cls from './PageLoader.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { GridLoader } from '@/shared/ui/loaders/grid/GridLoader'
import { HStack } from '@/shared/ui/stack'
import type { FC } from 'react'

interface PageLoaderProps {
  className?: string
}

export const PageLoader: FC<PageLoaderProps> = ({ className = '' }) => (
  <HStack
    justify='center'
    className={classNames(cls.pageLoader, {}, [className])}
  >
    <GridLoader />
  </HStack>
)
