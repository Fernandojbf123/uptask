import express from "express"

const router = express.Router();

import { signIn, authUser } from "../controllers/userController.js";


//Users' auth, sign in and confirmation
router.post("/", signIn)
router.post("/login", authUser)


export default router