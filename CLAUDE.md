# frontend-app-fsd

## Agent skills

### Issue tracker

Issues and PRDs live as markdown files under `.scratch/<feature-slug>/` in this repo, committed alongside the code. There is no external tracker, and pull requests are not a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical vocabulary, unchanged — `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix` — recorded as a `Status:` line in each issue file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` plus `docs/adr/` at the repo root (both created lazily by `/domain-modeling`). See `docs/agents/domain.md`.

## Commits

- Format: one line, no body — `type(module): what was done`, e.g. `feat(articleList): stretch grid to full width`.
- No Claude attribution: never add `Co-Authored-By: Claude …` or any "Generated with Claude Code" line to commits or PRs.

## Code style

- No comments in code: don't add `//`, `/* */`, JSDoc or `#` comments. Tool directives (`eslint-disable`, `@ts-expect-error`, etc.) are the only exception.
