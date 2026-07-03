import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { getUserAuthData } from '@/entities/user'
import {
  profileActions,
  selectProfileData,
  selectProfileReadonly,
  updateProfileData,
} from '@/features/editableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, buttonTheme, Text } from '@/shared/ui'
import { HStack } from '@/shared/ui/stack'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className = '' } = props

  const { t } = useTranslation('profile')
  const authData = useAppSelector(getUserAuthData)
  const profileData = useAppSelector(selectProfileData)
  const canEdit = authData?.id === profileData?.id
  const readonly = useAppSelector(selectProfileReadonly)
  const dispatch = useAppDispatch()

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <HStack max justify={'between'} className={classNames('', {}, [className])}>
      <Text title={t('Профиль')} />
      {canEdit && (
        <>
          {readonly ? (
            <Button theme={buttonTheme.outline} onClick={onEdit}>
              {t('Редактировать')}
            </Button>
          ) : (
            <>
              <HStack gap={'8'}>
                <Button theme={buttonTheme.outlineRed} onClick={onCancelEdit}>
                  {t('Отменить')}
                </Button>
                <Button theme={buttonTheme.background} onClick={onSave}>
                  {t('Сохранить')}
                </Button>
              </HStack>
            </>
          )}
        </>
      )}
    </HStack>
  )
}
