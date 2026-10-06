import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/* 
Configuración de Vite
*/
export default defineConfig({
  plugins: [react()],
  // Project site: https://leclerck.github.io/dsr-fe-I-2026/
  base: '/dsr-fe-I-2026/',
})
