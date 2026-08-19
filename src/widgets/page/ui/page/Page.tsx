import { memo, useCallback, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import cls from './Page.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { getUIScrollByPath, uiActions } from '@/features/scrollSave'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import type { ReactNode, Ref, UIEvent } from 'react'
import type { RootState } from '@/app/store'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
  isLoading?: boolean
  ref?: Ref<HTMLElement | null>
}

export const Page = memo((props: PageProps) => {
  const { className = '', children, onScrollEnd, isLoading, ref } = props
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const scrollPosition = useAppSelector((state: RootState) =>
    getUIScrollByPath(state, pathname),
  )
  const wrapperRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  // Объединяем внутренний ref (для скролла/бесконечной подгрузки)
  // с внешним, чтобы родитель мог получить скролл-контейнер.
  // useCallback обязателен: при смене идентичности ref-колбэка React
  // отцепляет и заново прицепляет ref (element -> null -> element),
  // что дёргает состояние родителя и переинициализирует виртуализацию.
  const setWrapperRef = useCallback(
    (element: HTMLElement | null) => {
      wrapperRef.current = element
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    },
    [ref],
  )

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
    <main
      ref={setWrapperRef}
      onScroll={onScroll}
      className={classNames(cls.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </main>
  )
})

Page.displayName = 'Page Wrap Component'
