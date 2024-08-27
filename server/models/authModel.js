const mongoose= require('mongoose')
const bcrypt= require('bcrypt')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required: [true, "Email is Required"]
    },
    profilePic: {
        type: String, 
        default: '', 
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

userSchema.pre('save',async function(){
    this.confirmPassword=undefined;
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})

// userSchema.static.login=async function(username, password){
//     console.log("here static")
//     const user=await this.findOne({username})
//     console.log("user inside static, user")
//     if(user){
//         const auth=await bcrypt.compare(password, user.password)
//         if(auth){
//             return user
//         }
//         throw Error("Incorrect password")
//     }
//     throw Error("Incorrect username")
// }

const userModel=mongoose.model('userModel',userSchema)

module.exports = userModel