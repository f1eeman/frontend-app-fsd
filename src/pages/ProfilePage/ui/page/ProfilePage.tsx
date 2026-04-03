import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ProfilePageHeader } from '../header/ProfilePageHeader'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { ProfileCard } from '@/entities/profile'
import {
  fetchProfileData,
  selectIsLoading,
  selectProfileForm,
  selectProfileError,
  selectProfileReadonly,
  selectProfileValidateErrors,
  profileActions,
  ValidateProfileError,
} from '@/features/editableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui'
import { TextTheme } from '@/shared/ui/text/consts'
import type { Country } from '@/entities/country'
import type { Currency } from '@/entities/currency'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className = '' }: ProfilePageProps) => {
  const { t } = useTranslation('profile')

  const dispatch = useAppDispatch()
  const formData = useAppSelector(selectProfileForm)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectProfileError)
  const readonly = useAppSelector(selectProfileReadonly)
  const validateErrors = useAppSelector(selectProfileValidateErrors)

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
  }

  const onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || '' }))
    },
    [dispatch],
  )

  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || '' }))
    },
    [dispatch],
  )

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }))
    },
    [dispatch],
  )

  const onChangeAge = useCallback(
    (value?: string) => {
      if (isNaN(Number(value))) return
      dispatch(profileActions.updateProfile({ age: Number(value) }))
    },
    [dispatch],
  )

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }))
    },
    [dispatch],
  )

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }))
    },
    [dispatch],
  )

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }))
    },
    [dispatch],
  )

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }))
    },
    [dispatch],
  )

  useEffect(() => {
    if (__PROJECT__ === 'sb') return

    const result = dispatch(fetchProfileData())
    return () => {
      result.abort()
    }
  }, [dispatch])

  return (
    <div className={classNames('', {}, [className])}>
      <ProfilePageHeader />
      {validateErrors.length > 0 &&
        validateErrors.map((err) => (
          <Text
            key={err}
            theme={TextTheme.ERROR}
            text={validateErrorTranslates[err]}
          />
        ))}
      <ProfileCard
        profile={formData}
        isLoading={isLoading}
        error={error}
        readonly={readonly}
        onChangeFirstname={onChangeFirstname}
        onChangeLastname={onChangeLastname}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeUsername={onChangeUsername}
        onChangeAvatar={onChangeAvatar}
        onChangeCurrency={onChangeCurrency}
        onChangeCountry={onChangeCountry}
      />
    </div>
  )
}

export default ProfilePage
