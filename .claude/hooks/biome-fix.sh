#!/usr/bin/env bash
# Claude / Codex 共通。npm は必ず現在の Compose プロジェクト内で実行する。
source "$(dirname "$0")/edited-files.sh"
biome_files=()
for file in "${files[@]}"; do
  case "$file" in
    *.ts | *.tsx | *.js | *.jsx | *.json | *.jsonc | *.css | *.html)
      biome_files+=("/app/${file#"$project_dir"/}") ;;
  esac
done
[ "${#biome_files[@]}" -gt 0 ] || exit 0

cd "$project_dir" || exit 2
docker info >/dev/null 2>&1 || exit 0

# 固定名だと別 clone のファイルを整形する恐れがある。未作成なら compose run を使う。
container=$(docker compose ps --status running -q app 2>/dev/null || true)
if [ -n "$container" ]; then
  output=$(docker exec "$container" npx --no-install biome check --write "${biome_files[@]}" 2>&1) && exit 0
else
  output=$(docker compose run --rm --no-deps app npx --no-install biome check --write "${biome_files[@]}" 2>&1) && exit 0
fi

# 複数ファイルの診断も1件の JSON にまとめ、編集はブロックしない。
jq -n --arg ctx "$output" '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: $ctx}}'
