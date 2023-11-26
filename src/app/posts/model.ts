import mongoose, { type InferSchemaType } from 'mongoose'
import slugify from 'slugify'
import { ulid } from 'ulid'

const schema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

schema.pre('save', function (next) {
  this.slug = `${slugify(this.title, { lower: true })}-${ulid()}`
  next()
})

type Post = InferSchemaType<typeof schema>

export default mongoose.model<Post>('Post', schema)
