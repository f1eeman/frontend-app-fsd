---
name: bash-tool-uses-bash-not-powershell
description: The Bash tool runs /usr/bin/bash even on this Windows box — don't use PowerShell syntax in it
metadata:
  type: feedback
---

The Bash tool on this machine executes via `/usr/bin/bash`, NOT PowerShell — even though the OS is Windows. PowerShell-only syntax silently corrupts arguments instead of erroring.

**Why:** I once wrote a git commit message using a PowerShell here-string (`@'...'@`) inside the Bash tool. Bash doesn't understand here-strings, so the literal `@` characters ended up in the commit subject/body, producing a broken message that needed a `--amend` to fix.

**How to apply:**

- For multiline git commit messages in the Bash tool, use repeated `-m` flags (one per paragraph) or a heredoc (`git commit -F - <<'EOF' ... EOF`). Do NOT use `@'...'@`.
- Reserve PowerShell syntax (`$env:`, `@'...'@`, `$null`, backtick continuation) for the PowerShell tool only.
- See also [[use-package-json-scripts]] for running project tooling.
