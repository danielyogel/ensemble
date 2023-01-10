/// <reference types="vitest" />

import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  test: { globals: true, includeSource: ['src/**/*.{ts,tsx}'], reporters: 'verbose' },
  define: {
    'import.meta.vitest': 'undefined'
  },
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'ensemble',
      fileName: (format) => `ensemble.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      //   make sure to externalize deps that shouldn't be bundled
      //   into your library
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
