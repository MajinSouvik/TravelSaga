const User=require('../models/authModel')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {secret_key}=require("../credentials")
const maxAge = 3 * 24 * 60 * 60;

module.exports.normalFunc=async(req,res)=>{
    return res.json({status:"true"})
}

module.exports.register=async(req,res)=>{
    try{
        const {username,password,profilePic}=req.body
        const confirmPassword=password

        const user=await User.create({username,password,profilePic,confirmPassword});
        console.log(user)
        res.status(200).send({status:true})
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.login=async(req,res)=>{
    console.log("here inside login")
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username})
        if(user){
            const auth=await bcrypt.compare(password, user.password)
            if(auth){
                let uid=user['_id']
                let signature=jwt.sign({payload:uid}, secret_key, {expiresIn:"35s"})
                console.log("token-->",signature)
                if(req.cookies["login"]){
                    req.cookies["login"]=""
                }
                res.cookie("login",signature,{ httpOnly: false, maxAge: new Date(Date.now() + 1000 * 30) })
                return res.status(200).json({status:true, user, signature})
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
        console.log("**",err)
        return res.status(404).json({err, status:false})
    }
}