import { memo, useEffect, useCallback } from 'react'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import {
  getArticles,
  getArticlesPageError,
  getArticlesPageView,
  getArticlesPageIsLoading,
  articlesPageActions,
} from '../../model/slices/articlesPageSlice'
import cls from './ArticlesPage.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { ArticleViewSelector, ArticleList } from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ArticleView } from '@/entities/article/model/types/article'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className = '' } = props
  const dispatch = useAppDispatch()
  const articles = useAppSelector(getArticles.selectAll)
  const isLoading = useAppSelector(getArticlesPageIsLoading)
  const view = useAppSelector(getArticlesPageView)
  const _error = useAppSelector(getArticlesPageError)

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch],
  )

  useEffect(() => {
    if (__PROJECT__ === 'sb') return
    const resultArticles = dispatch(fetchArticlesList())
    dispatch(articlesPageActions.initState())
    return () => {
      resultArticles.abort()
    }
  }, [])
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleViewSelector view={view} onViewClick={onChangeView} />
      <ArticleList isLoading={isLoading} view={view} articles={articles} />
    </div>
  )
}

export default memo(ArticlesPage)
