import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  selectProfileData,
  // selectProfileError,
  // selectIsLoading,
} from '../../model/slice/profileSlice'
import cls from './ProfileCard.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/button/Button'
import { buttonTheme } from '@/shared/ui/button/consts'
import { Input } from '@/shared/ui/input/Input'
import { Text } from '@/shared/ui/text/Text'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard = ({ className = '' }: ProfileCardProps) => {
  const { t } = useTranslation('profile')
  const data = useSelector(selectProfileData)
  // const isLoading = useSelector(selectIsLoading)
  // const error = useSelector(selectProfileError)

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль')} />
        <Button className={cls.editBtn} theme={buttonTheme.background}>
          {t('Редактировать')}
        </Button>
      </div>
      <div className={cls.data}>
        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
        />
      </div>
    </div>
  )
}
