export async function createToken(user, reply) {
  const { id, username, email } = user
  return await reply.jwtSign({ id, username, email })
}
