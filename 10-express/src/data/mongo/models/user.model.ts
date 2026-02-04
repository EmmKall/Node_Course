import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    }, 
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isVerifyed: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    },
    role: {
        type: [String],
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    token: {
        type: String,
        default: null,
    }
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete (ret as any)._id
    delete (ret as any).password
  }
});

export const UserModel = mongoose.model("User", userSchema);
