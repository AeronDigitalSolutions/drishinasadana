const API_BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL || ''
const getApiUrl = (path) => `${API_BASE_URL}${path}`

const ADMIN_AUTH_KEY = 'Ishinna_admin_auth_token'

export const getAdminToken = () => localStorage.getItem(ADMIN_AUTH_KEY) || ''

export const setAdminToken = (token) => {
  if (!token) {
    localStorage.removeItem(ADMIN_AUTH_KEY)
  } else {
    localStorage.setItem(ADMIN_AUTH_KEY, token)
  }
}

export const clearAdminToken = () => setAdminToken('')

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type') || ''

  if (!response.ok) {
    if (contentType.includes('application/json')) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || 'Request failed.')
    }
    const text = await response.text().catch(() => '')
    const normalized = String(text || '').toLowerCase()
    if (normalized.includes('cannot post /api/admin/login')) {
      throw new Error(
        'Admin API route not found. Please restart backend (`npm run dev`) so new admin routes are loaded.',
      )
    }
    if (normalized.includes('<!doctype html')) {
      throw new Error('Server returned HTML instead of API JSON. Please restart `npm run dev`.')
    }
    throw new Error(text || 'Request failed.')
  }

  if (!contentType.includes('application/json')) {
    const text = await response.text().catch(() => '')
    const normalized = String(text || '').toLowerCase()
    if (normalized.includes('<!doctype html')) {
      throw new Error('Server returned HTML instead of API JSON. Please restart `npm run dev`.')
    }
    throw new Error(text || 'Unexpected server response.')
  }

  return response.json()
}

export const adminLogin = async ({ email, password }) => {
  const res = await fetch(getApiUrl('/api/admin/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  return handleResponse(res)
}

export const getAdminUsers = async () => {
  const token = getAdminToken()
  if (!token) {
    throw new Error('Admin session not found.')
  }

  const res = await fetch(getApiUrl('/api/admin/users'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return handleResponse(res)
}
