import Post from './model.ts'

export async function findPost(request, reply) {
  await Post.findById(request.params.id)
}

export async function isOwner(request, reply) {
  const post = await Post.findById(request.params.id)
  if (request.user._id !== post.author.toString()) {
    reply.forbidden()
  }
}
