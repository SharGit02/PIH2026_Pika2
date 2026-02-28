import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            default: '',
            lowercase: true,
        },
        name: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['buyer', 'seller', 'admin'],
            default: 'buyer',
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
