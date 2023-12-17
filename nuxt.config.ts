// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "War Generator",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'stylesheet',
          href: '/css/antd.dark.css',
        },
      ],
    },
  },
  modules: [
    '@ant-design-vue/nuxt',
    'dayjs-nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    // '@nuxt/ui'
  ],
  css: [
    'ant-design-vue/dist/reset.css',
    '~/assets/main.css'
  ],  
  
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: { 
    // Private keys are only available on the server
    baseUrl: process.env.CLOCKIFY_API_BASE_URL || 'api/',
    apiKey: process.env.CLOCKIFY_API_KEY,
    workspaceId: process.env.CLOCKIFY_WORKSPACE_ID,
    userId: process.env.CLOCKIFY_USER_ID,
    isDeployed: process.env.IS_DEPLOYED,
   

    // Public keys that are exposed to the client
    public: { 
    }
  },
<<<<<<< Updated upstream
 
=======
  // nitro: {
  //   preset: 'node-server'`
  // }`
>>>>>>> Stashed changes
})
