import bcrypt from 'bcrypt'
import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import { UserStatus } from './user.constant'
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: [
        'user',
        'admin',
        'executiveDirector',
        'managingDirector',
        'generalManager',
        'coordinator',
      ],
      default: 'user',
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
export const User = model<TUser>('User', userSchema)
