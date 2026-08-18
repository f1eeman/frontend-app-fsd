# ArticleDetailsPage Stories After Decomposition — Design Spec

**Date:** 2026-08-18
**Status:** Approved

## Summary

`ArticleDetailsPage` was decomposed into `ArticleDetailsPageHeader`, `ArticleDetails`,
`ArticleRecommendationList` and `ArticleDetailsComments`. Recommendations moved from a
thunk-driven slice to RTK Query (`features/articleRecommendationList/api/api.ts`).
Three story files need to catch up:

- `pages/articleDetailsPage/ui/articleDetailsPage/ArticleDetailsPage.stories.tsx` — stale store keys, recommendations render as nothing
- `pages/articleDetailsPage/ui/articleDetailsComments/ArticleDetailsComments.stories.tsx` — empty file
- `features/articleRecommendationList/ui/articleRecommendationList/ArticleRecommendationList.stories.tsx` — stub without data

## Problem

Every thunk-based fetch in the app is guarded by `if (__PROJECT__ === 'sb')`, so stories
feed components through `StoreDecorator` and nothing hits the network. RTK Query has no
such guard: `useArticleRecommendationList(3)` always fires. In Storybook `__API__` is `''`,
the request fails, `error` becomes truthy and `ArticleRecommendationList` returns `null`.

## Approach: mock `fetch` via a decorator

Rejected alternatives:

- **Preseeding the RTK Query cache** through `StoreDecorator` couples stories to RTK Query's
  internal state shape, and `refetchOnFocus: true` (set in `shared/api/rtkApi.ts`) can fire a
  real request that fails and wipes the block out.
- **msw + msw-storybook-addon** is the canonical answer but adds two dependencies, a service
  worker in the static build and wiring in both `preview.ts` and `test-runner.ts` — too many
  moving parts for one feature.

## New: `src/shared/lib/sb/decorators/MockFetch.tsx`

```ts
interface MockFetchRoute {
  body?: unknown
  status?: number // default 200
  delayMs?: number // default 0; a large value keeps the story in loading
}

type MockFetchRoutes = Record<string, MockFetchRoute> // key = URL substring, e.g. '/articles'

export const MockFetchDecorator: (routes: MockFetchRoutes) => Decorator
```

Contract:

- Installs the stub synchronously during render (via `useMemo`) so it is in place before
  RTK Query fires its request from an effect; restores the original `fetch` on unmount.
- Accepts all three `fetch` input forms (`string | URL | Request`) — RTK Query passes a `Request`.
- Responds with `content-type: application/json`, otherwise `fetchBaseQuery` will not parse the body.
- URLs that match no route fall through to the original `fetch`.

## Stories

### ArticleRecommendationList

Fixture: three articles. Stories — `Playground` (repo-wide convention), `Normal`,
`Loading` (large `delayMs`), `Empty` (`body: []`, so `ArticleList` renders «Статьи не найдены»).

Each story gets its own `StoreDecorator({})`. Without one they all share the store from
`preview.ts`, and with it the RTK Query cache — `Loading` and `Empty` would show whatever
`Normal` fetched first.

**No `Error` story.** On error the component returns `null`, `#storybook-root` stays empty and
`postVisit` in `config/storybook/test-runner.ts` waits for `root.childElementCount > 0` — the
screenshot test would hang for 60s and fail. A comment in the file records this.

### ArticleDetailsComments

`title: 'pages/ArticleDetailsPage/ArticleDetailsComments'`, `args: { id: '1' }`. No fetch mock —
the component is guarded by `__PROJECT__ === 'sb'` and reads comments from the store. Keeps the
default router from `preview.ts` (`CommentCard` links to a profile), so no `router: 'none'`.

Stories: `Normal` (two comments, authenticated user, `addCommentForm: { text: '' }`),
`Loading` (`isLoading: true` → `CommentList` skeletons), `Empty` (empty adapter state).

### ArticleDetailsPage

- Drop the `articleDetailsPageRecommendations` store key — the slice is gone.
- Add `MockFetchDecorator({ '/articles': { body: articles } })` so the recommendations block renders.
- Decorator order: `[StoreDecorator(...), RouteWithIdDecorator, MockFetchDecorator(...)]` — mock outermost.
- New `NoId` story: `MemoryRouter` at `/articles/` without an `id`, covering the
  «Статья не найдена» branch in `ArticleDetailsPage.tsx`, currently untested.

## Cleanup

Now unused, replaced by RTK Query — removed in its own commit:

```
src/pages/articleDetailsPage/model/slices/articleDetailsPageRecommendationsSlice.ts
src/pages/articleDetailsPage/model/services/fetchArticleRecommendations/
src/pages/articleDetailsPage/model/types/ArticleDetailsRecommendationsSchema.ts
```

Their `declare module` still widened `LazyLoadedSlices`, which let stories type-check a store
key that does not exist at runtime.

## Verification

- `yarn lint:ts`, `yarn lint:es`, `yarn test:unit`
- `pages-articledetailspage--normal.png` and `pages-articledetailspage--no-article.png` change
  (recommendations now render) and need `yarn test:ui:ok` against a running Storybook. New
  stories create their baselines on the first run.
