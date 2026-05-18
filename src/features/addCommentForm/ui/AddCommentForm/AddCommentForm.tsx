import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  selectText,
  selectError,
  addCommentFormActions,
} from '../../model/slices/addCommentFormSlice'
import cls from './AddCommentForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input, Button, buttonTheme } from '@/shared/ui'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className = '', onSendComment } = props
  const { t } = useTranslation()
  const text = useAppSelector(selectText)
  const _error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value))
    },
    [dispatch],
  )

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onCommentTextChange('')
  }, [onCommentTextChange, onSendComment, text])

  return (
    <div className={classNames(cls.AddCommentForm, {}, [className])}>
      <Input
        className={cls.input}
        placeholder={t('Введите текст комментария')}
        value={text}
        onChange={onCommentTextChange}
      />
      <Button theme={buttonTheme.outline} onClick={onSendHandler}>
        {t('Отправить')}
      </Button>
    </div>
  )
})

export default AddCommentForm

AddCommentForm.displayName = 'AddCommentForm Component'
