import fp from 'fastify-plugin'

async function plugin(app) {
  app.decorate('config', process.env)
}

export default fp(plugin)
