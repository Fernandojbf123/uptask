import express from "express"

const router = express.Router();

import { signIn } from "../controllers/userController.js";


//Users' auth, sign in and confirmation
router.post("/", signIn)

export default router