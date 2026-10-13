# Rutina de despliegue

## 0. Requisitos
- Node.js 20 o superior (probado con 22) y npm.
- Una cuenta gratuita en GitHub (opción A) o Netlify/Vercel (opción B).

## 1. Probar en local
```bash
npm run install:all     # instala núcleo, web y móvil
npm test                # 19 pruebas unitarias del núcleo
npm run typecheck       # TypeScript en núcleo, web y móvil
npm run dev:web         # http://localhost:5173
```

## 2. Construir la web
```bash
bash scripts/deploy.sh   # instala, prueba, revisa tipos y genera web/dist
```
El build usa rutas relativas (`base: './'`), así que `web/dist` funciona en la raíz de un dominio o en una subcarpeta.

## 3. Publicar la web

### Opción A: GitHub Pages (automática, recomendada)
1. Crea un repositorio y sube esta carpeta: `git init && git add . && git commit -m "Cumbre Café" && git branch -M main && git remote add origin <URL> && git push -u origin main`.
2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. El workflow `.github/workflows/ci-deploy.yml` corre pruebas, tipos y build en cada `push` a `main` y publica en `https://<usuario>.github.io/<repositorio>/`.

### Opción B: Netlify (arrastrar y soltar)
1. `bash scripts/deploy.sh` y abre https://app.netlify.com/drop.
2. Arrastra la carpeta `web/dist`. Recibes un link público al instante.
   - Por consola: `bash scripts/deploy.sh netlify`.

### Opción C: Vercel
`cd web && npx vercel` (framework: Vite, directorio de salida: `dist`).

## 4. App móvil (Expo)
```bash
cd mobile
npm install
npx expo start          # escanea el QR con la app Expo Go (iOS / Android)
```
- Vista en navegador: `npx expo start --web`.
- Instalable para entregar (APK de Android): `npm i -g eas-cli && eas login && eas build -p android --profile preview`.
- iOS requiere cuenta de desarrollador de Apple; para la entrega basta con Expo Go.

## 5. Lista de verificación antes de entregar
- [ ] `npm test` en verde
- [ ] `npm run typecheck` sin errores
- [ ] La web abre desde el link público y las imágenes cargan
- [ ] Flujo completo: agregar producto → cupón `CUMBRE10` → finalizar compra
- [ ] La app abre en Expo Go y muestra las 4 pestañas
