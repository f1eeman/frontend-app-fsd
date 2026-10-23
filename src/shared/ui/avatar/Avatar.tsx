import { useMemo } from 'react'
import cls from './Avatar.module.scss'
import UserIcon from '@/shared/assets/icons/user-filled.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppImage } from '@/shared/ui/appImage/AppImage'
import { Icon } from '@/shared/ui/icon/Icon'
import { Skeleton } from '@/shared/ui/skeleton/Skeleton'
import type { CSSProperties } from 'react'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
  fallbackInverted?: boolean
}

export const Avatar = ({
  className = '',
  src,
  size = 100,
  alt,
  fallbackInverted,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  )

  const fallback = (
    <Skeleton className={className} width={size} height={size} border='50%' />
  )
  const errorFallback = (
    <Icon
      className={className}
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={UserIcon}
    />
  )

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
    />
  )
}
