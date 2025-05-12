import mongoose from "mongoose"
const { Schema } = mongoose

const FormSchema = new Schema({
    Name: {
        type: String,
        required: true

    },
    Gender: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    MobileNumber: {
        type: String,
        required: true
    },

    Address: {
        type: String,
        required: true
    },
    FamilyMember: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ["Accept", "Reject", "Pending"],
        default: "Pending"
    },
    ApplyFor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'applyForType', 
    },
    applyForType: {
        type: String,
        required: true,
        enum: ['Insurance1', 'policy'], 
    },



}, { timestamps: true })
const Form = mongoose.model('Form', FormSchema)
export default Form