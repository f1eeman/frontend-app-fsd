# frontend-app-fsd

# front https://6a3d2bef212d258ab08751a2--effervescent-crepe-1e6434.netlify.app/about

# json-server https://back-for-front-app-fsd.vercel.app/

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
  - Требует, чтобы Storybook был уже запущен на `http://127.0.0.1:9658` (`yarn sb`).

- `yarn test:ui:ci`
  - То же самое, но сам поднимает `http-server` для `sb-static/` (предварительно нужен `yarn build:sb`).
  - Используется в CI и для локального прогона против собранной версии Storybook.

- `yarn test:ui:ok`
  - То же, что `yarn test:ui`, но с флагом `--updateSnapshot`.
  - Обновляет эталоны в `screen-tests/snapshots`.
  - **ВАЖНО:** локально на Windows/macOS использовать этот скрипт для коммита baseline'ов НЕ нужно — CI на Linux рендерит шрифты по-другому и тесты упадут. См. ниже раздел «Регенерация baseline для CI».

- `yarn test:ui:ok:ci`
  - Версия `test:ui:ok` для CI (поднимает http-server для `sb-static`). Используется внутри GitHub Actions workflow для обновления эталонов.

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

#### Локальная разработка (Windows/macOS)

1. Запусти Storybook (`yarn sb`) и убедись, что страницы/компоненты выглядят корректно.
2. Запусти `yarn test:ui`.
3. Если есть падения:
   - смотри `screen-tests/diffs/*-diff.png`
   - (опционально) генерируй отчёт `yarn test:ui:report` и открывай `screen-tests/report.html`
4. Если изменения ожидаемые и должны стать новым эталоном — **не делай `yarn test:ui:ok` локально под Windows/macOS**. Запушь ветку и регенерируй baseline через CI (см. ниже).

> Локальный `yarn test:ui:ok` оставлен на случай, если ты разрабатываешь под Linux с тем же шрифтовым стэком, что и CI runner. На Windows/macOS получишь пиксельную дельту с CI из-за разных растеризаторов шрифтов (DirectWrite/CoreText vs FreeType).

### Регенерация baseline для CI

Эталонные скриншоты в репозитории должны быть сгенерированы **на Linux** — на той же ОС, что и CI runner (`ubuntu-latest`). Иначе любая текстоёмкая стори будет давать ложные срабатывания на 3-5% дельты при кросс-OS прогоне.

Для этого есть отдельный workflow: `.github/workflows/update-snapshots.yml`.

**Как запустить:**

1. Запушь ветку с изменениями.
2. GitHub → **Actions** → **update screen-test snapshots** → **Run workflow** → выбери ветку → **Run workflow**.
3. Workflow:
   - собирает Storybook (`yarn build:sb`)
   - запускает `yarn test:ui:ok:ci` на Ubuntu
   - если есть дельты в `screen-tests/snapshots/` — коммитит их обратно в ту же ветку от имени `github-actions[bot]`
4. Локально подтяни изменения: `git pull`. Теперь baseline'ы соответствуют тому, что увидит CI на следующем push'е.

**Что нужно настроить один раз** (если ещё не сделано):

GitHub репозиторий → **Settings** → **Actions** → **General** → **Workflow permissions** → **"Read and write permissions"**. Без этого workflow не сможет запушить обновлённый baseline.

### CI pipeline

`.github/workflows/main.yml`:

- Запускается на каждый push в `main` и каждый PR в `main`.
- Шаги: lint TS, lint SCSS, unit tests, build Storybook, screenshot tests (`yarn test:ui:ci`), build prod.
- При падении скриншот-тестов загружает `screen-tests/diffs` и `screen-tests/current` как артефакт `screenshot-diffs` (7 дней).

Если CI падает на скриншотах:

1. Скачай артефакт `screenshot-diffs` со страницы failed run на GitHub Actions.
2. Открой `*-diff.png` и сравни с `*-received.png` — если изменение ожидаемое, запусти workflow «update screen-test snapshots».
3. Если изменение **не** ожидаемое — это регрессия, чини код.
