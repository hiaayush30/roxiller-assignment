import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { connectDB } from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import cors from "cors"
import promptRouter from "./routes/prompt.route.js";
import settingRouter from "./routes/setting.route.js";


const app = express();
app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL!],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposedHeaders: ["authorization"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())

app.get("/api", (req, res) => {
    res.status(200).json({
        message: "server running"
    })
})

app.use("/api/user", userRouter)
app.use("/api/prompt", promptRouter)
app.use("/api/setting", settingRouter)

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log("server running on port " + (process.env.PORT ?? 5000))
        })
    })