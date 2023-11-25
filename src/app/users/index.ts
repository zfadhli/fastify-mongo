import User from './model.ts'

export default async function (app) {
  app.get('/', {
    handler: async (request, reply) => {
      const user = await User.find()

      reply.send({ user })
    },
  })

  app.post('/', {
    handler: async (request, reply) => {
      const user = await User.create(request.body)

      reply.send({ user })
    },
  })

  app.get('/:id', {
    handler: async (request, reply) => {
      const user = await User.findById(request.params.id)

      reply.send({ user })
    },
  })
}
