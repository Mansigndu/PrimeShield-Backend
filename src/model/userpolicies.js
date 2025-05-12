import mongoose from "mongoose"
const{Schema} = mongoose
const userpolicySchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true

    },
    policyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'policy',
        required:true
    },
    status:{
        type:String,
        enum:["Active","Expired","Cancel","Pending"],
        default:"Pending"

    }
},{timestamps:true})
const userPolicy = mongoose.model('userPolicy',userpolicySchema)

export default userPolicy