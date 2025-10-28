import type { Request, Response } from "express"

export const catchAsync = (fn: (req: Request, res: Response) => Promise<any>) => {
    return (req: Request, res: Response) => {
        try {
            fn(req, res)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: "Internal server serror"
            })
        }
    }
}