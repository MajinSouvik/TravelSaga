const mongoose= require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required: [true, "Email is Required"]
    },
    password:{
        type:String,
        required: [true, "Password is Required"]
    },
    confirmPassword:{
        type:String,
        required: [true, "Password is Required here too"]
    }
})

const userModel=mongoose.model('userModel',userSchema)
module.exports = userModel