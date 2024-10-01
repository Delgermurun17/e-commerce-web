import { Request, Response, } from "express";
import { ProductModel } from "../model/ProductModel";

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { price = -1} = req.query
        const products = await ProductModel.find({}, null, { sort: { price: Number(price) } }).limit(10)
        res.send(products)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ errorMessage: "Error" })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const users = await ProductModel.findById(id)
        res.send(users)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Error" })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { productName,
            description,
            productCode,
            price,
            quantity,
            images,
        } = req.body

        const user = await ProductModel.create({
            productName,
            description,
            productCode,
            price,
            quantity,
            images,
            createdAt: new Date()
        })
        res.send(user)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Create doesn't working!", error })
    }
}
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productName,
            description,
            productCode,
            price,
            quantity,
        } = req.body;
        const { id } = req.params;
        const update = await ProductModel.findByIdAndUpdate(id, {
            productName,
            description,
            productCode,
            price,
            quantity,
        })
        res.send(update)
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" })
    }
}
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await ProductModel.deleteOne({ _id: id })
        res.send({ message: "Successfully deleted!" })
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" })
    }
}