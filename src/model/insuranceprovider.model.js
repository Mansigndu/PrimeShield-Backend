import mongoose from "mongoose"
const { Schema } = mongoose

const InsuranceSchema = new Schema({
    providerName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true })
const Insurance = mongoose.model('Insurance', InsuranceSchema)

export default Insurance
