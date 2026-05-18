import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import {
  getArticleComments,
  selectIsLoading,
} from '../../model/slices/articleDetailsCommentsSlice'
import cls from './ArticleDetailsPage.module.scss'
import { useAppDispatch } from '@/app/store'
import { ArticleDetails } from '@/entities/article'
import { CommentList } from '@/entities/comment'
import { AddCommentForm } from '@/features/addCommentForm'
import { fetchCommentsByArticleId } from '@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useInitialEffect } from '@/shared/lib/hooks/useInitEffect'
import { Text } from '@/shared/ui/text/Text'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className = '' } = props
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(selectIsLoading)

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch],
  )

  useInitialEffect(() => {
    const res = dispatch(fetchCommentsByArticleId(id))
    return () => {
      res.abort()
    }
  })

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
      <Text className={cls.commentTitle} title={t('Комментарии')} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </div>
  )
}

export default memo(ArticleDetailsPage)
