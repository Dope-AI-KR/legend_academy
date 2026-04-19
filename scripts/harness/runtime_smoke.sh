#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
APP_DIR="$ROOT_DIR/pitching"
PORT="${PORT:-3100}"
HOST="${HOST:-127.0.0.1}"
TMP_LOG="$(mktemp)"
TMP_RESP="$(mktemp)"

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" >/dev/null 2>&1 || true
  fi
  rm -f "$TMP_LOG" "$TMP_RESP"
}
trap cleanup EXIT

cd "$APP_DIR"
NEXT_TELEMETRY_DISABLED=1 ./node_modules/.bin/next start --hostname "$HOST" --port "$PORT" >"$TMP_LOG" 2>&1 &
SERVER_PID=$!

for _ in $(seq 1 30); do
  if curl -fsS "http://$HOST:$PORT" >"$TMP_RESP"; then
    break
  fi
  sleep 1
done

grep -q '레전드 아카데미' "$TMP_RESP"
