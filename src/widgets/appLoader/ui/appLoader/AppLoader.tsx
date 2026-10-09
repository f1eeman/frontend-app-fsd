import cls from './AppLoader.module.scss'
import { RollerLoader } from '@/shared/ui/loaders/roller/RollerLoader'
import { HStack } from '@/shared/ui/stack'
import type { FC } from 'react'

export const AppLoader: FC = () => {
  return (
    <HStack justify='center' className={cls.appLoader}>
      <RollerLoader />
    </HStack>
  )
}
