import User from './model.ts'
import * as schema from './schema.ts'

export default async function (app) {
  app.get('/', {
    onRequest: [app.authenticate],
    // schema: schema.index,
    handler: async (request, reply) => {
      const user = await User.findOne({ id: request.user.id }).populate('posts')

      reply.send(user)
    },
  })

  app.get('/:id', {
    // schema: schema.show,
    handler: async (request, reply) => {
      const user = await User.findOne({ id: request.params.id }).populate('posts')

      reply.send(user)
    },
  })
}
