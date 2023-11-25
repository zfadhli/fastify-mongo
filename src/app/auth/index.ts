import User from '$app/users/model.ts'
import * as schema from './schema.ts'

export default async function (app) {
  app.post('/login', {
    schema: schema.login,
    handler: async (request, reply) => {
      const token = 'token123'
      console.log(request.body)
      // const user = await User.create({
      //   email,
      //   password,
      //   username,
      //   role,
      // });

      // reply.send({ user })
    },
  })

  app.post('/register', {
    schema: schema.register,
    handler: async (request, reply) => {
      const token = 'token123'
      console.log(request.body)
      return {
        status: 'ok',
        data: request.body,
      }
      // const user = await User.find()

      // reply.send({ user })
    },
  })
}
