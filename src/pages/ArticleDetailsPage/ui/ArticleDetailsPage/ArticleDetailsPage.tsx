import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import {
  getArticleComments,
  selectIsLoading,
} from '../../model/slices/articleDetailsCommentsSlice'
import {
  getArticleRecommendations,
  selectIsLoading as selectRecommendationsLoading,
} from '../../model/slices/articleDetailsPageRecommendationsSlice'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import cls from './ArticleDetailsPage.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { ArticleDetails, ArticleList } from '@/entities/article'
import { CommentList } from '@/entities/comment'
import { AddCommentForm } from '@/features/addCommentForm'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TextSize } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'
import { Page } from '@/widgets/page'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className = '' } = props
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const comments = useAppSelector(getArticleComments.selectAll)
  const recommendations = useAppSelector(getArticleRecommendations.selectAll)
  const commentsIsLoading = useAppSelector(selectIsLoading)
  const recommendationsIsLoading = useAppSelector(selectRecommendationsLoading)

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch],
  )

  useEffect(() => {
    if (__PROJECT__ === 'sb') {
      return
    }
    const resComments = dispatch(fetchCommentsByArticleId(id))
    const resRecommendations = dispatch(fetchArticleRecommendations())
    return () => {
      resComments.abort()
      resRecommendations.abort()
    }
  }, [])

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetailsPageHeader />
      <ArticleDetails id={id} />
      <Text
        size={TextSize.L}
        className={cls.commentTitle}
        title={t('Рекомендуем')}
      />
      <ArticleList
        articles={recommendations}
        isLoading={recommendationsIsLoading}
        className={cls.recommendations}
        target={'_blank'}
      />
      <Text className={cls.commentTitle} title={t('Комментарии')} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </Page>
  )
}

export default memo(ArticleDetailsPage)
