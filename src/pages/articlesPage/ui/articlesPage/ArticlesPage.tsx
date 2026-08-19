import { memo, useEffect, useCallback, useState } from 'react'
import { useSearchParams } from 'react-router'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { getArticlesPageIsLoading } from '../../model/slices/articlesPageSlice'
import ArticleInfiniteList from '../articleInfiniteList/ArticleInfiniteList'
import { ArticlesPageFilters } from '../articlesPageFilters/ArticlesPageFilters'
import cls from './ArticlesPage.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/page'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className = '' } = props
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getArticlesPageIsLoading)
  const [searchParams] = useSearchParams()
  const [pageElement, setPageElement] = useState<HTMLElement | null>(null)

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
      ref={setPageElement}
      onScrollEnd={onLoadNextPart}
      isLoading={isLoading}
      className={classNames(cls.ArticlesPage, {}, [className])}
    >
      <ArticlesPageFilters />
      <ArticleInfiniteList className={cls.list} scrollParent={pageElement} />
    </Page>
  )
}

export default memo(ArticlesPage)
