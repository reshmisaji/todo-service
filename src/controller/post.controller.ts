import { Response, Request } from "express";
import { Post } from "../models/post.model";

export const create = async (request: Request, response: Response) => {
    const { title, body } = request.body;
    const { _id: userId } = response.locals.currentUser;
    try {
        const post = await Post.create({ title, body, userId })
        response.status(201).json(post);
    } catch (error) {
        response.status(500).send(error)
    }
}

export const getAll = async (_: Request, response: Response) => {
    const { _id: userId } = response.locals.currentUser;
    try {
        const posts = await Post.find({userId});
        response.send(posts);
    } catch (error) {
        response.status(500).send(error)
    }
}

export const getById = async (request: Request, response: Response) => {
    const post = await Post.find({ _id: request.params.id })
    try {
        response.send(post);
    } catch (error) {
        response.status(500).send(error)
    }
}

export const deleteById = async (request: Request, response: Response) => {
    try {
        await Post.deleteOne({ _id: request.params.id })
        response.status(204).send()
    } catch (error) {
        response.status(500).send(error)
    }
}