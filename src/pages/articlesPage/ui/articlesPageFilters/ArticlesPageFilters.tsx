import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
  articlesPageActions,
} from '../../model/slices/articlesPageSlice'
import cls from './ArticlesPageFilters.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  ArticleSortSelector,
  ArticleTypeTabs,
  ArticleViewSelector,
} from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { Card } from '@/shared/ui/card/Card'
import { Input } from '@/shared/ui/input/Input'
import type {
  ArticleType,
  ArticleSortField,
  ArticleView,
} from '@/entities/article'
import type { SortOrder } from '@/shared/types'

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className = '' } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const view = useAppSelector(getArticlesPageView)
  const sort = useAppSelector(getArticlesPageSort)
  const order = useAppSelector(getArticlesPageOrder)
  const search = useAppSelector(getArticlesPageSearch)
  const type = useAppSelector(getArticlesPageType)

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }))
  }, [dispatch])

  const debouncedFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch],
  )

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData],
  )

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData],
  )

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search))
      dispatch(articlesPageActions.setPage(1))
      debouncedFetchData()
    },
    [dispatch, debouncedFetchData],
  )

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value))
      dispatch(articlesPageActions.setPage(1))
      debouncedFetchData()
    },
    [dispatch, debouncedFetchData],
  )

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t('Поиск')}
        />
      </Card>
      <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={cls.tabs}
      />
    </div>
  )
})

ArticlesPageFilters.displayName = 'ArticlesPageFilters Component'
