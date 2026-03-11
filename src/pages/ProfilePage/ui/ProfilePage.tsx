import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/store'
import { fetchProfileData, ProfileCard } from '@/entities/profile'
import { classNames } from '@/shared/lib/classNames/classNames'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className = '' }: ProfilePageProps) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(fetchProfileData())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  return (
    <div className={classNames('', {}, [className])}>
      {t('PROFILE PAGE')}
      <ProfileCard />
    </div>
  )
}

export default ProfilePage
