import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ProfilePageHeader.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  profileActions,
  selectProfileReadonly,
  updateProfileData,
} from '@/features/editableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, buttonTheme, Text } from '@/shared/ui'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className = '' } = props

  const { t } = useTranslation('profile')

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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />
      {readonly ? (
        <Button
          className={cls.editBtn}
          theme={buttonTheme.outline}
          onClick={onEdit}
        >
          {t('Редактировать')}
        </Button>
      ) : (
        <>
          <Button
            className={cls.editBtn}
            theme={buttonTheme.outlineRed}
            onClick={onCancelEdit}
          >
            {t('Отменить')}
          </Button>
          <Button
            className={cls.saveBtn}
            theme={buttonTheme.background}
            onClick={onSave}
          >
            {t('Сохранить')}
          </Button>
        </>
      )}
    </div>
  )
}
