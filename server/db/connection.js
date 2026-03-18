import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      console.warn('[MongoDB] No MONGODB_URI found in environment variables.')
      return false
    }

    await mongoose.connect(uri)
    console.log('[MongoDB] Connected successfully.')
    return true
  } catch (error) {
    console.error('[MongoDB] Connection error:', error)
    return false
  }
}
