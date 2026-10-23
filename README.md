# frontend-app-fsd

# front https://6a3d2bef212d258ab08751a2--effervescent-crepe-1e6434.netlify.app/about

# json-server https://back-for-front-app-fsd.vercel.app/

## Стек

- **Приложение:** React 19, TypeScript 5.9, React Router 7.
- **Состояние и данные:** Redux Toolkit 2 с RTK Query, axios для thunk'ов.
- **UI:** SCSS-модули, Headless UI (выпадающие списки и меню), react-spring и use-gesture (анимация и свайпы шторки), react-virtuoso (бесконечный список статей), SVG как React-компоненты через SVGR.
- **Переводы:** i18next и react-i18next, переводы грузятся по HTTP.
- **Сборка:** Webpack 5 и Babel; типы в dev-режиме проверяет fork-ts-checker, горячая перезагрузка — React Refresh.
- **Бэкенд для разработки:** json-server 0.17.
- **Тесты:** Jest 30 и Testing Library — unit; Storybook 10, test-runner, Playwright и jest-image-snapshot — скриншотные; reg-cli — HTML-отчёт по скриншотам.
- **Качество кода:** ESLint 9 (вместе с собственным `eslint-plugin-fsd-boundaries` для правил FSD), Stylelint, Prettier, husky и lint-staged.
- **CI:** GitHub Actions в контейнере Playwright.
- **Архитектура:** Feature-Sliced Design.

## Быстрый старт

Нужны Node.js `24.17.0` (версия в `.nvmrc`) и Yarn `1.22`. npm запрещён через `engines` в `package.json`.

```bash
yarn install
cp .env.example .env
yarn dev
```

- `yarn install` заодно ставит git-хуки (`postinstall` → husky).
- `.env` необязателен: в нём только `API_URL`, по умолчанию `http://localhost:9000`.
- `yarn dev` поднимает фронт на `http://localhost:3325` и `json-server` на `http://localhost:9000`. Сервер намеренно отвечает с задержкой 800 мс, чтобы были видны загрузки и скелетоны.
- Вход: `admin` / `admin` (роль ADMIN) или `user` / `user` (роль USER). Пользователи и данные лежат в `json-server/db.json`, сервер дописывает туда всё, что ты создаёшь в приложении.

## Скрипты

#### Разработка

- `yarn dev` — фронт и `json-server` вместе.
- `yarn dev:client` — только фронт (webpack dev server, порт 3325).
- `yarn dev:serv` — только `json-server` (порт 9000).
- `yarn sb` — Storybook на порту 9658.

#### Сборка

- `yarn build:prod` — продакшен-сборка в `build/`, API — задеплоенный `json-server` на Vercel.
- `yarn build:dev` — сборка в режиме разработки.
- `yarn analyze:prod`, `yarn analyze:dev` — то же с анализатором размера бандла.
- `yarn build:sb` — статический Storybook в `sb-static/`.
- `yarn clean:cache` — удалить кэш сборки webpack (`node_modules/.cache/webpack`). Нужен, только если сборка ведёт себя странно: при изменении конфигов и зависимостей кэш сбрасывается сам.

#### Проверки

- `yarn lint:ts` — проверка типов (`tsc --noEmit`).
- `yarn lint:es` / `yarn lint:es:fix` — ESLint (`:quiet` — только ошибки, без предупреждений).
- `yarn lint:scss` / `yarn lint:scss:fix` — Stylelint.
- `yarn format` — Prettier по `src/`.
- `yarn test:unit` — unit-тесты (Jest).
- `yarn test:ui*` — скриншотные тесты, см. «Визуальные тесты» ниже.

#### Генератор слайсов

- `yarn create:slice <layer> <sliceName> [--with-slice] [--async]` — каркас нового слайса по образцу существующих. Подробно — `scripts/createSlice/README.md`.
- `yarn check:generator` — создаёт пробные слайсы, прогоняет по ним линтеры, `tsc` и Jest и удаляет. Запускается в CI, чтобы шаблоны генератора не разошлись с правилами проекта.

