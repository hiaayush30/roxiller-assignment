import { Router } from "express";
import { catchAsync } from "../utils/error-handler.js";
import { addRating, loginUser, registerUser, searchStores } from "../services/user.service.js";
import { userMiddleware } from "../middleware/user.middleware.js";
import { getStoresInfo, updatePassword } from "../services/common.service.js";

const userRouter = Router();

userRouter.post("/signup", catchAsync(registerUser));
userRouter.post("/login", catchAsync(loginUser))
userRouter.post("/reset", userMiddleware, catchAsync(updatePassword))
userRouter.post("/rating", userMiddleware, catchAsync(addRating))
userRouter.get("/stores", userMiddleware, catchAsync(getStoresInfo))
userRouter.get("/stores/search", userMiddleware, catchAsync(searchStores))

export default userRouter;