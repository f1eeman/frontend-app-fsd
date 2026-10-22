import { memo } from 'react'
import cls from './Icon.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
}

export const Icon = memo((props: IconProps) => {
  const { className = '', inverted = false, Svg, ...otherProps } = props

  return (
    <Svg
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
        className,
      ])}
      {...otherProps}
    />
  )
})

Icon.displayName = 'Icon Component'
