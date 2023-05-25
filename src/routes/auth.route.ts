import express from "express"
import { signUp, signIn } from "../controller/user.controller"

const router = express.Router()

router.post('/api/user/signin', signIn)
router.post('/api/user', signUp)

export { router as authRouter }