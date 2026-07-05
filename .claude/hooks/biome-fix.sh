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

container="probability-distribution-visualization-app-1"
if docker ps --format '{{.Names}}' | grep -qx "$container"; then
  runner="docker exec $container"
else
  cd "$repo_root"
  runner="docker compose run --rm --no-deps app"
fi

# --write: 安全な自動修正+フォーマットを適用。
# 自動修正できないlintエラーが残っていても編集をブロックしない(|| true)。
# 残りはCI(npm run lint)とエディタが検出する
$runner npx biome check --write "/app/$rel_path" >/dev/null 2>&1 || true
