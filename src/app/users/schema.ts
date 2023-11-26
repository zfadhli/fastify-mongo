import S from 'fluent-json-schema'

// this causes ReferenceError: Cannot access 'User' before initialization
// import { Post as P } from '$app/posts/schema.ts'

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
    200: User.prop('posts', S.array().items(Post)),
  },
}

export const show = {
  response: {
    200: User.prop('posts', S.array().items(Post)),
  },
}
