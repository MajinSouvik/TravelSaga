const User=require('../models/authModel')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {secret_key}=require("../credentials")
const maxAge = 3 * 24 * 60 * 60;

module.exports.register=async(req,res)=>{
    try{
        console.log("here in register auth");
        const {username,password}=req.body
        const confirmPassword=password

        const user=await User.create({username,password,confirmPassword});
        res.status(200).send({status:true})
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.login=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username})
        if(user){
            const auth=await bcrypt.compare(password, user.password)
            if(auth){
                let uid=user['_id']
                let signature=jwt.sign({payload:uid}, secret_key, {expiresIn:maxAge})
                res.cookie("login",signature,{ httpOnly: false, maxAge: maxAge * 1000 })
                return res.status(200).json({status:true})
            }else{
                const error="Incorrect Password!!"
                return res.status(404).json({error, status:false})
            }
        }else{
            const error="User not registered!!"
            return res.status(404).json({error, status:false})
        }
        return res.status(200).json({status:true})
    }catch(err){
        return res.status(404).json({err, status:false})
    }
}