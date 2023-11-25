import fp from 'fastify-plugin'
import cookie from '@fastify/cookie'

async function plugin(app) {
  await app.register(cookie, {
    secret: app.config.JWT_SECRET,
  })
}

export default fp(plugin)
