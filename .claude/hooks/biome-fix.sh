#!/bin/sh
# Claude Code PostToolUse(Write|Edit)フック:
# 編集されたファイルにBiomeのlint自動修正+フォーマットを適用する。
#
# このプロジェクトは「npmをホストで実行しない」方針で、node_modulesの
# バイナリもLinux版(コンテナでinstallしたもの)のため、Biomeは必ず
# Dockerコンテナ内で実行する。devサーバ等のコンテナが起動していれば
# docker exec(速い)、なければ使い捨てコンテナ(docker compose run)で動かす。
#
# stdin: Claude Codeのフック入力JSON({"tool_input":{"file_path":...}, ...})
set -eu

repo_root="$(cd "$(dirname "$0")/../.." && pwd)"

# フック入力JSONから編集対象のファイルパスを取り出す
file_path="$(jq -r '.tool_input.file_path // .tool_response.filePath // empty')"
[ -n "$file_path" ] || exit 0
[ -f "$file_path" ] || exit 0

# リポジトリ外のファイルは対象外。コンテナ内パス(/app/...)に変換するため相対化する
case "$file_path" in
  "$repo_root"/*) rel_path="${file_path#"$repo_root"/}" ;;
  *) exit 0 ;;
esac

# Biomeが扱うファイルだけに絞る(それ以外を渡すとエラーになる)
case "$rel_path" in
  *.ts | *.tsx | *.js | *.jsx | *.json | *.jsonc | *.css | *.html) ;;
  *) exit 0 ;;
esac

cd "$repo_root"
docker info >/dev/null 2>&1 || exit 0

# 固定のコンテナ名だと、別の clone / worktree のファイルを整形してしまう。
# 現在の Compose プロジェクトに属する実行中の app だけを再利用する。
# Compose の旧版はコンテナ未作成時にも非ゼロを返す。その場合は run に進む。
container="$(docker compose ps --status running -q app 2>/dev/null || true)"

# --write: 安全な自動修正+フォーマットを適用。
# 自動修正できない指摘はコンテキストとして返し、編集はブロックしない。
if [ -n "$container" ]; then
  output=$(docker exec "$container" npx --no-install biome check --write "/app/$rel_path" 2>&1) && exit 0
else
  output=$(docker compose run --rm --no-deps app npx --no-install biome check --write "/app/$rel_path" 2>&1) && exit 0
fi
jq -n --arg ctx "$output" '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: $ctx}}'
