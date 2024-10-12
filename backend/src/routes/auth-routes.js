import express from "express"
import { checkAuth, login, logout, register } from "../controllers/auth-controller.js"
import { verifyToken } from "../middleware/auth-middleware.js"

export const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/check-auth", verifyToken, checkAuth)
