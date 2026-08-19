import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getArticles,
  getArticlesPageError,
  getArticlesPageView,
  getArticlesPageIsLoading,
} from '../../model/slices/articlesPageSlice'
import { useAppSelector } from '@/app/store'
import { ArticleList } from '@/entities/article'
import { TextTheme } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'

interface Props {
  className?: string
  scrollParent: HTMLElement | null
}

const ArticleInfiniteList = (props: Props) => {
  const { className = '', scrollParent } = props
  const { t } = useTranslation()
  const articles = useAppSelector(getArticles.selectAll)
  const isLoading = useAppSelector(getArticlesPageIsLoading)
  const view = useAppSelector(getArticlesPageView)
  const error = useAppSelector(getArticlesPageError)

  if (error) {
    return (
      <Text
        text={t('Произошла ошибка при подгрузке даннных')}
        theme={TextTheme.ERROR}
      />
    )
  }

  // Скролл-контейнер приезжает ref-колбэком после маунта Page. Рендерим
  // список только с готовым контейнером, иначе Virtuoso переинициализируется
  // на смене customScrollParent с undefined на элемент.
  if (!scrollParent) {
    return null
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
      customScrollParent={scrollParent}
    />
  )
}

export default memo(ArticleInfiniteList)
