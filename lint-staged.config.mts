import type { Configuration } from 'lint-staged'

const config: Configuration = {
  '**/*.{ts,tsx,js,jsx}': (filenames) => {
    // Оборачиваем каждый файл в кавычки на случай пробелов в путях
    const files = filenames.map((f) => `'${f}'`).join(' ')

    return [
      `prettier --write ${files}`,
      `eslint --fix ${files}`,
      `tsc-files --noEmit -p tsconfig.json ${files}`,
    ]
  },

  '**/*.scss': (filenames) => {
    const files = filenames.map((f) => `'${f}'`).join(' ')
    return [`stylelint --fix ${files}`, `prettier --write ${files}`]
  },

  '**/*.{json,md}': (filenames) => {
    const files = filenames.map((f) => `'${f}'`).join(' ')
    return `prettier --write ${files}`
  },
}

export default config
