const jwt=require("jsonwebtoken")
const User=require("../models/authModel")

console.log("Inside middleware..")

module.exports.protectRoute=(req,res,next)=>{
    try{
        console.log("here")
        if(req.cookies.login){
            jwt.verify(req.cookies.login, process.env.secret_key,
                (err,decodeToken)=>{
                    if(err){
                        return res.json({status:false})
                    }
                    res.clearCookie("login");
                    req.cookies["login"]=""

                    const userId=decodeToken.payload
                    let signature=jwt.sign({payload:userId}, process.env.secret_key, {expiresIn:"35s"})
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

module.exports.verifyToken = (req, res, next) => {
    try {
        const cookies = req.headers.cookie;
        const token = cookies.split("=")[1];

        // console.log("always-token-->**", token)

        if (token) {
            jwt.verify(String(token), process.env.secret_key, (err, decodeToken) => {
                if (err) {
                    console.log("Error occurred, maybe token expired -->", err);
                    return res.status(400).json({ message: err.message, status: false });
                }
                const userId = decodeToken.payload;

                req.id = userId;
                next();
            });
        } else {
            console.log("Invalid cookie in verifyToken");
            return res.status(400).json({ message: "Invalid cookie!!", status: false });
        }
    } catch (err) {
        console.log("Error caught in try-catch -->", err);
        return res.status(400).json({ message: "User not authenticated!!", status: false });
    }
};

module.exports.refreshToken=(req,res,next)=>{
    try{
        const cookies = req.headers.cookie;
        const prevToken = cookies.split("=")[1];
        
        if(prevToken){
            jwt.verify(String(prevToken), process.env.secret_key,
                (err,decodeToken)=>{
                    if(err){
                        console.log("pehle toh sahi token bhejo-->",err)
                        return res.status(400).json({message:err,status:false})
                    }
                    
                    res.clearCookie("login")
                    req.cookies["login"]=""
                    
                    let uid=decodeToken.payload
                    let signature=jwt.sign({payload:uid}, process.env.secret_key, {expiresIn:"35s"})
                
                    req.id=uid
                    res.cookie("login",signature,{ httpOnly: false, maxAge: new Date(Date.now() + 1000 * 30) })
                    next()
                    })
                }else{
                    console.log("Invalid cookie in refreshToken");
                    return res.status(400).json({ message: "Couldn't find token" });
        }  
    }catch(err){
        return res.status(400).json({message:err})
    }
}
