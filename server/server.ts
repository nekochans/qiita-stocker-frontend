import consola from 'consola'
import app from './app'
import config, { nuxt } from './core/nuxt'
const { Builder } = require('nuxt')

const start = async () => {
  await nuxt.ready()

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.listen(8080, '127.0.0.1')
  consola.ready({
    message: `Server listening on http://127.0.0.1:8080`,
    badge: true
  })
}
start()
