import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  paymentDate: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    required: true
  },
  cardType: {
    type: String,
    required: true, // Visa, MasterCard, etc.
  },
  cardHolderName: {
    type: String,
    required: true
  },
  lastFourDigits: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^[0-9]{4}$/.test(value);
      },
      message: "Last four digits must be a 4-digit number"
    }
  },
  expirationDate: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
      },
      message: "Expiration date must be in MM/YY format"
    }
  }
}, { timestamps: true });

const payments = mongoose.model('payments', paymentsSchema);
export default payments;
