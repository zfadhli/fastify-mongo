import fp from 'fastify-plugin'
import fastifyJWT from '@fastify/jwt'

async function plugin(app) {
  await app.register(fastifyJWT, {
    secret: app.config.JWT_SECRET,
    expiresIn: app.config.JWT_EXPIRES_IN,
  })

  await app.decorate('authenticate', async function (request, reply) {
    await request.jwtVerify()
  })
}

export default fp(plugin)
