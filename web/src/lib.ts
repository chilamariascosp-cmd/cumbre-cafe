import type { ImageKey } from '@cumbre/core';

/** Ruta de una foto optimizada (relativa, para que funcione en cualquier subcarpeta de hosting). */
export const img = (key: ImageKey) => `${import.meta.env.BASE_URL}img/${key}.webp`;
