// Plugins
import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { viteSingleFile } from 'vite-plugin-singlefile'
import zipPack from 'vite-plugin-zip-pack'
import { VitePWA } from 'vite-plugin-pwa'

// Utilities
import { defineConfig } from 'vite'

const IS_SINGLE_FILE = process.env.SINGLE_FILE === 'true'

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
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'maskable_icon.png'],
      manifest: {
        name: 'Liste de liens',
        short_name: 'Liste de liens',
        description: 'Le site de liens utiles ⭐ français 🇫🇷 100% privacy friendly 🕵',
        theme_color: '#BB86FC',
        lang: 'fr',
        icons: [
          {
            src: 'maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'maskable_icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
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
