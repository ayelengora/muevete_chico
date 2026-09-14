#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if command -v rbenv >/dev/null 2>&1; then
  echo "3.2.3" > "$ROOT/backend/.ruby-version"
  eval "$(rbenv init - zsh 2>/dev/null || rbenv init -)"
  if ! rbenv versions --bare | grep -qx "3.2.3"; then
    echo "Ruby 3.2.3 no está instalado."
    echo "Corré primero: ./scripts/setup.sh"
    echo "O a mano: rbenv install 3.2.3"
    exit 1
  fi
fi

if ! command -v bundle >/dev/null 2>&1; then
  echo "No encuentro bundler. Corré: ./scripts/setup.sh"
  exit 1
fi

if [[ ! -d "$ROOT/frontend/node_modules/next" ]]; then
  echo "Faltan las dependencias de Next. Corré: ./scripts/setup.sh"
  echo "O: cd frontend && npm install"
  exit 1
fi

API_PORT="${API_PORT:-43124}"
WEB_PORT="${WEB_PORT:-43123}"

cleanup() {
  kill 0 2>/dev/null || true
}
trap cleanup EXIT

(
  cd "$ROOT/backend"
  bundle exec rails db:prepare
  PORT="$API_PORT" APP_HOST="127.0.0.1" bundle exec rails server -b 127.0.0.1 -p "$API_PORT"
) &

(
  cd "$ROOT/frontend"
  API_URL="http://127.0.0.1:${API_PORT}" npm run dev -- -H 127.0.0.1 -p "$WEB_PORT"
) &

echo "Sitio: http://127.0.0.1:${WEB_PORT}"
echo "API:   http://127.0.0.1:${API_PORT}"
wait
