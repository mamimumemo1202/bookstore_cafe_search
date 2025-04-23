#!/bin/bash
set -e

echo "📦 Preparing database..."
bundle exec rails db:prepare

rm -f tmp/pids/server.pid

exec "$@"
