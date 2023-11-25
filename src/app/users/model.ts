import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Manager', 'Team'],
      default: 'Team',
    },
  },
  { timestamps: true },
)

export default mongoose.model('User', schema)
