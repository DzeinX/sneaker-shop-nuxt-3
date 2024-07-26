// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: false},
  modules: ['@nuxtjs/tailwindcss', "@nuxt/icon", 'shadcn-nuxt', "@nuxt/image", 'dayjs-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      link: [{rel: "icon", type: "image/svg", href: "/logo.svg"}],
    }
  },
})