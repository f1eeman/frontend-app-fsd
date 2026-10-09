import { memo } from 'react'
import { ArticleView } from '../../model/types/article'
import cls from './ArticleListItem.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/card/Card'
import { Skeleton } from '@/shared/ui/skeleton/Skeleton'
import { HStack } from '@/shared/ui/stack'

interface ArticleListItemSkeletonProps {
  className?: string
  view: ArticleView
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className = '', view } = props

    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Card className={cls.card}>
            <HStack>
              <Skeleton border='50%' height={30} width={30} />
              <Skeleton width={150} height={16} className={cls.username} />
              <Skeleton width={150} height={16} className={cls.date} />
            </HStack>
            <Skeleton width={250} height={24} className={cls.title} />
            <Skeleton height={200} className={cls.img} />
            <HStack className={cls.footer}>
              <Skeleton height={36} width={200} />
            </HStack>
          </Card>
        </div>
      )
    }

    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <Skeleton width={200} height={200} className={cls.img} />
          </div>
          <HStack className={cls.infoWrapper}>
            <Skeleton width={130} height={16} />
          </HStack>
          <Skeleton width={150} height={16} className={cls.title} />
        </Card>
      </div>
    )
  },
)

ArticleListItemSkeleton.displayName = 'ArticleListItemSkeleton Component'
