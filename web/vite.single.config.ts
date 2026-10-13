import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import base from './vite.config';

// Variante que incrusta JS y CSS en un solo index.html (útil para vistas previas y hosting simple).
export default mergeConfig(base, defineConfig({ plugins: [viteSingleFile()] }));
