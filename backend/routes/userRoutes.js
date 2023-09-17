import express from "express"

import { 
    signIn, 
    authUser, 
    confirmUser, 
    forgotPassword, 
    verifyToken, 
    genNewPassword,
    profile
} from "../controllers/userController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Users' auth, sign in and confirmation
router.post("/", signIn)
router.post("/login", authUser)
router.get("/confirm/:token", confirmUser)
router.post("/forgot-password", forgotPassword)
router.route("/forgot-password/:token").get(verifyToken).post(genNewPassword)


router.get("/profile", checkAuth, profile)

export default router