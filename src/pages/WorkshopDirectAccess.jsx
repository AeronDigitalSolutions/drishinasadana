import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { workshopsData } from '../data/workshopsContent'
import { setCurrentAuthToken, sendOtp, verifyOtp } from '../lib/apiLms'
import './Lms.css'

const WorkshopDirectAccess = () => {
  const { workshopId } = useParams()
  const navigate = useNavigate()

  const workshop = workshopsData.workshops.find((item) => item.id === workshopId)

  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSessionId, setOtpSessionId] = useState('')
  const [sentTo, setSentTo] = useState('')
  const [error, setError] = useState('')

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

  const handleSendOtp = async () => {
    try {
      setError('')
      const cleanPhone = identifier.replace(/\D/g, '')
      if (cleanPhone.length < 10) {
        throw new Error('Please enter a valid 10 digit phone number.')
      }
      const response = await sendOtp(cleanPhone)
      setOtpSessionId(response.otpSessionId)
      setSentTo(response.to || cleanPhone)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleVerifyOtp = async () => {
    try {
      setError('')
      const response = await verifyOtp(otpSessionId, otp)
      setCurrentAuthToken(response.token)
      // Navigate directly to the workshop player since they logged in from a specific workshop link
      navigate(`/lms/workshop/${workshop.id}/${response.token}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="lms-page lms-auth-page">
      <div className="lms-auth-container">
        <section className="lms-card lms-auth-card">
          <div className="lms-auth-header">
            <h1 className="lms-title">Get Access: {workshop.title}</h1>
            <p className="lms-subtitle">
              Already purchased? Enter your payment email/phone and verify OTP to log in.
            </p>
          </div>

          <div className="lms-form">
            <div className="lms-field">
              <label>Email or Phone</label>
              <input
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="you@example.com or 9876543210"
              />
            </div>

            {otpSessionId ? (
              <>
                <p className="lms-hint">
                  OTP sent on WhatsApp: <strong>{sentTo}</strong>
                </p>
                <div className="lms-field">
                  <label>Enter OTP</label>
                  <input value={otp} onChange={(event) => setOtp(event.target.value)} placeholder="6-digit OTP" />
                </div>
              </>
            ) : null}

            {error ? <p className="lms-error">{error}</p> : null}

            <div className="lms-actions">
              {!otpSessionId ? (
                <button type="button" className="lms-btn-primary" onClick={handleSendOtp}>
                  Send OTP
                </button>
              ) : (
                <button type="button" className="lms-btn-primary" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              )}
              <Link to="/workshops" className="lms-btn-ghost">Back to Workshops</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default WorkshopDirectAccess
