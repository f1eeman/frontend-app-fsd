import { memo } from 'react'
import cls from './Skeleton.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { CSSProperties } from 'react'

interface SkeletonProps {
  className?: string
  height?: string | number
  width?: string | number
  border?: string
}

export const Skeleton = memo((props: SkeletonProps) => {
  const { className = '', height, width, border } = props

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  }

  return (
    <div className={classNames(cls.Skeleton, {}, [className])} style={styles} />
  )
})

Skeleton.displayName = 'Skeleton Component'
