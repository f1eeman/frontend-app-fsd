import { memo } from 'react'
import cls from './CommentCard.module.scss'
import { routesPaths } from '@/shared/config/routes'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui'
import { Avatar } from '@/shared/ui/avatar/Avatar'
import { Skeleton } from '@/shared/ui/skeleton/Skeleton'
import { Text } from '@/shared/ui/text/Text'
import type { Comment } from '../../model/types/comment'

interface CommentCardProps {
  className?: string
  comment: Comment
  isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className = '', comment, isLoading } = props

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width='100%' height={50} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink
        to={`${routesPaths.profile.path}${comment.user.id}`}
        className={cls.header}
      >
        {comment.user.avatar ? (
          <Avatar size={30} src={comment.user.avatar} />
        ) : null}
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </div>
  )
})

CommentCard.displayName = 'CommentCard Component'
