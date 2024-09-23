import { Request, Response } from "express"
import { UserModel } from "../model/UserModel"
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"


const SALT_SECRET = process.env.SALT_SECRET || ""
const ACCESS_TOKET_SECRET = process.env.ACCESS_TOKET_SECRET || ""
export const register = async (req: Request, res: Response) => {
    try {
        const createdAt = new Date().toISOString()
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(String(password), Number(SALT_SECRET))
        await UserModel.create({ email, password: hashedPassword, createdAt })
        res.send("Successfully registered!")
    } catch (error) {
        res.sendStatus(400)
        console.error(error)

    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) return res.status(401).send("User doesn't found!")
        const isEqual = await bcrypt.compare(String(password), user.password)
        if (isEqual) {
            const accessToken = jwt.sign(
                { userId: user._id, email },
                ACCESS_TOKET_SECRET,
                {
                    expiresIn: "2h"
                }
            )
            return res.send({accessToken})
        }




        res.status(401).send("Password is incorrect!")
    } catch (error) {
        res.sendStatus(401)
    }
}