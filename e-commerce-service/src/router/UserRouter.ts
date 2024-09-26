import express from "express";
import { createUsers, deleteUsers, getUser, updateUsers } from "../controller/UserController";
import { checkAuth } from "../controller/AuthController";

export const userRouter = express.Router()

userRouter
.get('/user',checkAuth, getUser)
.post('/users', createUsers)
.put('/users/:id', updateUsers)
.delete('/users/:id', deleteUsers)