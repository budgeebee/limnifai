import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 1477,
    allowedHosts: ['raspi.tailc18d86.ts.net'],
  },
  // No React plugin needed — serving static HTML files
  appType: 'mpa',
})
