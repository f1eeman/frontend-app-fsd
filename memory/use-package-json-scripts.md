---
name: use-package-json-scripts
description: Run typecheck/lint/tests via package.json yarn scripts, not raw npx/tsc/eslint
metadata:
  type: feedback
---

Always run typechecking, linting, and tests through the package.json scripts (this project uses yarn), never raw `npx tsc` / `eslint` invocations.

**Why:** The scripts encode the right config paths and flags; ad-hoc commands miss them and can give misleading results.

**How to apply:** Use these scripts:

- Typecheck: `yarn lint:ts` (`tsc --noEmit`)
- ESLint: `yarn lint:es` (or `lint:es:fix`, `lint:es:quiet`)
- Stylelint: `yarn lint:scss` (or `lint:scss:fix`)
- Format: `yarn format`
- Unit tests: `yarn test:unit` (jest with `./config/jest/jest.config.ts`)
- Storybook UI tests: `yarn test:ui` (and `:ok` to update snapshots)
