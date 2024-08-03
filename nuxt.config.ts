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
    public: {
      // firebase
      fbApiKey: process.env.FIREBASE_API_KEY,
      fbAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      fbProjectId: process.env.FIREBASE_PROJECT_ID,
      fbStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      fbMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      fbAppId: process.env.FIREBASE_APP_ID,
      fbMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      googleScopes: process.env.GOOGLE_SCOPES,
    },
  },
  // plugins: [
  //   '~/plugins/firebase.ts'
  // ],
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
    '@vueuse/motion/nuxt',
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
