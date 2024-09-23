import express from "express";
import { createUsers, deleteUsers, getUsers, updateUsers } from "../controller/UserController";

export const userRouter = express.Router()

userRouter
.get('/users', getUsers)
.post('/users', createUsers)
.put('/users/:id', updateUsers)
.delete('/users/:id', deleteUsers)