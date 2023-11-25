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

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      }

      const token = await reply.jwtSign({ payload })
      user.token = token
      await user.save()

      const opts = {
        expires: new Date(Date.now() + app.config.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      reply.cookie('token', token, opts).send(user)
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
        token: '',
        bio: '',
        image: `https://xsgames.co/randomusers/assets/avatars/pixel/${random}.jpg`,
      })

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      }

      const token = await reply.jwtSign({ payload })
      user.token = token
      await user.save()

      const opts = {
        expires: new Date(Date.now() + app.config.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }

      reply.cookie('token', token, opts).send(user)
    },
  })
}
