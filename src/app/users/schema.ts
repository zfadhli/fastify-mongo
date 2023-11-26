import S from 'fluent-json-schema'

export const User = S.object()
  .prop('id', S.string())
  .prop('email', S.string())
  .prop('token', S.string())
  .prop('username', S.string())
  .prop('bio', S.string())
  .prop('image', S.string())

const Post = S.object()
  .prop('id', S.string())
  .prop('slug', S.string())
  .prop('title', S.string())
  .prop('body', S.string())
  .prop('description', S.string())

export const index = {
  response: {
    200: S.array().items(User.prop('posts', S.array().items(Post.only(['id', 'slug'])))),
  },
}

export const show = {
  response: {
    200: User.prop('posts', S.array().items(Post)),
  },
}
