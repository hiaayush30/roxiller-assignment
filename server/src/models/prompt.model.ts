import mongoose, { Document, Schema } from "mongoose"

export enum NameStyleHeadings {
  AUTO = "Auto",
  BRANDABLE_NAMES = "Brandable names",
  EVOCATIVE = "Evocative",
  SHORT_PHRASE = "Short phrase",
  COMPOUND_WORDS = "Compound words",
  ALTERNATE_SPELLING = "Alternate spelling",
  NON_ENGLISH_WORDS = "Non-English words",
  REAL_WORDS = "Real words",
}

export interface IPrompt extends Document {
  title: string
  description: string
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
  style: string
}

const promptSchema = new Schema<IPrompt>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    style: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
)

export const Prompt = mongoose.model<IPrompt>("Prompt", promptSchema)
