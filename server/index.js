import crypto from 'node:crypto'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import Razorpay from 'razorpay'
import twilio from 'twilio'
import { connectDB } from './db/connection.js'
import { Purchase } from './models/Purchase.js'
import { User } from './models/User.js'
import { workshopsData } from '../src/data/workshopsContent.js'

dotenv.config()

const app = express()
const API_PORT = Number(process.env.API_PORT || 8787)
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*'

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (CLIENT_ORIGIN === '*') return callback(null, true)
      if (origin === CLIENT_ORIGIN) return callback(null, true)
      if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
  }),
)
app.use(express.json())

const razorpayKeyId = process.env.RAZORPAY_KEY_ID
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
const twilioWhatsappFrom = process.env.TWILIO_WHATSAPP_FROM
const twilioContentSid = process.env.TWILIO_WHATSAPP_CONTENT_SID

if (!razorpayKeyId || !razorpayKeySecret) {
  console.warn('[Razorpay] Missing env vars: RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET')
}

const razorpay = new Razorpay({
  key_id: razorpayKeyId || '',
  key_secret: razorpayKeySecret || '',
})
const twilioClient =
  twilioAccountSid && twilioAuthToken ? twilio(twilioAccountSid, twilioAuthToken) : null
const otpSessions = new Map()

const getWorkshopById = (workshopId) => {
  if (workshopId === 'bundle') return workshopsData.bundle
  return workshopsData.workshops.find((item) => item.id === workshopId)
}
const getUniversalPhone = (value) => {
  const digits = String(value || '').replace(/\D/g, '')
  return digits.length > 10 ? digits.slice(-10) : digits
}

const toWhatsappAddress = (value) => {
  let digits = String(value || '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.length === 10) {
    digits = `91${digits}`
  }
  return `whatsapp:+${digits}`
}

app.get('/api/health', (_, res) => {
  res.json({
    ok: true,
    service: 'payments-api',
    twilioConfigured: Boolean(twilioClient && twilioWhatsappFrom),
  })
})

app.post('/api/auth/check', async (req, res) => {
  try {
    const { identifier } = req.body || {}
    if (!identifier) {
      return res.status(400).json({ error: 'Identifier (email or phone) is required.' })
    }

    const cleanPhone = getUniversalPhone(identifier)

    // Build query to find user by email or by phone
    const query = []
    if (identifier.includes('@')) {
      query.push({ email: identifier.trim() })
    }
    if (cleanPhone) {
      query.push({ phone: cleanPhone })
    }

    if (query.length === 0) {
      return res.status(400).json({ error: 'Invalid identifier format.' })
    }

    const user = await User.findOne({ $or: query })

    return res.json({
      exists: !!user,
      firstName: user?.firstName || '',
      phone: user?.phone || '',
      email: user?.email || ''
    })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Failed to check user existence.' })
  }
})

app.post('/api/otp/send', async (req, res) => {
  try {
    if (!twilioClient || !twilioWhatsappFrom) {
      return res.status(500).json({ error: 'Twilio WhatsApp is not configured on server.' })
    }

    const toPhone = toWhatsappAddress(req.body?.phone)
    if (!toPhone) {
      return res.status(400).json({ error: 'Valid phone number is required for WhatsApp OTP.' })
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const otpSessionId = `otp_${crypto.randomUUID()}`
    otpSessions.set(otpSessionId, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0,
      phone: toPhone,
    })

    const messagePayload = {
      from: twilioWhatsappFrom,
      to: toPhone,
    }

    if (twilioContentSid) {
      messagePayload.contentSid = twilioContentSid
      messagePayload.contentVariables = JSON.stringify({ 1: otp })
    } else {
      messagePayload.body = `${otp} is your verification code. For your security, do not share this code.`
    }

    await twilioClient.messages.create(messagePayload)

    return res.json({
      otpSessionId,
      sent: true,
      delivery: 'whatsapp',
      to: toPhone,
    })
  } catch (error) {
    return res.status(500).json({
      error: error?.message || 'Failed to send OTP on WhatsApp.',
    })
  }
})

