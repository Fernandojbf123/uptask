import express from "express"

const router = express.Router();

import { 
    signIn, 
    authUser, 
    confirmUser, 
    forgotPassword, 
    verifyToken, 
    genNewPassword,
} from "../controllers/userController.js";


//Users' auth, sign in and confirmation
router.post("/", signIn)
router.post("/login", authUser)
router.get("/confirm/:token", confirmUser)
router.post("/forgot-password", forgotPassword)
router.route("/forgot-password/:token").get(verifyToken).post(genNewPassword)


export default router