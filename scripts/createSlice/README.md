# createSlice

CLI-генератор FSD-слайсов. Создаёт каркас слайса в одном из слоёв `features`,
`entities`, `pages`, `widgets` по образцу `src/features/articleForm` и
`src/features/addCommentForm` — см. [ADR-0001](../../docs/adr/0001-slice-generator-follows-reference-slice.md).

Сгенерированный код проходит `prettier`, `eslint`, `stylelint`, `tsc` и `jest`
без правок.

## Запуск

```bash
yarn create:slice <layer> <sliceName> [--with-slice] [--async]
```

| Аргумент       | Значение                                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `layer`        | `features` \| `entities` \| `pages` \| `widgets`                                                                       |
| `sliceName`    | строго camelCase (`articleForm`); из него получаются имя компонента `ArticleForm`, класс `.ArticleForm`, `name` слайса |
| `--with-slice` | добавить `model/types` + `model/slices` с тестом слайса                                                                |
| `--async`      | добавить `<Name>.async.tsx`; для слоя `pages` включён всегда                                                           |

```bash
yarn create:slice widgets header
yarn create:slice features articleForm --with-slice
yarn create:slice pages profilePage --with-slice
```

Скрипт **не перезаписывает существующий слайс**: если `src/<layer>/<sliceName>`
есть, он завершается с кодом 1, ничего не создавая. Запись идёт с флагом `wx`,
любая ошибка — тоже код 1.

## Что генерируется

```
src/<layer>/<sliceName>/
├── index.ts                            # public API
├── model/                              # только при --with-slice
│   ├── slices/
│   │   ├── <sliceName>Slice.ts
│   │   └── <sliceName>Slice.test.ts
│   └── types/
│       └── <sliceName>Schema.ts
└── ui/<sliceName>/
    ├── <ComponentName>.tsx
    ├── <ComponentName>.module.scss
    ├── <ComponentName>.stories.tsx
    └── <ComponentName>.async.tsx       # при --async и для pages
```

Пустые `model/selectors/` и `model/services/` не создаются: git не отслеживает
пустые директории, а селекторы в проекте объявляются внутри `createSlice`.

### Компонент

`memo`, интерфейс `<Name>Props`, `classNames` с внешним `className`,
присваивание `displayName` (без него `react/display-name` считает анонимную
функцию внутри `memo` ошибкой). `useTranslation` в шаблон не входит — в пустом
компоненте `t` не используется, а `no-unused-vars` стоит на `error`.

При `--async` компонент экспортируется по умолчанию (этого требует
`lazy(() => import(...))`), а `<Name>Props` экспортируется, чтобы обёртка
типизировала пропсы через `lazy<FC<Props>>`.

### Redux-слайс

`createSlice` со `selectors`, `injectInto(rootReducer)` и расширением
`LazyLoadedSlices` через `declare module '@/app/store'` — стор собран на
`combineSlices().withLazyLoadedSlices()`, поэтому **править `src/app/store`
после генерации не нужно**. Схема-заглушка — `isLoading` + `error`, самая частая
форма в проекте.

### Стори

CSF3: `satisfies Meta`, `tags: ['autodocs']`, `layout: 'centered'`,
`controls: { expanded: true }`, `argTypes.className`, стори `Playground` и
`Normal`. Локальный `StoreDecorator` не добавляется — он вместе с темами и
роутером подключён глобально в `config/storybook/preview.ts`.

Новые стори означают новые скриншотные эталоны: после генерации нужен
`yarn test:ui:ok:docker`.

## Устройство

| Файл                                       | Роль                                                                                |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| `index.mjs`                                | разбор `process.argv`, валидация, проверка «слайса ещё нет», вывод созданных файлов |
| `resolveRoot.mjs`                          | путь от корня репозитория                                                           |
| `firstCharUpperCase.mjs`                   | `articleForm` → `ArticleForm`                                                       |
| `writeFormatted.mjs`                       | прогон через prettier + запись с флагом `wx`                                        |
| `smoke.mjs`                                | смоук-проверка генератора (`yarn check:generator`)                                  |
| `templates/createTemplate.mjs`             | собирает слайс: `createUI` → `createModel` → `createPublicApi`                      |
| `templates/create{UI,Model,PublicApi}.mjs` | создают сегменты, возвращают список файлов                                          |
| `templates/*Template.mjs`                  | чистые функции: аргументы → строка с кодом                                          |

Все файлы — ESM `.mjs`, как остальные скрипты в `scripts/`; для них в
`eslint.config.mjs` есть отдельный блок с node-глобалами.

Форматирование шаблонов не нужно вылизывать вручную: `writeFormatted` прогоняет
результат через prettier с конфигом проекта, поэтому длинные имена слайсов не
ломают `max-len`.

## Смоук-проверка

```bash
yarn check:generator
```

Генерирует три варианта слайса (`widgets` без модели, `features --with-slice`,
`pages` с async), прогоняет по ним `eslint`, `stylelint`, `tsc --noEmit` и
`jest`, затем удаляет. Файлы создаются внутри `src` — иначе не работают алиас
`@/` и `tsconfig.include`. Шаг подключён в `.github/workflows/main.yml`.

Это защита от главной проблемы генератора: до переписки шаблоны молча отстали от
проекта — отдавали CSF2-стори при Storybook 10, импорты без `@/`, пустой
SCSS-блок (`block-no-empty`) и слайс, который не подключался к стору. Правишь
шаблоны — гоняй `yarn check:generator`.
