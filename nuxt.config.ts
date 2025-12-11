import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: 'app/',
  modules: ['@unocss/nuxt'],
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  experimental: {
    typedPages: true,
  },
  nitro: {
    compatibilityDate: '2025-12-11',
  },
  // Global CSS
  css: [
    '@/assets/reset/main.ts',
  ],
  app: {
    head: {
      title: 'Component Sprint Board',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
