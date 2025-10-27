import mongoose, { Document } from "mongoose";


interface IUser extends Document {
    email: string;
    password: string;
    createdAt: Date,
    updatedAt: Date,
    role: "admin" | "user",
    likesPrompts: mongoose.ObjectId[]
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    likesPrompts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "prompt"
    }]
}, { timestamps: true })

export const User = mongoose.model<IUser>("user", userSchema);