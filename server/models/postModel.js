const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema.Types

const postSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    place:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:""
    },
    
    files:[{
        type:Object,
        required:true
    }],
    comments:[{
        comment: {type:String},
        postedBy:{type:ObjectId, ref:"userModel"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"userModel"
    }
})

const postModel=mongoose.model('postModel',postSchema)
module.exports=postModel