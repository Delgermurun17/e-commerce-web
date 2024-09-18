import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://e-commerce:25OugVCSRG18zJ4J@cluster0.ziy1t.mongodb.net/')
        console.log("Connected to database successfully")
    } catch (error) {
        
    }
}