import { Context, Middleware } from '@nuxt/types'

const redirectMiddleware: Middleware = ({
  store,
  redirect,
  route
}: Context) => {
  const notRequiredAuthorization = [
    '/',
    '/signup',
    '/privacy',
    '/terms',
    '/cancel/complete',
    '/error'
  ]

  if (notRequiredAuthorization.includes(route.path)) return

  if (store.getters['qiita/isLoggedIn'] && route.path === '/login') {
    return redirect('/stocks/all')
  }

  if (!store.getters['qiita/isLoggedIn'] && route.path !== '/login') {
    return redirect('/')
  }
}

export default redirectMiddleware
