import { memo } from 'react'
import cls from './NotificationButton.module.scss'
import { NotificationList } from '@/entities/notification'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/icon/Icon'
import { Popover } from '@/shared/ui/popups'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className = '' } = props

  return (
    <Popover
      className={classNames(cls.NotificationButton, {}, [className])}
      direction='bottom left'
      trigger={<Icon Svg={NotificationIcon} inverted />}
    >
      <div className={cls.notifications}>
        <NotificationList />
      </div>
    </Popover>
  )
})

NotificationButton.displayName = 'NotificationButton Component'
