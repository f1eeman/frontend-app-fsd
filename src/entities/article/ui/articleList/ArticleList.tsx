import { forwardRef, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Virtuoso,
  VirtuosoGrid,
  type ContextProp,
  type GridComponents,
  type GridListProps,
} from 'react-virtuoso'
import { ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../articleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../articleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TextSize } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'
import type { HTMLAttributeAnchorTarget } from 'react'
import type { Article } from '../../model/types/article'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  target?: HTMLAttributeAnchorTarget
  view?: ArticleView
  /**
   * Скролл-контейнер, внутри которого работает виртуализация.
   * Если не передан, список рендерится обычным способом (например, в
   * блоке рекомендаций или в Storybook).
   */
  customScrollParent?: HTMLElement
}

interface ListContext {
  isLoading?: boolean
}

/**
 * Скелетоны дозагрузки в SMALL — обычные элементы сетки, а не отдельный блок:
 * иначе они образуют вторую сетку со своими треками, без gap до последнего ряда
 * и не добирают незаполненные ячейки последнего ряда.
 */
type GridItem =
  | { kind: 'article'; article: Article }
  | { kind: 'skeleton'; key: string }

const SKELETONS_COUNT: Record<ArticleView, number> = {
  [ArticleView.SMALL]: 9,
  [ArticleView.BIG]: 3,
}

const getSkeletons = (view: ArticleView) =>
  new Array(SKELETONS_COUNT[view])
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ))

const Footer = ({ context }: ContextProp<ListContext>) => {
  if (!context?.isLoading) {
    return null
  }

  return <>{getSkeletons(ArticleView.BIG)}</>
}

const GridList: GridComponents<ListContext>['List'] = forwardRef<
  HTMLDivElement,
  GridListProps & ContextProp<ListContext>
>(({ className = '', children, context: _context, ...rest }, ref) => (
  <div ref={ref} {...rest} className={classNames(cls.SMALL, {}, [className])}>
    {children}
  </div>
))
GridList.displayName = 'ArticleGridList'

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className = '',
    articles,
    view = ArticleView.SMALL,
    isLoading,
    target,
    customScrollParent,
  } = props
  const { t } = useTranslation()

  const gridItems = useMemo<GridItem[]>(() => {
    const items: GridItem[] = articles.map((article) => ({
      kind: 'article',
      article,
    }))

    if (isLoading) {
      for (let index = 0; index < SKELETONS_COUNT[ArticleView.SMALL]; index++) {
        items.push({ kind: 'skeleton', key: `skeleton-${index}` })
      }
    }

    return items
  }, [articles, isLoading])

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
      target={target}
    />
  )

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    )
  }

  // Без внешнего скролл-контейнера виртуализация невозможна — обычный рендер.
  if (!customScrollParent) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {articles.map(renderArticle)}
        {isLoading && getSkeletons(view)}
      </div>
    )
  }

  const context: ListContext = { isLoading }

  if (view === ArticleView.BIG) {
    return (
      <Virtuoso
        className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        data={articles}
        context={context}
        customScrollParent={customScrollParent}
        computeItemKey={(_, article) => article.id}
        itemContent={(_, article) => renderArticle(article)}
        components={{ Footer }}
      />
    )
  }

  return (
    <VirtuosoGrid
      className={classNames(cls.ArticleList, {}, [className])}
      data={gridItems}
      context={context}
      customScrollParent={customScrollParent}
      computeItemKey={(_, item) =>
        item.kind === 'article' ? item.article.id : item.key
      }
      itemContent={(_, item) =>
        item.kind === 'article' ? (
          renderArticle(item.article)
        ) : (
          <ArticleListItemSkeleton
            className={cls.card}
            view={ArticleView.SMALL}
          />
        )
      }
      components={{ List: GridList }}
    />
  )
})

ArticleList.displayName = 'ArticleList Component'
