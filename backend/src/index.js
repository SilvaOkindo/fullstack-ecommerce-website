import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectDB } from "./config/connect-db.js"
import { authRouter } from "./routes/auth-routes.js"

dotenv.config()


const app = express()


// db connection
connectDB()

// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

// routes

app.use("/api/v1/auth", authRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server running at ", PORT)
})