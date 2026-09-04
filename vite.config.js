import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Relative base so the build works from any GitHub Pages path
// (user site, project site, or a custom domain) without extra config.
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    target: 'es2020',
  },
})
