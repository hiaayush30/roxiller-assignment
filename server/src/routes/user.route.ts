import { Router } from "express";
import { catchAsync } from "../utils/error-handler.js";
import { loginUser, registerUser, updatePassword } from "../services/user.service.js";

const userRouter = Router();

userRouter.post("/signup", catchAsync(registerUser));
userRouter.post("/login", catchAsync(loginUser))
userRouter.post("/reset", catchAsync(updatePassword))

export default userRouter;