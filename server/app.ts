import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import qiita from './api/qiita'
import oauth from './auth/oauth'
import { nuxt } from './core/nuxt'

const app = express()
const router = Router()

router.use(oauth)
router.use(qiita)

app.use(cookieParser())
// BFF
app.use('/api', router)
app.use('/oauth', router)

app.use(async (req, res, next) => {
  await nuxt.ready()
  nuxt.render(req, res, next)
})
// app.use(nuxt.render)

export default app
