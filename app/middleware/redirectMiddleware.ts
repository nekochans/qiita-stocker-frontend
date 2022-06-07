import { Context, Middleware } from '@nuxt/types'

const redirectMiddleware: Middleware = ({ redirect }: Context) => {
  return redirect('/maintenance')
}

export default redirectMiddleware
