const jwt=require("jsonwebtoken")
const {secret_key}=require("../credentials")

function protectRoute(req,res,next){
    if(req.cookies.login){
        jwt.verify(req.cookies.login, secret_key,
            async(err,decodeToken)=>{
                if(err){
                    res.json({status:false})
                    next()
                }else{
                    res.json({status:true})
                    next() 
                }
            })
    }
}

module.exports=protectRoute