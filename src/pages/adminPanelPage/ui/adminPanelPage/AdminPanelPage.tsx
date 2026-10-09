import { memo } from 'react'
import cls from './AdminPanelPage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

export interface AdminPanelPageProps {
  className?: string
}

const AdminPanelPage = memo(({ className = '' }: AdminPanelPageProps) => {
  return <div className={classNames(cls.AdminPanelPage, {}, [className])} />
})

AdminPanelPage.displayName = 'AdminPanelPage'

export default AdminPanelPage
