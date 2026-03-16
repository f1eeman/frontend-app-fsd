import { useTranslation } from 'react-i18next'
import cls from './ProfileCard.module.scss'
import { CountrySelect } from '@/entities/country'
import { CurrencySelect } from '@/entities/currency'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar, SpinnerLoader } from '@/shared/ui'
import { Input } from '@/shared/ui/input/Input'
import { TextAlign, TextTheme } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'
import type { FC } from 'react'
import type { Profile } from '../../../../features/editableProfileCard/model/types/profile'
import type { Country } from '@/entities/country'
import type { Currency } from '@/entities/currency'
import type { Mods } from '@/shared/lib/classNames/classNames'

interface ProfileCardProps {
  className?: string
  profile: Profile
  error: string | null
  isLoading?: boolean
  readonly?: boolean
  onChangeLastname?: (value?: string) => void
  onChangeFirstname?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCountry?: (country: Country) => void
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const {
    className = '',
    profile,
    isLoading,
    error,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <SpinnerLoader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </div>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {profile?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={profile?.avatar} />
          </div>
        )}
        <Input
          value={profile?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
          onChange={onChangeFirstname}
          readonly={readonly}
        />
        <Input
          value={profile?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
          onChange={onChangeLastname}
          readonly={readonly}
        />
        <Input
          value={profile?.age}
          placeholder={t('Ваш возраст')}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
          type='number'
        />
        <Input
          value={profile?.city}
          placeholder={t('Город')}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={profile?.username}
          placeholder={t('Введите имя пользователя')}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          value={profile?.avatar}
          placeholder={t('Введите ссылку на аватар')}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect
          className={cls.input}
          value={profile?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          className={cls.input}
          value={profile?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  )
}
