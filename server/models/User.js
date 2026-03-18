import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Ensure at least phone or email is present, though we primarily auth via phone in Twilio flow right now
userSchema.index({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $exists: true, $type: 'string', $ne: '' } } })
userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $exists: true, $type: 'string', $ne: '' } } })

export const User = mongoose.model('User', userSchema)
