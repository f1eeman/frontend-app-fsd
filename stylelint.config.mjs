/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-order'],
  rules: {
    'number-max-precision': 5,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'scss/at-mixin-pattern': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
  },
}
