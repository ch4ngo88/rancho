#!/bin/bash
set -e

echo "🧠 Checking current branch..."
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "❌ Du bist nicht auf 'main' – aktuell auf '$BRANCH'. Abbruch."
  exit 1
fi

echo "💾 Lokale Änderungen stashen..."
git stash push -m "💡 deploy stash" || true

echo "🔨 Build läuft..."
pnpm run build
echo "🧽 Manifest-Pfade anpassen für GitHub Pages..."


echo "🚀 Deployment beginnt..."

DEPLOY_DIR=../gh-pages-temp

# Clean up evtl. altes Worktree
git worktree remove $DEPLOY_DIR -f || true
rm -rf $DEPLOY_DIR

# Neues Worktree auf gh-pages
git fetch origin gh-pages || echo "gh-pages noch nicht vorhanden"
git worktree add $DEPLOY_DIR gh-pages || (
  git branch gh-pages || true
  git worktree add $DEPLOY_DIR gh-pages
)

# Inhalte kopieren
rm -rf $DEPLOY_DIR/*
cp -r dist/* $DEPLOY_DIR

# Commit & Push
cd $DEPLOY_DIR
git add .
git commit -m "🚀 live deploy $(date +%F_%H-%M-%S)" || echo "✅ Nichts Neues zu committen"
git push origin gh-pages
cd -

echo "🧹 Aufräumen..."
git worktree remove $DEPLOY_DIR -f || true
rm -rf $DEPLOY_DIR

echo "↩️ Zurück zu main, Stash wiederherstellen..."
git checkout main
git stash pop || echo "✔️ Kein Stash nötig"

echo "✅ Deployment abgeschlossen!"
