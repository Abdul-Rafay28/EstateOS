import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps: true,
})

const userModel = mongoose.model('user', userSchema);

export default userModel;