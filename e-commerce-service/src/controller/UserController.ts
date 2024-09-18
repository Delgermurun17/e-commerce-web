import { Request, Response, } from "express";
import { UserModel } from "../model/UserModel";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Error" })
    }
}

export const createUsers = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phoneNumber } = req.body
        const user = await UserModel.create({ name, email, password, phoneNumber })
        res.send(user)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Create doesn't working!" })
    }
}
export const updateUsers = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const { id } = req.params;
        const update = await UserModel.findByIdAndUpdate(id, { name, email, password, phoneNumber })
        res.send(update)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" })
    }
}
export const deleteUsers = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await UserModel.deleteOne({ _id: id })
        res.send({ message: "Successfully deleted!" })
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" })
    }
}