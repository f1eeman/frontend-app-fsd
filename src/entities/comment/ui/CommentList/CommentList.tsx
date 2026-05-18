import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { CommentCard } from '../CommentCard/CommentCard'
import cls from './CommentList.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text2 } from '@/shared/ui/text2/Text2'
import type { Comment } from '../../model/types/comment'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
  const { className = '', isLoading, comments } = props
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            className={cls.comment}
            comment={comment}
          />
        ))
      ) : (
        <Text2 text={t('Комментарии отсутствуют')} />
      )}
    </div>
  )
})

CommentList.displayName = 'CommentList Component'
