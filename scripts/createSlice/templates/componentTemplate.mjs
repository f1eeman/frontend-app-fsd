/**
 * Компонент по образцу src/features/articleForm: memo, интерфейс <Name>Props,
 * classNames с внешним className.
 *
 * displayName обязателен: react/display-name считает ошибкой анонимную функцию
 * внутри memo, и весь проект закрывает это присваиванием после объявления.
 *
 * При withAsync компонент экспортируется по умолчанию — этого требует
 * lazy(() => import(...)) в <Name>.async.tsx, а пропсы экспортируются, чтобы
 * async-обёртка могла их типизировать.
 */
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
