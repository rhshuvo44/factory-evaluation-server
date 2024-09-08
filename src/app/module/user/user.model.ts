import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true,
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
    role: {
        type: String,
        enum: ['user', 'admin', "Executive Director", "Managing Director", "General Manager", "Coordinator"],
        default: 'user'
    },
    address: {
        type: String,
    },
}, {
    timestamps: true,
});

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