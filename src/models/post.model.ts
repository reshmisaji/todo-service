import mongoose, { Types } from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        required: true
    },
})

export const Post = mongoose.model('Post', postSchema);