app.post('/api/otp/verify', async (req, res) => {
  try {
    const { otpSessionId, otp, signupData } = req.body || {}
    if (!otpSessionId || !otp) {
      return res.status(400).json({ error: 'OTP session and OTP are required.' })
    }

    const session = otpSessions.get(otpSessionId)
    if (!session) {
      return res.status(400).json({ error: 'OTP session expired. Please request again.' })
    }

    if (Date.now() > session.expiresAt) {
      otpSessions.delete(otpSessionId)
      return res.status(400).json({ error: 'OTP expired. Please request a new OTP.' })
    }

    session.attempts += 1
    if (session.attempts > 5) {
      otpSessions.delete(otpSessionId)
      return res.status(400).json({ error: 'Too many invalid attempts. Please request new OTP.' })
    }

    if (String(otp).trim() !== session.otp) {
      return res.status(400).json({ error: 'Invalid OTP.' })
    }

    otpSessions.delete(otpSessionId)

    // Verify successful -> Find or construct Mongoose User
    const rawPhone = session.phone || ''
    const cleanPhone = getUniversalPhone(rawPhone)
    
    let user = await User.findOne({ phone: cleanPhone })
    if (!user) {
      user = new User({ 
        phone: cleanPhone, 
        firstName: signupData?.firstName || '',
        lastName: signupData?.lastName || '',
        email: signupData?.email || ''
      })
      await user.save()
    } else if (signupData) {
      let changed = false;
      if (signupData.firstName && !user.firstName) { user.firstName = signupData.firstName; changed = true; }
      if (signupData.lastName && !user.lastName) { user.lastName = signupData.lastName; changed = true; }
      if (signupData.email && !user.email) { user.email = signupData.email; changed = true; }
      if (changed) await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    return res.json({ verified: true, token, user })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Failed to verify OTP.' })
  }
})

app.post('/api/payments/create-order', async (req, res) => {
  try {
    if (!razorpayKeyId || !razorpayKeySecret) {
      return res.status(500).json({ error: 'Razorpay is not configured on server.' })
    }

    const { workshopId, customer } = req.body || {}
    const workshop = getWorkshopById(workshopId)

    if (!workshop) {
      return res.status(400).json({ error: 'Invalid workshop.' })
    }

    const amountInPaise = Math.round(Number(workshop.priceInr || 0) * 100)
    if (!amountInPaise) {
      return res.status(400).json({ error: 'Invalid workshop amount.' })
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${workshop.id}_${Date.now()}`,
      notes: {
        workshopId: workshop.id,
        workshopTitle: workshop.title,
        customerEmail: customer?.email || '',
        customerPhone: customer?.phone || '',
      },
    })

    return res.json({
      keyId: razorpayKeyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      workshop: {
        id: workshop.id,
        title: workshop.title,
        priceInr: workshop.priceInr,
      },
    })
  } catch (error) {
    return res.status(500).json({
      error: error?.error?.description || error?.message || 'Failed to create order.',
    })
  }
})

app.post('/api/payments/verify', async (req, res) => {
  try {
    if (!razorpayKeySecret) {
      return res.status(500).json({ error: 'Razorpay secret is not configured.' })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, workshopId, amountPaise, customer } = req.body || {}
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment verification fields.' })
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto.createHmac('sha256', razorpayKeySecret).update(payload).digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Signature verification failed.' })
    }

    // Save purchase to database
    if (workshopId && amountPaise && customer) {
      let existingPurchase = await Purchase.findOne({ paymentId: razorpay_payment_id })
      if (!existingPurchase) {
        const cleanPhone = getUniversalPhone(customer.phone)
        let user = await User.findOne({ phone: cleanPhone })

        if (!user) {
          user = new User({
            phone: cleanPhone,
            email: customer.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
          })
          await user.save()
        } else {
          user.email = user.email || customer.email
          user.firstName = user.firstName || customer.firstName
          user.lastName = user.lastName || customer.lastName
          await user.save()
        }

        const purchase = new Purchase({
          userId: user._id,
          workshopId,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          amountPaise,
        })
        await purchase.save()
      }
    }

    return res.json({
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Payment verification failed.' })
  }
})

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Missing token.' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized. Invalid or expired token.' })
  }
}

app.post('/api/payments/free-access', authenticate, async (req, res) => {
  try {
    const { workshopId } = req.body || {}
    if (!workshopId) {
      return res.status(400).json({ error: 'Missing workshop ID.' })
    }

    const workshop = getWorkshopById(workshopId)
    if (!workshop) {
      return res.status(400).json({ error: 'Invalid workshop.' })
    }

    if (workshop.id !== 'building-connection') {
      return res.status(400).json({ error: 'This workshop is not free.' })
    }

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    let existingPurchase = await Purchase.findOne({ userId: user._id, workshopId })
    if (!existingPurchase) {
      const purchase = new Purchase({
        userId: user._id,
        workshopId,
        paymentId: `free_${Date.now()}`,
        orderId: `free_ord_${Date.now()}`,
        amountPaise: 0,
      })
      await purchase.save()
    }

    return res.json({ success: true, workshopId })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Failed to grant free access.' })
  }
})

app.get('/api/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }
    const purchases = await Purchase.find({ userId: user._id })
    return res.json({ user, purchases })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch profile info.' })
  }
})

const startServer = async () => {
  await connectDB()
  
  const httpServer = app.listen(API_PORT, () => {
    console.log(`[payments-api] running on http://localhost:${API_PORT}`)
  })

  // Keep dev API process alive reliably when launched under npm/concurrently.
  const keepAliveTimer = setInterval(() => {}, 60 * 60 * 1000)

  const shutdown = () => {
    clearInterval(keepAliveTimer)
    httpServer.close(() => {
      process.exit(0)
    })
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

startServer()
