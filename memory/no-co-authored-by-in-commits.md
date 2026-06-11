---
name: no-co-authored-by-in-commits
description: Never add the Co-Authored-By Claude trailer to git commits
metadata:
  type: feedback
---

Do NOT add the `Co-Authored-By: Claude ...` trailer (or any AI-authorship line) to git commit messages in this project.

**Why:** The user explicitly wants commits without Claude's authorship ("commit без твоего авторства"). This is set persistently and globally via `"includeCoAuthoredBy": false` in `~/.claude/settings.json` (applies to all projects).

**How to apply:** Commit messages contain only the substantive description. No co-author trailer, no "Generated with Claude" lines.
