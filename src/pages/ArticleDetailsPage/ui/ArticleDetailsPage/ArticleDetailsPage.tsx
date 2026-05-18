import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
  getArticleComments,
  selectIsLoading,
} from '../../model/slices/articleDetailsCommentsSlice'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetails } from '@/entities/article'
import { CommentList } from '@/entities/comment'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text2 } from '@/shared/ui/text2/Text2'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className = '' } = props
  const { t } = useTranslation('article-details')
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(selectIsLoading)

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
      <Text2 className={cls.commentTitle} title={t('Комментарии')} />
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </div>
  )
}

export default memo(ArticleDetailsPage)
