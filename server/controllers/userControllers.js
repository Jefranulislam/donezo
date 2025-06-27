import { useReducer } from "react";
import userSchema from "../models/user";
import { createJWT } from "../index.js";

export const registerUser = async(req,res)=>{
    try {
        const {name, email,password, isAdmin, role, title}= req.body;
        const useExist= await userSchema.findOne({email});
        if(useExist){
            return res.status(400).json({
                status: false,
                message: "user already exist"
            });
        }

        const user = await userSchema.create({
            name, email, password, isAdmin, role, title
        })
        if(user){
            isAdmin? createJWT(res,user._id):null;
            user.password = undefined;
            res.status(201).json(user);
        }

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message});

    }
}