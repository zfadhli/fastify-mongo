export default async function (app) {
  app.get('/', {
    onRequest: [app.authenticate],
    handler: async (request, reply) => {
      reply.send(request.user)
    },
  })

  app.post('/', {
    handler: async (req, res) => {
      res.send({
        name: 'posts.store',
      })
    },
  })

  app.get('/:id', {
    handler: async (req, res) => {
      res.send({
        id: req.params.id,
        name: 'posts.show',
      })
    },
  })
}
