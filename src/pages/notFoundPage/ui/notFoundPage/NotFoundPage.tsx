import { useTranslation } from 'react-i18next'
import cls from './NotFoundPage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/page'

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage = ({ className = '' }: NotFoundPageProps) => {
  const { t } = useTranslation()
  return (
    <Page className={classNames(cls.notFoundPage, {}, [className])}>
      {t('Страница не найдена')}
    </Page>
  )
}
