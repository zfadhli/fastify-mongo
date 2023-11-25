import S from 'fluent-json-schema'

export const User = S.object()
  .prop('id', S.string())
  .prop('email', S.string())
  .prop('token', S.string())
  .prop('username', S.string())
  .prop('bio', S.string())
  .prop('image', S.string())

export const login = {
  body: S.object()
    .id('http://api/users/login')
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
    .id('http://api/users')
    .title('Auth Register')
    .description('Register a new user')
    .prop('username', S.string().required())
    .prop('email', S.string().required())
    .prop('password', S.string().required()),

  response: {
    200: User,
  },
}
