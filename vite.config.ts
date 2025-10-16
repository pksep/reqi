import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
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
