import { memo, useEffect, useCallback } from 'react'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
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
import { Page } from '@/shared/ui'
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

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useEffect(() => {
    if (__PROJECT__ === 'sb') return
    dispatch(articlesPageActions.initState())
    const resultArticles = dispatch(fetchArticlesList({ page: 1 }))
    return () => {
      resultArticles.abort()
    }
  }, [])

  return (
    <Page
      onScrollEnd={onLoadNextPart}
      isLoading={isLoading}
      className={classNames(cls.ArticlesPage, {}, [className])}
    >
      <ArticleViewSelector view={view} onViewClick={onChangeView} />
      <ArticleList isLoading={isLoading} view={view} articles={articles} />
    </Page>
  )
}

export default memo(ArticlesPage)
