import { classNames } from '@/shared/lib/classNames/classNames'
import type { FC } from 'react'
import './GridLoader.scss'

interface LoaderProps {
  className?: string
}

export const GridLoader: FC<LoaderProps> = ({ className = '' }) => (
  <div className={classNames(`lds-grid ${className}`)}>
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
