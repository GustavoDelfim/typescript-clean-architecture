import express from 'express'
import setUpMiddleware from './middleware'

const app = express()
setUpMiddleware(app)

export default app
