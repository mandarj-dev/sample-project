// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  experimental: {
    // Required for ssr:false on Nuxt 3.21.8 dev server (rollup entry regression)
    viteEnvironmentApi: true
  },
  nitro: {
    preset: 'static'
  }
})
