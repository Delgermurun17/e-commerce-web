import express from "express";
import { login, register } from "../controller/AuthController";

export const authRouter = express.Router()

authRouter
.get('/login', login)
.post('/register', register)