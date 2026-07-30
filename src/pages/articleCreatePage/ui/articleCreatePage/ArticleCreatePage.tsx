import { memo } from 'react'
import cls from './ArticleCreatePage.module.scss'
import { ArticleForm } from '@/features/articleForm'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/page'

interface ArticleCreatePageProps {
  className?: string
}

const ArticleCreatePage = memo(({ className = '' }: ArticleCreatePageProps) => (
  <Page className={classNames(cls.ArticleCreatePage, {}, [className])}>
    <ArticleForm />
  </Page>
))

export default ArticleCreatePage
ArticleCreatePage.displayName = 'ArticleCreatePage Component'
