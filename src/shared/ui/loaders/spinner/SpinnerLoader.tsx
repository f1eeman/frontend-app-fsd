import { classNames } from '@/shared/lib/classNames/classNames'
import type { FC } from 'react'
import './SpinnerLoader.scss'

interface LoaderProps {
  className?: string
}

export const SpinnerLoader: FC<LoaderProps> = ({ className = '' }) => (
  <div className={classNames(`lds-spinner ${className}`)}>
    <div />
    <div />
    <div />
    <div />
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
