import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import userRouter from "./routes/user.route.js";


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

app.use("/api/v1/user", userRouter)
// app.use("/api/v1/owner", userRouter)
// app.use("/api/v1/admin", userRouter)
// app.use("/api/v1/store", userRouter)

app.listen(process.env.PORT || 5000, () => {
    console.log("server running on port " + (process.env.PORT ?? 5000))
})
