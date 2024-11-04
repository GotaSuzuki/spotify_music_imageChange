import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals:true,
    environment: "happy-dom",
    setupFiles:["./vitest-setup.js"],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  }
})

