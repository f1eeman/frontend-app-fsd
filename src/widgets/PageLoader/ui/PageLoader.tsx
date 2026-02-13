import cls from './PageLoader.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { GridLoader } from '@/shared/ui/Loaders/Grid/GridLoader'
import type { FC } from 'react'

interface PageLoaderProps {
  className?: string
}

export const PageLoader: FC<PageLoaderProps> = ({ className = '' }) => (
  <div className={classNames(cls.pageLoader, {}, [className])}>
    <GridLoader />
  </div>
)
