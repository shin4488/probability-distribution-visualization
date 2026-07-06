---
name: post-merge
description: What to do right after a PR is merged into main — verify main and the deployed site, then clean up branches. Use whenever the user says a PR was merged (e.g. 「マージしました」).
---

# After a PR merges

A merge is not "done" until main is verified and the branches are gone.
Run this whole checklist; report each result with evidence, not "should work".

## 1. Update local main and confirm the merge landed

```bash
git checkout main
git pull origin main
git log --oneline -5   # マージコミットと中身のコミットが載っていること
```

## 2. Verify main actually works

```bash
docker compose run --rm --no-deps app sh -c "npm ci && npm run lint:ci && npm run typecheck && npm test && npm run build"
```

- `npm ci` matters: it proves a clean install of the merged lockfile works, not just
  your incumbent node_modules.
- Caveat learned the hard way: `npm ci` swaps node_modules under a **running dev
  server**, which can break its serving state and spray a stray `.vite/` cache into the
  repo root. If checks suddenly flag files you never wrote, look for locally generated
  artifacts first (`git status --short`), delete them, and restart the dev server —
  don't "fix" main for an environmental problem.

## 3. Verify the deployment

```bash
gh run list --branch main --limit 3
```

- The newest "Deploy to GitHub Pages" run must be `completed success`.
- A `cancelled` run for an older merge is normal — the concurrency group replaces
  superseded runs with the newest one.
- Then check the live site serves the merged change. Don't just load the top page —
  curl for the specific change and the assets it added, e.g.:

```bash
BASE=https://shin4488.github.io/probability-distribution-visualization
curl -s $BASE/ | grep -o '<新しく入ったはずの文字列やタグ>'
curl -s -o /dev/null -w "%{http_code}\n" $BASE/<追加した静的ファイル>
```

## 4. Clean up branches

```bash
git branch -d <branch>                 # -d(-Dではなく): マージ済み確認を兼ねる
git push origin --delete <branch>      # リモートに残っていれば(GitHubの自動削除設定なら不要)
git fetch --prune origin               # 消えたリモートブランチへの参照を掃除
git branch -a                          # main(とorigin/main)だけになったことを確認
```

- Use `-d`, not `-D`: if git refuses, the branch was NOT merged — stop and check
  before deleting anything.
- Stacked PRs: when a base branch's PR merges and the branch is deleted, GitHub
  automatically retargets dependent PRs to main. Clean up in merge order.

## 5. Report

State what was verified (checks, deploy run, live-site evidence) and what was deleted.
If anything failed, main is broken for everyone — fixing it takes priority over any
other task, via a new `fix/` branch (see `create-branch`).
