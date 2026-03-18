import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { workshopsData } from '../data/workshopsContent'
import { setCurrentAuthToken } from '../lib/apiLms'
import { startRazorpayPayment } from '../lib/razorpayCheckout'
import './Lms.css'

const WorkshopCheckout = () => {
  const { workshopId } = useParams()
  const workshop = useMemo(
    () => {
      if (workshopId === 'bundle') return workshopsData.bundle
      return workshopsData.workshops.find((item) => item.id === workshopId)
    },
    [workshopId],
  )

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [payment, setPayment] = useState(null)
  const [isPaying, setIsPaying] = useState(false)

  if (!workshop) {
    return (
      <main className="lms-page lms-auth-page">
        <div className="lms-auth-container">
          <div className="lms-card lms-auth-card" style={{ textAlign: 'center' }}>
            <h1 className="lms-title" style={{ marginBottom: '16px', fontFamily: '"Playfair Display", serif', color: '#0f2d5c' }}>Workshop not found</h1>
            <Link to="/workshops" className="lms-btn-ghost">Back to Workshops</Link>
          </div>
        </div>
      </main>
    )
  }

  const startPayment = async () => {
    setError('')
    if (!email.trim() && !phone.trim()) {
      setError('Please enter at least email or phone number before continuing.')
      return
    }

    try {
      setIsPaying(true)
      const paymentInfo = await startRazorpayPayment({
        workshop,
        customer: { firstName, lastName, email, phone },
      })
      
      // Attempt to link to existing user via phone if they exist in DB
      let userId = ''
      const existingToken = localStorage.getItem('lms_token')
      if (existingToken) {
         setCurrentAuthToken(existingToken)
         // In a fully integrated app, the backend might extract userId from token automatically.
         // Here, our backend `/api/payments/verify` takes a generic `userId` payload or matches order notes.
      }

      setPayment({
        paymentId: paymentInfo.paymentId,
        accessToken: existingToken || 'login-to-view', // Simplified for now - user logins via OTP to view
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPaying(false)
    }
  }

  const accessLink = payment ? `${window.location.origin}/login` : ''

  return (
    <main className="lms-page lms-auth-page">
      <div className="lms-auth-container" style={{ maxWidth: 640 }}>
        <section className="lms-card lms-auth-card">
          <div className="lms-auth-header">
            <h1 className="lms-title">Buy Workshop: {workshop.title}</h1>
            <p className="lms-subtitle">
              Secure checkout powered by Razorpay. Complete payment to unlock workshop access instantly.
            </p>
          </div>

          <div className="lms-form">
            <div className="lms-row">
              <div className="lms-field">
                <label>First Name *</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>

              <div className="lms-field">
                <label>Last Name *</label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>

            <div className="lms-row">
              <div className="lms-field">
                <label>Email (optional)</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="lms-field">
                <label>Phone / WhatsApp (optional)</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>

            <p className="lms-hint">
              Workshop Price: <strong>Rs. {workshop.priceInr}</strong>
            </p>

            {error ? <p className="lms-error">{error}</p> : null}

            {!payment ? (
              <div className="lms-actions">
                <button type="button" className="lms-btn-primary" onClick={startPayment} disabled={isPaying}>
                  {isPaying ? 'Opening Razorpay...' : 'Pay with Razorpay'}
                </button>
                <Link to="/workshops" className="lms-btn-ghost">Cancel</Link>
              </div>
            ) : null}

            {payment ? (
              <section className="lms-card" style={{ marginTop: 8 }}>
                <h2 style={{ marginTop: 0 }}>Payment Successful</h2>
                <p className="lms-success">Payment ID: {payment.paymentId}</p>
                <p className="lms-hint">
                  Access link generated and sent to your registered contact.
                </p>
                <div className="lms-field">
                  <label>Access Link</label>
                  <input value={accessLink} readOnly />
                </div>
                <div className="lms-actions">
                  <Link className="lms-btn-primary" to="/login">
                    Go to Login
                  </Link>
                  <button
                    type="button"
                    className="lms-btn-ghost"
                    onClick={() => navigator.clipboard.writeText(accessLink)}
                  >
                    Copy Link
                  </button>
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  )
}

export default WorkshopCheckout
