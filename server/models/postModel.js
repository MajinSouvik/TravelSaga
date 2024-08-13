const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema.Types

const fileSchema=new mongoose.Schema({
    // name:{
    //     type:String,
    //     required:true
    // },

    url:{
        type:String,
        required:true
    }
})


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
    // image:{
    //     type:String,
    //     default:""
    // },
    files:[fileSchema],

    comments:[{
        comment:{type:String},
        postedBy:{type:ObjectId, ref:"userModel"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"userModel"
    }
})

const postModel=mongoose.model('postModel',postSchema)
module.exports=postModel