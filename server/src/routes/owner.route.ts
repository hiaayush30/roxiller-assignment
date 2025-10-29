import { Router } from "express";
import { updatePassword } from "../services/common.service.js";
import { ownerMiddleware } from "../middleware/owner.middleware.js";
import { catchAsync } from "../utils/error-handler.js";


const ownerRouter = Router();

ownerRouter.post("/reset-password", ownerMiddleware, catchAsync(updatePassword))

export default ownerRouter;