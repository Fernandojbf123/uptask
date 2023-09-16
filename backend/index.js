import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();
app.use(express.json())
dotenv.config()
connectToDb()

//routing
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server running in port: ${PORT}`)
})