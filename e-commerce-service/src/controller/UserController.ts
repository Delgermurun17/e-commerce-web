import { Request, Response, } from "express";
import { UserModel } from "../model/UserModel";
import jwt from "jsonwebtoken"

// export const getUsers = async (req: Request, res: Response) => {
//     const authtoken = req.headers["authtoken"];
    
//     const data = jwt.decode(authtoken + "")
    

//     try {
//         const users = await UserModel.find()
//         res.send(users)
//     }
//     catch (error) {
//         res.status(400).json({ errorMessage: "Error" })
//     }
// }
export const getUser = async (req: Request, res: Response) => {
    const authtoken = req.headers["authtoken"];
    if (!authtoken) {
        return res.status(401).json({ errorMessage: "No token provided" });
    }

    const data = jwt.decode(authtoken as string);

    // Check if the token is valid and contains userId
    if (typeof data !== 'object' || data === null || !('userId' in data)) {
        return res.status(401).json({ errorMessage: "Invalid token" });
    }

    try {
        const user = await UserModel.findById(data.userId);
        if (!user) {
            return res.status(404).json({ errorMessage: "User not found" });
        }
        // Send only the necessary user information
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ errorMessage: "Error retrieving user" });
    }
};

export const createUsers = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body
        const user = await UserModel.create({ name, email, password, phoneNumber, address })
        res.send(user)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Create doesn't working!" })
    }
}
export const updateUsers = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;
        const { id } = req.params;
        const update = await UserModel.findByIdAndUpdate(id, { name, email, password, phoneNumber, address })
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