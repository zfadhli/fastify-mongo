import mongoose, { type InferSchemaType } from 'mongoose'

const schema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
)

type Post = InferSchemaType<typeof schema>

export default mongoose.model<Post>('Post', schema)
