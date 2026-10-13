# Cumbre Café

Tienda de café de especialidad colombiano. Proyecto académico generado con IA (Claude) aplicando principios de ingeniería de software.

| Pieza | Tecnología | Carpeta |
|---|---|---|
| Sitio web (PWA) | React 18 + Vite + TypeScript | `web/` |
| App móvil | Expo (React Native) + TypeScript | `mobile/` |
| Lógica compartida | TypeScript puro + Vitest | `packages/core/` |

```
packages/core  ← catálogo, carrito, cupones, calculadora, validación (con pruebas)
   ├── web     ← interfaz web
   └── mobile  ← interfaz móvil
```

**Principios aplicados:** separación de responsabilidades (UI vs. reglas de negocio), una sola fuente de verdad (el núcleo se usa en web y móvil), funciones puras e inmutables, tipado estricto, pruebas automatizadas, accesibilidad, CI/CD y documentación.

## Inicio rápido
```bash
npm run install:all
npm test
npm run dev:web      # web
npm run dev:mobile   # móvil (Expo Go)
```

## Documentos
- [Rutina de despliegue](docs/DESPLIEGUE.md)
- [Herramienta de IA, prompt y parámetros](docs/IA-PROMPTS.md)

Datos y precios son de ejemplo; no se procesan pagos. Fotografías: Pexels.
