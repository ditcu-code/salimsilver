#!/bin/bash

# Configuration
CONSOLIDATED_VERSION="20260114000000"

# List of old migrations to revert (collected from previous state)
OLD_MIGRATIONS=(
  "20251216000000"
  "20251216000001"
  "20251216100000"
  "20251216103000"
  "20251224110300"
  "20251227100000"
  "20251227103000"
  "20251227110000"
  "20251227113000"
  "20251228120000"
  "20251228130000"
  "20251229122845"
  "20251229130000"
  "20260102161200"
  "20260102183500"
  "20260102213900"
  "20260109000000"
  "20260109000001"
  "20260109133000"
  "20260109140000"
  "20260111044525"
  "20260111114000"
  "20260113000000"
)

echo "⚠️  WARNING: This script will modify the REMOTE migration history."
echo "It will:"
echo "1. Mark the new consolidated migration ($CONSOLIDATED_VERSION) as APPLIED."
echo "2. Mark all old migrations as REVERTED (to clean up history)."
echo ""
read -p "Are you sure you want to proceed? (y/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

echo "🚀 Marking consolidated migration as applied..."
npx supabase migration repair --status applied "$CONSOLIDATED_VERSION"

echo "🧹 Cleaning up old migration history..."
for version in "${OLD_MIGRATIONS[@]}"; do
  echo "Reverting $version..."
  npx supabase migration repair --status reverted "$version"
done

echo "✅ Migration history sync complete!"
echo "You can now safely run 'supabase db push' if needed (though schema should already match)."
