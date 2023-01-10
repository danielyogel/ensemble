import { defineConfig } from 'vite';
import * as path from 'node:path';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  define: { 'import.meta.vitest': 'undefined' },
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'ensemble',
      fileName: (format) => `ensemble.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps,
        globals: {
          react: 'React'
        }
      }
    }
  }
});
