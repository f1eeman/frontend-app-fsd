import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import {
  getArticleDetailsData,
  selectIsLoading,
  selectError,
} from '../../model/slices/articleDetailsSlice'
import { ArticleBlockType } from '../../model/types/article'
import { ArticleCodeBlockComponent } from '../articleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../articleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../articleTextBlockComponent/ArticleTextBlockComponent'
import cls from './ArticleDetails.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/avatar/Avatar'
import { Icon } from '@/shared/ui/icon/Icon'
import { Skeleton } from '@/shared/ui/skeleton/Skeleton'
import { HStack, VStack } from '@/shared/ui/stack'
import { TextAlign, TextSize } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'
import type { ArticleBlock } from '../../model/types/article'

interface ArticleDetailsProps {
  className?: string
  id: string
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className = '', id } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const article = useAppSelector(getArticleDetailsData)
  const error = useAppSelector(selectError)

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        )
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        )
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        )
      default:
        return null
    }
  }, [])

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      dispatch(fetchArticleById(id))
    }
  }, [dispatch, id])

  let content

  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border='50%'
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
      </>
    )
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t('Произошла ошибка при загрузке статьи.')}
      />
    )
  } else {
    content = (
      <>
        <HStack justify={'center'} max>
          <Avatar size={200} src={article?.img} className={cls.avatar} />
        </HStack>
        <VStack gap={'4'}>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <HStack gap={'8'}>
            <Icon className={cls.icon} Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap={'8'}>
            <Icon className={cls.icon} Svg={CalendarIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>

        {article?.blocks.map(renderBlock)}
      </>
    )
  }

  return (
    <VStack
      gap={'16'}
      className={classNames(cls.ArticleDetails, {}, [className])}
    >
      {content}
    </VStack>
  )
})

ArticleDetails.displayName = 'ArticleDetails Component'
