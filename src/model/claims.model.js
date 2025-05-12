import mongoose from "mongoose"
const { Schema } = mongoose

const claimSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
   
    claimAmount: {
        type: String,
        required: true
    },
    claimStatus: {
        type: String,
        required: true,
        enum: ["approved", "disapproved", "pending"],
        default: "pending"
    },
    reason: {
        type: String,
        required: true
    },
     CancelFor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'cancelForType',
    },
    cancelForType: {
        type: String,
        required: true,
        enum: ['Insurance1', 'policy'],
    },

}, { timestamps:true})
const claim = mongoose.model('claim', claimSchema)
export default claim