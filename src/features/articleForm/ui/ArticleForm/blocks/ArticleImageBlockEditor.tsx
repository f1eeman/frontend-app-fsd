import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ArticleImageBlockEditor.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui'
import type { ArticleImageBlock } from '@/entities/article'

interface Props {
  className?: string
  block: ArticleImageBlock
  onChange: (changes: Partial<ArticleImageBlock>) => void
}

export const ArticleImageBlockEditor = memo(
  ({ className = '', block, onChange }: Props) => {
    const { t } = useTranslation()

    const onSrcChange = useCallback(
      (value: string) => onChange({ src: value }),
      [onChange],
    )

    const onTitleChange = useCallback(
      (value: string) => onChange({ title: value }),
      [onChange],
    )

    return (
      <div className={classNames(cls.ArticleImageBlockEditor, {}, [className])}>
        <Input
          placeholder={t('Ссылка на изображение')}
          value={block.src}
          onChange={onSrcChange}
        />
        <Input
          placeholder={t('Подпись к изображению')}
          value={block.title}
          onChange={onTitleChange}
        />
      </div>
    )
  },
)

ArticleImageBlockEditor.displayName = 'ArticleImageBlockEditor'
