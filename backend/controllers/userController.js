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

const authUser = async (req,res) => {
    //check if user is signed in
    const {email} = req.body
    const user = await User.findOne({email})
    if (!user) {
        const error = new Error("User does not exist or password is wrong")
        return res.status(404).json({msg: error.message})
    }
    // check if user has confirmed his registration
    if (!user.confirm) {
        const error = new Error("You must confirm you email before logging in")
        return res.status(403).json({msg: error.message})
    }
    //confirm password is correct
    const {password} = req.body;
    if (await user.checkPassword(password)){
        console.log("Es correcto")
    }
    else{
        const error = new Error("User does not exist or password is wrong")
        return res.status(403).json({msg: error.message})
    }

}

export { signIn, authUser} 