import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        soundboard: resolve(__dirname, 'soundboard/index.html'),
        podcast: resolve(__dirname, 'podcast.html'),
      },
    },
  },
  json: {
    namedExports: false,
    stringify: true,
  },
  base: '/._./'
})