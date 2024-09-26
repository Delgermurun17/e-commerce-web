import express from "express";
import { checkAuth, login, register } from "../controller/AuthController";
import { getUser } from "../controller/UserController";

export const authRouter = express.Router()

authRouter
.post('/login', login)
.post('/register', register)
.get('/auth', checkAuth, getUser)