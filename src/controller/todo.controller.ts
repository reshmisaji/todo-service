import { Response, Request } from "express";
import { Todo } from "../models/todo.model";

export const create = async (request: Request, response: Response) => {
    const { title, completed = false } = request.body;
    const { _id: userId } = response.locals.currentUser;
    const newTodo = new Todo({ title, completed, userId })
    try {
        await newTodo.save();
        response.status(201).send(newTodo);
    } catch (error) {
        response.status(500).send(error)
    }
}

export const getAll = async (_: Request, response: Response) => {
    try {
        const todos = await Todo.find({});
        response.send(todos);
    } catch (error) {
        response.status(500).send(error)
    }
}

export const getById = async (request: Request, response: Response) => {
    const todo = await Todo.find({ _id: request.params.id })
    try {
        response.send(todo);
    } catch (error) {
        response.status(500).send(error)
    }
}

export const deleteById = async (request: Request, response: Response) => {
    try {
        await Todo.deleteOne({ _id: request.params.id })
        response.status(204).send()
    } catch (error) {
        response.status(500).send(error)
    }
}

export const updateById = async (request: Request, response: Response) => {
    const { title, completed } = request.body;
    try {
        const todo = await Todo.findOne({ _id: request.params.id })
        if (todo) {
            todo.title = title || todo.title;
            todo.completed = completed || todo.completed;
            await todo.save()
            response.status(204).send()
        } else {
            create(request, response)
        }
    } catch (error) {
        response.status(500).send(error)
    }
}