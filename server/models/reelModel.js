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

    url:{
            type:Object,
            required:true
    },

    comments:[{
        comment: {type:String},
        postedBy:{type:ObjectId, ref:"userModel"}
    }],

    likes: [
        {
          type: ObjectId,
          ref: "userModel", 
        },
    ],
    
    postedBy:{
        type:ObjectId,
        ref:"userModel"
    }
})


reelSchema.virtual('likeCount').get(function() {
    return this.likes.length;
  });
  
  // Method to check if a specific user has liked the post
  reelSchema.methods.isLikedByUser = function(userId) {
    return this.likes.includes(userId);
  };



const reelModel=mongoose.model('reelModel',reelSchema)
module.exports=reelModel