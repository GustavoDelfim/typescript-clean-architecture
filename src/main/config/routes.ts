/* eslint-disable */
import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { resolve } from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const pathRoutes = resolve(__dirname, '../routes')
  readdirSync(pathRoutes).map(async file => {
    (await import (`${pathRoutes}/${file}`)).default(router)
  })
}