import { Router } from "express";
import { generate_names } from "../services/user.service.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { createPrompt, deletePrompt, editPrompt, getPrompts } from "../services/admin.service.js";

const promptRouter = Router();

promptRouter.post("/names", generate_names)
promptRouter.post("/add", adminMiddleware, createPrompt)
promptRouter.get("/", adminMiddleware, getPrompts)
promptRouter.put("/", adminMiddleware, editPrompt)
promptRouter.delete("/:id", adminMiddleware, deletePrompt)

export default promptRouter;