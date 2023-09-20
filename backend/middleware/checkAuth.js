import jwt  from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req,res,next) => {

    try {
        const tokenWithBearer = req.headers.authorization;

        if(!tokenWithBearer) {
            const error = new Error("The token is not valid")
            return res.status(401).json({msg: error.message})
        }

        if (tokenWithBearer && tokenWithBearer.startsWith("Bearer")){
            const token = tokenWithBearer.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password -confirm -token -createdAt -updatedAt -__v")
            return next();
        }
    } catch (error) {
        return res.status(400).json({msg: "Wrong token"})
    }
}

export default checkAuth