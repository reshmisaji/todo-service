import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from 'jsonwebtoken';
import defaults from "../../config/defaults";


export const authorize = async (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;
    if (token) {
        const user = await User.findOne({ token })
        try {
           
            if (user && jwt.verify(token, defaults.jwtTokenName)) {
                response.locals.currentUser = user
                next()
                return;
            }
        } catch(error) {
            return response.status(400).send("Token expired")
        }
    }
    response.status(401).json({ error: 'Unauthorized' })
}