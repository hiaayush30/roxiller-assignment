import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { addUser, getRatings, getStores, getUsers, getUsersInfo } from "../services/admin.service.js";
import { catchAsync } from "../utils/error-handler.js";
import { getStoresInfo } from "../services/common.service.js";

const adminRouter = Router();

adminRouter.get("/users", adminMiddleware, catchAsync(getUsers));
adminRouter.get("/stores", adminMiddleware, catchAsync(getStores));
adminRouter.get("/ratings", adminMiddleware, catchAsync(getRatings));
adminRouter.post("/user", adminMiddleware, catchAsync(addUser));
adminRouter.get("/stores-info", adminMiddleware, catchAsync(getStoresInfo));
adminRouter.post("/users-info", adminMiddleware, catchAsync(getUsersInfo));

export default adminRouter;