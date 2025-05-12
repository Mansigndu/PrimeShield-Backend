import mongoose from "mongoose"
import { type } from "os"
const{Schema} = mongoose
const reviewsSchema = new Schema({
   name:{
    type:String,
    required:true
   },
    reviewText:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true})
const reviews = mongoose.model('reviews',reviewsSchema)
export default reviews