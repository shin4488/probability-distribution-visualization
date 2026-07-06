---
name: create-branch
description: How to start a new branch in this repository — when to branch, how to name it, and the exact commands. Use whenever beginning work that will become a pull request.
model: sonnet
---

> `model: sonnet` — this is mechanical work, so it runs on the cheaper Sonnet.
> The unversioned alias tracks the latest available Sonnet automatically.

# Creating a branch

All work lands on `main` through a pull request; never commit to `main` directly.
This skill covers starting the branch; the `commit` skill covers committing on it.

## One branch = one topic = one PR

A branch carries a single meaning, at the same granularity you would describe the
resulting PR in one sentence. If two unrelated requests arrive together, make two
branches (finish and PR one, then start the other from main — or base the second on
the latest main in parallel). Mixed-topic branches produce mixed-topic PRs that are
hard to review and hard to revert.

## Naming

```
<type>/<topic>
```

- `<type>` matches the Conventional Commit type of the branch's *dominant* change:
  `feat` / `fix` / `docs` / `chore` / `refactor` / `ci`
- `<topic>` is short kebab-case English describing the outcome, not the process:
  `feat/seo-and-tagline`, `fix/number-input-editing`, `chore/create-branch-skill`

## Procedure

```bash
# 1. 作業ツリーが綺麗なことを確認する。無関係な変更を新ブランチに持ち込まない
git status --short

# 2. 最新のmainを取得し、それを基点にブランチを切る
#    (ローカルmainが古くても、origin/main基点なら常に最新から始まる)
git fetch origin
git checkout -b <type>/<topic> origin/main

# 3. 作業 → commit skillに従ってコミット → push
git push -u origin <type>/<topic>
```

- Pushing the branch triggers CI (lint with warnings-as-errors, typecheck, tests,
  build), so breakage is visible before and on the PR.
- After the PR merges: follow the `post-merge` skill — verify main (checks, deploy,
  live site), then delete the branch locally and remotely.

## Checklist before creating

1. Is the working tree clean (or is every leftover change intentionally part of this topic)?
2. Does the branch name describe one outcome a reviewer will recognize in the PR title?
3. Are you branching from `origin/main`, not from another feature branch or a stale local main?
