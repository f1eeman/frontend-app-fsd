# frontend-app-fsd

## Визуальные тесты (Storybook screenshot tests)

В проекте включены визуальные регрессионные тесты на базе:

- `@storybook/test-runner`
- `jest-image-snapshot`

Идея простая: для каждой Story в Storybook делается скриншот контейнера `#storybook-root`, после чего скриншот сравнивается с эталонным изображением (snapshot).

### Где настраивается логика

Логика снятия скриншотов и сравнения находится в файле:

- `config/storybook/test-runner.ts`

Ключевые моменты:

- Скриншот делается именно для `#storybook-root`.
- Имя снапшота берётся из `context.id` (Storybook id), поэтому файлы в `screen-tests/snapshots` соответствуют story id.
- При падении теста сохраняются «текущие» картинки и diff.

### Команды

- `yarn test:ui`
  - Запускает тесты Storybook (скриншоты + сравнение с эталонами).
  - Использует существующие эталоны из `screen-tests/snapshots`.

- `yarn test:ui:ok`
  - То же самое, что `yarn test:ui`, но с флагом `--updateSnapshot`.
  - Обновляет эталонные изображения в `screen-tests/snapshots`.
  - Используется, когда визуальные изменения ожидаемые и их нужно «зафиксировать» как новую норму.

- `yarn test:ui:report`
  - Генерирует HTML-отчёт по упавшим визуальным тестам.
  - Полезно, когда нужно быстро посмотреть ожидаемое/актуальное/разницу по всем фейлам.

### Что генерится в `screen-tests/`

Ниже перечислены папки/файлы, которые ты можешь увидеть после запуска `yarn test:ui` и `yarn test:ui:report`.

#### `screen-tests/snapshots/`

- Это **эталонные** (expected) изображения, с которыми сравниваются новые скриншоты.
- Используется напрямую в `config/storybook/test-runner.ts` через `customSnapshotsDir`.
- Обновляется командой `yarn test:ui:ok`.

Обычно:

- эти файлы **коммитятся** в репозиторий (это «истина», с чем сравниваем)

#### `screen-tests/diffs/`

- Появляется, когда `yarn test:ui` находит отличия.
- Содержит изображения `*-diff.png`, которые показывают различия (композитный diff).
- Папка задаётся в `customDiffDir`.

Обычно:

- это временные артефакты
- папка **не коммитится** (игнорируется в `.gitignore`)

#### `screen-tests/current/`

- Появляется, когда `yarn test:ui` падает.
- Содержит **актуальные** (received) скриншоты, которые были сняты в текущем прогоне тестов.
- Включено через:
  - `storeReceivedOnFailure: true`
  - `customReceivedDir: screen-tests/current`

Обычно:

- это временные артефакты
- папка **не коммитится** (игнорируется в `.gitignore`)

#### `screen-tests/diffs-only/`

- Генерируется скриптом `scripts/generate-visual-json-report.mjs` при запуске `yarn test:ui:report`.
- Содержит «чистые» diff-изображения (вырезанный/подготовленный diff для отчёта).

Обычно:

- это временные артефакты
- папка **не коммитится** (игнорируется в `.gitignore`)

#### `screen-tests/report.json`

- Генерируется при `yarn test:ui:report:json`.
- Это JSON-описание отчёта: какие снапшоты упали и где лежат expected/actual/diff.

Обычно:

- это временный артефакт
- файл **не коммитится** (игнорируется в `.gitignore`)

#### `screen-tests/report.html`

- Генерируется при `yarn test:ui:report:html` (через `reg-cli`).
- Это HTML-страница для просмотра визуальных различий.

Обычно:

- это временный артефакт
- файл **не коммитится** (игнорируется в `.gitignore`)

#### `screen-tests/report-expected/`, `screen-tests/report-actual/`, `screen-tests/report-diff/`

- Генерируются при `yarn test:ui:report`.
- Это «подготовленные» папки с картинками для HTML-отчёта:
  - `report-expected` — копии эталонов
  - `report-actual` — копии актуальных (received)
  - `report-diff` — копии/подготовленные diff

Обычно:

- это временные артефакты
- папки **не коммитятся** (игнорируются в `.gitignore`)

### Типовой workflow

1. Запусти Storybook (`yarn sb`) и убедись, что страницы/компоненты выглядят корректно.
2. Запусти `yarn test:ui`.
3. Если есть падения:
   - смотри `screen-tests/diffs/*-diff.png`
   - (опционально) генерируй отчёт `yarn test:ui:report` и открывай `screen-tests/report.html`
4. Если изменения ожидаемые и должны стать новым эталоном:
   - запусти `yarn test:ui:ok`
   - закоммить обновления в `screen-tests/snapshots`
