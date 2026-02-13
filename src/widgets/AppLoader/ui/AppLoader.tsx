import cls from './AppLoader.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { RollerLoader } from '@/shared/ui/Loaders/Roller/RollerLoader'
import type { FC } from 'react'

export const AppLoader: FC = () => {
  return (
    <div className={classNames(`${cls.appLoader}`)}>
      <RollerLoader />
    </div>
  )
}
