import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import {
  getArticleComments,
  selectIsLoading,
} from '../../model/slices/articleDetailsCommentsSlice'
import cls from './ArticleDetailsComments.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { CommentList } from '@/entities/comment'
import { AddCommentForm } from '@/features/addCommentForm'
import { VStack } from '@/shared/ui/stack'
import { Text } from '@/shared/ui/text/Text'

interface ArticleDetailsPageProps {
  id: string
}

const ArticleDetailsComments = (props: ArticleDetailsPageProps) => {
  const { id } = props
  const { t } = useTranslation('article-details')
  const dispatch = useAppDispatch()
  const comments = useAppSelector(getArticleComments.selectAll)
  const commentsIsLoading = useAppSelector(selectIsLoading)

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
    return () => {
      resComments.abort()
    }
  }, [])

  return (
    <VStack gap={'16'} max>
      <Text className={cls.commentTitle} title={t('Комментарии')} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </VStack>
  )
}

export default memo(ArticleDetailsComments)
