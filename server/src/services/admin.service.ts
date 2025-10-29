import type { Request, Response } from "express";
import prismaClient from "../utils/prisma.js";

export const getUsers = async (req: Request, res: Response) => {
    const users = await prismaClient.user.count();
    return res.status(200).json({
        users
    })
}


export const getStores = async (req: Request, res: Response) => {
    const stores = await prismaClient.store.count()
    return res.status(200).json({
        stores
    })
}

export const getRatings = async (req: Request, res: Response) => {
    const owner_ratings = await prismaClient.ownerRating.count()
    const store_ratings = await prismaClient.storeRating.count()
    return res.status(200).json({
        ratings: owner_ratings + store_ratings
    })
}

export const addUser = async (req: Request, res: Response) => {
    const { name, email, address, password } = req.body()
    if (!name || !email || !address || !password) {
        return res.status(403).json({
            error: "Invalid request"
        })
    }
    const user = await prismaClient.user.create({
        data: {
            email,
            name,
            password,
            address
        }
    })
    return res.status(201).json({
        user
    })
}

export const getUsersInfo = async (req: Request, res: Response) => {
    const { page = 1, items = 10 } = req.query;
    const users = prismaClient.user.findMany({
        skip: (Number(page) - 1) * Number(items),
        take: Number(items),
        omit: {
            password: true
        }
    })
    return res.status(200).json({
        users
    })
}

export const getAdminInfo = async (req: Request, res: Response) => {
    const { page = 1, items = 10 } = req.query;
    const admins = prismaClient.user.findMany({
        where: {
            role: "admin"
        },
        skip: (Number(page) - 1) * Number(items),
        take: Number(items),
        omit: {
            password: true
        }
    })
    return res.status(200).json({
        admins
    })
}