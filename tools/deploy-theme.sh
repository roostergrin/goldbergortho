#!/usr/bin/env bash
# Upload every file in dist/ that changed since the last deploy, in one SFTP session (one password prompt).
#
# Usage: tools/deploy-theme.sh <user@host> <port> <remote theme dir> [base git ref]
#   e.g. tools/deploy-theme.sh myuser@goldbergortho.com 22 httpdocs/wp-content/themes/dist
#
# The base ref defaults to the local tag "deployed-live", which this script moves to HEAD after a
# successful upload. Commit your changes and run `npm run build` first. See CLAUDE.md / PRIVACY.md.
set -euo pipefail

TARGET=${1:?user@host required}
PORT=${2:?port required}
REMOTE=${3:?remote theme dir required (e.g. httpdocs/wp-content/themes/dist)}
BASE=${4:-deployed-live}

cd "$(git rev-parse --show-toplevel)"

if [ -n "$(git status --porcelain -- dist)" ]; then
  echo "dist/ has uncommitted changes. Commit (after npm run build) before deploying." >&2
  exit 1
fi
node tools/privacy/check-consent.js

FILES=$(git diff --name-only --diff-filter=ACMR "$BASE" HEAD -- dist | sed 's#^dist/##')
DELETED=$(git diff --name-only --diff-filter=D "$BASE" HEAD -- dist | sed 's#^dist/##')
if [ -z "$FILES" ]; then
  echo "Nothing in dist/ changed since $BASE."
  exit 0
fi

echo "Uploading to $TARGET:$REMOTE"
echo "$FILES" | sed 's/^/  /'
[ -n "$DELETED" ] && echo "Deleted locally (NOT removed on the server, delete by hand if needed):" && echo "$DELETED" | sed 's/^/  /'
read -r -p "Continue? [y/N] " ok
[ "$ok" = "y" ] || exit 1

BATCH=$(mktemp)
trap 'rm -f "$BATCH"' EXIT
for dir in $(echo "$FILES" | xargs -n1 dirname | sort -u | grep -v '^\.$' || true); do
  # create each parent level; "-" ignores "already exists"
  path=""
  IFS='/' read -ra parts <<< "$dir"
  for part in "${parts[@]}"; do
    path="${path:+$path/}$part"
    echo "-mkdir \"$REMOTE/$path\"" >> "$BATCH"
  done
done
for f in $FILES; do
  echo "put \"dist/$f\" \"$REMOTE/$f\"" >> "$BATCH"
done

# Commands come from the file; the password prompt still goes to the terminal
OUT=$(sftp -P "$PORT" "$TARGET" < "$BATCH" 2>&1 | tee /dev/stderr)
# "Couldn't create directory" just means the folder already exists
if echo "$OUT" | grep -v "Couldn't create directory" | grep -qiE "permission denied|no such file|failure|not found|connection closed|connection reset"; then
  echo "Upload reported errors. Check the output above; the deployed-live tag was not moved." >&2
  exit 1
fi

git tag -f deployed-live HEAD >/dev/null
echo "Done. Tagged HEAD as deployed-live. Now load the site once and run the consent audit (PRIVACY.md)."
