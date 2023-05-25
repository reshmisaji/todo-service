
import express from 'express';
import { create, deleteById, getAll, getById } from '../controller/post.controller';

const router = express.Router()

router.post('/api/posts', create)
router.get('/api/posts/:id', getById)
router.get('/api/posts', getAll)
router.delete('/api/posts/:id',deleteById)

export { router as postRouter }