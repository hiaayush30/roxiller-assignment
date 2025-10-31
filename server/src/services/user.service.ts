import type { Request, Response } from "express";
import prismaClient from "../utils/prisma.js";
import { LoginUserSchema, RegisterUserSchema } from "../schema/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerUser = async (req: Request, res: Response): Promise<any> => {
    const parsed = RegisterUserSchema.safeParse(req.body)
    if (!parsed.success) {
        console.log(parsed.error.issues)
        return res.status(403).json({
            error: parsed.error.issues.join(",")
        })
    }
    const { address, email, name, password } = parsed.data;
    const existing = await prismaClient.user.findFirst({
        where: {
            email
        }
    })
    if (existing) {
        return res.status(403).json({
            error: "User already exists"
        })
    }
    const hashedPassword = bcrypt.hashSync(password, 5);
    const user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            address,
        },
        omit:{
            password:true
        }
    })
    return res.status(201).json({
        user
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const parsed = LoginUserSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(403).json({
            error: "Invalid request"
        })
    }
    const { email, password } = parsed.data;
    const user = await prismaClient.user.findFirst({
        where: {
            email
        }
    })
    if (!user) {
        return res.status(403).json({
            error: "email and/or password incorrect"
        })
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(403).json({
            error: "email or password incorrect"
        })
    }
    const token = jwt.sign({ email, role: user.role, id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    })
    res.setHeader("authorization", token)
    return res.status(200).json({
        "user": {
            "email": user.email,
            "role": user.role,
            "id": user.id
        },
        message: "logged in successfully"
    })
}

export const searchStores = async (req: Request, res: Response) => {
    const { query = "" } = req.params

    const stores = prismaClient.store.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query
                    }
                },
                {
                    address: {
                        contains: query
                    }
                }
            ]
        },
        include: {
            ratings: true,
            _count: true
        }
    })
    return res.status(200).json({
        stores
    })
}

export const addRating = async (req: Request, res: Response) => {
    const { rating, storeId } = req.body;
    if (!rating || !storeId) {
        return res.status(403).json({
            error: "Invalid request"
        })
    }
    await prismaClient.storeRating.create({
        data: {
            rating,
            userId: req.user?.id!,
            storeId
        }
    })
    return res.status(200).json({
        message:"rating added"
    })
}
