#!/usr/bin/env bash
# Rutina de verificación y construcción previa al despliegue de la web.
# Uso:  bash scripts/deploy.sh            -> verifica y genera web/dist
#       bash scripts/deploy.sh netlify    -> además publica con Netlify CLI
#       bash scripts/deploy.sh vercel     -> además publica con Vercel CLI
set -euo pipefail
cd "$(dirname "$0")/.."

echo "1/4 Instalando dependencias"
npm --prefix packages/core ci || npm --prefix packages/core install
npm --prefix web ci || npm --prefix web install

echo "2/4 Pruebas unitarias del núcleo"
npm --prefix packages/core test

echo "3/4 Tipos (TypeScript)"
npm --prefix packages/core run typecheck
npm --prefix web run typecheck

echo "4/4 Build de producción"
npm --prefix web run build
echo "Listo: web/dist"

case "${1:-}" in
  netlify) npx --yes netlify-cli deploy --prod --dir=web/dist ;;
  vercel)  (cd web && npx --yes vercel deploy --prebuilt=false --prod) ;;
  "")      echo "Sube web/dist al hosting que prefieras (ver docs/DESPLIEGUE.md)." ;;
  *)       echo "Destino desconocido: $1"; exit 1 ;;
esac
