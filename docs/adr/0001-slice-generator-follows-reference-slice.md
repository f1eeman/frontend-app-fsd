---
status: accepted
---

# Генератор слайсов следует эталонному слайсу, а не «средней» кодовой базе

`src` содержит два поколения конвенций: новые слайсы (`features/articleForm`,
`features/addCommentForm`) держат компоненты в `ui/<camelCase>/<Pascal>.tsx`,
модель в `model/slices/`, селекторы внутри `createSlice` и подключаются к стору
через `injectInto(rootReducer)`, тогда как старые (`langSwitcher`, `widgets/*`,
`authByUsername`) используют плоский `ui/`, `model/slice/` и отдельную папку
`model/selectors/`. Мы решили, что `scripts/createSlice` воспроизводит именно
новое поколение. Иначе генератор пришлось бы либо параметризовать под оба
поколения, либо заморозить до унификации всего `src`.

Вслед за генератором механическая часть расхождений устранена: `model/slice/`
переименован в `model/slices/` (4 слайса), компоненты из плоского `ui/`
перенесены в `ui/<camelCase>/` (10 слайсов, включая `widgets/page`, где файлы
лежали в корне слайса), директории `sidebar-item` и `profilePage/ui/{page,header}`
названы по компонентам, а префиксы `title` в стори приведены к именам слоёв
(`feature/` → `features/`, `widget/` → `widgets/`). Скриншотные эталоны при этом
переименованы, а не перегенерированы: их имя — это id стори, то есть `title`,
а не путь файла.

Осталось сознательно не тронутым то, что требует правки публичного API слайсов:
селекторы в отдельных `model/selectors/` у `entities/user`, `widgets/sidebar`,
`features/scrollSave` и `pages/articleDetailsPage`, а также схемы стора в
`types/<slice>.ts` у `addCommentForm` и `editableProfileCard` и PascalCase-имена
файлов в `pages/articleDetailsPage/model/types/`.

Заодно зафиксировано правило имён в `model/types/`: `<slice>Schema.ts` — схема
состояния стора, `<slice>.ts` — доменные типы. Оба варианта живут в коде, и
`entities/article` содержит их одновременно (`article.ts` и
`articleDetailsSchema.ts`), то есть это не разнобой, а два разных смысла.

## Considered Options

- **Эталон — плоский вариант** (`ui/<Pascal>.tsx` без подпапки). Короче пути, но
  не масштабируется на слайсы с несколькими компонентами, а таких большинство
  среди новых.
- **Сначала унифицировать `src`, потом чинить генератор.** Отложило бы
  исправление шаблонов на большой рефакторинг с риском поломать скриншотные
  эталоны.

## Consequences

Шаблоны генератора обязаны проходить `prettier`, `eslint`, `stylelint`, `tsc` и
`jest` без правок. Это проверяет `yarn check:generator`
(`scripts/createSlice/smoke.mjs`): он генерирует слайсы всеми вариантами
шаблонов внутрь `src` — иначе не работают алиас `@/` и `tsconfig.include` —
прогоняет по ним проверки и удаляет. Шаг подключён в `main.yml`, поэтому
сгенерированный и сразу выброшенный слайс линтуется в CI; без этого шага
шаблоны снова отстанут молча, как отстали на две мажорные версии Storybook и на
переход стора к `combineSlices().withLazyLoadedSlices()`.
