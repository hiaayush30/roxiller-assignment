import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]
    if (!token) {
      return res.status(403).json({
        error: "token not found | Invalid request"
      })
    }
    const data = jwt.verify(token, process.env.JWT_SECRET!) as { email: string, role: "user" | "admin", id: string }
    if (data.role !== "admin") {
      return res.status(403).json({
        error: "Invalid request"
      })
    }
    req.user = data;
    next()
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      error: "Invalid token"
    })
  }
}