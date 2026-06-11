import { memo, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import cls from './Page.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { getUIScrollByPath, uiActions } from '@/features/scrollSave'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import type { ReactNode, UIEvent } from 'react'
import type { RootState } from '@/app/store'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
  isLoading?: boolean
}

export const Page = memo((props: PageProps) => {
  const { className = '', children, onScrollEnd, isLoading } = props
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const scrollPosition = useAppSelector((state: RootState) =>
    getUIScrollByPath(state, pathname),
  )
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
    isLoading,
  })

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      if (wrapperRef.current) {
        wrapperRef.current.scrollTop = scrollPosition
      }
    }
  }, [])

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      uiActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      }),
    )
  }, 500)

  return (
    <section
      ref={wrapperRef}
      onScroll={onScroll}
      className={classNames(cls.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  )
})

Page.displayName = 'Page Wrap Component'
