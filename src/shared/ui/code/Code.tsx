import { memo, useCallback } from 'react'
import cls from './Code.module.scss'
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/button/Button'
import { buttonTheme } from '@/shared/ui/button/consts'

interface CodeProps {
  className?: string
  text: string
}

export const Code = memo((props: CodeProps) => {
  const { className = '', text } = props

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={cls.copyBtn}
        theme={buttonTheme.clear}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  )
})

Code.displayName = 'Code component'
