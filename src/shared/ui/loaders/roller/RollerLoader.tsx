import { classNames } from '@/shared/lib/classNames/classNames'
import './RollerLoader.scss'
import type { FC } from 'react'

interface LoaderProps {
  className?: string
}

export const RollerLoader: FC<LoaderProps> = ({ className = '' }) => (
  <div className={classNames(`lds-roller ${className}`)}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
)
