import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import {
  profileActions,
  selectProfileData,
  selectProfileReadonly,
} from '../../model/slices/profileSlice'
import { getUserAuthData } from '@/entities/user'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import { Button } from '@/shared/ui/button/Button'
import { buttonTheme } from '@/shared/ui/button/consts'
import { HStack } from '@/shared/ui/stack'
import { Text } from '@/shared/ui/text/Text'

interface ProfilePageHeaderProps {
  className?: string
}

export const EditableProfileCardHeader = (props: ProfilePageHeaderProps) => {
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
            <Button
              theme={buttonTheme.outline}
              onClick={onEdit}
              data-testid={'EditableProfileCardHeader.EditButton'}
            >
              {t('Редактировать')}
            </Button>
          ) : (
            <>
              <HStack gap={'8'}>
                <Button
                  theme={buttonTheme.outlineRed}
                  onClick={onCancelEdit}
                  data-testid={'EditableProfileCardHeader.CancelButton'}
                >
                  {t('Отменить')}
                </Button>
                <Button
                  theme={buttonTheme.background}
                  onClick={onSave}
                  data-testid={'EditableProfileCardHeader.SaveButton'}
                >
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
