import S from 'fluent-json-schema'
import { User } from '$app/users/schema.ts'

export const Post = S.object()
  .prop('id', S.string())
  .prop('slug', S.string())
  .prop('title', S.string())
  .prop('body', S.string())
  .prop('description', S.string())

export const index = {
  response: {
    200: S.array().items(S.object().prop('author', S.object().prop('id', S.string())).extend(Post)),
  },
}

export const store = {
  body: S.object()
    .description('Store new post')
    .prop('title', S.string().required())
    .prop('body', S.string().required())
    .prop('description', S.string().required()),
  response: {
    200: Post,
  },
}

export const show = {
  response: {
    200: S.object().prop('author', User).extend(Post),
  },
}
