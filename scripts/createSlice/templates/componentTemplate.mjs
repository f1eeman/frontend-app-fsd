export const componentTemplate = ({ componentName, withAsync }) => {
  const propsExport = withAsync ? 'export interface' : 'interface'
  const componentExport = withAsync ? 'const' : 'export const'
  const defaultExport = withAsync ? `\n\nexport default ${componentName}` : ''

  return `import { memo } from 'react'
import cls from './${componentName}.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

${propsExport} ${componentName}Props {
  className?: string
}

${componentExport} ${componentName} = memo(({ className = '' }: ${componentName}Props) => {
  return <div className={classNames(cls.${componentName}, {}, [className])} />
})

${componentName}.displayName = '${componentName}'${defaultExport}
`
}
