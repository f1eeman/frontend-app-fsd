import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router'
import { getCanEditArticle } from '../../model/selectors/article'
import cls from './ArticleDetailsPageHeader.module.scss'
import { useAppSelector } from '@/app/store'
import { getArticleDetailsData } from '@/entities/article'
import { routesPaths } from '@/shared/config/routes'
import { classNames } from '@/shared/lib/classNames/classNames'
import { buttonTheme } from '@/shared/ui'
import { Button } from '@/shared/ui/button/Button'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className = '' } = props
    const { t } = useTranslation()
    const navigate = useNavigate()
    const canEdit = useAppSelector(getCanEditArticle)
    const article = useAppSelector(getArticleDetailsData)

    const onBackToList = useCallback(() => {
      navigate(routesPaths.articles.path)
    }, [navigate])

    const onEditArticle = useCallback(() => {
      navigate(generatePath(routesPaths.article_edit.path, { id: article?.id }))
    }, [article?.id, navigate])

    return (
      <div
        className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button theme={buttonTheme.outline} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        {canEdit && (
          <Button
            className={cls.editBtn}
            theme={buttonTheme.outline}
            onClick={onEditArticle}
          >
            {t('Редактировать')}
          </Button>
        )}
      </div>
    )
  },
)

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader'
