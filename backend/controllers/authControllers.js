import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupController = async(req,res) => {
    try{
        const {fullName,username,password,confirmPassword,gender} = req.body;
        if(password!=confirmPassword){
            return res.status(400).json({error:"Password did not match"})
        }
        
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"User already exist"});
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
        fullName,
        username,
        password,
        gender,
        profilePic : gender=="male" ? boyProfilePic : girlProfilePic
    })

    if(newUser){
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();
        res.status(201).json({message:"User Created Successfully"});
    }else{
        res.status(400).json({error:"Invalid User Data"});
    }
   

}catch(error){
 res.status(500).json({error:"Internal Error Occured"});
}

};


export const loginController = async(req,res) => {
try{
const {username ,password} = req.body;
const user = await User.findOne({username});
const isPasswordCorrect = await (password,user?.password || "");
if(!user || !isPasswordCorrect){
    return res.status(400).json({error:"Invalid credentials"});
}

generateTokenAndSetCookie(user._id,res);
res.status(200).json({message:"Logged In Successfully"});
 
}catch(error){
    res.status(500).json({error:"Internal Error Occured"});
   }
};

export const logoutController = async(req,res) => {
try{
res.cookie("jwt","",{maxAge:0});
res.status(200).json({message:"Logged Out Successfully"});
}catch(error){
    res.status(500).json({error:"Internal Error Occured"});
   }
};