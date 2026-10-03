import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

/** Copy fonts.css into dist untouched (library mode would otherwise inline every font file as base64). */
function copyFontsCss(): Plugin {
  return {
    name: 'copy-fonts-css',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'fonts.css', source: readFileSync('src/styles/fonts.css', 'utf8') });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.stories.tsx', 'src/stories'],
      tsconfigPath: './tsconfig.json',
    }),
    copyFontsCss(),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
