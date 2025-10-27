import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { editSetting, getSetting } from "../services/admin.service.js";

const settingRouter = Router();

settingRouter.get("/", adminMiddleware, getSetting)
settingRouter.put("/", adminMiddleware, editSetting)

export default settingRouter;