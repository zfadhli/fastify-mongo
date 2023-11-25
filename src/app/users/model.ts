import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
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
