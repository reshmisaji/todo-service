import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    password: { type: String, required: true },
    token: String
})

export const User = mongoose.model('User', userSchema);