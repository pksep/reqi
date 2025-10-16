import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'pksep-reqi',
      fileName: () => `index.js`,
      formats: ['es']
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
});
