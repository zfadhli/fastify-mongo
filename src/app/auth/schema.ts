import S from 'fluent-json-schema'
import { User } from '$app/users/schema.ts'

export const login = {
  body: S.object()
    .id('http://api/auth/login')
    .title('Auth Login')
    .description('Login user')
    .prop('email', S.string().required())
    .prop('password', S.string().required()),

  response: {
    200: User,
  },
}

export const register = {
  body: S.object()
    .id('http://api/auth/register')
    .title('Auth Register')
    .description('Register a new user')
    .prop('username', S.string().required())
    .prop('email', S.string().required())
    .prop('password', S.string().required()),

  response: {
    200: User,
  },
}
