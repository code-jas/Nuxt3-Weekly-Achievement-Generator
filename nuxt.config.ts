// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //@ts-expect-error:compatibilityDate no need
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
      // Firebase
      fbApiKey: process.env.FIREBASE_API_KEY,
      fbAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      fbProjectId: process.env.FIREBASE_PROJECT_ID,
      fbStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      fbMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      fbAppId: process.env.FIREBASE_APP_ID,
      fbMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,

      // Google Cloud
      googleType: process.env.GOOGLE_TYPE,
      googleProjectId: process.env.GOOGLE_PROJECT_ID,
      googlePrivateKeyId: process.env.GOOGLE_PRIVATE_KEY_ID,
      googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,
      googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleAuthUri: process.env.GOOGLE_AUTH_URI,
      googleTokenUri: process.env.GOOGLE_TOKEN_URI,
      googleAuthProviderCertUrl: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
      googleClientCertUrl: process.env.GOOGLE_CLIENT_CERT_URL,
      googleUniverseDomain: process.env.GOOGLE_UNIVERSE_DOMAIN,
      googleScopes: process.env.GOOGLE_SCOPES,

      // Google Drive
      googleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID,

      // Email Service
      emailServiceEmail: process.env.EMAIL_SERVICE_EMAIL,
      emailServicePassword: process.env.EMAIL_SERVICE_PASSWORD,
    },
  },
  app: {
    head: {
      title: 'War Generator',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'preload',
          href: '/font/KronaOne-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/images/logo/android-chrome-512x512.png',
          as: 'image',
        },
      ],
    },
  },
  css: ['~/assets/css/global.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@pinia/nuxt',
    'dayjs-nuxt',
    // '@vueuse/motion/nuxt',
    // "@pinia-plugin-persistedstate/nuxt",
  ],
  colorMode: {
    classSuffix: '',
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: true,
  nitro: {
    preset: 'vercel',
  },
  // target: 'server',
  // nitro: {
  //   storage: {
  //     data: {
  //       driver: 'vercelKV',
  //       /* Vercel KV driver options */
  //     },
  //   },
  // },
});
