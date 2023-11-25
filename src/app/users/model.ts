import mongoose, { type InferSchemaType } from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
    },

    bio: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Manager', 'Team'],
      default: 'Team',
    },
  },
  { timestamps: true },
)

schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

schema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

type User = InferSchemaType<typeof schema> & {
  matchPassword: (password: string) => Promise<boolean>
}

export default mongoose.model<User>('User', schema)
