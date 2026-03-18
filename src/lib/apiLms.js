const API_BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL || ''
const getApiUrl = (path) => `${API_BASE_URL}${path}`

export const CURRENT_AUTH_KEY = 'Ishinna_lms_current_auth'

export const getCurrentAuthToken = () => {
  return localStorage.getItem(CURRENT_AUTH_KEY) || ''
}

export const setCurrentAuthToken = (token) => {
  if (!token) {
    localStorage.removeItem(CURRENT_AUTH_KEY)
  } else {
    localStorage.setItem(CURRENT_AUTH_KEY, token)
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('Ishinna-auth-changed'))
  }
}

export const clearAuthSession = () => {
  setCurrentAuthToken(null)
}

export const getCurrentAuthState = () => {
  const token = getCurrentAuthToken()
  if (!token) return null
  
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(window.atob(base64))
    
    // We assume the token is still valid. The API will reject if it's expired.
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      clearAuthSession()
      return null
    }

    return {
      authToken: token,
      profile: {
        phone: payload.phone || '',
        userId: payload.userId,
      },
    }
  } catch (error) {
    clearAuthSession()
    return null
  }
}

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json' }
  const token = getCurrentAuthToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Request failed.')
  }
  return response.json()
}

export const getProfileInfo = async () => {
  if (!getCurrentAuthToken()) return null
  try {
    const res = await fetch(getApiUrl('/api/me'), { headers: getHeaders() })
    const data = await handleResponse(res)
    return {
      profile: data.user,
      purchases: data.purchases || [],
    }
  } catch (error) {
    console.error('Failed to get profile:', error)
    return null
  }
}

export const checkUserExists = async (identifier) => {
  const res = await fetch(getApiUrl('/api/auth/check'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier }),
  })
  return handleResponse(res)
}

export const sendOtp = async (phone) => {
  const res = await fetch(getApiUrl('/api/otp/send'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  })
  return handleResponse(res)
}

export const verifyOtp = async (otpSessionId, otp, signupData = null) => {
  const res = await fetch(getApiUrl('/api/otp/verify'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otpSessionId, otp, signupData }),
  })
  return handleResponse(res)
}

export const claimFreeWorkshop = async (workshopId) => {
  const token = getCurrentAuthToken()
  const res = await fetch(getApiUrl('/api/payments/free-access'), {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ workshopId }),
  })
  return handleResponse(res)
}
