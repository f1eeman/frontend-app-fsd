import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ForbiddenPage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/page'

export interface ForbiddenPageProps {
  className?: string
}

const ForbiddenPage = memo(({ className = '' }: ForbiddenPageProps) => {
  const { t } = useTranslation()

  return (
    <Page className={classNames(cls.ForbiddenPage, {}, [className])}>
      {t('У вас нет доступа к этой странице')}
    </Page>
  )
})

ForbiddenPage.displayName = 'ForbiddenPage'

export default ForbiddenPage
