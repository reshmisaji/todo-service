import express from 'express';
import { json, urlencoded } from 'body-parser';
import { todoRouter } from './routes/todo.route';
import { userRouter } from './routes/user.route';
import { connectDatabase } from './database';
import defaults from '../config/defaults';
import { authorize } from './controller/auth.controller';
import { authRouter } from './routes/auth.route';
import { postRouter } from './routes/post.route';

const PORT = process.env.PORT || defaults.port;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json())

app.use(authRouter)
app.use(authorize)
app.use(userRouter);
app.use(todoRouter);
app.use(postRouter)

app.listen(PORT, () => {
    console.log('server is running', PORT)
    connectDatabase()
})