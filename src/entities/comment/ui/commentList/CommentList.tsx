import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { CommentCard } from '../commentCard/CommentCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/stack'
import { Text } from '@/shared/ui/text/Text'
import type { Comment } from '../../model/types/comment'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
  const { className = '', isLoading, comments } = props
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <VStack gap={'16'}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    )
  }

  return (
    <VStack gap={'16'} max className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            comment={comment}
          />
        ))
      ) : (
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </VStack>
  )
})

CommentList.displayName = 'CommentList Component'
