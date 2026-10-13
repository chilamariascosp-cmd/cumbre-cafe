# Herramienta de IA, prompt y parámetros

## 1. Herramienta utilizada
- **Modelo:** Claude (Anthropic), referencia de sesión `claude-sonnet-5-5`.
- **Entorno:** agente de programación basado en Claude Code, ejecutado en un contenedor Linux en la nube desde la app de Claude. Tiene shell, edición de archivos, navegador sin pantalla (Playwright/Chromium) y acceso a npm.
- **No se usaron** Cursor, Grok, Qwen, Copilot, ChatGPT, Gemini ni DeepSeek. Si el curso exige una de esas herramientas, el repositorio se puede abrir en ella: está dividido en módulos pequeños y documentados.
- **Parámetros del modelo (temperatura, top-p):** no se configuraron; el entorno usa los valores por defecto y no los expone.

## 2. Prompt recibido (original del usuario)
> Hola necesito que desarrolles una página web y una aplicación móvil sobre el producto de su elección, desarrollado y utilizando modelos de inteligencia artificial como Gemini, Claude, Copilot, ChatGPT, DeepSeek o agentes basados en LLM. Asimismo, el desarrollo debe iniciar a revisar herramientas como Cursor, Grok, Qwen o Claude Code, asegurando la aplicación de principios de ingeniería de software.
> 1. Adjuntar archivo o link de donde la puedo revisar.
> 2. Entregar la rutina de desplegar la página web creada.
> 3. Con qué herramienta fue creada y qué prompt utilizaron.
> 4. Qué parámetros en general utilizaron. Para mayor facilidad decidí elegir un tema como el de tienda de café por la facilidad de imágenes y ese estilo; te comparto imágenes que encontré en Pexels para que las uses.
>
> (Se adjuntaron 20 fotografías de Pexels.)

## 3. Cómo se trabajó (secuencia de prompts internos)
| # | Instrucción al agente | Resultado |
|---|---|---|
| 1 | Revisar las 20 fotos, optimizarlas (webp/jpg) y nombrarlas por contenido | `web/public/img`, `mobile/assets/img` |
| 2 | Crear un núcleo en TypeScript con catálogo, carrito, cupones, calculadora de preparación y validación, con pruebas | `packages/core` (19 pruebas) |
| 3 | Construir la web React + Vite usando solo el núcleo para la lógica | `web/` |
| 4 | Construir la app Expo con las mismas reglas de negocio | `mobile/` |
| 5 | Verificar en navegador: flujo de compra, desbordes, consola | capturas en `docs/capturas` |
| 6 | Escribir CI, scripts y documentación de despliegue | `.github`, `scripts`, `docs` |

## 4. Prompt reutilizable (para reproducir el proyecto)
```text
Actúa como ingeniero de software senior. Construye una tienda de café colombiano
con (a) sitio web en React + Vite + TypeScript y (b) app móvil en Expo.
Reglas:
- Monorepo con un paquete compartido `core` (catálogo, carrito, cupones, validación)
  sin dependencias de UI y con pruebas unitarias (Vitest).
- Web: hero, proceso, tienda con filtros y búsqueda, orígenes, calculadora de
  preparación, carrito con compra simulada, tema claro/oscuro, PWA, accesible (WCAG AA).
- Móvil: 4 pestañas (Inicio, Tienda, Preparar, Carrito), tema automático, carrito persistente.
- Usa solo estas fotos: <lista>. Cada una con texto alternativo.
- Moneda COP, idioma español, datos de ejemplo marcados como demostración.
- Entrega README, rutina de despliegue, CI en GitHub Actions y pruebas pasando.
```

## 5. Parámetros generales del proyecto
| Área | Decisión |
|---|---|
| Producto / tema | Tienda de café de especialidad "Cumbre Café" (Colombia) |
| Idioma / moneda | Español (es-CO) / pesos colombianos (COP) |
| Stack web | React 18, TypeScript 5 (strict), Vite 5, CSS con variables |
| Stack móvil | Expo SDK 57, React Native 0.86, TypeScript, AsyncStorage |
| Núcleo compartido | `@cumbre/core`: funciones puras e inmutables, 19 pruebas |
| Diseño | Verde de cafetal + rojo cereza como único acento; tipografías Bricolage Grotesque, Figtree, IBM Plex Mono; tema claro/oscuro |
| Accesibilidad | HTML semántico, `<dialog>` nativo, foco visible, etiquetas ARIA, alt en todas las fotos, `prefers-reduced-motion` |
| Rendimiento | Fotos a ≤1400 px en WebP (2,3 MB las 20), carga diferida, JS 56 KB gzip |
| Reglas de negocio | Envío gratis desde $150.000, envío $12.000, cupón `CUMBRE10` (10 %), máx. 20 unidades por producto |
| Datos | De ejemplo; sin backend ni pagos reales |
| Ingeniería | Separación de capas, DRY (un solo núcleo), pruebas, tipado estricto, CI/CD, documentación |
