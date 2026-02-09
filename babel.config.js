/**
 * Конфигурация Babel для проекта
 * @param {import('@babel/core').ConfigAPI} api
 * @returns {import('@babel/core').TransformOptions}
 */
const getBabelConfig = (api) => {
  // Кэшируем настройки для ускорения повторных сборок и тестов
  api.cache(true)

  return {
    presets: [
      // Превращает современный JS в понятный для текущей версии Node.js (важно для Jest)
      ['@babel/preset-env', { targets: { node: 'current' } }],

      // Позволяет Babel "отрезать" типы TypeScript и превращать их в JS
      '@babel/preset-typescript',

      // Обрабатывает JSX и специфику React
      [
        '@babel/preset-react',
        {
          // Позволяет не писать "import React from 'react'" в каждом файле
          runtime: 'automatic',
        },
      ],
    ],
  }
}

module.exports = getBabelConfig
