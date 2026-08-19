import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import {
  EditableProfileCard,
  EditableProfileCardHeader,
} from '@/features/editableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui'
import { VStack } from '@/shared/ui/stack'
import { TextTheme } from '@/shared/ui/text/consts'
import { Page } from '@/widgets/page'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className = '' }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation('profile')

  if (!id) {
    return <Text theme={TextTheme.ERROR} text={t('Профиль не найден')} />
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap={'16'} max>
        <EditableProfileCardHeader />
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  )
}

export default ProfilePage
