#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="$(ruby -e 'puts Gem.user_dir')/bin:${PATH}"

API_PORT="${API_PORT:-43124}"
WEB_PORT="${WEB_PORT:-43123}"

cleanup() {
  kill 0 2>/dev/null || true
}
trap cleanup EXIT

(
  cd "$ROOT/backend"
  bundle exec rails db:prepare
  PORT="$API_PORT" APP_HOST="127.0.0.1" bundle exec rails server -b 0.0.0.0 -p "$API_PORT"
) &

(
  cd "$ROOT/frontend"
  API_URL="http://127.0.0.1:${API_PORT}" npm run dev -- -H 0.0.0.0 -p "$WEB_PORT"
) &

wait
