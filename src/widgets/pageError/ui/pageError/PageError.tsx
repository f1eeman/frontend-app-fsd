import { useTranslation } from 'react-i18next'
import cls from './PageError.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/button/Button'
import { VStack } from '@/shared/ui/stack'

interface Props {
  className?: string
}

export const PageError = ({ className = '' }: Props) => {
  const { t } = useTranslation()

  const reloadPage = () => {
    location.reload()
  }

  return (
    <VStack
      justify='center'
      align='center'
      max
      className={classNames(cls.pageError, {}, [className])}
    >
      <p>{t('Произошла непредвиденная ошибка')}</p>
      <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
    </VStack>
  )
}
