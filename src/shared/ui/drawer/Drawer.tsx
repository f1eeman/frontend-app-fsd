import { memo, useCallback, useEffect } from 'react'
import cls from './Drawer.module.scss'
import {
  AnimationProvider,
  useAnimationLibs,
} from '@/shared/lib/animationProvider'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useEscapeKey } from '@/shared/lib/hooks/useEscapeKey/useEscapeKey'
import { Overlay } from '@/shared/ui/overlay/Overlay'
import { Portal } from '@/shared/ui/portal/Portal'
import type * as SpringLib from '@react-spring/web'
import type * as GestureLib from '@use-gesture/react'
import type { ReactNode } from 'react'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

interface DrawerContentProps extends DrawerProps {
  Spring: typeof SpringLib
  Gesture: typeof GestureLib
}

const SHEET_HEIGHT_RATIO = 0.7

const DrawerContent = (props: DrawerContentProps) => {
  const {
    className = '',
    children,
    isOpen = false,
    onClose,
    Spring,
    Gesture,
  } = props
  const height = window.innerHeight * SHEET_HEIGHT_RATIO
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }))

  const open = useCallback(() => {
    api.start({ y: 0, immediate: false })
  }, [api])

  const close = useCallback(() => {
    api.start({
      y: height,
      immediate: false,
      config: Spring.config.stiff,
      onResolve: (result) => {
        if (result.finished) {
          onClose?.()
        }
      },
    })
  }, [api, height, onClose, Spring])

  useEffect(() => {
    if (isOpen) {
      open()
    }
  }, [isOpen, open])

  useEscapeKey(isOpen, close)

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
    }) => {
      if (my < -70) {
        cancel()
      }

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close()
        } else {
          open()
        }
      } else {
        api.start({ y: my, immediate: true })
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  )

  if (!isOpen) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(cls.Drawer, {}, [className])}>
        <Overlay onClick={close} />
        <Spring.a.div className={cls.sheet} style={{ height, y }} {...bind()}>
          <div className={cls.content}>{children}</div>
        </Spring.a.div>
      </div>
    </Portal>
  )
}

const DrawerAsync = (props: DrawerProps) => {
  const libs = useAnimationLibs()

  if (!libs.isLoaded) {
    return null
  }

  return (
    <DrawerContent {...props} Spring={libs.Spring} Gesture={libs.Gesture} />
  )
}

export const Drawer = memo((props: DrawerProps) => (
  <AnimationProvider>
    <DrawerAsync {...props} />
  </AnimationProvider>
))

Drawer.displayName = 'Drawer Component'
