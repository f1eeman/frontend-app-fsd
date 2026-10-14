import { memo } from 'react'
import cls from './Icon.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type React from 'react'

interface IconProps {
  className?: string
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
}

export const Icon = memo((props: IconProps) => {
  const { className = '', inverted = false, Svg } = props

  return (
    <Svg
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
        className,
      ])}
    />
  )
})

Icon.displayName = 'Icon Component'