#### Git-хуки

Перед каждым коммитом `lint-staged` прогоняет по изменённым файлам Prettier, `eslint --fix` и `tsc` (для TS/JS) и Stylelint (для SCSS). В CI ESLint по всему проекту не запускается, поэтому хук — основная проверка ESLint.

## Архитектура

Проект построен по [Feature-Sliced Design](https://feature-sliced.design/). Код в `src/` разложен по слоям, снизу вверх:

- `shared` — переиспользуемое без знания о предметной области: UI-кит (`shared/ui`), хуки и утилиты (`shared/lib`), базовые API-клиенты (`shared/api`), маршруты (`shared/config/routes.tsx`).
- `entities` — сущности предметной области: `article`, `comment`, `user`, `profile`, `rating` и др.
- `features` — действия пользователя: `authByUsername`, `addCommentForm`, `articleRating`, `themeSwitcher` и др.
- `widgets` — крупные самостоятельные блоки: `navbar`, `sidebar`, `page`.
- `pages` — страницы, по одной на маршрут.
- `app` — инициализация: стор, роутинг, тема, i18n, глобальные стили, `ErrorBoundary`.

#### Правила импортов

Их проверяет ESLint-плагин `eslint-plugin-fsd-boundaries`:

- слой импортирует только слои ниже себя; соседние слайсы одного слоя друг друга не импортируют (типы через `import type` — можно);
- в чужой слайс — только через его `index.ts` (public API): `@/entities/rating`, а не `@/entities/rating/ui/...`;
- внутри своего слайса — относительные пути, в чужой — через алиас `@` (`@` → `src/`).

Исключения из правила слоёв — `app/store`, `app/theme`, `app/styles`: стор, тема и глобальные стили нужны и нижним слоям.

#### Устройство слайса

```
src/features/articleRating/
├── index.ts              # public API
├── api/                  # эндпоинты RTK Query
├── model/                # slices, types, selectors, services
└── ui/articleRating/     # компонент, стили, стори, тесты
```

Папки — в camelCase, компоненты — в PascalCase.

#### Данные

- **Redux Toolkit.** Стор собирается в `src/app/store/store.ts` через `combineSlices`. Слайсы, нужные не везде, подключаются лениво через `injectInto(rootReducer)` — в бандл и стор они попадают вместе со страницей.
- **RTK Query.** Общий `baseRtkApi` (`src/shared/api/rtkApi.ts`) пустой; слайсы добавляют в него свои запросы через `injectEndpoints`. Связь «изменение → перезапрос» задаётся метками (`providesTags` / `invalidatesTags`).
- **Thunk'и** ходят в API через axios-клиент `$api` (`src/shared/api/api.ts`), он передаётся в thunk через `extraArgument`.

#### Роутинг и тема

- Маршруты описаны в `src/shared/config/routes.tsx`, страницы к ним привязаны в `src/app/routing/routesConfig.tsx`. `RequireAuth` пускает только вошедших и, если у маршрута заданы `roles`, только с нужной ролью; иначе — редирект на `/forbidden`.
- Тема — светлая, тёмная и оранжевая, переключается `ThemeSwitcher`.

#### Переводы

Два языка — русский (основной) и английский. Настройка — `src/app/i18n.ts` (i18next).

- **Ключ — русский текст.** В коде пишется `t('Оцените статью')`, а в `public/locales/en/<namespace>.json` лежит пара `"Оцените статью": "Rate the article"`. Если перевода нет, i18next показывает сам ключ: по-русски всё работает и без файлов перевода, а в английской версии появится русский текст.
- **Файлы.** `public/locales/<язык>/<namespace>.json`: `common` — общий, по умолчанию; `about`, `main`, `profile`, `article-details` — для отдельных страниц. Namespace выбирается так: `useTranslation('profile')`, без аргумента — `common`.
- **Загрузка.** Файлы не попадают в бандл: i18next скачивает их по HTTP (`/locales/{{lng}}/{{ns}}.json`) в момент, когда namespace понадобился. При сборке webpack копирует `public/locales` в `build/locales`.
- **Выбор языка.** Сначала сохранённый в `localStorage`, потом язык браузера; если он не русский и не английский — русский. Переключает `LangSwitcher` в сайдбаре.
- **Контроль.** ESLint-правило `i18next/no-literal-string` запрещает голый текст в JSX — его нужно оборачивать в `t()`. В тестах и сторях правило выключено.
- **Новая строка.** Обернуть текст в `t()` и добавить пару в `public/locales/en/<namespace>.json` (в `ru` — по желанию: ключ уже русский). Автоматического сбора ключей в проекте нет, поэтому недостающие английские переводы видно только глазами.

#### Сборка и окружение

- Конфиг webpack — `webpack.config.ts` и `config/build/`. В код подставляются глобальные константы `__IS_DEV__`, `__API__` (URL бэкенда) и `__PROJECT__` (`front`, `sb` или `jest`).
- Storybook настроен в `config/storybook/`, Jest — в `config/jest/`. Алиас `@` прописан в каждом из них отдельно, плюс в `tsconfig.json`.
- Архитектурные решения записываются в `docs/adr/`.

## Storybook

- Запуск — `yarn sb` (`http://localhost:9658`), статическая сборка — `yarn build:sb`. Конфиг — `config/storybook/`.
- Стори лежат рядом с компонентом (`<Component>.stories.tsx`), формат CSF3: `meta` с `satisfies Meta<typeof Component>`, тег `autodocs`, описания пропсов в `argTypes`. `title` — `<слой>/<Компонент>`, например `entities/RatingCard`.
- Глобально ко всем стори подключены стор, глобальные стили, тема и роутер (`config/storybook/preview.ts`). Тема переключается в тулбаре: Light / Dark / Orange. Роутер можно отключить параметром `router: 'none'`.
- Декораторы для отдельных стори — `src/shared/lib/sb/decorators/`:
  - `StoreDecorator(state)` — начальное состояние стора, например вошедший пользователь;
  - `MockFetchDecorator(routes)` — подменяет ответы сервера (тело, статус, задержка), чтобы показать загрузку, пустой список или ошибку без бэкенда.
- В Storybook `__API__` — пустая строка, так что реальный бэкенд не нужен: всё, что ходит в сеть, подменяется через `MockFetchDecorator`.
- Каждая стори — ещё и скриншотный тест. Стори, которая ничего не рендерит (например, пустое состояние), тест уронит — такое состояние лучше проверять unit-тестом.
- Скриншот снимается в светлой теме. Чтобы стори проверялась ещё в тёмной и оранжевой, добавь ей `parameters: { screenshotThemes: EXTRA_SCREENSHOT_THEMES }` (`src/shared/lib/sb/screenshotThemes.ts`). Сейчас так размечены базовые компоненты `shared/ui`: `Button`, `Card`, `Text`, `Input`, `Modal` — цвета тем задаются CSS-переменными, и ошибки с цветом чаще всего сидят именно в них.

## Тесты

- **Unit** — Jest и Testing Library, `yarn test:unit`. Файлы `*.test.ts(x)` лежат рядом с кодом. Компоненты рендерятся через `componentRender` (`src/shared/lib/tests/componentRender`): он оборачивает их в стор, роутер, тему и тестовый i18next. Переводы там пустые, поэтому `t()` возвращает русский ключ — по нему и ищем элементы. Thunk'и проверяются через `TestAsyncThunk` (`src/shared/lib/tests/async.thunk.tests.ts`). HTML-отчёт прогона — `unit-tests/report.html`.
- **Скриншотные** — каждая стори Storybook фотографируется и сравнивается с эталоном. Проверяются только в CI, подробно — в разделе ниже.

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

### Темы

По умолчанию стори фотографируется только в теме по умолчанию (Light). Если у стори есть параметр `screenshotThemes`, `test-runner.ts` после основного снимка переключает тему через канал Storybook (то же, что кнопка в тулбаре), делает снимок в каждой теме из списка и возвращает тему обратно.

- Эталоны тем лежат рядом с обычными: `<story id>--<тема>.png`, например `shared-card--normal--app_theme_dark.png`.
- Проверяются все темы, даже если одна из них упала: ошибки собираются и выводятся вместе.

### Порог сравнения (`failureThreshold`)

Настройки в `config/storybook/test-runner.ts`:

- `failureThreshold: 100`, `failureThresholdType: 'pixel'` — тест падает, если отличается больше 100 пикселей.
- `customDiffConfig: { threshold: 0.1, includeAA: false }` — допуск на сглаживание шрифтов в отдельном пикселе. С дефолтным `0.01` любой текст давал бы ложные срабатывания.

Порог рассчитан на сравнение Linux с Linux: эталон и прогон в одном контейнере CI. Под Windows/macOS шрифты растеризуются иначе (дельта до 4.6% кадра), поэтому локальный `yarn test:ui` не критерий — критерий только прогон в Actions.

### Команды

Обычный путь: push → `main.yml` упал → `yarn test:ui:pull` → смотришь `report.html` → запускаешь «update screen-test snapshots» в Actions. Из команд ниже руками нужна только `test:ui:pull`, остальные запускает CI.

#### Проверка: сравнить снимки с эталонами

- `yarn test:ui`
  - Открывает каждую стори в уже запущенном Storybook, фотографирует `#storybook-root` и сравнивает с эталоном из `screen-tests/snapshots`.
  - Storybook не поднимает: он должен уже работать на `http://127.0.0.1:9658` (`yarn sb`).
  - `--testTimeout=60000` — до минуты на стори.
  - Кто запускает: никто напрямую; его вызывает `test:ui:ci`. Локально под Windows/macOS результат сравнения не показателен (см. предупреждение в «Типовом workflow»), полезен только для проверок без пикселей — например, что стори вообще отрисовывается. Добавляй `--ci`, чтобы для новых стори не записались эталоны.

- `yarn test:ui:ci`
  - То же самое, но сам поднимает сервер: `start-server-and-test` запускает `http-server` на `sb-static/`, ждёт ответа порта 9658, запускает `yarn test:ui` и гасит сервер.
  - Перед ним нужен `yarn build:sb`.
  - Кто запускает: `main.yml`, шаг **Screenshot testing**.
  - На Windows `start-server-and-test` может не погасить сервер после тестов, и команда зависнет — тогда останови процесс `http-server` вручную.

#### Обновление: перезаписать эталоны

- `yarn test:ui:ok`
  - То же, что `yarn test:ui`, но с `--updateSnapshot`: где снимок разошёлся с эталоном или эталона нет, текущий снимок записывается в `screen-tests/snapshots` как новый эталон.
  - Кто запускает: никто напрямую; его вызывает `test:ui:ok:ci`.
  - **ВАЖНО:** локально на Windows/macOS не запускай — эталоны станут «виндовыми», и CI на Linux на них упадёт. См. «Регенерация baseline для CI».

- `yarn test:ui:ok:ci`
  - Версия `test:ui:ok`, которая сама поднимает сервер для `sb-static/` (как `test:ui:ci`).
  - Кто запускает: `update-snapshots.yml`, шаг **Regenerate snapshots**.

#### Отчёт: собрать страницу из упавших снимков

- `yarn test:ui:report:json`
  - `scripts/generate-visual-json-report.mjs`: раскладывает картинки по `report-expected/`, `report-actual/`, `report-diff/` и пишет `report.json`.
  - Упавшие стори берёт из `screen-tests/diffs`, новые стори без эталона — из `screen-tests/current/*-new.png`.

- `yarn test:ui:report:html`
  - `reg-cli` превращает `report.json` в `report.html`.

- `yarn test:ui:report`
  - Обе команды выше подряд.
  - Кто запускает: `main.yml` сам, когда скриншоты упали; отчёт уходит в артефакт `screenshot-diffs`.

#### Скачать отчёт из CI

- `yarn test:ui:pull [id прогона]`
  - Скачивает артефакт `screenshot-diffs` последнего упавшего прогона `main.yml` на текущей ветке (или указанного прогона) в `screen-tests/`.
  - Перед скачиванием удаляет из `screen-tests/` старые отчёты и картинки; эталоны в `screen-tests/snapshots` не трогает.
  - Берёт только прогоны от `push` и `workflow_dispatch`: артефакты pull request могут быть собраны из чужого кода.
  - После него в `screen-tests/` лежат `diffs`, `current`, `report-*` и готовый `report.html` — открывай в браузере.
  - Если прогон собран не на твоём текущем коммите, скрипт предупредит: отчёт верный, но локальные эталоны могут отличаться от тех, что видел CI.
  - Если у прогона нет артефакта — значит, ни один снимок не разошёлся с эталоном и новых стори нет, а упало что-то другое (например, стори ничего не отрисовала, см. ниже). Смотри лог прогона.
  - Кто запускает: ты, руками. Нужен GitHub CLI (`gh auth login`).

### Что генерится в `screen-tests/`

В репозиторий коммитится только `snapshots/`. Всё остальное — временные файлы, они в `.gitignore`.

Временные файлы попадают к тебе через `yarn test:ui:pull`: CI создаёт их при падении скриншотных тестов и выкладывает в артефакт `screenshot-diffs`. Локально их создают `yarn test:ui` и `yarn test:ui:report`, но на Windows/macOS результат не показателен (см. предупреждение ниже).

Из артефакта скачиваются `diffs/`, `current/`, `report.html`, `report-expected/`, `report-actual/`, `report-diff/`. Не скачиваются `diffs-only/` и `report.json`: CI создаёт их по пути к `report.html`, но в артефакт не кладёт.

#### `snapshots/`

- Эталонные (expected) изображения, с которыми сравниваются новые снимки. Коммитятся в репозиторий.
- Путь задан в `config/storybook/test-runner.ts` через `customSnapshotsDir`.
- Обновляется только workflow «update screen-test snapshots» (`.github/workflows/update-snapshots.yml`), см. «Регенерация baseline для CI». `yarn test:ui:pull` эту папку не трогает.

#### `diffs/`

- Появляется, когда скриншотный прогон находит отличия.
- Содержит `*-diff.png` — композитную картинку: эталон, разница и новый снимок рядом.
- Путь задан через `customDiffDir`.

#### `current/`

- Появляется, когда скриншотный прогон падает.
- Содержит снимки этого прогона: `<story id>-received.png` для стори, которые разошлись с эталоном (`storeReceivedOnFailure: true`, `customReceivedDir`), и `<story id>-new.png` для новых стори без эталона.

#### `diffs-only/`

- Создаётся `scripts/generate-visual-json-report.mjs` при `yarn test:ui:report`.
- Содержит только среднюю часть композитного diff — саму разницу, без эталона и снимка.
- В артефакт CI не входит.

#### `report.json`

- Создаётся при `yarn test:ui:report:json`.
- Описание отчёта: какие стори упали, какие новые и где лежат их картинки.
- В артефакт CI не входит.

#### `report.html`

- Создаётся при `yarn test:ui:report:html` (через `reg-cli`).
- Страница для просмотра различий и новых стори. Картинки берёт из `report-expected/`, `report-actual/` и `report-diff/`, поэтому без них отчёт пустой.

#### `report-expected/`, `report-actual/`, `report-diff/`

- Создаются при `yarn test:ui:report` — это картинки для `report.html`:
  - `report-expected` — копии эталонов;
  - `report-actual` — снимки этого прогона, включая новые стори;
  - `report-diff` — разница из `diffs-only/`.

### Типовой workflow

1. Запусти Storybook (`yarn sb`) и убедись, что страницы/компоненты выглядят корректно.
2. Запушь изменения — `main.yml` прогонит скриншотные тесты.
3. Если скриншоты упали — `yarn test:ui:pull` и открой `screen-tests/report.html`. Новые стори показаны в отчёте отдельным разделом, без сравнения (см. «Новые стори без эталона»).
4. Если изменения ожидаемые и должны стать новым эталоном — запусти workflow «update screen-test snapshots» (см. «Регенерация baseline для CI»).

> **Не запускай `yarn test:ui` / `yarn test:ui:ok` напрямую под Windows/macOS для оценки результата.** DirectWrite и CoreText растеризуют шрифты иначе, чем FreeType в Linux: дельта с CI-эталонами доходит до 4.6% на текстоёмких стори, и никакой разумный порог её не покроет. Красный результат там ничего не доказывает, а обновлённые таким образом эталоны сразу же уронят CI. Эти скрипты остались как низкоуровневые (их вызывают workflow в CI) и для тех, кто разрабатывает под Linux с тем же шрифтовым стэком.

### Регенерация baseline для CI

Эталонные скриншоты в репозитории должны быть сгенерированы **на Linux** — на той же ОС, что и CI runner (`ubuntu-latest`). Иначе любая текстоёмкая стори будет давать ложные срабатывания на 3-5% дельты при кросс-OS прогоне.

Точнее — не просто «на Linux», а в **том же контейнере**. Оба workflow выполняются в `mcr.microsoft.com/playwright:v1.58.2-noble`: браузер и шрифты уже внутри образа, поэтому шага `playwright install --with-deps` в них нет (он к тому же воспроизводимо подвисал на runner-е после скачивания Chromium — молча, без таймаута, до отмены прогона вручную).

Тег образа обязан совпадать с версией `playwright` в `yarn.lock`. Образ фиксирует сборку Chromium, а от неё напрямую зависят пиксели эталонов. Поэтому при обновлении `playwright`: подними тег в обоих workflow **и** перегенерируй baseline, иначе CI посыпется на дельтах, не связанных с кодом. За этим следит `scripts/assert-playwright-image.mjs`: он сверяет все ссылки на образ в `.github/workflows/*.yml` с версией playwright из `node_modules` и валит пайплайн до скриншотного шага, если они разъехались.

Эталоны обновляются только workflow в Actions: `.github/workflows/update-snapshots.yml`.

1. Запушь ветку с изменениями.
2. GitHub → **Actions** → **update screen-test snapshots** → **Run workflow** → в поле **Branch to regenerate snapshots on** укажи ветку (по умолчанию `main`) → **Run workflow**.
   - Ветку, на которой регенерировать эталоны, задаёт именно это поле. Выпадающий список **Use workflow from** выбирает только версию самого workflow-файла.
3. Workflow (job `regenerate`, в том же контейнере, что и `main.yml`):
   - сверяет тег playwright-образа с lockfile (`scripts/assert-playwright-image.mjs`) — эталоны, снятые не той версией Chromium, отравили бы репозиторий
   - собирает Storybook (`yarn build:sb`)
   - запускает `yarn test:ui:ok:ci`
   - добавляет в коммит и изменённые эталоны, и новые (для только что добавленных стори)
   - если что-то поменялось — коммитит `chore(snapshots): regenerate screen-test baselines on Linux` в ту же ветку от имени `github-actions[bot]` и пушит
   - если ничего не поменялось — ничего не коммитит, и `main.yml` повторно не запускается
4. Если был push, отдельный job `dispatch` **сам запускает `main.yml`** на обновлённых эталонах через `gh workflow run`: push от `GITHUB_TOKEN` не считается событием `push` (защита от рекурсии), а `workflow_dispatch` — документированное исключение. Job работает без контейнера, потому что в playwright-образе нет `gh`. Второй ручной запуск не нужен.
5. Локально подтяни изменения: `git pull`.

**Права.** Нужные права токену (`contents: write` — запушить эталоны, `actions: write` — запустить `main.yml`) запрошены прямо в `update-snapshots.yml` через `permissions`, так что менять **Settings → Actions → Workflow permissions** не требуется. Исключение — если права ограничены на уровне организации.

### CI pipeline

`.github/workflows/main.yml`:

- Запускается на каждый push в `main`, каждый PR в `main` и по `workflow_dispatch` (его дёргает workflow регенерации эталонов).
- Работает в контейнере `mcr.microsoft.com/playwright:v1.58.2-noble`, Node.js 24.17.0.
- Шаги по порядку:
  1. `yarn install --frozen-lockfile`
  2. сверка тега playwright-образа с lockfile (`node scripts/assert-playwright-image.mjs`)
  3. проверка типов (`yarn lint:ts` — это `tsc --noEmit`; ESLint в CI не запускается)
  4. lint SCSS (`yarn lint:scss`)
  5. unit-тесты (`yarn test:unit`)
  6. проверка генератора слайсов (`yarn check:generator`)
  7. сборка Storybook (`yarn build:sb`)
  8. скриншотные тесты (`yarn test:ui:ci`)
  9. сборка прода (`yarn build:prod`)
- При падении скриншот-тестов собирает отчёт (`yarn test:ui:report`) и загружает артефакт `screenshot-diffs` (хранится 7 дней): `screen-tests/diffs`, `screen-tests/current`, `screen-tests/report.html`, `screen-tests/report-expected`, `screen-tests/report-actual`, `screen-tests/report-diff`.

CI здесь — гейт: он проверяет, что закоммиченные эталоны соответствуют закоммиченному коду. Он ловит то, что локальный прогон в принципе не может: правку компонента без запуска скриншотов, регрессию от обновления зависимости в `yarn.lock`, результат мержа двух зелёных по отдельности веток.

Если CI падает на скриншотах:

1. Запусти `yarn test:ui:pull` — артефакт упавшего прогона окажется в `screen-tests/` (либо скачай `screenshot-diffs` со страницы прогона вручную).
2. Открой `screen-tests/report.html` — если изменение ожидаемое, запусти workflow «update screen-test snapshots».
3. Если изменение **не** ожидаемое — это регрессия, чини код.

### Новые стори без эталона

В CI эталоны не записываются, поэтому каждая новая стори валит `main.yml` с сообщением `New snapshot was not written. The update flag must be explicitly passed to write a new snapshot`.

Сравнивать её не с чем, поэтому `config/storybook/test-runner.ts` сам сохраняет её снимок как `screen-tests/current/<story id>-new.png`. Генератор отчёта (`scripts/generate-visual-json-report.mjs`) кладёт такие снимки в `report-actual/` и в раздел новых картинок `report.html`. Так новые стори видны в артефакте и в отчёте ещё до того, как стали эталоном.

Это ожидаемо: посмотри снимок в отчёте и запусти «update screen-test snapshots» — он запишет эталоны и для новых стори.

### Стори, которая ничего не отрисовала

Перед снимком `test-runner.ts` ждёт, пока в `#storybook-root` появится хоть один элемент, — не дольше 10 секунд. Если стори так ничего и не отрисовала, тест падает с ошибкой `Story "<story id>" rendered nothing within 10000 ms`.

Обычно это стори пустого состояния (например, компонент, который для гостя возвращает `null`). Фотографировать там нечего, поэтому такую стори лучше убрать, а пустое состояние проверить unit-тестом.

Эта ошибка не лечится обновлением эталонов: «update screen-test snapshots» на ней тоже упадёт и ничего не закоммитит.
