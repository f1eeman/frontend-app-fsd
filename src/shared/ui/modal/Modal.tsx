import { useTranslation } from 'react-i18next'
import cls from './Modal.module.scss'
import CloseIcon from '@/shared/assets/icons/close-14-14.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Button } from '@/shared/ui/button/Button'
import { Icon } from '@/shared/ui/icon/Icon'
import { Overlay } from '@/shared/ui/overlay/Overlay'
import { Portal, type PortalProps } from '@/shared/ui/portal/Portal'
import type { FC, ReactNode } from 'react'

interface ModalProps extends Pick<PortalProps, 'elementId' | 'element'> {
  className?: string
  children: ReactNode
  isOpen: boolean
  onClose: VoidFunction
  lazy?: boolean
}

const ANIMATION_DURATION = 300

export const Modal: FC<ModalProps> = (props) => {
  const {
    children,
    className = '',
    isOpen,
    onClose,
    element,
    elementId,
    lazy = false,
  } = props
  const { t } = useTranslation()

  const { isClosing, isMounted, close } = useModal({
    isOpen,
    onClose,
    animationDelay: ANIMATION_DURATION,
  })

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal element={element} elementId={elementId}>
      <div
        className={classNames(
          cls.modal,
          {
            [cls.opened]: isOpen || isClosing,
            [cls.closed]: isClosing,
          },
          [className],
        )}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>
          <Button
            className={cls.closeButton}
            aria-label={t('Закрыть')}
            onClick={close}
          >
            <Icon Svg={CloseIcon} />
          </Button>
          {children}
        </div>
      </div>
    </Portal>
  )
}
