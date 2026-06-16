import { memo } from 'react'
import { useParams } from 'react-router'
import cls from './ArticleEditPage.module.scss'
import { ArticleForm } from '@/features/articleForm'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/page/Page'

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo(({ className = '' }: ArticleEditPageProps) => {
  const { id } = useParams<{ id: string }>()
  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      <ArticleForm articleId={id} />
    </Page>
  )
})

export default ArticleEditPage
ArticleEditPage.displayName = 'ArticleEditPage Component'
