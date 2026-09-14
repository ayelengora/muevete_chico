#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Falta $1. Instalalo y volvé a intentar."
    exit 1
  }
}

need node
need npm

if command -v rbenv >/dev/null 2>&1; then
  # rbenv espera "3.2.3", no el formato RVM "ruby-3.2.3"
  echo "3.2.3" > "$ROOT/backend/.ruby-version"
  if ! rbenv versions --bare | grep -qx "3.2.3"; then
    echo "Instalando Ruby 3.2.3 con rbenv (la primera vez tarda)..."
    rbenv install -s 3.2.3
  fi
  eval "$(rbenv init -)"
  (cd "$ROOT/backend" && rbenv local 3.2.3)
fi

need ruby
need bundle

echo "→ gems"
(
  cd "$ROOT/backend"
  bundle config set --local path vendor/bundle
  bundle install
  bundle exec rails db:prepare
  bundle exec rails db:seed
)

echo "→ npm"
(
  cd "$ROOT/frontend"
  npm install
)

echo
echo "Listo. Corré: ./scripts/dev.sh"
echo "Después abrí http://127.0.0.1:43123"
