---
name: commit
description: How to create commits in this repository — branch naming, semantic commit units, Conventional Commits format, and the required Claude co-author trailer. Use whenever committing changes here.
---

# Commit conventions for this repository

## Before committing

1. Run the checks; never commit red:

   ```bash
   docker compose run --rm app sh -c "npm run lint && npm run typecheck && npm test"
   ```

2. Confirm the git identity is the GitHub noreply address. A personal email must never be used — it becomes permanently public in commit metadata once pushed:

   ```bash
   git config user.email
   ```

3. Review the staged diff for secrets — nothing confidential may enter history:

   ```bash
   git diff --cached
   ```

   - Never commit: API keys, access tokens, private keys, passwords, `.env` contents, personal email addresses
   - Fine to commit: identifiers the site already serves to every visitor (the GA4 measurement ID, the Search Console verification token, the public Google Form URL) — treat "would this value appear in the browser anyway?" as the test
   - Noticed only after push? History cannot be rewritten here (force-push is denied): rotate/invalidate the credential immediately, then remove it with a follow-up commit

4. Work on a branch, not on main: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, `chore/<topic>`.
5. **Never force-push** (`--force` / `--force-with-lease` / `-f`) — permissions deny it.
   If a pushed branch needs different history, prefer additive fixes (revert commits,
   follow-up commits) or start a fresh branch; if a rewrite is truly unavoidable, ask
   the product owner to run it themselves.

## Commit units

Split the work so each commit is one meaningful unit — one feature, one layer, one concern. For a large change, a typical sequence is:

1. requirements/spec docs
2. environment & tooling (Docker, scaffolding, linter)
3. domain layer (with its tests)
4. state management
5. UI
6. CI/CD
7. remaining docs

Never mix unrelated concerns in a single commit.

## Message format

Conventional Commits, written in English, imperative mood:

```
<type>: <summary>

[optional body — explain why, not what]

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

- `<type>` is one of: `feat` / `fix` / `docs` / `chore` / `refactor` / `test` / `ci` / `perf`
- The `Co-Authored-By` trailer is **required on every commit created with Claude**. GitHub renders the commit as authored by "shin4488 and Claude" (two avatars). The commit author/committer themselves come from git config, i.e. shin4488
- Pass multi-line messages with a heredoc so the trailer line survives shell quoting:

  ```bash
  git commit -m "$(cat <<'EOF'
  feat: add the geometric distribution

  Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
  EOF
  )"
  ```

## After committing

`git log --format='%h %an %s%n%(trailers)'` to confirm the author and the trailer on each new commit. Push only when the user asks.
