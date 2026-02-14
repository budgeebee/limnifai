import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 1477,
    host: '0.0.0.0',
    allowedHosts: ['raspi.tailc18d86.ts.net', 'localhost']
  }
})
