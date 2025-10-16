import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'pksep-reqi',
      fileName: format => `pksep-reqi.${format}.js`
    },
    rollupOptions: {
      output: [
        { format: 'es', entryFileNames: 'pksep-reqi.js' },
        { format: 'cjs', entryFileNames: 'pksep-reqi.umd.cjs' }
      ]
    }
  }
});
