import z from "zod";
import { NameStyleHeadings } from "../models/prompt.model.js";

export const createPromptSchema = z.object({
    title: z.string(),
    description: z.string(),
    style:z.string()
})

export const updatePromptSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional()
})