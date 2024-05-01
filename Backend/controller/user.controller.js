import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import emailValidator from 'email-validator';

export const signup = async(req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({
                success:false,
                message:"every field required !"
             })
        }
            // Email validation
         const validEmail = emailValidator.validate(email);
          if(!validEmail){
            return res.status(400).json({
            success:false,
            message:"enter valid email !"
          })
         }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists !" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
        });
    } catch (error){
         // if email is already exist
         if(error. code === 11000)
         return res.status(400).json({
         success: false,
         message: `Account already exist with the provided email ${email} 😒`
         
       })
     return res.status(400).json({
         success:false,
         message: error.message
       })
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"every field required"
             })
        }
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};