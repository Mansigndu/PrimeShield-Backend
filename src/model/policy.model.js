import mongoose from "mongoose"
const{Schema} = mongoose

const policySchema = new Schema({
    policy_name:{
        type:String,
        required:true,
        unique:true
    },
    policy_type:{
        type:String,
        required:true
    },
    coverage_amount:{
        type:String,
        required:true
    },
    premium_amount:{
        type:String,
        required:true
    },
    providerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    terms_conditions:{
        type:String,
        required:true
    }

    
},{timestamps:true})
const policy = mongoose.model('policy',policySchema)
export default policy