import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: 'app/',
  modules: ['@unocss/nuxt'],
  css: ['@unocss/reset/tailwind.css'],
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  experimental: {
    typedPages: true
  },
  nitro: {
    compatibilityDate: '2025-12-11'
  },
  app: {
    head: {
      title: 'Component Sprint Board',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})

