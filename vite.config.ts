import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const PRODUCTION_CSP =
  "default-src 'self'; connect-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'none';";

function strictProductionCspPlugin(): Plugin {
  return {
    name: 'cloakify-strict-csp',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        /<meta\s+http-equiv="Content-Security-Policy"[\s\S]*?\/>/i,
        `<meta http-equiv="Content-Security-Policy" content="${PRODUCTION_CSP}" />`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), strictProductionCspPlugin()],
  worker: {
    format: 'es',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    css: false,
  },
});
