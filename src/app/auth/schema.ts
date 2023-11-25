import S from 'fluent-json-schema'

export const User = S.object()
  .prop('email', S.string().required())
  .prop('token', S.string().required())
  .prop('username', S.string().required())
  .prop('bio', S.string().required())
  .prop('image', S.string().required())

export const login = {
  body: S.object()
    .id('http://api/users/login')
    .title('User Login')
    .description('Login user and respond with token')
    .prop(
      'user',
      S.object().prop('email', S.string().required()).prop('password', S.string().required()),
    )
    .required(),

  response: {
    200: S.object().prop('user', User),
    401: S.object().prop('message', S.string()),
  },
}

export const register = {
  // body: S.object()
  //   .id('http://api/users')
  //   .title('User Register')
  //   .description('Register a new user')
  //   .prop(
  //     'user',
  //     S.object()
  //       .prop('username', S.string().required())
  //       .prop('email', S.string().required())
  //       .prop('password', S.string().required()),
  //   )
  //   .required(),

  body: S.object()
    .id('http://api/users')
    .title('Register User')
    .description('Register a new user')
    .prop('username', S.string().required())
    .prop('email', S.string().required())
    .prop('password', S.string().required()),

  response: {
    200: S.object().prop('user', User),
  },
}
