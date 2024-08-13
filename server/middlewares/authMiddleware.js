const jwt=require("jsonwebtoken")
const {secret_key}=require("../credentials")
const User=require("../models/authModel")

console.log("Inside middleware..")

module.exports.protectRoute=(req,res,next)=>{
    try{
        console.log("here")
        if(req.cookies.login){
            jwt.verify(req.cookies.login, secret_key,
                (err,decodeToken)=>{
                    if(err){
                        return res.json({status:false})
                    }
                    res.clearCookie("login");
                    req.cookies["login"]=""

                    const userId=decodeToken.payload
                    let signature=jwt.sign({payload:userId}, secret_key, {expiresIn:"35s"})
                    res.cookie("login",signature,{ httpOnly: false, maxAge: new Date(Date.now() + 1000 * 30) })

                    req.id=userId
                    next()
                    })
                }else{
                    return res.status(400).json({message:"Invalid cookie!!",status:false})
        }  
    }catch(err){
        return res.status(400).json({message:"User not authenticated!!",status:false})
    }
}


module.exports.verifyToken=(req,res,next)=>{
    try{
        if(req.cookies.login){
            jwt.verify(req.cookies.login, secret_key,
                (err,decodeToken)=>{
                    if(err){
                        return res.json({status:false})
                    }
                    const userId=decodeToken.payload
                    
                    req.id=userId
                    next()
                    })
                }else{
                    return res.status(400).json({message:"Invalid cookie!!",status:false})
        }  
    }catch(err){
        console.log("try-catch-error-->",err)
        return res.status(400).json({message:"User not authenticated!!",status:false})
    }
}
