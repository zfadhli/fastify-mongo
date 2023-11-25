import { ulid } from 'ulid'
import slugify from 'slugify'
import Post from './model.ts'
import * as schema from './schema.ts'

export default async function (app) {
  app.get('/', {
    schema: schema.index,
    handler: async (request, reply) => {
      const posts = await Post.find().populate('author')

      reply.send(posts)
    },
  })

  app.post('/', {
    onRequest: [app.authenticate],
    schema: schema.store,
    handler: async (request, reply) => {
      const { title, body, description } = request.body
      const id = ulid()
      const post = await Post.create({
        id,
        slug: `${slugify(title).toLowerCase()}-${id}`,
        title,
        body,
        description,
        author: request.user.payload,
      })

      reply.send(post)
    },
  })

  app.get('/:id', {
    schema: schema.show,
    handler: async (request, reply) => {
      const posts = await Post.findOne({ id: request.params.id }).populate('author')
      reply.send(posts)
    },
  })
}
