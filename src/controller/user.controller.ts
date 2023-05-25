import { Response, Request } from "express";
import { User } from "../models/user.model";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import defaults from "../../config/defaults";

const addLoginToken = (user: any) => {
    user.token = jwt.sign({ userId: user._id, userName: user.userName }, defaults.jwtTokenName, { expiresIn: defaults.accessTokenExpiresIn });
    return user;
}

export const getAll = async (_: Request, response: Response) => {
    const users = await User.find({});
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error)
    }
}

export const getById = async (request: Request, response: Response) => {
    const user = await User.find({ _id: request.params.id })
    try {
        response.send(user);
    } catch (error) {
        response.status(500).send(error)
    }
}

export const deleteById = async (request: Request, response: Response) => {
    try {
        await User.deleteOne({ _id: request.params.id })
        response.status(204).send()
    } catch (error) {
        response.status(500).send(error)
    }
}

export const signIn = async (request: Request, response: Response) => {
    try {
        if (request.body.userName && request.body.password) {
            const user = await User.findOne({ userName: request.body.userName })
            if (user && (await bcrypt.compare(request.body.password, user.password))) {
                addLoginToken(user)
                user.save()
                return response.status(200).json({ token: user.token })
            }
            return response.status(400).send('Invalid username or password')
        }
        return response.status(400).send('Username and password are required')
    } catch (error) {
        return response.status(500).send(error)
    }
}

export const signUp = async (request: Request, response: Response) => {
    const { name, userName, email, password } = request.body;

    if (!(userName && password && name)) {
        response.status(400).send("Name, User name and Password are mandatory");
    }

    // if (await User.count() > 0 && await User.findOne({ userName })) {
    //     response.status(409).send("A user with the same userName exists. Please use a different userName or login")
    // }

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, userName, email: email, password: encryptedPassword })
        const userWithLoginToken = addLoginToken(newUser)
        userWithLoginToken.save()

        response.status(201).json(userWithLoginToken);
    } catch (error) {
        response.status(500).send(error)
    }
}