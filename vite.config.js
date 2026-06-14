import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 1477,
    allowedHosts: ['raspi.tailc18d86.ts.net'],
    fs: {
      allow: [root],
      deny: ['**/persistent/**'],
    },
  },
  // No React plugin needed — serving static HTML files
  appType: 'mpa',
})
