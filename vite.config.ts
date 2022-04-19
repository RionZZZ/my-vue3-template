import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
const path = require('path')

const pathResolve = (dir: string): any => {
  return path.resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src')
}

export default defineConfig({
  resolve: {
    alias
  },
  plugins: [
    vue(),
    eslintPlugin({
      exclude: ['./node_modules/**'],
      cache: false
    })
  ]
})
