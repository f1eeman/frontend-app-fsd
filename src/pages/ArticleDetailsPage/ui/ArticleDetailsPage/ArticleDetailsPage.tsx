import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
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
import cls from './ArticleDetailsPage.module.scss'
import { useAppDispatch } from '@/app/store'
import { ArticleDetails, ArticleList } from '@/entities/article'
import { CommentList } from '@/entities/comment'
import { AddCommentForm } from '@/features/addCommentForm'
import { routesPaths } from '@/shared/config/routes'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, buttonTheme } from '@/shared/ui'
import { TextSize } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'
import { Page } from '@/widgets/page/Page'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className = '' } = props
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const comments = useSelector(getArticleComments.selectAll)
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const commentsIsLoading = useSelector(selectIsLoading)
  const recommendationsIsLoading = useSelector(selectRecommendationsLoading)

  const onBackToList = useCallback(() => {
    navigate(routesPaths.articles.path)
  }, [navigate])

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
      <Button theme={buttonTheme.outline} onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>
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
        target='_blank'
      />
      <Text className={cls.commentTitle} title={t('Комментарии')} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </Page>
  )
}

export default memo(ArticleDetailsPage)
