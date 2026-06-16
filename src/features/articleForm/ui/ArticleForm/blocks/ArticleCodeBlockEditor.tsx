import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ArticleCodeBlockEditor.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { ChangeEvent } from 'react'
import type { ArticleCodeBlock } from '@/entities/article'

interface Props {
  className?: string
  block: ArticleCodeBlock
  onChange: (changes: Partial<ArticleCodeBlock>) => void
}

export const ArticleCodeBlockEditor = memo(
  ({ className = '', block, onChange }: Props) => {
    const { t } = useTranslation()

    const onCodeChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) =>
        onChange({ code: e.target.value }),
      [onChange],
    )

    return (
      <div className={classNames(cls.ArticleCodeBlockEditor, {}, [className])}>
        <textarea
          className={cls.textarea}
          value={block.code}
          onChange={onCodeChange}
          placeholder={t('Код')}
        />
      </div>
    )
  },
)

ArticleCodeBlockEditor.displayName = 'ArticleCodeBlockEditor'
