# Покрытие тестами и Storybook-историями недостающих модулей

**Дата:** 2026-05-18
**Скоуп выполнения:** один коммит, без промежуточных чекпоинтов.

## Цель

Закрыть пробелы в покрытии unit-тестами и Storybook-историями в трёх приоритетных слоях: недавно изменённый код вокруг комментариев и страницы статьи, страницы без stories, виджеты без stories.

## Контекст

Текущее состояние покрытия (на момент 2026-05-18):

- Stories есть у большинства компонентов `shared/ui`, у всех виджетов кроме `appLoader`, `langSwticher`, `pageLoader`, и только у одной страницы (`profilePage`).
- Тесты есть у slice'ов и сервисов `features/editableProfileCard`, частично у `features/authByUsername`, у `widgets/sidebar` и `shared/ui/button`.
- Недавно добавлены: `features/addCommentForm` (форма + slice), `pages/ArticleDetailsPage/model/services/addCommentForArticle`, изменения в `entities/comment/ui/CommentCard`, `pages/ArticleDetailsPage/ui/ArticleDetailsPage`. Тестов и story-файла на эти изменения нет; story `AddCommentForm` падает по таймауту (нет `StoreDecorator`).

## Решение

Покрываем три уровня:

### Tier 1. Comments / Article details

**Unit-тесты:**

1. `src/features/addCommentForm/model/slices/addCommentFormSlice.test.ts`
   Проверяет initial state и reducer `setText`. Образец — `src/features/editableProfileCard/model/slice/profileSlice.test.ts`.

2. `src/pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle.test.ts`
   Кейсы:
   - success — есть пользователь, статья и текст → `extra.api.post` вызывается с `{ articleId, userId, text }`, возвращает comment, dispatch `fetchCommentsByArticleId`, результат `fulfilled`.
   - rejected — нет пользователя.
   - rejected — пустой текст.
   - rejected — нет статьи.
   - rejected — api ошибка (мок post → reject).
     Образец — `src/features/editableProfileCard/model/services/updateProfileData/updateProfileData.test.ts`. Используем `TestAsyncThunk` и моки `getState`.

3. `src/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId.test.ts`
   Кейсы: success, error. Образец — `fetchProfileData.test.ts`.

4. `src/pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice.test.ts`
   ExtraReducers для `fetchCommentsByArticleId`: `pending` (isLoading=true, error=undefined), `fulfilled` (isLoading=false, в стейте есть комментарии через адаптер), `rejected` (isLoading=false, error выставлен).

**Stories:**

5. Правка `src/features/addCommentForm/ui/AddCommentForm/AddCommentForm.stories.tsx`
   Добавить `StoreDecorator({ addCommentForm: { text: '' } })`. Цель — починить smoke-test (#storybook-root перестанет быть пустым).

6. `src/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.stories.tsx`
   `StoreDecorator` с минимальным стейтом: `articleDetails` (один article), `articleDetailsComments` (entity-list с одним-двумя комментариями), `user` (userData с id). Маршрут `/articles/1` через `parameters.reactRouter` (или ручной MemoryRouter в decorators, если плагин не подключён — проверим через preview.ts).

### Tier 2. Page stories

7. `src/pages/mainPage/ui/MainPage.stories.tsx` — рендерит Navbar/Sidebar/Outlet; нужен `StoreDecorator` (т.к. Sidebar/Navbar читают user). Минимальный стейт: `user: { authData: undefined }` либо authed-вариант — посмотрим по существующим storyдля Navbar.

8. `src/pages/aboutPage/ui/AboutPage.stories.tsx` — простая страница, BugButton + i18n. `StoreDecorator` не нужен.

9. `src/pages/notFoundPage/ui/NotFoundPage.stories.tsx` — статичный текст. `StoreDecorator` не нужен.

10. `src/pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.stories.tsx` — пока компонент пустой/простой; story-обёртка без стора либо с пустым стором.

### Tier 3. Widget stories

11. `src/widgets/appLoader/ui/AppLoader.stories.tsx`
12. `src/widgets/langSwticher/ui/LangSwitcher.stories.tsx`
13. `src/widgets/pageLoader/ui/PageLoader.stories.tsx`

Все три — без `StoreDecorator`, простые обёртки.

## За скоупом

- Render-тесты `shared/ui` (Avatar, Text, Modal, Select и т.д.) — уже покрыты Storybook smoke-test'ом и `toMatchImageSnapshot` через `config/storybook/test-runner.ts`.
- Render-тесты `CommentCard`/`CommentList`/`AddCommentForm` — то же самое, smoke + image snapshot.
- Stories для `EditableProfileCard` (отдельного UI-компонента у фичи нет, есть только обёртка над `ProfileCard` из entities).
- Stories для `entities/user` (UI отсутствует).

## Тестовая стратегия

- **Slice-тесты:** прямой вызов reducer'а с начальным состоянием. Без `configureStore` — этого достаточно для проверки сведения reducer'ов.
- **Async-thunk тесты:** `TestAsyncThunk` (`src/shared/lib/tests/async.thunk.tests.ts`) — позволяет мокать `api`, `dispatch`, `getState`.
- **Story-валидация:** запуск storybook test-runner локально (smoke-test пройдёт, если `#storybook-root` непуст).

## Риски

- Сторя для `ArticleDetailsPage` требует знать схему `articleDetails` и `articleDetailsComments` стейта. На момент написания спека эти схемы есть в репозитории — могут потребоваться правки моков, если поля типизированы строже. Уточним при импликации, ничего критичного.
- Story для `MainPage` рендерит `<Outlet>` — пустой outlet даст пустой блок; это допустимо для визуального превью.
- `LangSwitcher` использует `useTranslation`/`i18n.changeLanguage` — story будет менять язык глобально. Не сбрасываем — допустимо для Storybook-сессии.

## Готовность

Все правки попадают в один коммит после прогона:

- `yarn test` (или эквивалент) — все unit-тесты зелёные.
- Storybook test-runner для добавленных stories — smoke-test зелёный (минимум `#storybook-root` непуст).
