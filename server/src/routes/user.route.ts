import { Router } from "express";
import { getUserDetails, loginUser, registerUser } from "../services/user.service.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const userRouter = Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser)
userRouter.get("/me", userMiddleware, getUserDetails)

export default userRouter;