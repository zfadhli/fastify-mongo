import S from 'fluent-json-schema'

export const User = S.object()
  .prop('id', S.string())
  .prop('email', S.string())
  .prop('token', S.string())
  .prop('username', S.string())
  .prop('bio', S.string())
  .prop('image', S.string())

export const get = {
  response: {
    200: S.array().items(User),
  },
}
