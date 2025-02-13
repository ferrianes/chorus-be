import mongoose from 'mongoose'

const { Schema } = mongoose

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await Bun.password.hash(this.password, {
    algorithm: 'bcrypt'
  })
  next()
})

export const User = mongoose.model('User', userSchema)
