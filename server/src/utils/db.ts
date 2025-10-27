import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI!);
        console.log("DB connected")
    } catch (error) {
        throw new Error("Connection to db failed:"+error)
    }
}