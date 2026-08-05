/**
 * Класс в PascalCase — selector-class-pattern в проекте отключён, а компоненты
 * обращаются к нему как cls.<ComponentName>.
 *
 * Одна декларация обязательна: пустой блок ловит stylelint (block-no-empty).
 */
export const styleTemplate = (componentName) => `.${componentName} {
  display: flex;
}
`
