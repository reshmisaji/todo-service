
import express from 'express';
import { deleteById, getAll, getById } from '../controller/user.controller';

const router = express.Router()

router.get('/api/user/:id', getById)
router.get('/api/users', getAll)
router.delete('/api/user/:id',deleteById)

export { router as userRouter }