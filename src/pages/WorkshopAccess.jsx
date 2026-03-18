import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setCurrentAuthToken, sendOtp, verifyOtp } from '../lib/apiLms'
import './Lms.css'

const WorkshopAccess = () => {
  const { accessToken } = useParams()
  const navigate = useNavigate()

  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSessionId, setOtpSessionId] = useState('')
  const [sentTo, setSentTo] = useState('')
  const [error, setError] = useState('')

  const handleSendOtp = async () => {
    try {
      setError('')
      const cleanPhone = identifier.replace(/\D/g, '')
      if (cleanPhone.length < 10) {
        throw new Error('Please enter a valid 10 digit phone number to login.')
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
      navigate(`/lms/dashboard/${response.token}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="lms-page lms-auth-page">
      <div className="lms-auth-container">
        <section className="lms-card lms-auth-card">
          <div className="lms-auth-header">
            <h1 className="lms-title">Verify Access</h1>
            <p className="lms-subtitle">
              Your previous access token is deprecated. Please log in directly with your registered phone number.
            </p>
          </div>

          <div className="lms-form">
            <div className="lms-field">
              <label>Email or Phone (optional)</label>
              <input
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="Leave empty to use saved contact"
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
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default WorkshopAccess
