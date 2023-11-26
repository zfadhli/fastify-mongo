import Post from './model.ts'

export async function findPost(request, reply) {
  try {
    await Post.findById(request.params.id)
  } catch (error) {
    reply.notFound()
  }
}
