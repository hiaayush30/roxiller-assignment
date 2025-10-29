import type { Request, Response } from "express";
import prismaClient from "../utils/prisma.js";

export const getRatedUsers = async (req: Request, res: Response) => {
      const store = await prismaClient.store.findFirst({
        where:{
            ownerId:req.user?.id!
        },
        include:{
            ratings:true
        }
      })
      if(!store){
        return res.status(404).json({
            error:"No stores found"
        })
      }
      
}