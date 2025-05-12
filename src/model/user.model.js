import mongoose from "mongoose";
const {Schema} = mongoose
const userSchema= new Schema({
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    dob:{
        type: String,
        required:true

    },
    userType:{
        type:String,
        enum:["admin", "customer"],
        default: "Admin"
    },
    token:{
        type:String
    }
},{timestamps:true})
const user = mongoose.model('user',userSchema)
export default user