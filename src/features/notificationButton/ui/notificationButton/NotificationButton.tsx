import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import cls from './NotificationButton.module.scss'
import { NotificationList } from '@/entities/notification'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/button/Button'
import { Drawer } from '@/shared/ui/drawer/Drawer'
import { Icon } from '@/shared/ui/icon/Icon'
import { Popover } from '@/shared/ui/popups'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className = '' } = props
  const [isOpen, setIsOpen] = useState(false)

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const trigger = <Icon Svg={NotificationIcon} inverted />

  return (
    <div className={classNames(cls.NotificationButton, {}, [className])}>
      <BrowserView>
        <Popover direction='bottom left' trigger={trigger}>
          <div className={cls.notifications}>
            <NotificationList />
          </div>
        </Popover>
      </BrowserView>
      <MobileView>
        <Button onClick={onOpenDrawer}>{trigger}</Button>
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  )
})

NotificationButton.displayName = 'NotificationButton Component'
