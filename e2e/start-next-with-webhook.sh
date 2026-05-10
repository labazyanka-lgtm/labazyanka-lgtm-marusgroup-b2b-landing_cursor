#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WH_PORT="${WEBHOOK_MOCK_PORT:-18080}"
APP_PORT="${NEXT_TEST_PORT:-3001}"

export ESTIMATE_WEBHOOK_URL="http://127.0.0.1:${WH_PORT}/hook"
export WEBHOOK_MOCK_PORT="$WH_PORT"

node "$ROOT/e2e/fixtures/webhook-server.mjs" &
MOCK_PID=$!

cleanup() {
  kill "$MOCK_PID" 2>/dev/null || true
}
trap cleanup EXIT

for _ in $(seq 1 50); do
  if curl -sf "http://127.0.0.1:${WH_PORT}/health" >/dev/null; then
    break
  fi
  sleep 0.1
done

cd "$ROOT"
export NODE_ENV=production
exec ./node_modules/.bin/next start -p "$APP_PORT"
