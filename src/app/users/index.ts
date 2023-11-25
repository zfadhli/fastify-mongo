import User from './model.ts'
import * as schema from './schema.ts'

export default async function (app) {
  app.get('/', {
    schema: schema.get,
    handler: async (request, reply) => {
      const user = await User.find()

      reply.send(user)
    },
  })

  app.get('/:id', {
    schema: schema.get,
    handler: async (request, reply) => {
      const user = await User.find({ id: request.params.id })

      reply.send(user)
    },
  })
}
