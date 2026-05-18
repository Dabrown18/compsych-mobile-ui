#!/bin/sh
# Enforces that every component in src/components/ has a test file.
# Runs as part of the pre-commit hook.

COMPONENTS_DIR="src/components"
MISSING=""
FOUND_MISSING=0

for dir in "$COMPONENTS_DIR"/*/; do
  [ -d "$dir" ] || continue
  component=$(basename "$dir")
  test_file="${dir}${component}.test.tsx"

  if [ ! -f "$test_file" ]; then
    MISSING="${MISSING}\n  ${test_file}"
    FOUND_MISSING=1
  fi
done

if [ "$FOUND_MISSING" -eq 1 ]; then
  printf "\nCommit blocked — missing test files:%b\n\n" "$MISSING"
  echo "Every component in src/components/ must have a ComponentName.test.tsx file."
  echo "Create the missing tests before committing."
  echo ""
  exit 1
fi

exit 0
