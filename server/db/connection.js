import mongoose from 'mongoose'

mongoose.set('bufferCommands', false)

let connectInFlight = null

export const getDbStatus = () => {
  const { readyState, name } = mongoose.connection
  const stateLabel =
    readyState === 1
      ? 'connected'
      : readyState === 2
        ? 'connecting'
        : readyState === 3
          ? 'disconnecting'
          : 'disconnected'

  return {
    readyState,
    stateLabel,
    dbName: name || '',
  }
}

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      console.warn('[MongoDB] No MONGODB_URI found in environment variables.')
      return false
    }

    if (mongoose.connection.readyState === 1) {
      return true
    }

    if (connectInFlight) {
      return connectInFlight
    }

    connectInFlight = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        dbName: process.env.MONGODB_DB_NAME || undefined,
      })
      .then(() => {
        console.log('[MongoDB] Connected successfully.')
        return true
      })
      .catch((error) => {
        console.error('[MongoDB] Connection error:', error)
        return false
      })
      .finally(() => {
        connectInFlight = null
      })

    return connectInFlight
  } catch (error) {
    console.error('[MongoDB] Connection error:', error)
    return false
  }
}

export const ensureDbConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    return true
  }
  return connectDB()
}
