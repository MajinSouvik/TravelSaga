const mongoose = require("mongoose")

const reelSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    place:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:[String],
        default:[]
    },
    image:{
        type:String,
        default:""
    }
})

const reelModel=mongoose.model('reelModel',reelSchema)
module.exports=reelModel