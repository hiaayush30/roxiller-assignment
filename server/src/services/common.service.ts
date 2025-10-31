import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import prismaClient from "../utils/prisma.js";

export const updatePassword = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(403).json({
            error: "Invalid request"
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            id: req.user?.id!
        }
    })
    if (!user) {
        return res.status(403).json({
            error: "user not found"
        })
    }
    const matchPass = bcrypt.compareSync(oldPassword, user.password)
    if (!matchPass) {
        return res.status(403).json({
            error: "password incorrect"
        })
    }
    const hashedPass = bcrypt.hashSync(newPassword, 5)
    await prismaClient.user.update({
        where: {
            id: req.user?.id!
        },
        data: {
            password: hashedPass
        }
    })
    return res.status(200).json({
        message: "password updated"
    })
}

export const getStoresInfo = async (req: Request, res: Response) => {
    const { page = 1, items = 10 } = req.query;
    const stores = prismaClient.store.findMany({
        skip: (Number(page) - 1) * Number(items),
        take: Number(items),
        include: {
            ratings: true,
            _count: true
        }
    })
    return res.status(200).json({
        stores
    })
}

export const getMe = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(403).json({
            error: "Invalid request | id required"
        })
    }
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        omit:{
            password:true
        }
    })
    if(!user){
        return res.status(403).json({
            error:"user not found"
        })
    }
    return res.status(200).json({
        user
    })
}