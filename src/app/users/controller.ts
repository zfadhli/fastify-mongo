import User from './model.ts'

export async function index(req, reply) {
  const user = await User.find()

  return {
    success: true,
    data: user,
  }
}
export async function store(req, reply) {
  const user = await User.create(req.body)

  return {
    success: true,
    data: user,
  }
}
export async function show(req, reply) {
  const user = await User.findById(req.params.id)

  return {
    success: true,
    data: user,
  }
}
export async function update(req, reply) {
  return 'update'
}
export async function destroy(req, reply) {
  return 'destroy'
}
