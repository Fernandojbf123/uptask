import User from "../models/User.js";
import { generateID } from "../helpers/helpers.js";
import { generateJWT } from "../helpers/generateJWT.js";



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
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    }
    else{
        const error = new Error("User does not exist or password is wrong")
        return res.status(403).json({msg: error.message})
    }

}

const confirmUser = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({token});
    if (!user){
        const error = new Error("The token is not valid")
        return res.status(403).json({msg: error.message})
    }

    try {
        user.confirm=true;
        user.token = "";
        await user.save();
        res.status(200).json({msg: "User confirmed"})
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}


const forgotPassword = async (req,res) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user){
        const error = new Error("The user does not exist")
        return res.status(403).json({msg: error.message})
    }

    try {
        user.token = generateID();
        await user.save()
        res.status(200).json({msg: "We have sent you an email with the instructions to reset your password"})
    } catch (error) {
        console.log(`error: ${error.message}`)    
    }
}


export { signIn, authUser, confirmUser, forgotPassword} 