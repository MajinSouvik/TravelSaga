const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema.Types

const reelSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    place:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    comments:[{
        comment:{type:String},
        postedBy:{type:ObjectId,ref:"userModel"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"userModel"
    }
})

const reelModel=mongoose.model('reelModel',reelSchema)
module.exports=reelModel