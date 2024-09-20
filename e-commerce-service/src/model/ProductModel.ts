import { model, Schema } from "mongoose";

const schema = new Schema({
    pruductName: String,
    categoryId: String,
    price: Number,
    quantity: Number,
    thumbnails: String,
    images: String,
    coupon: String,
    salePercent: Number,
    description: String,
    viewsCount: Number,
    createdAt: Date,
    updatedAt: Date  
})

export const ProductModel= model("Product", schema)