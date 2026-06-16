import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { fetchArticleForEdit } from '../../model/services/fetchArticleForEdit/fetchArticleForEdit'
import { saveArticle } from '../../model/services/saveArticle/saveArticle'
import {
  articleFormActions,
  selectIsLoading,
} from '../../model/slices/articleFormSlice'
import cls from './ArticleForm.module.scss'
import { ArticleFormFields } from './ArticleFormFields'
import { ArticleBlockAdder } from './blocks/ArticleBlockAdder'
import { ArticleBlockList } from './blocks/ArticleBlockList'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { AppRoutes, routesPaths } from '@/shared/config/routes'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, buttonTheme } from '@/shared/ui'

interface ArticleFormProps {
  className?: string
  articleId?: string
}

export const ArticleForm = memo(
  ({ className = '', articleId }: ArticleFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoading = useAppSelector(selectIsLoading)

    useEffect(() => {
      if (articleId) {
        dispatch(fetchArticleForEdit(articleId))
      } else {
        dispatch(articleFormActions.resetForm())
      }
    }, [articleId, dispatch])

    const onSave = useCallback(() => {
      dispatch(
        saveArticle({
          id: articleId,
          onSuccess: (savedId) =>
            navigate(
              routesPaths[AppRoutes.ARTICLE_DETAILS].path.replace(
                ':id',
                savedId,
              ),
            ),
        }),
      )
    }, [articleId, dispatch, navigate])

    return (
      <div className={classNames(cls.ArticleForm, {}, [className])}>
        <ArticleFormFields />
        <ArticleBlockList />
        <ArticleBlockAdder />
        <Button
          theme={buttonTheme.outline}
          onClick={onSave}
          disabled={isLoading}
        >
          {isLoading ? t('Сохранение...') : t('Сохранить')}
        </Button>
      </div>
    )
  },
)

ArticleForm.displayName = 'ArticleForm'
