import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { Prompt } from "../models/prompt.model.js";
import { createPromptSchema, updatePromptSchema } from "../schema/prompt.schema.js";
import { Setting } from "../models/setting.model.js";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate("tasks");
        return res.status(200).json({
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(403).json({
                error: "Invalid request"
            })
        }
        const user = await User.deleteOne({ _id: id })
        return res.status(200).json({
            user,
            message: "user deleted"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const createPrompt = async (req: Request, res: Response): Promise<any> => {
    try {
        const parsed = createPromptSchema.safeParse(req.body);
        if (!parsed.success || req.user?.role !== "admin") {
            return res.status(403).json({
                error: "Invalid Request"
            })
        }
        const { description, title, style } = parsed.data;

        const prompt = await Prompt.create({
            title,
            description,
            style,
            createdBy: req.user.id
        })

        return res.status(201).json({
            message: "prompt created",
            prompt
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }

}

export const updatePrompt = async (req: Request, res: Response): Promise<any> => {
    try {
        const parsed = updatePromptSchema.safeParse(req.body);
        const id = req.params["id"]
        if (!parsed.success || !id || req.user?.role !== "admin") {
            return res.status(403).json({
                error: "Invalid Request"
            })
        }
        const { description, title } = parsed.data;
        const prompt = await Prompt.findByIdAndUpdate(id, {
            title,
            description
        })
        return res.status(201).json({
            message: "prompt updated",
            prompt
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }

}

export const getPrompts = async (req: Request, res: Response) => {
    try {
        const prompts = await Prompt.find({}) // 1. Find all documents
            .sort({ createdAt: -1 })
            .populate({
                path: 'createdBy',
                select: '_id email'
            });

        return res.status(200).json({
            prompts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            erorr: "Internal server error"
        })
    }
}


export const editPrompt = async (req: Request, res: Response) => {
    try {
        const { _id, title, description, style } = req.body;
        if (!_id || !title || !description || !style) {
            return res.status(403).json({
                error: "Invalid request,all fields are required"
            })
        }
        const prompt = await Prompt.findByIdAndUpdate({ _id }, {
            title,
            description,
            style
        })
        return res.status(200).json({
            prompt
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const deletePrompt = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(403).json({
                error: "Invalid request,all fields are required"
            })
        }
        const prompt = await Prompt.findByIdAndDelete({ _id: id })
        return res.status(200).json({
            prompt
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const getSetting = async (req: Request, res: Response) => {
    try {
        let setting = await Setting.findOne()
        if (!setting) {
            setting = await Setting.create({
                maxFreeRequests: 3,
                limitWindowMinutes: 60
            })
        }
        return res.json({
            setting
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const editSetting = async (req: Request, res: Response) => {
    try {
        const { limitWindow, maxFreeRequests } = req.body;
        if (!limitWindow && !maxFreeRequests) {
            return res.status(403).json({
                error: "atleast 1 parameter required!"
            })
        }
        const setting = await Setting.findOne();
        if (!setting) {
            return res.status(404).json({
                error: "No setting configuration found"
            })
        }
        if (limitWindow) {
            setting.limitWindowMinutes = Number(limitWindow)
        }
        if (maxFreeRequests) {
            setting.maxFreeRequests = Number(maxFreeRequests)
        }
        await setting.save()

        return res.status(200).json({
            setting
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}