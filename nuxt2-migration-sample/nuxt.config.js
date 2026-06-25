export default {
  target: 'static',
  ssr: false,
  head: {
    title: 'Nuxt 2 Migration Sample',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt 2 + Vue 2 sample for server migration testing' }
    ]
  },
  css: ['~/assets/css/main.css'],
  plugins: ['~/plugins/health.js'],
  components: true,
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'https://appapi-dev.shipdelight.com'
  },
  generate: {
    fallback: true
  }
}
