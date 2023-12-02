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
  ],
  css: [
    'ant-design-vue/dist/reset.css',
  ],
  colorMode: {
    classSuffix: '',
  },
})
