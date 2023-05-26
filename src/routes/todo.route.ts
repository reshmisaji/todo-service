
import express from 'express';
import { create, deleteById, getAll, getById, updateById } from '../controller/todo.controller';

const router = express.Router()

router.post('/api/todo', create)
router.get('/api/todo/:id', getById)
router.get('/api/todos', getAll)
router.delete('/api/todo/:id', deleteById)
router.put('/api/todo/:id', updateById)

export { router as todoRouter }