import { model, Schema } from "mongoose";

const schema = new Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist!"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false
    },
    phoneNumber:{
        type:String,
        required: false,
        unique: true
    },
    address: String,
    zipCode: Number,
    cartId: String,
    createdAt: Date,
    updatedAt: Date,
})

export const UserModel = model("User", schema)