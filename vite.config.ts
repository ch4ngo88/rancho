import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/',
  server: { host: '::', port: 8080 },
  plugins: [react(), tsconfigPaths()],
  build: {
    target: 'esnext',
    emptyOutDir: true, // 💥 dist/ wird vor dem Build gelöscht
  },
})
