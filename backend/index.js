import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";

const app = express();

dotenv.config()

connectToDb()


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server running in port: ${PORT}`)
})