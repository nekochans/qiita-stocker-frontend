import Cookies from 'universal-cookie'
import { Context, Middleware } from '@nuxt/types'

const authCookieMiddleware: Middleware = ({ req, store }: Context) => {
  if (process.browser) return

  const cookies = new Cookies(req.headers.cookie)
  const sessionId = cookies.get('sessionId')
  if (sessionId) store.dispatch('qiita/saveSessionIdAction', { sessionId })
}

export default authCookieMiddleware
