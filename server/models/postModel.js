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

    likes: [
        {
          type: ObjectId,
          ref: "userModel", 
        },
    ],
    
    comments:[{
        comment: {type:String},
        postedBy:{type:ObjectId, ref:"userModel"}
    }],
    
    postedBy:{
        type:ObjectId,
        ref:"userModel"
    }
})

postSchema.virtual('likeCount').get(function() {
    return this.likes.length;
  });
  
  // Method to check if a specific user has liked the post
  postSchema.methods.isLikedByUser = function(userId) {
    return this.likes.includes(userId);
  };

const postModel=mongoose.model('postModel',postSchema)
module.exports=postModel