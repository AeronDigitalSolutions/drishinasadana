import mongoose from 'mongoose'

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  workshopId: {
    type: String,
    required: true,
    index: true,
  },
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  amountPaise: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Quick lookup to see if a user has bought a workshop
purchaseSchema.index({ userId: 1, workshopId: 1 })

export const Purchase = mongoose.model('Purchase', purchaseSchema)
