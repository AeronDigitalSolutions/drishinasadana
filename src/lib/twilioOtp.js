const API_BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL || ''
const getApiUrl = (path) => `${API_BASE_URL}${path}`

const postJson = async (path, payload) => {
  try {
    const response = await fetch(getApiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const raw = await response.text()
    const isHtml = raw.trim().startsWith('<!DOCTYPE') || raw.trim().startsWith('<html')
    if (isHtml) {
      throw new Error('OTP API returned HTML instead of JSON. Restart `npm run dev` and hard refresh browser.')
    }
    const data = raw ? JSON.parse(raw) : {}
    if (!response.ok) {
      throw new Error(data?.error || 'OTP request failed.')
    }
    return data
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('OTP server not reachable. Run: npm run dev')
    }
    throw error
  }
}

export const sendOtpViaTwilio = async ({ phone }) => {
  return postJson('/api/otp/send', { phone })
}

export const verifyOtpViaTwilio = async ({ otpSessionId, otp }) => {
  return postJson('/api/otp/verify', { otpSessionId, otp })
}
