import { memo } from 'react'
import cls from './ArticlesPage.module.scss'
import { ArticleView } from '@/entities/article/model/types/article'
import { ArticleList } from '@/entities/article/ui/ArticleList/ArticleList'
import { classNames } from '@/shared/lib/classNames/classNames'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className = '' } = props

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleList isLoading view={ArticleView.BIG} articles={[]} />
    </div>
  )
}

export default memo(ArticlesPage)
