import { Configuration } from '@nuxt/types'

require('dotenv').config()

const nuxtConfig: Configuration = {
  buildModules: ['@nuxt/typescript-build'],
  mode: 'universal',
  srcDir: 'app',
  env: {
    apiUrlBase: process.env.API_URL_BASE || 'http://localhost:3000'
  },
  router: {
    middleware: ['authCookieMiddleware', 'redirectMiddleware'],
    extendRoutes(routes: any, resolve) {
      routes.push({
        name: 'original_error',
        path: '/error',
        props: true,
        component: resolve(__dirname, 'app/pages/error.vue')
      })
    }
  },
  render: {
    compressor: (_req, _res, next) => {
      next()
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix:
        'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#'
    },
    title: 'Mindexer | Qiitaのストックを整理するためのサービスです',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Mindexerは、Qiitaのストックにカテゴリ機能を追加したサービスです。'
      },
      { hid: 'og:url', property: 'og:url', content: `${process.env.APP_URL}` },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Mindexer | Qiitaのストックを整理するためのサービスです'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Mindexerは、Qiitaのストックにカテゴリ機能を追加したサービスです。'
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Mindexer' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.APP_URL}/assets/ogp.png`
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: '@mindexer_org'
      },

      {
        hid: 'google-site-verification',
        property: 'google-site-verification',
        content: `${process.env.GOOGLE_SITE_VERIFICATION}`
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/assets/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@fortawesome/fontawesome-free/css/all.css', '@/assets/style.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/markdownit'],
  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    quotes: '“”‘’'
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        if (!config.module) return
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

export default nuxtConfig
