import { classNames } from '@/shared/lib/classNames/classNames'
import type { FC } from 'react'
import './RollerLoader.scss'

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
