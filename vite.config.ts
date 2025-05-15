import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/tradicoes-harburg-folclore-web/' : '/',
  server: { host: '::', port: 8080 },
  plugins: [react(), tsconfigPaths()],
}))
