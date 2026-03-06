import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className = '' }: ProfilePageProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames('', {}, [className])}>{t('PROFILE PAGE')}</div>
  )
}

export default ProfilePage
