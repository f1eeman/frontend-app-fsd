import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ArticleCodeBlockEditor.module.scss'
import { VStack } from '@/shared/ui/stack'
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
      <VStack align='stretch' className={className}>
        <textarea
          className={cls.textarea}
          value={block.code}
          onChange={onCodeChange}
          placeholder={t('Код')}
        />
      </VStack>
    )
  },
)

ArticleCodeBlockEditor.displayName = 'ArticleCodeBlockEditor'
