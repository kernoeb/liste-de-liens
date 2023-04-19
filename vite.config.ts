// Plugins
import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { viteSingleFile } from 'vite-plugin-singlefile'
import zipPack from 'vite-plugin-zip-pack'

// Utilities
import { defineConfig } from 'vite'

const IS_SINGLE_FILE = process.env.SINGLE_FILE === 'true'
console.log('IS_SINGLE_FILE', IS_SINGLE_FILE)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    IS_SINGLE_FILE ? viteSingleFile() : undefined,
    IS_SINGLE_FILE ? zipPack({ outDir: '.' }) : undefined,
  ].filter(v => v !== undefined),
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
