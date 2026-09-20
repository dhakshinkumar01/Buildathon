import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths, so the built site works at a domain root and under a
  // sub-path (e.g. GitHub Pages project sites at user.github.io/repo/).
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
