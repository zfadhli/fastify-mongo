import Post from './model.ts'
import User from '$app/users/model.ts'
import * as schema from './schema.ts'
import { findPost, isOwner } from './service.ts'

export default async function (app) {
  app.get('/', {
    schema: schema.index,
    handler: async (request, reply) => {
      const posts = await Post.find().populate('author').exec()

      reply.send(posts)
    },
  })

  app.post('/', {
    onRequest: [app.authenticate],
    schema: schema.store,
    handler: async (request, reply) => {
      const { title, body, description } = request.body
      const post = await Post.create({
        title,
        body,
        description,
        author: request.user.id,
      })

      const user = await User.findById(request.user.id)
      user.posts.push(post._id)
      await user.save()

      reply.send(post)
    },
  })

  app.get('/:id', {
    schema: schema.show,
    onRequest: findPost,
    handler: async (request, reply) => {
      const doc = await Post.findById(request.params.id).populate('author').exec()
      reply.send(doc)
    },
  })

  app.put('/:id', {
    onRequest: [app.authenticate, findPost, isOwner],
    handler: async (request, reply) => {
      const post = await Post.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
      })

      reply.send(post)
    },
  })

  app.delete('/:id', {
    onRequest: [app.authenticate, findPost, isOwner],
    handler: async (request, reply) => {
      const doc = await Post.findByIdAndDelete(request.params.id)
      reply.send(doc)
    },
  })
}
