import Post from './model.ts'

export async function findPost(request, reply) {
  try {
    await Post.findById(request.params.id)
  } catch (error) {
    reply.notFound()
  }
}

export async function isOwner(request, reply) {
  try {
    const post = await Post.findById(request.params.id)
    if (request.user._id !== post.author.toString()) {
      reply.forbidden()
    }
  } catch (error) {
    reply.notFound()
  }
}
