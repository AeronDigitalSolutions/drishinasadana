import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { setCurrentAuthToken, sendOtp, verifyOtp, getCurrentAuthToken, checkUserExists } from '../lib/apiLms'
import './Lms.css'

const AuthLogin = () => {
  const navigate = useNavigate()
  const existingToken = getCurrentAuthToken()

  // flowState: 'check' | 'signup_details' | 'login_otp' | 'signup_otp'
  const [flowState, setFlowState] = useState('check')

  // Form Fields
  const [identifier, setIdentifier] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  
  // Internal State
  const [otpSessionId, setOtpSessionId] = useState('')
  const [sentTo, setSentTo] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (existingToken) {
    return <Navigate to={`/lms/dashboard/${existingToken}`} replace />
  }

  const handleCheckUser = async () => {
    if (!identifier.trim()) {
      return setError('Please enter your email or WhatsApp number.')
    }
    try {
      setLoading(true)
      setError('')
      const { exists, phone: existingPhone } = await checkUserExists(identifier)

      if (exists) {
        // User exists, jump directly to sending OTP for login
        const phoneToUse = existingPhone || identifier.replace(/\D/g, '')
        if (!phoneToUse || phoneToUse.length < 10) {
          throw new Error('Valid phone number not found for this account. Please use phone instead.')
        }
        const response = await sendOtp(phoneToUse)
        setOtpSessionId(response.otpSessionId)
        setSentTo(response.to || phoneToUse)
        setFlowState('login_otp')
      } else {
        // Did not exist. Route to explicit signup flow
        if (identifier.includes('@')) {
          setEmail(identifier)
        } else {
          setPhone(identifier.replace(/\D/g, ''))
        }
        setFlowState('signup_details')
      }
    } catch (err) {
      setError(err.message || 'Failed to check account. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendSignupOtp = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      return setError('All fields are required to sign up.')
    }
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      return setError('Please enter a valid 10-digit WhatsApp number.')
    }
    
    try {
      setLoading(true)
      setError('')
      const response = await sendOtp(cleanPhone)
      setOtpSessionId(response.otpSessionId)
      setSentTo(response.to || cleanPhone)
      setFlowState('signup_otp')
    } catch (err) {
      setError(err.message || 'Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      return setError('Please enter the OTP.')
    }
    try {
      setLoading(true)
      setError('')
      let response;
      if (flowState === 'signup_otp') {
        const signupData = { firstName, lastName, email }
        response = await verifyOtp(otpSessionId, otp, signupData)
      } else {
        response = await verifyOtp(otpSessionId, otp)
      }
      
      setCurrentAuthToken(response.token)
      navigate(`/lms/dashboard/${response.token}`, { replace: true })
    } catch (err) {
      setError(err.message || 'Verification failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const backToCheck = () => {
    setError('')
    setFlowState('check')
    setOtpSessionId('')
    setOtp('')
  }

  return (
    <main className="lms-page lms-auth-page">
      <div className="lms-auth-container">
        <section className="lms-card lms-auth-card">
          <div className="lms-auth-header">
            {flowState === 'signup_details' ? (
               <h1 className="lms-title">Create Account</h1>
            ) : (
               <h1 className="lms-title">Login / Sign Up</h1>
            )}
            
            {flowState === 'check' && (
              <p className="lms-subtitle">
                Enter your email or phone to proceed to your parent dashboard.
              </p>
            )}
            {flowState === 'signup_details' && (
              <p className="lms-subtitle">
                It looks like you're new! Please complete your profile.
              </p>
            )}
            {(flowState === 'login_otp' || flowState === 'signup_otp') && (
              <p className="lms-subtitle">
                OTP sent securely on WhatsApp to <strong>{sentTo}</strong>
              </p>
            )}
          </div>

          <div className="lms-form">
            
            {/* 1. Initial Check State */}
            {flowState === 'check' && (
              <div className="lms-field">
                <label>Email or WhatsApp Number</label>
                <input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@email.com or 9876543210"
                  disabled={loading}
                />
              </div>
            )}

            {/* 2. Signup Details State */}
            {flowState === 'signup_details' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="lms-field">
                    <label>First Name</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      disabled={loading}
                    />
                  </div>
                  <div className="lms-field">
                    <label>Last Name</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="lms-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    disabled={loading}
                  />
                </div>
                <div className="lms-field">
                  <label>WhatsApp Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    disabled={loading}
                  />
                </div>
              </>
            )}

            {/* 3. Common OTP Input State */}
            {(flowState === 'login_otp' || flowState === 'signup_otp') && (
              <div className="lms-field">
                <label>Enter 6-Digit WhatsApp OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="------"
                  disabled={loading}
                  style={{ letterSpacing: '8px', textAlign: 'center', fontSize: '18px' }}
                />
              </div>
            )}

            {error && <p className="lms-error">{error}</p>}

            <div className="lms-actions" style={{ flexDirection: 'column', gap: '8px' }}>
              {/* Conditional Buttons per Flow Stage */}
              {flowState === 'check' && (
                <button type="button" className="lms-btn-primary" onClick={handleCheckUser} disabled={loading}>
                  {loading ? 'Checking...' : 'Proceed'}
                </button>
              )}

              {flowState === 'signup_details' && (
                  <button type="button" className="lms-btn-primary" onClick={handleSendSignupOtp} disabled={loading}>
                     {loading ? 'Sending...' : 'Send OTP'}
                  </button>
              )}

              {(flowState === 'login_otp' || flowState === 'signup_otp') && (
                  <button type="button" className="lms-btn-primary" onClick={handleVerifyOtp} disabled={loading}>
                     {loading ? 'Verifying...' : 'Verify OTP & Login'}
                  </button>
              )}

              {/* Navigation Actions */}
              {flowState !== 'check' ? (
                <button type="button" className="lms-btn-ghost" onClick={backToCheck} disabled={loading}>
                  Change Email / Phone
                </button>
              ) : (
                <Link to="/workshops" className="lms-btn-ghost" style={{ textAlign: 'center' }}>
                  Cancel
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthLogin
