import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/React-Assignments-R05-R06/',
  build: {
    outDir: 'docs'
  }
})
