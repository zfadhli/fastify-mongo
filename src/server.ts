import fastify from 'fastify'
import cors from '@fastify/cors'
import autoLoad from '@fastify/autoload'
import fastifyPrintRoutes from 'fastify-print-routes'
import { join } from 'desm'
import mongoose from 'mongoose'

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to database'))
  .catch((e) => console.log('Error connecting to database'))

const app = fastify({
  ignoreTrailingSlash: true,
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

await app.register(cors, {})
await app.register(fastifyPrintRoutes)
await app.register(autoLoad, {
  dir: join(import.meta.url, 'plugins'),
})
await app.register(autoLoad, {
  dir: join(import.meta.url, 'app'),
  options: { prefix: '/api' },
})
await app.ready()

export default app