// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    // Private keys are only available on the server
    baseUrl: process.env.CLOCKIFY_API_BASE_URL || 'api/',
    apiKey: process.env.CLOCKIFY_API_KEY,
    workspaceId: process.env.CLOCKIFY_WORKSPACE_ID,
    templateUrl: process.env.TEMPLATE_URL,
    // Public keys that are exposed to the client
    public: {},
  },
  app: {
    head: {
      title: 'War Generator',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  css: ['~/assets/css/global.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@pinia/nuxt',
    'dayjs-nuxt',
    // "@pinia-plugin-persistedstate/nuxt",
  ],
  colorMode: {
    classSuffix: '',
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  ps: {
    pluginostcss: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
