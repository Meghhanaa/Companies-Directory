import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Companies-Directory/', // 👈 must match your repo name (case-sensitive)
})
