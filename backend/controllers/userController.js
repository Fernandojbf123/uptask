import { generateID } from "../helpers/helpers.js";
import User from "../models/User.js";

const signIn = async (req,res) => {
    //Avoid repeated user
    const {email} = req.body;
    const doesUserExist =  await User.findOne({email})
    if (doesUserExist) {
        const error = new Error("email already registered")
        return res.status(400).json({msg: error.message})
    }

    try {
        const user = new User(req.body);
        user.token = generateID();
        const storedUser = await user.save();
        res.status(200).json(storedUser)
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}

export { signIn } 