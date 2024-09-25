import { Request, Response, NextFunction } from "express"
import { UserModel } from "../model/UserModel"
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"


const SALT_SECRET = process.env.SALT_SECRET || ""
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
export const register = async (req: Request, res: Response) => {
    try {
        const createdAt = new Date().toISOString()
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(String(password), Number(SALT_SECRET))
        await UserModel.create({ name, email, password: hashedPassword, createdAt })
        res.status(201).json({ message: "Successfully registered!" });
    } catch (error) {
        res.status(400).json({ message: "Registration failed!" });
        console.error(error)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found!" });

        const isEqual = await bcrypt.compare(password, user.password);
        if (isEqual) {
            const authtoken = jwt.sign(
                { userId: user._id, email: user.email },
                ACCESS_TOKEN_SECRET,
                { expiresIn: "2h" }
            );
            return res.json({ authtoken });
        }

        res.status(403).json({ message: "Password is incorrect!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during login.", error });
    }
};


export function checkAuth(req: Request, res: Response, next: NextFunction) {
    const authtoken = req.headers["authtoken"];
  
    console.log({ authtoken });
  
    if (!authtoken) {
      return res.sendStatus(403);
    }
  
    if (!jwt.verify(authtoken + "", ACCESS_TOKEN_SECRET)) {
      return res.sendStatus(403);
    }
  
    next();
  }