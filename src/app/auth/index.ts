import { ulid } from 'ulid'
import User from '$app/users/model.ts'
import * as schema from './schema.ts'

export default async function (app) {
  app.post('/login', {
    schema: schema.login,
    handler: async (request, reply) => {
      const { email, password } = request.body
      const user = await User.findOne({ email }).select('+password')

      if (!user || !(await user.matchPassword(password))) {
        reply.unauthorized('Wrong credentials')
      }

      reply.send(user)
    },
  })

  app.post('/register', {
    schema: schema.register,
    handler: async (request, reply) => {
      const { username, email, password } = request.body
      const random = Math.floor(Math.random() * 40 + 10)

      const user = await User.create({
        id: ulid(),
        username,
        email,
        password,
        token: 'token123',
        bio: '',
        image: `https://xsgames.co/randomusers/assets/avatars/pixel/${random}.jpg`,
      })

      reply.send(user)
    },
  })
}
