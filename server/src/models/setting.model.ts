import mongoose, { Document, Schema } from "mongoose"

export interface ISetting extends Document {
    maxFreeRequests: number,
    limitWindowMinutes: number
}

const settingSchema = new Schema<ISetting>(
    {
        maxFreeRequests: {
            type: Number
        },
        limitWindowMinutes: {
            type: Number
        }
    }
)

export const Setting = mongoose.model<ISetting>("setting", settingSchema)
