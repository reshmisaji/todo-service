import mongoose, { Types } from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

export const Todo = mongoose.model('Todo', todoSchema);
