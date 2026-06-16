import { memo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import {
  getArticles,
  getArticlesPageError,
  getArticlesPageView,
  getArticlesPageIsLoading,
} from '../../model/slices/articlesPageSlice'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import cls from './ArticlesPage.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { ArticleList } from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/page/Page'

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
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    if (__PROJECT__ === 'sb') return
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useEffect(() => {
    if (__PROJECT__ === 'sb') return
    const result = dispatch(initArticlesPage(searchParams))
    return () => {
      result.abort()
    }
  }, [])

  return (
    <Page
      onScrollEnd={onLoadNextPart}
      isLoading={isLoading}
      className={classNames(cls.ArticlesPage, {}, [className])}
    >
      <ArticlesPageFilters />
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
        className={cls.list}
      />
    </Page>
  )
}

export default memo(ArticlesPage)
