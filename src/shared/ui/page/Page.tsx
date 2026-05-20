import { memo, useRef } from 'react'
import cls from './Page.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import type { ReactNode } from 'react'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
  isLoading?: boolean
}

export const Page = memo((props: PageProps) => {
  const { className = '', children, onScrollEnd, isLoading } = props
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
    isLoading,
  })

  return (
    <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
      {children}
      <div ref={triggerRef} />
    </section>
  )
})

Page.displayName = 'Page Wrap Component'
