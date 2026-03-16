import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ProfilePageHeader } from '../profilePageHeader/ProfilePageHeader'
import { useAppDispatch } from '@/app/store'
import { ProfileCard } from '@/entities/profile'
import {
  fetchProfileData,
  selectIsLoading,
  selectProfileForm,
  selectProfileError,
  selectProfileReadonly,
  profileActions,
} from '@/features/editableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { Country } from '@/entities/country'
import type { Currency } from '@/entities/currency'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className = '' }: ProfilePageProps) => {
  const dispatch = useAppDispatch()
  const formData = useSelector(selectProfileForm)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectProfileError)
  const readonly = useSelector(selectProfileReadonly)

  useEffect(() => {
    const result = dispatch(fetchProfileData())
    return () => {
      result.abort()
    }
  }, [dispatch])

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

  return (
    <div className={classNames('', {}, [className])}>
      <ProfilePageHeader />
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
