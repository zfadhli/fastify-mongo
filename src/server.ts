import fastify from 'fastify'
import cors from '@fastify/cors'
import autoLoad from '@fastify/autoload'
import sensible from '@fastify/sensible'
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
      target: '@fastify/one-line-logger',
    },
  },
})

await app.register(cors, {})
await app.register(sensible)
await app.register(fastifyPrintRoutes)
await app.register(autoLoad, {
  dir: join(import.meta.url, 'plugins'),
})
await app.register(autoLoad, {
  dir: join(import.meta.url, 'app'),
  options: { prefix: '/api' },
})

await app.setErrorHandler((error, request, reply) => {
  request.log.error({ request, reply, error }, error?.message)
  error.message = 'An error has occurred'
  reply.send(error)
})

await app.ready()

export default app
