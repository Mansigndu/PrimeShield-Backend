import mongoose from "mongoose"

const{Schema}  = mongoose

const Insurance1Schema= new Schema({
    InsuranceName:{
        type:String,
        required:true
    },
    InsurancePrice:{
        type:String,
        required:true
    },
    InsuranceTiming:{
        type:String,
        required:true
    },
},{timestamps:true})
const Insurance1 = mongoose.model('Insurance1',Insurance1Schema)
export default Insurance1